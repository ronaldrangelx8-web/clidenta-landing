import {
  addLeadRequestMetadata,
  isJsonObject,
} from "@/lib/leadProxyMetadata";

const LEADS_API_URL = (
  process.env.LEADS_API_URL ||
  process.env.LANDING_COPY_API_URL ||
  "https://api.clidenta.net"
).replace(/\/+$/, "");

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isJsonObject(body)) {
      return Response.json({ message: "Solicitud inválida." }, { status: 400 });
    }

    const payloadWithMetadata = addLeadRequestMetadata(body, request);
    const response = await fetch(`${LEADS_API_URL}/public/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadWithMetadata),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    const payload = await response.json().catch(() => ({
      message: "No pudimos procesar la solicitud.",
    }));
    return Response.json(payload, { status: response.status });
  } catch {
    return Response.json(
      { message: "No pudimos guardar tus datos. Inténtalo nuevamente." },
      { status: 503 },
    );
  }
}
