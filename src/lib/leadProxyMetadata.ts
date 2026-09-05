import { isIP } from "node:net";

const FBP_MAX_LENGTH = 200;
const FBC_MAX_LENGTH = 550;
const FBCLID_MAX_LENGTH = 500;
const USER_AGENT_MAX_LENGTH = 1_000;
const EVENT_SOURCE_URL_MAX_LENGTH = 1_000;

const EVENT_SOURCE_QUERY_KEYS = new Set([
  "ad",
  "v",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "fbclid",
]);

type JsonObject = Record<string, unknown>;

const PROXY_METADATA_KEYS = new Set([
  "fbp",
  "fbc",
  "clientIpAddress",
  "clientUserAgent",
  "eventSourceUrl",
]);

function cleanValue(value: string | null, maxLength: number) {
  const cleaned = value?.trim();
  if (
    !cleaned ||
    cleaned.length > maxLength ||
    /[\u0000-\u001f\u007f]/.test(cleaned)
  ) {
    return undefined;
  }
  return cleaned;
}

function readCookie(
  cookieHeader: string | null,
  name: string,
  maxLength: number,
) {
  if (!cookieHeader) return undefined;

  for (const cookie of cookieHeader.split(";")) {
    const separator = cookie.indexOf("=");
    if (separator < 0 || cookie.slice(0, separator).trim() !== name) continue;

    let value = cookie.slice(separator + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    try {
      value = decodeURIComponent(value);
    } catch {
      // Cookie values do not have to be URI encoded. Keep the original value.
    }
    return cleanValue(value, maxLength);
  }

  return undefined;
}

function hasMetaCookiePrefix(parts: string[]) {
  return (
    parts.length >= 4 &&
    parts[0] === "fb" &&
    /^\d+$/.test(parts[1]) &&
    /^\d{10,16}$/.test(parts[2])
  );
}

export function isValidFbp(value: unknown): value is string {
  if (typeof value !== "string" || value.length > FBP_MAX_LENGTH) return false;
  const parts = value.split(".");
  return (
    hasMetaCookiePrefix(parts) &&
    parts.length === 4 &&
    /^\d+$/.test(parts[3])
  );
}

function isValidFbclid(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= FBCLID_MAX_LENGTH &&
    /^[A-Za-z0-9._~-]+$/.test(value)
  );
}

export function isValidFbc(value: unknown): value is string {
  if (typeof value !== "string" || value.length > FBC_MAX_LENGTH) return false;
  const parts = value.split(".");
  return hasMetaCookiePrefix(parts) && isValidFbclid(parts.slice(3).join("."));
}

export function buildFbcFromFbclid(fbclid: unknown, now = Date.now) {
  if (!isValidFbclid(fbclid)) return undefined;
  const timestamp = Math.trunc(now());
  if (!Number.isFinite(timestamp) || timestamp <= 0) return undefined;

  const fbc = `fb.1.${timestamp}.${fbclid}`;
  return isValidFbc(fbc) ? fbc : undefined;
}

function normalizeIp(value: string) {
  let candidate = value.trim();
  if (candidate.startsWith('"') && candidate.endsWith('"')) {
    candidate = candidate.slice(1, -1);
  }

  // Some reverse proxies append a source port to an IPv4 or bracketed IPv6.
  const bracketedIpv6 = candidate.match(/^\[([^\]]+)](?::\d+)?$/);
  if (bracketedIpv6) candidate = bracketedIpv6[1];
  else if (/^\d{1,3}(?:\.\d{1,3}){3}:\d+$/.test(candidate)) {
    candidate = candidate.slice(0, candidate.lastIndexOf(":"));
  }

  return isIP(candidate) ? candidate : undefined;
}

function firstValidIp(value: string | null) {
  if (!value) return undefined;
  for (const candidate of value.split(",")) {
    const ip = normalizeIp(candidate);
    if (ip) return ip;
  }
  return undefined;
}

