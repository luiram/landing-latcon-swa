# Correo — Azure Communication Services (Email)

Envío transaccional tras crear una cita: confirmación al **usuario** y aviso **interno** a Latcon.

## Recursos Azure

| Recurso | Nombre (referencia) |
|---------|---------------------|
| Communication Service | `acs-latcon-email-prd` |
| Email Communication Service | `acs-latcon-email-service-prd` |
| Dominio verificado | `latconservices.com` (SPF, DKIM, DKIM2 en Cloudflare) |

La aplicación **no** verifica dominios; solo usa variables de entorno en el Function App.

---

## Variables (Function App)

| Variable | Descripción |
|----------|-------------|
| `ACS_CONNECTION_STRING` | Cadena del recurso Communication Services |
| `ACS_EMAIL_FROM` | Remitente (dominio verificado). En producción: `contacto@latconservices.com` (antes `DoNotReply@`, cambiado 2026-07-03) |
| `CONTACT_NOTIFICATION_TO` | Buzón interno Latcon. En producción: `contacto@latconservices.com` (Google Workspace, antes `latconwebapp@gmail.com`) |

Plantilla local: [`api/local.settings.json.example`](../api/local.settings.json.example)

Código de envío: [`api/src/lib/email.ts`](../api/src/lib/email.ts)

---

## Flujo al crear cita

1. **Transacción SQL** — empresa, contacto, solicitud, cita (`commit`).
2. **Email al usuario** — confirmación con fecha/hora en zona Colombia.
3. **Email interno** — resumen de la solicitud a `CONTACT_NOTIFICATION_TO`.
4. Si un envío falla, la **cita no se revierte**; se registra en `dbo.notification_logs`.

La API puede responder `201` indicando `emailUser` / `emailInternal` en `sent` o `failed`.

---

## Consultar fallos

```sql
SELECT TOP 20
  nl.created_at, nl.status, nl.channel, nl.error, nl.provider_message_id,
  a.id AS appointment_id
FROM dbo.notification_logs nl
JOIN dbo.appointments a ON a.id = nl.appointment_id
ORDER BY nl.created_at DESC;
```

Function App → **Log stream** para trazas adicionales.

---

## Reducir correo en «no deseados» / spam

No hay garantía al 100 % desde código; depende de reputación del dominio y autenticación DNS.

### Prioridad alta

| Acción | Dónde |
|--------|--------|
| Usar remitente reconocible | ✅ Hecho — `ACS_EMAIL_FROM` = `contacto@latconservices.com` (evitado `DoNotReply@`) |
| Mantener SPF + DKIM | Cloudflare DNS (registros ACS) |
| Añadir **DMARC** | ✅ Hecho — TXT `_dmarc` en Cloudflare, ver [cloudflare-latconservices.md](./cloudflare-latconservices.md) |
| **Reply-To** humano | ✅ Hecho — `contacto@latconservices.com` es un buzón real (Google Workspace), las respuestas llegan de verdad |

### Prioridad media

| Acción | Detalle |
|--------|---------|
| Contenido claro | Asunto descriptivo, poco HTML agresivo, sin palabras spam |
| Texto plano | Incluir parte `text/plain` en el mensaje ACS |
| Calentar dominio | Primeros envíos pueden ir a Promociones hasta ganar reputación |
| Coherencia From / dominio | El enlace en el correo debería apuntar a `latconservices.com` |

### Pruebas

- Enviar cita de prueba a Gmail y Outlook.
- Si llega a spam: «No es spam» ayuda en pruebas; en producción importan DMARC y remitente.

---

## Cambiar remitente

ACS mantiene una **lista blanca de nombres de usuario remitentes por dominio** (`MailFrom addresses`) — no basta con que el dominio esté verificado, cada usuario local (`contacto`, `agenda`, etc.) debe registrarse explícitamente ahí, o el envío falla con `Invalid email sender username: 'X'. Please use a username from the list of valid usernames configured by your admin.` (visible en `dbo.notification_logs.error`).

1. Azure Portal → Communication Services → `acs-latcon-email-service-prd` → **Dominios** → clic en `latconservices.com` → **Email services → MailFrom addresses**.
2. **+ Add** → nombre de usuario (ej. `contacto`) + nombre para mostrar (ej. `Latcon`).
   - **Bug conocido del portal**: los botones "+ Add" / "Delete" a veces aparecen deshabilitados sin motivo (no es un bloqueo de recursos — verificado que no hay Locks a nivel de recurso, grupo ni suscripción). Alternativa por API REST con `az account get-access-token`:
     ```bash
     TOKEN=$(az account get-access-token --resource https://management.azure.com --query accessToken -o tsv)
     curl -X PUT "https://management.azure.com/subscriptions/<sub>/resourceGroups/rg-latcon-prd/providers/Microsoft.Communication/emailServices/acs-latcon-email-service-prd/domains/latconservices.com/senderUsernames/<usuario>?api-version=2023-04-01" \
       -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
       -d '{"properties":{"username":"<usuario>","displayName":"<nombre>"}}'
     ```
3. Function App → `ACS_EMAIL_FROM` = nueva dirección.
4. Guardar y **reiniciar** Function App.
5. Cita de prueba + revisar cabeceras (`SPF`, `DKIM`, `DMARC`) y `dbo.notification_logs` si algo falla.

---

## Cloudflare Email Routing (opcional)

No afecta ACS saliente. Sirve para **recibir** en `contacto@latconservices.com` reenviado a Gmail.

Configuración: Cloudflare → **Email Routing** (independiente de ACS send).

---

## Enlaces

- DNS y DMARC: [cloudflare-latconservices.md](./cloudflare-latconservices.md)
- Operación agenda: [agenda-operacion.md](./agenda-operacion.md)
- [ACS Email — Microsoft Learn](https://learn.microsoft.com/azure/communication-services/concepts/email/email-overview)
