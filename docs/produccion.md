# Runbook — Producción

Referencia operativa del entorno **producción** (Latcon landing + agenda Fase 1).

## Estado objetivo

| Comprobación | URL / criterio |
|--------------|----------------|
| Landing | https://latconservices.com carga sin error SSL |
| Agenda | https://latconservices.com/agenda — wizard completo |
| API slots | `GET …/api/slots?locale=es` → JSON con `days` |
| CORS | Sin error en consola del navegador al cargar horarios |
| Reserva | Registro en SQL + correos (usuario + interno) |

---

## Mapa de componentes

```
Usuario
  → latconservices.com (Cloudflare → Azure SWA → out/)
  → /agenda (front estático)
  → fetch → func-latcon-booking-prd…/api/slots | /api/appointments
         → Azure SQL (sqldb-latcon-booking)
         → ACS Email (latconservices.com verificado)
```

---

## Secrets y configuración (dónde viven)

| Dónde | Qué |
|-------|-----|
| **GitHub** → Settings → Secrets → Actions | `AZURE_STATIC_WEB_APPS_API_TOKEN_ASHY_STONE_04E30940F`, `NEXT_PUBLIC_FUNCTIONS_BASE_URL` |
| **Function App** → Configuration | `SQL_CONNECTION_STRING`, `ACS_*`, `ALLOWED_ORIGINS`, `AzureWebJobsStorage` |
| **Function App** → API → CORS | Mismos orígenes que `ALLOWED_ORIGINS` |
| **Cloudflare** | TXT validación SWA, CNAME `@` → SWA, SPF/DKIM correo |
| **Azure SWA** | Dominio personalizado `latconservices.com` validado |

Detalle: [github-ci.md](./github-ci.md), [cloudflare-latconservices.md](./cloudflare-latconservices.md), [azure-swa.md](./azure-swa.md).

### `ALLOWED_ORIGINS` (producción)

Ejemplo actual recomendado:

```text
http://localhost:3000,https://latconservices.com,https://ashy-stone-04e30940f.7.azurestaticapps.net
```

Tras añadir `www`, incluir `https://www.latconservices.com`.

**Siempre** reiniciar el Function App tras cambiar application settings o CORS.

### CORS en el portal (obligatorio para dominio propio)

`ALLOWED_ORIGINS` **no sustituye** la lista **API → CORS** del Function App. Azure responde al preflight (OPTIONS) **antes** de ejecutar tu código.

Si en agenda aparece **«Failed to fetch»** desde `https://latconservices.com`:

1. Portal → **func-latcon-booking-prd** → **API** → **CORS**.
2. Añadir exactamente: `https://latconservices.com` (sin `/` final).
3. Mantener `http://localhost:3000` y, si aplica, `https://ashy-stone-04e30940f.7.azurestaticapps.net`.
4. **Guardar** → **Reiniciar** el Function App.
5. Comprobar en consola (F12) que la petición a `/api/slots` ya no falla.

Verificación con curl (debe devolver `200`, no `400 … origin is not allowed`):

```bash
curl -sI -X OPTIONS "https://func-latcon-booking-prd-euemhuf7drh3emac.centralus-01.azurewebsites.net/api/slots" \
  -H "Origin: https://latconservices.com" \
  -H "Access-Control-Request-Method: GET"
```

---

## Despliegue habitual

### Front (automático)

1. Push a `main` en `luiram/landing-latcon-swa`.
2. GitHub Actions: job **Build and deploy** (ver [github-ci.md](./github-ci.md)).
3. Azure SWA sirve la carpeta `out/`.

### API (manual)

Desde máquina con Azure Functions Core Tools:

```powershell
.\scripts\deploy\publish-functions.ps1 -FunctionAppName func-latcon-booking-prd
```

O publicar desde VS Code / `func azure functionapp publish func-latcon-booking-prd` en `api/`.

### Base de datos

Cambios de esquema: ejecutar scripts en `db/migrations/` contra `sqldb-latcon-booking` (Query editor o SSMS). No hay migrador automático en Fase 1.

---

## Checklist post-cambio

- [ ] `https://latconservices.com` OK
- [ ] `/agenda` — horarios cargan; calendario solo habilita **mar–jue** (si cambió reglas de días, publicar también la **Function App**)
- [ ] Reserva de prueba → filas en `appointments`, `meeting_requests`, etc.
- [ ] Correos en bandeja (revisar spam)
- [ ] Si cambió dominio/CORS: `ALLOWED_ORIGINS` + portal CORS + reinicio Functions
- [ ] Si cambió front: workflow GitHub en verde

---

## Observabilidad y diagnóstico

| Síntoma | Dónde mirar |
|---------|-------------|
| Sitio no carga | Cloudflare DNS, CNAME `@`, SSL Full; Azure SWA → dominios |
| Horarios no cargan | F12 → Red → CORS; Function App logs; `ALLOWED_ORIGINS` |
| 503 SQL | `SQL_CONNECTION_STRING`, firewall SQL (Allow Azure services) |
| 500 API | Function App → **Log stream** / Application Insights |
| CI falla build | Artefacto `build-log` en Actions; [github-ci.md](./github-ci.md) |
| CI falla deploy | Token SWA; `app_location: out` en workflow |
| Correo no llega | `notification_logs`; [email-acs.md](./email-acs.md) |

### Application Insights

Ya está conectado (`APPLICATIONINSIGHTS_CONNECTION_STRING` en la configuración del Function App, recurso `func-latcon-booking-prd` en Azure Monitor) — se creó automáticamente junto con el Function App, no hubo que configurarlo desde cero.

Vistas útiles: **Live Metrics** (tráfico en vivo), **Fallas** (excepciones agrupadas), **Rendimiento** (latencia por dependencia: SQL, ACS).

**Alerta configurada (2026-07-03)**: `alert-latcon-failed-requests` — se dispara si hay ≥3 solicitudes fallidas en una ventana de 15 minutos (revisión cada 5 min), notifica por correo a `contacto@latconservices.com` vía el grupo de acción `ag-latcon-alerts`. Ajustable en Azure Portal → Monitor → Alertas, o sobre el recurso de Application Insights.

### Prueba rápida API (navegador o curl)

```text
https://func-latcon-booking-prd-euemhuf7drh3emac.centralus-01.azurewebsites.net/api/slots?locale=es
```

(No valida CORS; para CORS usar la agenda en el dominio del SWA.)

---

## Reinicios

| Recurso | Cuándo |
|---------|--------|
| **Function App** | Tras cambiar app settings, CORS o connection strings |
| **Static Web App** | Tras deploy; no suele requerir reinicio manual |
| **SQL Serverless** | Tras pausa automática; primera query puede tardar |

---

## Rollback

| Capa | Acción |
|------|--------|
| Front | Revertir commit en `main` y dejar que CI redespliegue; o redeploy commit anterior |
| API | Redesplegar build anterior de `api/` al Function App |
| DNS | Revertir registro en Cloudflare (cuidado con correo) |

---

## Contactos y enlaces

- Índice docs: [README.md](./README.md)
- Mejoras planificadas: [mejoras-roadmap.md](./mejoras-roadmap.md)
