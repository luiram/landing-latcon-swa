# Documentación — Landing Latcon

Índice de la documentación técnica y operativa del proyecto **2_plata** (landing + agenda Fase 1).

## URLs de producción

| Servicio | URL |
|----------|-----|
| **Sitio (canónico)** | https://latconservices.com |
| **Agenda** | https://latconservices.com/agenda |
| **SWA (Azure, legacy)** | https://ashy-stone-04e30940f.7.azurestaticapps.net |
| **API (Function App)** | https://func-latcon-booking-prd-euemhuf7drh3emac.centralus-01.azurewebsites.net |

## Recursos Azure (referencia)

| Recurso | Nombre |
|---------|--------|
| Resource group | `rg-latcon-prd` |
| Static Web App | `swa-latcon-landing-prd` |
| Function App | `func-latcon-booking-prd` |
| SQL Server | `sql-latcon-prd-2026` |
| Base de datos | `sqldb-latcon-booking` |
| Communication Services | `acs-latcon-email-prd` |
| DNS / dominio web | Cloudflare — `latconservices.com` |

## Repositorio y CI

- **GitHub:** [luiram/landing-latcon-swa](https://github.com/luiram/landing-latcon-swa)
- **Rama de despliegue:** `main`
- **Workflow:** [`.github/workflows/azure-static-web-apps.yml`](../.github/workflows/azure-static-web-apps.yml)

---

## Guías por tema

### Despliegue e infraestructura

| Documento | Contenido |
|-----------|-----------|
| [**produccion.md**](./produccion.md) | Runbook: qué está en prod, checklist, logs, reinicios, pruebas E2E |
| [**azure-swa.md**](./azure-swa.md) | Arquitectura Azure, variables de entorno, CORS, SQL, reglas de negocio |
| [**cloudflare-latconservices.md**](./cloudflare-latconservices.md) | DNS, dominio propio, SSL, pendientes Cloudflare |
| [**github-ci.md**](./github-ci.md) | GitHub Actions, secrets, build `out/`, troubleshooting CI |
| [**../scripts/deploy/README.md**](../scripts/deploy/README.md) | Scripts manuales `build-all`, `publish-functions`, `publish-swa` |

### Operación funcional

| Documento | Contenido |
|-----------|-----------|
| [**agenda-operacion.md**](./agenda-operacion.md) | Slots, `manual_slot_blocks`, SQL útil, API, idempotencia |
| [**email-acs.md**](./email-acs.md) | Correo ACS, remitente, spam, DMARC, `notification_logs` |

### Mejoras y producto

| Documento | Contenido |
|-----------|-----------|
| [**mejoras-roadmap.md**](./mejoras-roadmap.md) | Roadmap P1/P2/P3: rendimiento, SEO, correo, admin, etc. |

### Código y datos

| Ruta | Contenido |
|------|-----------|
| [`../src/config/content.ts`](../src/config/content.ts) | Copy de la landing |
| [`../src/config/site.ts`](../src/config/site.ts) | Marca, nav, ruta `/agenda` |
| [`../db/migrations/001_init.sql`](../db/migrations/001_init.sql) | Esquema SQL inicial |
| [`../.env.example`](../.env.example) | Variable front local |
| [`../api/local.settings.json.example`](../api/local.settings.json.example) | Variables API local |

---

## Por dónde empezar

| Situación | Lee primero |
|-----------|-------------|
| Desarrollo en local | [README.md](../README.md) → [azure-swa.md](./azure-swa.md) (sección desarrollo local) |
| Despliegue / incidente en prod | [produccion.md](./produccion.md) |
| Agenda: «Failed to fetch» paso 2 | [produccion.md](./produccion.md) (CORS portal) → [agenda-operacion.md](./agenda-operacion.md) |
| Dominio o DNS | [cloudflare-latconservices.md](./cloudflare-latconservices.md) |
| CI en rojo | [github-ci.md](./github-ci.md) |
| Cita / slots / BD | [agenda-operacion.md](./agenda-operacion.md) |
| Correo no llega / spam | [email-acs.md](./email-acs.md) |
| Planificar mejoras | [mejoras-roadmap.md](./mejoras-roadmap.md) |
