/** CORS: refleja origen solo si está en ALLOWED_ORIGINS (coma separada). */
export function getAllowedOrigin(requestOrigin: string | null | undefined): string | null {
  const raw = process.env.ALLOWED_ORIGINS ?? "";
  const list = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (list.length === 0) return "*";
  if (requestOrigin && list.includes(requestOrigin)) return requestOrigin;
  // No devolver otro origen de la lista: el navegador exige coincidencia exacta con el header Origin.
  return null;
}

export function corsHeaders(origin: string | null | undefined): Record<string, string> {
  const allow = getAllowedOrigin(origin);
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    // Incluye Accept por si el navegador envía preflight (p.ej. GET con Accept: application/json).
    "Access-Control-Allow-Headers": "Content-Type, Idempotency-Key, Accept, Accept-Language",
    "Access-Control-Max-Age": "86400",
  };
  if (allow) headers["Access-Control-Allow-Origin"] = allow;
  return headers;
}

export function jsonResponse(
  status: number,
  body: unknown,
  origin: string | null | undefined,
): { status: number; jsonBody: unknown; headers: Record<string, string> } {
  return {
    status,
    jsonBody: body,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  };
}