export function getClientIpAddress(headers: Headers) {
  // Prefer headers that a reverse proxy overwrites with a single client IP.
  return (
    firstValidIp(headers.get("cf-connecting-ip")) ??
    firstValidIp(headers.get("x-real-ip")) ??
    firstValidIp(headers.get("x-forwarded-for"))
  );
}

function parseWebUrl(value: string | null) {
  const cleaned = cleanValue(value, EVENT_SOURCE_URL_MAX_LENGTH);
  if (!cleaned) return undefined;

  try {
    const url = new URL(cleaned);
    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username ||
      url.password
    ) {
      return undefined;
    }
    url.hash = "";
    return url;
  } catch {
    return undefined;
  }
}

export function sanitizeEventSourceUrl(url: URL) {
  const sanitizedUrl = new URL(url);
  const allowedQuery = new URLSearchParams();
  for (const [key, value] of sanitizedUrl.searchParams) {
    if (EVENT_SOURCE_QUERY_KEYS.has(key)) allowedQuery.append(key, value);
  }
  sanitizedUrl.search = allowedQuery.toString();
  sanitizedUrl.hash = "";
  return sanitizedUrl;
}

function serializeEventSourceUrl(url: URL) {
  const serialized = sanitizeEventSourceUrl(url).toString();
  return serialized.length <= EVENT_SOURCE_URL_MAX_LENGTH
    ? serialized
    : undefined;
}

export function getEventSourceUrl(
  requestUrl: string,
  headers: Headers,
  landingPath: unknown,
) {
  const originUrl = parseWebUrl(headers.get("origin"));
  const refererUrl = parseWebUrl(headers.get("referer"));
  const routeUrl = parseWebUrl(requestUrl);
  const baseOrigin = originUrl?.origin ?? refererUrl?.origin ?? routeUrl?.origin;

  if (typeof landingPath === "string" && baseOrigin) {
    const cleanedPath = cleanValue(landingPath, EVENT_SOURCE_URL_MAX_LENGTH);
    if (cleanedPath) {
      try {
        const eventUrl = new URL(cleanedPath, `${baseOrigin}/`);
        if (eventUrl.origin === baseOrigin) {
          return serializeEventSourceUrl(eventUrl);
        }
      } catch {
        // Fall through to browser-controlled Origin/Referer headers.
      }
    }
  }

  const fallbackUrl = refererUrl ?? originUrl;
  return fallbackUrl ? serializeEventSourceUrl(fallbackUrl) : undefined;
}

export function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function addLeadRequestMetadata(
  body: JsonObject,
  request: Request,
  now = Date.now,
) {
  const payload = Object.fromEntries(
    Object.entries(body).filter(([key]) => !PROXY_METADATA_KEYS.has(key)),
  );
  const rawFbp = readCookie(
    request.headers.get("cookie"),
    "_fbp",
    FBP_MAX_LENGTH,
  );
  const fbp = isValidFbp(rawFbp) ? rawFbp : undefined;
  const rawFbc = readCookie(
    request.headers.get("cookie"),
    "_fbc",
    FBC_MAX_LENGTH,
  );
  const fbc =
    (isValidFbc(rawFbc) ? rawFbc : undefined) ??
    buildFbcFromFbclid(body.fbclid, now);
  const clientIpAddress = getClientIpAddress(request.headers);
  const clientUserAgent = cleanValue(
    request.headers.get("user-agent"),
    USER_AGENT_MAX_LENGTH,
  );
  const eventSourceUrl = getEventSourceUrl(
    request.url,
    request.headers,
    body.landingPath,
  );

  return {
    ...payload,
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
    ...(clientIpAddress ? { clientIpAddress } : {}),
    ...(clientUserAgent ? { clientUserAgent } : {}),
    ...(eventSourceUrl ? { eventSourceUrl } : {}),
  };
}
