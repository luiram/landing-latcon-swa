# MEMORY.md — Latcon Landing (`2_plata`)

Notas debes anotar en "Preferencias del cliente" en una sola frase, cada vez que te indique recordar algo .
Ver también: [CLAUDE.md](CLAUDE.md)

---

## Preferencias del cliente
- Todos los cambios se deben aplicarse en ES, en, PT y FR

---

## Resumen de sesiones (bitácora en lenguaje simple)

> Para el detalle técnico de cada cosa, ver los documentos en [`docs/`](docs/README.md) — cada sección de abajo enlaza al documento correspondiente.

### 2026-07-02 / 2026-07-03 — Reactivación, correo, seguridad y SEO

**Contexto de partida**: la landing dejó de agendar citas porque la suscripción de Azure se deshabilitó (crédito gratuito vencido). A partir de ahí se reactivó todo y se aprovechó para resolver varios problemas de fondo que venían arrastrándose.

#### 1. Por qué las reservas no llegaban / llegaban a spam
El dominio `latconservices.com` no tenía **DMARC** configurado y el remitente de los correos era `DoNotReply@` (un patrón que los filtros de spam penalizan). Se agregó DMARC y luego se cambió el remitente a `contacto@latconservices.com`. Detalle: [docs/email-acs.md](docs/email-acs.md).

#### 2. Correo real del negocio: Google Workspace
Antes no existía una bandeja real para el negocio — las notificaciones de reservas llegaban a un Gmail personal. Se contrató **Google Workspace** y se crearon `luis.ramirez@latconservices.com` (buzón principal) y su alias `contacto@latconservices.com` (recibe notificaciones de reservas y ahora es el remitente de los correos automáticos, así que si un cliente responde, la respuesta sí llega a alguien). Detalle: [docs/accesos-y-herramientas.md](docs/accesos-y-herramientas.md).

#### 3. Mejoras al formulario de agenda (`/agenda`)
- Errores por campo (antes solo decía "revisa los campos", ahora indica cuál falta)
- Indicador de "Paso X de 4" movido a un lugar más visible
- Círculo de progreso animado al cargar horarios y al confirmar la reserva
- Fecha completa en el resumen de confirmación (antes solo mostraba la hora)
- Aviso (no bloqueante) si el correo ingresado es personal (Gmail, Hotmail, etc.), sugiriendo uno corporativo — sin rechazar la reserva, para no perder leads reales de pymes que solo tienen correo personal

#### 4. Seguridad del formulario
Se agregó un **límite de 5 solicitudes por hora por IP** en el envío de reservas (`POST /api/appointments`), para evitar que alguien llene los horarios de basura o use el formulario para enviar correos falsos de "confirmación" a un tercero. *(Pendiente: publicar este cambio en el Function App de producción — vive en el código pero falta el deploy manual de la API).*

#### 5. Monitoreo: Application Insights
Ya existía conectado (se creó junto con el Function App) pero nadie lo estaba usando. Se agregó una **alerta automática por correo** si hay 3 o más fallas en 15 minutos, para enterarse de un problema antes de que un cliente lo reporte. Detalle: [docs/produccion.md](docs/produccion.md).

#### 6. Página de privacidad real
Antes el link "Privacidad" del footer no llevaba a ningún lado (era solo un ancla `#privacidad`). Ahora existe `/privacidad` con contenido real en los 4 idiomas: qué datos recopila el formulario, para qué se usan, dónde se guardan, y los derechos del titular según la Ley 1581 de 2012 de Colombia (habeas data).

#### 7. `www.latconservices.com` ahora funciona
Antes, si alguien escribía "www." antes del dominio, la página no cargaba. Ahora `www.latconservices.com` redirige automáticamente (301) a `latconservices.com`.

#### 8. SEO — **¿qué es y para qué sirve, en simple?**
SEO = que Google pueda **encontrar, entender y confiar** en tu sitio, para que aparezca cuando alguien busca algo relacionado (ej. "consultoría de datos para pymes Colombia"). Sin esto, el sitio solo lo ve quien ya tiene el link — es invisible para alguien que busca en Google sin saber que Latcon existe.

Se implementaron 4 piezas, cada una resuelve un problema distinto:

| Pieza | Qué problema resuelve |
|---|---|
| **sitemap.xml** | Es un "mapa" que le dice a Google exactamente qué páginas existen (`/`, `/agenda`, `/privacidad`). Sin él, Google tiene que *descubrir* las páginas solo, lo cual tarda mucho más en un sitio nuevo sin enlaces externos apuntándole |
| **robots.txt** | Confirma que Google tiene permiso de rastrear todo el sitio, y le indica dónde está el sitemap |
| **canonical** | Evita que Google se confunda si la misma página es accesible por dos rutas (por ejemplo con y sin `www`) — sin esto, podría tratarlas como contenido duplicado y perjudicar el posicionamiento de ambas |
| **Google Search Console** | El "panel de control": muestra si Google efectivamente indexó las páginas, qué búsquedas traen visitas, y avisa si hay algún error técnico que esté bloqueando la indexación |

**Importante para expectativas**: esto no hace que el sitio aparezca en Google mañana — son los cimientos técnicos correctos, pero el posicionamiento real (aparecer arriba en resultados) toma semanas o meses y depende también de otros factores (contenido, enlaces externos, competencia). Sin estos cimientos, ni siquiera se puede empezar a competir por posicionamiento.

**Lo que queda pendiente en SEO** (no se hizo hoy): analítica (Google Analytics u otro), y las etiquetas para que el sitio se vea bien al compartirlo en redes sociales (Open Graph / JSON-LD). Ver [docs/mejoras-roadmap.md](docs/mejoras-roadmap.md).