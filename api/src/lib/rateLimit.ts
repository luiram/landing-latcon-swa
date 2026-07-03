import type { HttpRequest } from "@azure/functions";

/**
 * Limitador en memoria por IP. Se reinicia en cada cold start de la Function
 * App — no es un límite global perfecto (Consumption puede escalar a varias
 * instancias), pero frena scripts de abuso obvios sin infraestructura extra.
 */
const hits = new Map<string, number[]>();

export function getClientIp(request: HttpRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-azure-clientip") ?? "unknown";
}

export function isRateLimited(ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > maxRequests;
}
