# Azure: Static Web Apps + Functions + SQL + ACS Email (Fase 1)

Este documento describe el despliegue objetivo y las variables de entorno del **flujo de agendamiento** (landing Next.js + API en `api/`).

## Componentes

| Pieza | Rol |
|--------|-----|
| **Azure Static Web Apps** | Aloja el sitio Next.js (build de producción). |
| **Azure Functions** | Carpeta [`api/`](../api/): `GET /api/slots`, `POST /api/appointments`, stub `POST /api/appointments/{id}/cancel`. |
| **Azure SQL Database** (Serverless GP) | Persistencia: empresas, contactos, solicitudes, citas, logs de notificación, bloqueos manuales. |
| **Azure Communication Services (Email)** | Envío de correos **desde el backend** tras crear la cita. |

## Dominio y remitente (ACS Email)

- El **dominio** del remitente (p. ej. `latcon.co`) y la dirección **`agenda@latcon.co`** se **verifican en Azure** (Communication Services → Email), no dentro de la aplicación.
- La app **solo lee** variables de entorno; no crea ni verifica dominios.

### Remitente vs correo interno

- **`ACS_EMAIL_FROM`**: dirección **remitente** usada por ACS para enviar (debe estar en un dominio verificado).
- **`CONTACT_NOTIFICATION_TO`**: dirección **destinatario** del aviso interno a Latcon (buzón real en Microsoft 365 u otro proveedor). **No** tiene por qué coincidir con el remitente.
- ACS **envía**; el buzón interno se **consulta** con Outlook / webmail como cualquier correo entrante.

## Comportamiento si falla el correo

1. La **transacción SQL** crea la reserva y hace **commit**.
2. Después se intentan los envíos ACS (usuario + interno).
3. Si un envío falla, la **cita no se revierte**; el error queda en `dbo.notification_logs`.
4. La API puede devolver **201** con campos `emailUser` / `emailInternal` en `sent` o `failed` para que el front muestre aviso suave si aplica.

## Variables de entorno — Azure Functions

Definir en **Configuration → Application settings** del Function App (o en `local.settings.json` en local, sin commitear):

| Variable | Descripción |
|----------|-------------|
| `SQL_CONNECTION_STRING` | Cadena de conexión a Azure SQL. |
| `ACS_CONNECTION_STRING` | Cadena del recurso Communication Services. |
| `ACS_EMAIL_FROM` | Remitente verificado, ej. `agenda@latcon.co`. |
| `CONTACT_NOTIFICATION_TO` | Destino del correo interno, ej. `contacto@latcon.co`. |
| `ALLOWED_ORIGINS` | Orígenes CORS separados por coma (URL del SWA de producción + `http://localhost:3000` en desarrollo). |
| `AzureWebJobsStorage` | Obligatorio para el runtime (cola/logs); en local suele usarse `UseDevelopmentStorage=true` con Azurite. |

**CORS en el portal (importante):** además de `ALLOWED_ORIGINS`, en el **Function App** abre **API → CORS** (o **CORS** en el menú) y añade los mismos orígenes, p. ej. `http://localhost:3000` y la URL del Static Web App. Azure suele resolver el **preflight (OPTIONS)** en la capa del servicio; si aquí no está `localhost`, el navegador puede mostrar *No 'Access-Control-Allow-Origin' header* aunque la app setting exista.

Plantilla local: copiar [`api/local.settings.json.example`](../api/local.settings.json.example) a `api/local.settings.json`.

## Variables — Next.js (Static Web Apps)

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_FUNCTIONS_BASE_URL` | URL pública del Function App (sin barra final), ej. `https://func-latcon-booking.azurewebsites.net`. |

En desarrollo: `http://localhost:7071` (puerto por defecto de `func start`). Ver [`.env.example`](../.env.example).

## Base de datos

Ejecutar el script inicial en el servidor SQL:

- [`db/migrations/001_init.sql`](../db/migrations/001_init.sql)

## Desarrollo local

1. **SQL + ACS**: rellenar `api/local.settings.json`.
2. API: `cd api && npm install && npm run build && func start` (requiere [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local)).
3. Web: en la raíz del repo, `npm run dev` con `.env.local` apuntando a `NEXT_PUBLIC_FUNCTIONS_BASE_URL=http://localhost:7071`.

## Reglas de negocio (recordatorio)

- Zona fija **America/Bogota**; lun–vie; **08:00–16:00**; reuniones **30 min**; **buffer 15 min** entre citas.
- Slots **calculados** en API; tabla `manual_slot_blocks` para bloqueos manuales futuros.
- Sin festivos automáticos en Fase 1.

## Enlaces útiles

- [Precios Static Web Apps](https://azure.microsoft.com/pricing/details/app-service/static/)
- [Azure Functions pricing](https://azure.microsoft.com/pricing/details/functions/)
- [ACS Email](https://learn.microsoft.com/azure/communication-services/concepts/email/email-overview)
