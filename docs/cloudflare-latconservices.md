# Cloudflare — `latconservices.com`

Documento de referencia: configuración DNS y recomendaciones pendientes para el dominio usado por la landing (Azure Static Web Apps), el correo (Azure Communication Services) y la API de agendamiento (Azure Functions).

**Última actualización:** 16 mayo 2026  
**Estado web:** `https://latconservices.com` operativo (landing + `/agenda`).

---

## Resumen de arquitectura

| Capa | Recurso Azure | URL / dominio |
|------|----------------|---------------|
| Front (Next.js estático) | Static Web App `swa-latcon-landing-prd` | `https://latconservices.com` |
| URL por defecto SWA | (mismo recurso) | `https://ashy-stone-04e30940f.7.azurestaticapps.net` |
| API agendamiento | Function App `func-latcon-booking-prd` | `https://func-latcon-booking-prd-euemhuf7drh3emac.centralus-01.azurewebsites.net` |
| Base de datos | Azure SQL `sqldb-latcon-booking` | — |
| Correo transaccional | ACS + Email Service (dominio verificado) | Remitente p. ej. `DoNotReply@latconservices.com` |

Cloudflare actúa como **DNS autoritativo** del dominio y, en el registro web, como **proxy** (nube naranja).

---

## Configuración actual en Cloudflare

### 1. Dominio y DNS

**Zona:** `latconservices.com`  
**Proveedor DNS:** Cloudflare (nameservers del dominio apuntan a Cloudflare).

#### Registros confirmados en el despliegue

| Tipo | Nombre (host) | Destino / contenido | Proxy | Propósito |
|------|---------------|---------------------|-------|-----------|
| **TXT** | `@` (`latconservices.com`) | Token de validación Azure SWA (valor generado por Azure, p. ej. `_12krsname2hjr6u869n776ntdl6rpwy`) | Solo DNS | Validar propiedad del dominio en Azure Static Web Apps |
| **CNAME** | `@` | `04e30940f.7.azurestaticapps.net` (alias del SWA; en Azure puede verse como `cenicienta-piedra-04e30940f.7.azurestaticapps.net` o `ashy-stone-04e30940f.7.azurestaticapps.net`) | Proxied (nube naranja) | Enrutar tráfico HTTPS de la web al Static Web App |

> **Importante:** El **Valor** del CNAME debe coincidir **exactamente** con lo indicado en Azure → Static Web App → **Dominios personalizados** → «Tráfico directo al sitio» / «Agregar un registro CNAME, ALIAS o A».

#### Registros de correo (ACS — configurados en fases anteriores)

No eliminar al añadir los registros del SWA. Suele incluir:

| Tipo | Uso típico |
|------|------------|
| **TXT** | SPF (`v=spf1 …`) |
| **CNAME** | DKIM / DKIM2 (selectores que indique Azure ACS) |
| Otros **TXT** | Verificación de dominio de correo |

**Dominio de correo:** verificado en ACS.  
**Remitente en uso:** `DoNotReply@latconservices.com` (u otro alias del dominio verificado).  
**Servicio:** Communication Service `acs-latcon-email-prd` conectado al dominio.

---

### 2. Azure Static Web Apps (vinculación con Cloudflare)

| Paso | Estado |
|------|--------|
| Tipo de enlace en Azure | **Dominio personalizado en otro DNS** (Cloudflare) |
| Dominio `latconservices.com` | **Validado** (TXT en Cloudflare) |
| Tráfico al sitio (CNAME en `@`) | **Configurado** en Cloudflare |
| Certificado HTTPS | Azure SWA + cadena vía Cloudflare (proxy) |
| CI/CD | GitHub Actions → `out/` → SWA (`landing-latcon-swa`) |

El build en GitHub usa el secret **`NEXT_PUBLIC_FUNCTIONS_BASE_URL`** con la URL del **Function App**, no la del dominio `latconservices.com`.

---

### 3. SSL/TLS en Cloudflare

Con **proxy activado** en el CNAME de la web:

| Modo | Recomendación |
|------|----------------|
| **Completo (Full)** o **Completo estricto (Full strict)** | Usar |
| **Flexible** | Evitar (puede causar problemas entre Cloudflare y Azure) |

Ruta: **SSL/TLS** → **Información general** → modo de cifrado.

---

### 4. Lo que Cloudflare **no** gestiona

| Elemento | Dónde se configura |
|----------|-------------------|
| CORS de la API (`/api/slots`, `/api/appointments`) | Function App: `ALLOWED_ORIGINS` + **API → CORS** |
| URL de la API en el front | GitHub Secret `NEXT_PUBLIC_FUNCTIONS_BASE_URL` |
| Contenido y despliegue del sitio | Repo + Azure SWA |
| SQL, storage Functions, ACS | Azure Portal |

---

## Configuración relacionada en Azure (debe alinearse con Cloudflare)

### Function App — CORS para producción

**`ALLOWED_ORIGINS`** y **API → CORS** (misma lista en ambos sitios):

```text
http://localhost:3000,https://latconservices.com,https://ashy-stone-04e30940f.7.azurestaticapps.net
```

