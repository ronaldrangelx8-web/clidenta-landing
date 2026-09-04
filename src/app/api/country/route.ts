const SUPPORTED_COUNTRIES = new Set([
  "AR",
  "BO",
  "BR",
  "CL",
  "CO",
  "CR",
  "DO",
  "EC",
  "ES",
  "GT",
  "HN",
  "MX",
  "NI",
  "PA",
  "PE",
  "PY",
  "SV",
  "US",
  "UY",
  "VE",
]);

function supportedCountry(value: string | null) {
  const countryIso = value?.trim().toUpperCase();
  return countryIso && SUPPORTED_COUNTRIES.has(countryIso)
    ? countryIso
    : null;
}

function countryFromLanguage(value: string | null) {
  if (!value) return null;

  for (const language of value.split(",")) {
    const locale = language.split(";")[0]?.trim();
    const region = locale?.match(/[-_]([A-Za-z]{2})$/)?.[1] ?? null;
    const countryIso = supportedCountry(region);
    if (countryIso) return countryIso;
  }

  return null;
}

export async function GET(request: Request) {
  const countryIso =
    supportedCountry(request.headers.get("x-vercel-ip-country")) ??
    supportedCountry(request.headers.get("cf-ipcountry")) ??
    supportedCountry(request.headers.get("cloudfront-viewer-country")) ??
    supportedCountry(request.headers.get("x-country-code")) ??
    countryFromLanguage(request.headers.get("accept-language")) ??
    "PE";

  return Response.json(
    { countryIso },
    {
      headers: {
        "Cache-Control": "private, no-store",
        Vary: "x-vercel-ip-country, cf-ipcountry, accept-language",
      },
    },
  );
}
