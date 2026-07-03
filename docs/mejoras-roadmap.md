# Roadmap de mejoras

Mejoras recomendadas para la landing Latcon y el flujo de agenda (Fase 1+). Prioridad orientativa; detalle operativo en los docs enlazados.

**Leyenda:** P1 = alto impacto / corto plazo · P2 = medio · P3 = opcional / más adelante

---

## Infraestructura y dominio

| ID | Mejora | Prioridad | Notas |
|----|--------|-----------|--------|
| I1 | `www.latconservices.com` + redirect 301 canónico | P2 | [cloudflare-latconservices.md](./cloudflare-latconservices.md) |
| I2 | ✅ DMARC en Cloudflare | P1 | Hecho 2026-07-02, [email-acs.md](./email-acs.md) |
| I3 | Quitar URL `*.azurestaticapps.net` de CORS cuando no se use | P3 | [produccion.md](./produccion.md) |
| I4 | ✅ Application Insights en Function App | P2 | Ya estaba conectado; alerta de fallas agregada 2026-07-03, ver [produccion.md](./produccion.md) |
| I5 | Function Premium / mínimo de instancias (menos cold start) | P2 | Coste vs latencia en `/api/slots` |
| I6 | SQL: revisar auto-pause / min vCores | P2 | Primera query lenta tras pausa |

---

## Rendimiento — landing

| ID | Mejora | Prioridad | Notas |
|----|--------|-----------|--------|
| L1 | ✅ Comprimir imágenes `public/` (hero, soluciones, verticales) | P1 | Hecho 2026-07-03, ~53% menos peso |
| L2 | ✅ `loading="lazy"` / Next Image con tamaños | P1 | Ya estaba implementado en su mayoría; se ajustó `priority` en Solutions |
| L3 | Reducir JS inicial (revisar framer-motion por sección) | P2 | Home ~170 KB First Load JS |
| L4 | Precarga solo hero; diferir resto | P3 | |
| L5 | CDN/cache headers vía `staticwebapp.config.json` | P3 | |

---

## Rendimiento — agenda / API

| ID | Mejora | Prioridad | Notas |
|----|--------|-----------|--------|
| A1 | Precargar slots al entrar en `/agenda` (no solo paso 2) | P2 | [agenda-operacion.md](./agenda-operacion.md) |
| A2 | Spinner / mensaje claro «Cargando horarios…» | P1 | UX durante cold start |
| A3 | Caché corta de respuesta `slots` (CDN o API) | P3 | Invalidar al crear cita |
| A4 | Keep-alive / health ping programado | P3 | Reduce cold start (coste) |

---

## Correo (ACS)

| ID | Mejora | Prioridad | Notas |
|----|--------|-----------|--------|
| E1 | ✅ `ACS_EMAIL_FROM` → `contacto@latconservices.com` | P1 | Hecho 2026-07-03, [email-acs.md](./email-acs.md) |
| E2 | ✅ Reply-to buzón humano | P1 | `contacto@` es buzón real de Google Workspace, no requirió tocar código |
| E3 | ✅ Parte `text/plain` en mensajes | P2 | Ya estaba implementado en `api/src/lib/email.ts` |
| E4 | Plantillas HTML más «transactional» (logo, firma) | P3 | |
| E5 | ~~Cloudflare Email Routing para `contacto@`~~ | — | Obsoleto: se optó por buzón real en Google Workspace en vez de reenvío |

---

## Producto y agenda

| ID | Mejora | Prioridad | Notas |
|----|--------|-----------|--------|
| P1 | Panel admin para `manual_slot_blocks` | P2 | Hoy solo SQL |
| P2 | Cancelación real de citas (stub existe) | P2 | `cancelStub.ts` |
| P3 | Festivos Colombia en API | P3 | Fuera de MVP actual |
| P4 | Recordatorio 24 h antes (Logic App / Function timer) | P3 | |
| P5 | ✅ Enlace «Agendar» en todos los CTAs → `/agenda` | P1 | Ya estaba hecho, verificado 2026-07-03 |
| P6 | ✅ Página de privacidad real (no `#privacidad`) | P2 | Hecho 2026-07-03, `/privacidad` en 4 idiomas |

---

## SEO y analítica

| ID | Mejora | Prioridad | Notas |
|----|--------|-----------|--------|
| S1 | Completar Fase 3 README: sitemap, robots, OG, JSON-LD | P2 | Ver [README.md](../README.md) fases |
| S2 | `canonical` en `https://latconservices.com` | P2 | |
| S3 | Google Analytics / Plausible (consent si aplica) | P3 | |
| S4 | Search Console con dominio propio | P2 | |

---

## CI/CD y desarrollo

| ID | Mejora | Prioridad | Notas |
|----|--------|-----------|--------|
| D1 | Workflow separado para deploy API en `main` | P2 | Hoy manual |
| D2 | `docs/desarrollo-local.md` (opcional) | P3 | Azurite + func + SQL |
| D3 | Tests e2e Playwright en `/agenda` | P3 | |
| D4 | Enlazar `docs/README.md` en README raíz | P1 | Hecho al crear docs |

---

## Seguridad

| ID | Mejora | Prioridad | Notas |
|----|--------|-----------|--------|
| X1 | Rotación periódica token SWA GitHub | P3 | |
| X2 | ✅ Rate limit en `POST /api/appointments` | P2 | Hecho 2026-07-03 (código, 5/hora por IP) — **pendiente publicar la API en prod** |
| X3 | Revisar que secrets no estén en logs CI | P2 | Solo length en workflow ✓ |

---

## Cómo usar este documento

1. Elegir ítems **P1** por sprint.
2. Al cerrar una mejora, marcar en commit/PR o mover a sección «Hecho» abajo.
3. No duplicar procedimientos: enlazar a docs específicos.

### Hecho (referencia despliegue 2026)

- [x] CI GitHub verde (`out/`, exclude `api/` en tsconfig)
- [x] Dominio `latconservices.com` en SWA + Cloudflare
- [x] CORS producción: `latconservices.com` en API → CORS + `ALLOWED_ORIGINS` (doc + mensaje UI si falla fetch)
- [x] E2E reserva + SQL + correos en pruebas

---

## Índice de documentación

[docs/README.md](./README.md)