Sin `https://latconservices.com` en **API → CORS**, `/agenda` falla con **«Failed to fetch»** (el preflight OPTIONS devuelve `400 … origin is not allowed`). `ALLOWED_ORIGINS` solo no alcanza.

Tras cambios: **Guardar** y **Reiniciar** el Function App. Ver [produccion.md](./produccion.md#cors-en-el-portal-obligatorio-para-dominio-propio).

Si se habilita `www`, añadir `https://www.latconservices.com`.

### Pruebas

1. `https://latconservices.com` — landing.
2. `https://latconservices.com/agenda` — horarios sin error CORS (F12 → Red).
3. Reserva de prueba — registro en SQL y correos ACS.

---

## Flujo DNS usado para el dominio propio (referencia)

```
Usuario → latconservices.com (Cloudflare DNS, proxy)
       → CNAME @ → *.7.azurestaticapps.net
       → Azure Static Web App (out/)
       → /agenda llama a Function App (CORS debe permitir Origin latconservices.com)
```

---

## Recomendaciones por completar

### Prioridad alta

| # | Tarea | Dónde | Detalle |
|---|--------|--------|---------|
| 1 | Confirmar **CORS** con dominio propio | Azure Function App | `https://latconservices.com` en `ALLOWED_ORIGINS` y en **API → CORS**. Reiniciar app. |
| 2 | **SSL/TLS** | Cloudflare → SSL/TLS | Modo **Full** o **Full (strict)**. |
| 3 | ✅ **DMARC** | Cloudflare → DNS → TXT `_dmarc` | Hecho 2026-07-02/03, `rua=mailto:contacto@latconservices.com` |

### Prioridad media

| # | Tarea | Dónde | Detalle |
|---|--------|--------|---------|
| 4 | ✅ Subdominio **`www`** | Cloudflare + Azure SWA | Hecho 2026-07-03: CNAME `www` (proxied) + dominio agregado en Azure SWA + redirect 301 via Cloudflare Redirect Rules |
| 5 | ✅ Remitente más amigable | Function App `ACS_EMAIL_FROM` | Hecho 2026-07-03: `contacto@latconservices.com` (requirió agregarlo en ACS → MailFrom addresses) |
| 6 | ✅ **Reply-To** en emails | — | `contacto@` es buzón real de Google Workspace, no requirió tocar código |
| 7 | Dominio predeterminado SWA | Azure → Dominios personalizados | Opcional: `latconservices.com` como predeterminado. |

### Prioridad baja / opcional

| # | Tarea | Dónde | Detalle |
|---|--------|--------|---------|
| 8 | ~~**Email Routing**~~ | — | Obsoleto: se optó por buzón real en Google Workspace (`contacto@`) en vez de reenvío |
| 9 | Seguridad / rendimiento | Cloudflare | WAF, rate limiting (según plan). |
| 10 | Limpiar CORS legacy | Azure | Quitar `*.azurestaticapps.net` cuando no se use. |
| 11 | Auditoría DNS | Cloudflare → DNS | No borrar SPF/DKIM de correo. |

---

## Plantillas DNS sugeridas (pendientes)

### `www` (tras registrar dominio en Azure SWA)

| Tipo | Nombre | Destino | Proxy |
|------|--------|---------|-------|
| CNAME | `www` | Valor exacto de Azure (ej. `04e30940f.7.azurestaticapps.net`) | Proxied |

### DMARC

| Tipo | Nombre | Contenido (ejemplo) |
|------|--------|---------------------|
| TXT | `_dmarc` | `v=DMARC1; p=none; adkim=s; aspf=s; rua=mailto:TU_CORREO@ejemplo.com` |

### Redirección canónica (Redirect Rules)

Ejemplo — raíz como canónica:

- **Si:** hostname equals `www.latconservices.com`
- **Entonces:** redirect 301 a `https://latconservices.com/$1`

---

## Checklist de verificación

- [ ] `https://latconservices.com` carga la landing
- [ ] `https://latconservices.com/agenda` carga horarios (sin CORS)
- [ ] Reserva de prueba en SQL + correos
- [ ] TXT validación SWA presente
- [ ] CNAME `@` → SWA, proxy + SSL Full
- [ ] SPF/DKIM ACS intactos
- [ ] `ALLOWED_ORIGINS` y CORS con `https://latconservices.com`
- [ ] (Opcional) `www`, DMARC, remitente `agenda@`

---

## Referencias internas

- [Índice de documentación](./README.md)
- [`docs/azure-swa.md`](./azure-swa.md) — despliegue SWA, Functions, SQL, variables
- [`docs/mejoras-roadmap.md`](./mejoras-roadmap.md) — mejoras pendientes
- [`db/migrations/001_init.sql`](../db/migrations/001_init.sql) — esquema BD (`manual_slot_blocks`, etc.)
- [`api/src/lib/cors.ts`](../api/src/lib/cors.ts) — lógica `ALLOWED_ORIGINS`

## Enlaces externos

- [Dominios personalizados — Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/custom-domain)
- [Cloudflare DNS](https://developers.cloudflare.com/dns/)
- [Azure Communication Services Email](https://learn.microsoft.com/azure/communication-services/concepts/email/email-overview)
