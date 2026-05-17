# Operación — Agenda y API de reservas

Guía para operar el flujo **Agendar conversación** (`/agenda`): reglas de negocio, API, base de datos y bloqueos manuales.

## Endpoints (Function App)

Base URL producción:

```text
https://func-latcon-booking-prd-euemhuf7drh3emac.centralus-01.azurewebsites.net
```

| Método | Ruta | Uso |
|--------|------|-----|
| GET | `/api/slots?locale=es` | Horarios disponibles (también `en`, `pt`, `fr`) |
| POST | `/api/appointments` | Crear cita (header `Idempotency-Key`) |
| POST | `/api/appointments/{id}/cancel` | Stub Fase 1 (no cancela aún) |
| OPTIONS | (mismas rutas) | Preflight CORS |

Código: [`api/src/functions/`](../api/src/functions/), lógica de slots en [`api/src/lib/slots.ts`](../api/src/lib/slots.ts).

---

## Reglas de negocio (Fase 1)

| Regla | Valor |
|-------|--------|
| Zona horaria | `America/Bogota` |
| Días hábiles | Lunes a viernes |
| Horario laboral | 08:00–16:00 (hora local) |
| Duración reunión | 30 minutos |
| Buffer entre citas | 15 minutos después del fin |
| Días ofrecidos en UI | Próximos **5** días hábiles |
| Festivos | **No** automáticos en Fase 1 |
| Tabla de slots | **No existe** — se calculan en API |

El buffer implica que una cita 10:00–10:30 bloquea hasta 10:45 para nuevas reservas.

---

## Flujo en el front

1. Usuario completa formulario (paso 1).
2. Al pasar al paso 2 se llama `fetchSlots` → puede tardar si la Function está fría.
3. En el paso 2 ve los **5 días hábiles** con horarios: por día se muestran de forma repartida **3, 4, 5, 4 y 3** cupos (patrón cíclico), no solo la mañana; «Ver N horarios más» expande el día completo. El calendario marca el día seleccionado y un contador de cupos visibles.
4. Elige hora (lista por día o día en calendario) y continúa.
5. Confirma → `POST /api/appointments` con `Idempotency-Key` (UUID en cliente).

Código: [`src/features/booking/BookingWizard.tsx`](../src/features/booking/BookingWizard.tsx), lógica de vista previa en [`bookingSlotDisplay.ts`](../src/features/booking/bookingSlotDisplay.ts) y [`BookingDaySlotsList.tsx`](../src/features/booking/BookingDaySlotsList.tsx).

---

## Base de datos

Esquema: [`db/migrations/001_init.sql`](../db/migrations/001_init.sql)

| Tabla | Rol |
|-------|-----|
| `companies` | Empresa del solicitante |
| `contacts` | Persona de contacto |
| `meeting_requests` | Necesidad / motivo |
| `appointments` | Slot reservado, `idempotency_key`, estado |
| `notification_logs` | Resultado envío ACS por cita |
| `manual_slot_blocks` | Bloqueos manuales de franjas UTC |

### Consultas útiles

**Citas recientes:**

```sql
SELECT TOP 20
  a.id, a.slot_start_utc, a.slot_end_utc, a.status, a.created_at,
  c.full_name, c.email, co.name AS company
FROM dbo.appointments a
JOIN dbo.contacts c ON c.id = a.contact_id
JOIN dbo.companies co ON co.id = a.company_id
ORDER BY a.created_at DESC;
```

**Fallos de correo:**

```sql
SELECT TOP 20 *
FROM dbo.notification_logs
WHERE status <> N'sent'
ORDER BY created_at DESC;
```

---

## Tabla `manual_slot_blocks`

**Propósito:** bloquear intervalos para que **no aparezcan** en `/api/slots` y **no se puedan reservar** (vacaciones, reunión interna, etc.).

**Vacía es normal** si no hay bloqueos manuales.

La API ya consulta esta tabla en `getSlots` y `createAppointment` ([`api/src/functions/getSlots.ts`](../api/src/functions/getSlots.ts)).

### Insertar bloqueo (ejemplo)

Bloquear un día completo (ajustar UTC según hora Bogotá; mediodía Bogotá ≈ 17:00 UTC en estándar):

```sql
INSERT INTO dbo.manual_slot_blocks (block_start_utc, block_end_utc, reason)
VALUES (
  '2026-06-02T13:00:00',
  '2026-06-03T05:00:00',
  N'Día no disponible'
);
```

Bloquear franja (ej. almuerzo):

```sql
INSERT INTO dbo.manual_slot_blocks (block_start_utc, block_end_utc, reason)
VALUES (
  '2026-05-20T17:00:00',
  '2026-05-20T19:00:00',
  N'Bloqueo manual'
);
```

**Eliminar bloqueo:**

```sql
DELETE FROM dbo.manual_slot_blocks WHERE id = '...';
```

No hay panel admin en Fase 1; operación vía **Azure SQL Query editor** o SSMS.

---

## Idempotencia

El cliente envía header `Idempotency-Key` (UUID). La tabla `appointments` tiene restricción única en `idempotency_key` para evitar doble reserva por doble clic.

---

## CORS (recordatorio)

El navegador solo acepta respuestas si el **Origin** (p. ej. `https://latconservices.com`) está en **dos lugares**:

| Dónde | Qué pasa si falta el dominio propio |
|-------|-------------------------------------|
| Function App → **API → CORS** | Preflight OPTIONS rechazado → UI **«Failed to fetch»** en paso 2 |
| Function App → **`ALLOWED_ORIGINS`** | La función no devuelve `Access-Control-Allow-Origin` en GET/POST |

Lista recomendada (sin `/` final, separada por comas en `ALLOWED_ORIGINS`):

```text
http://localhost:3000,https://latconservices.com,https://ashy-stone-04e30940f.7.azurestaticapps.net
```

Tras editar: **guardar** y **reiniciar** el Function App.

El front muestra un mensaje más claro si la red/CORS falla (`formatSlotsLoadError` en [`bookingCopy.ts`](../src/features/booking/bookingCopy.ts)).

Ver [produccion.md](./produccion.md) y [cloudflare-latconservices.md](./cloudflare-latconservices.md).

---

## Rendimiento esperado

| Fase | Comportamiento |
|------|----------------|
| Primera petición tras inactividad | Cold start Function + SQL (varios segundos) |
| Peticiones siguientes | Más rápidas |
| Landing pesada | Muchas imágenes — ver [mejoras-roadmap.md](./mejoras-roadmap.md) |

---

## Enlaces

- Arquitectura Azure: [azure-swa.md](./azure-swa.md)
- Correo: [email-acs.md](./email-acs.md)
- Runbook prod: [produccion.md](./produccion.md)
