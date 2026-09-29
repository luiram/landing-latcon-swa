# Convención de UTM

Cada enlace o QR que LATCON reparte fuera del sitio lleva UTM. Sin ellas, una visita de feria llega como "directa" y no se puede saber qué evento, canal o pieza trajo una reunión. Fuente: docs/recomendaciones-sitio.md §1.1b y §1.8; implementación en el paso 7b (ADR 0006).

## Qué pasa con las UTM

- **GA4** las lee solo de la URL: aparecen en *Informes → Adquisición → Adquisición de tráfico* (fuente / medio / campaña).
- **La reserva** también las guarda. Al entrar, el sitio anota en `sessionStorage` las UTM, la primera página vista y el sitio externo del que llegó la visita (`src/lib/analitica.ts`). Si la persona agenda, eso viaja con la reserva y queda en `dbo.meeting_requests` (`utm_*`, `landing_path`, `referrer`). Así el origen llega al CRM aunque la persona haya rechazado las cookies.
- Se conserva el primer origen de la sesión. Si la persona entra después con otras UTM (otro QR), mandan las nuevas.

## Los cinco parámetros

| Parámetro | Qué responde | Valores | Obligatorio |
|---|---|---|---|
| `utm_source` | ¿Quién o dónde? | Nombre del evento o de la plataforma: `alimentec`, `congreso-cacao`, `linkedin`, `correo`, `aliado-<nombre>` | Sí |
| `utm_medium` | ¿Por qué tipo de canal? | Lista cerrada, abajo | Sí |
| `utm_campaign` | ¿Qué esfuerzo? | `<evento-o-campaña>-<aaaa>`, p. ej. `alimentec-2026`, `lanzamiento-drones-2026` | Sí |
| `utm_content` | ¿Qué pieza? | `stand-banner`, `tarjeta`, `volante`, `firma-correo`, `post-01` | Cuando hay más de una pieza en la misma campaña |
| `utm_term` | ¿Qué palabra clave? | Solo en pauta de búsqueda | No |

**`utm_medium`, lista cerrada:**

| Valor | Cuándo |
|---|---|
| `qr` | Código QR impreso (stand, volante, tarjeta, empaque) |
| `social` | Publicación orgánica en redes |
| `email` | Correos enviados por el equipo o campañas de correo |
| `referido` | Enlace compartido por un aliado o cliente |
| `evento` | Enlace compartido durante o después de un evento, sin QR (chat del evento, presentación) |
| `cpc` | Pauta pagada |

## Reglas

1. Minúsculas, sin tildes ni espacios; palabras separadas con guion: `congreso-cacao`, no `Congreso Cacao`.
2. No inventar valores de `utm_medium`: si ninguno sirve, se agrega a la tabla antes de usarlo.
3. No poner UTM en enlaces internos del sitio: rompen la sesión en GA4 y reemplazan el origen real.
4. No poner datos personales en las UTM (nombres, correos).
5. Los enlaces de campaña apuntan a la página más cercana a la oferta: el sector, la solución o, cuando exista, `/lp/<evento>`. No siempre al home.

## Ejemplos

```
QR del stand en Alimentec 2026, hacia el sector:
https://latconservices.com/sectores/agroindustria?utm_source=alimentec&utm_medium=qr&utm_campaign=alimentec-2026&utm_content=stand-banner

Tarjeta de presentación en el mismo evento:
https://latconservices.com/?utm_source=alimentec&utm_medium=qr&utm_campaign=alimentec-2026&utm_content=tarjeta

Publicación en LinkedIn sobre drones:
https://latconservices.com/soluciones/drones?utm_source=linkedin&utm_medium=social&utm_campaign=lanzamiento-drones-2026&utm_content=post-01

Firma de correo del equipo:
https://latconservices.com/?utm_source=correo&utm_medium=email&utm_campaign=firma-2026&utm_content=firma-correo
```

## Consultar el origen de las reservas

```sql
SELECT mr.created_at, c.full_name, co.name AS empresa,
       mr.utm_source, mr.utm_medium, mr.utm_campaign, mr.utm_content,
       mr.landing_path, mr.referrer
FROM dbo.meeting_requests mr
JOIN dbo.contacts c ON c.id = mr.contact_id
JOIN dbo.companies co ON co.id = c.company_id
ORDER BY mr.created_at DESC;
```

## Eventos de GA4

| Evento | Cuándo | Parámetros |
|---|---|---|
| `cta_click` | Clic en cualquier enlace a `/agenda` | `pagina`, `ubicacion` (`header`, `footer`, id de la sección o `contenido`), `texto` |
| `scroll_depth` | La página se leyó hasta el 25, 50, 75 o 90 % | `pagina`, `porcentaje` |
| `agenda_paso` | Se llega a un paso del formulario (1 fecha, 2 contacto, 3 contexto, 4 confirmar) | `paso` |
| `slot_selected` | Se elige un horario | `dia` |
| `form_error` | Falta un campo, falta la autorización o la API rechaza la reserva | `paso`, `tipo`, `campos` |
| `generate_lead` | Reserva creada | `formulario` |

El abandono del formulario es la caída entre pasos de `agenda_paso` (*Explorar → Exploración de embudo*). Para ver los parámetros en los informes estándar hay que registrarlos como dimensiones personalizadas en GA4 (*Administrar → Definiciones personalizadas*): `pagina`, `ubicacion`, `paso`, `tipo`, `porcentaje`. Conviene marcar `generate_lead` como evento clave y subir la retención de datos de 2 a 14 meses (*Administrar → Recopilación y retención de datos*): con 2 meses, el embudo de *Explorar* pierde la historia. Las tres cosas son gratuitas en GA4 estándar.

Todos los eventos respetan el banner de cookies: sin consentimiento, GA4 no guarda cookies (Consent Mode).
