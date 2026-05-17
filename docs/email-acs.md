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
| `ACS_EMAIL_FROM` | Remitente (dominio verificado), ej. `DoNotReply@latconservices.com` |
| `CONTACT_NOTIFICATION_TO` | Buzón interno Latcon, ej. `latconwebapp@gmail.com` |

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
| Usar remitente reconocible | `ACS_EMAIL_FROM` → `agenda@latconservices.com` o `hola@latconservices.com` (verificado en ACS), evitar solo `DoNotReply@` |
| Mantener SPF + DKIM | Cloudflare DNS (registros ACS) |
| Añadir **DMARC** | TXT `_dmarc` en Cloudflare — ver [cloudflare-latconservices.md](./cloudflare-latconservices.md) |
| **Reply-To** humano | Mejora futura en `email.ts` hacia buzón de contacto real |

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

1. Azure Portal → Communication Services → **Email** → dominios → añadir/verificar alias si hace falta.
2. Function App → `ACS_EMAIL_FROM` = nueva dirección.
3. Guardar y **reiniciar** Function App.
4. Cita de prueba + revisar cabeceras (`SPF`, `DKIM`, `DMARC`).

---

## Cloudflare Email Routing (opcional)

No afecta ACS saliente. Sirve para **recibir** en `contacto@latconservices.com` reenviado a Gmail.

Configuración: Cloudflare → **Email Routing** (independiente de ACS send).

---

## Enlaces

- DNS y DMARC: [cloudflare-latconservices.md](./cloudflare-latconservices.md)
- Operación agenda: [agenda-operacion.md](./agenda-operacion.md)
- [ACS Email — Microsoft Learn](https://learn.microsoft.com/azure/communication-services/concepts/email/email-overview)
