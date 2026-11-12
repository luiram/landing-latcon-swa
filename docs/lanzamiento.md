# Lanzamiento del sitio (paso 8b)

Guía para pasar de la landing `landing-v1` al sitio de 20 páginas de la rama `sitio-web`. Cada acción que publica algo se autoriza por separado, en el orden de esta guía. Ninguna se hace "de paso" junto con otra.

Referencias: [produccion.md](produccion.md) (operación diaria), [github-ci.md](github-ci.md), [azure-swa.md](azure-swa.md), [utm.md](utm.md), ADR [0005](decisiones/0005-rama-y-despliegue.md), [0006](decisiones/0006-legal-e-instrumentacion-en-paso-7.md) y [0007](decisiones/0007-legal-propio-contraste-y-drones.md).

## 0 · Antes de empezar

**Decisiones que deben estar cerradas** (tabla "Decisiones abiertas" de `CLAUDE.md`):

- [ ] Acento AA: aplicar o no la opción B (ADR 0002). Si se aplica, el correo de la API (`api/src/lib/email.ts`) también cambia y sale en el paso 2.

**Estado local de `sitio-web`:**

- [ ] `npm run build` sin errores; `npm run check:tokens -- --strict` en 0; `npm run lint` solo con el error conocido de `global-error.tsx`.
- [ ] `npm run build:api` sin errores.
- [ ] Árbol de trabajo limpio y "Estado actual" de `CLAUDE.md` al día.

**Por qué este orden.** La API nueva escribe columnas que crea la migración `002`, así que falla si la migración no está. El front nuevo envía la autorización y el origen de la visita, que solo la API nueva guarda. La API nueva acepta reservas sin autorización, así que el front publicado hoy sigue funcionando entre los pasos 2 y 3 (ADR 0006).

| Paso | Qué publica | Se puede revertir |
|---|---|---|
| 1 · Respaldo y vista previa | Etiqueta y rama en GitHub, entorno de vista previa | Sí, no toca producción |
| 2 · Migración `002` | 11 columnas nuevas, todas nulas, en `dbo.meeting_requests` | No hace falta: no borra ni cambia datos |
| 3 · API | Function App `func-latcon-booking-prd` | Sí, redesplegando la versión anterior |
| 4 · Front | `latconservices.com` | Sí, revirtiendo el merge en `main` |
| 5 · Después | Search Console, GA4, caché | No aplica |

## 1 · Respaldo y vista previa

1. **Subir la etiqueta `landing-v1`** (`git push origin landing-v1`). Es el punto de retorno del front. Hoy solo existe en local (ADR 0005).
2. **Subir `sitio-web`** (`git push origin sitio-web`).
3. **Abrir el pull request `sitio-web` → `main`, sin fusionarlo.** GitHub Actions crea un entorno de vista previa con su propia URL. Es público para quien tenga la URL: no se comparte fuera del equipo.
4. **Revisar la vista previa:**
   - [ ] Las 20 páginas cargan y el menú lleva a todas; `/no-existe` muestra la página 404.
   - [ ] Aviso de cookies: Rechazar, Aceptar y "Configurar cookies" en el footer.
   - [ ] En móvil: menú, `/agenda` y una página de solución.
   - [ ] Compartir una URL en WhatsApp o LinkedIn muestra la imagen OG.

   `/agenda` no se puede probar completa en la vista previa: su dominio no está en `ALLOWED_ORIGINS` ni en el CORS de la Function App, así que los horarios no cargan. Se prueba en el paso 4, ya en producción. No se agrega el dominio de la vista previa a CORS.

## 2 · Migración `002` en la base

1. Azure Portal → `sqldb-latcon-booking` → Query editor (o SSMS).
2. Ejecutar `db/migrations/002_autorizacion_y_origen.sql`. Se puede ejecutar más de una vez sin problema.
3. Comprobar que existen las 11 columnas:

   ```sql
   SELECT name FROM sys.columns
   WHERE object_id = OBJECT_ID(N'dbo.meeting_requests')
     AND name IN (N'data_consent_at_utc', N'data_policy_version', N'marketing_consent_at_utc',
                  N'marketing_revoked_at_utc', N'utm_source', N'utm_medium', N'utm_campaign',
                  N'utm_content', N'utm_term', N'landing_path', N'referrer');
   ```

   Deben salir 11 filas.

La API publicada hoy no lee estas columnas, así que la agenda sigue funcionando igual.

## 3 · API

1. `az login` con la cuenta que tiene acceso a `rg-latcon-prd`.
2. `.\scripts\deploy\publish-functions.ps1 -FunctionAppName func-latcon-booking-prd`
3. **Comprobar**, todavía con el front de `landing-v1`:
   - [ ] `GET …/api/slots?locale=es` devuelve JSON con `days`.
   - [ ] Una reserva de prueba desde `latconservices.com/agenda` se guarda; las columnas nuevas quedan en NULL, porque ese formulario no las envía.
   - [ ] Llegan los dos correos (usuario e interno).
4. Borrar la reserva de prueba o anotarla para que no cuente como prospecto.

**Para volver atrás:** redesplegar la versión anterior de `api/` desde la etiqueta `landing-v1` (`git worktree add ../api-v1 landing-v1` y publicar desde esa carpeta). Las columnas nuevas no estorban a la API anterior.

## 4 · Front

1. Fusionar el pull request `sitio-web` → `main`. GitHub Actions compila y publica `out/` (la vista previa se cierra sola).
2. Esperar el workflow en verde.
3. **Purgar la caché de Cloudflare** (Caching → Configuration → Purge Everything). El sitio pasa por el proxy de Cloudflare y podría servir HTML de la landing.
4. **Comprobar en `https://latconservices.com`:**
   - [ ] El home nuevo carga, y también con `www` (redirección 301).
   - [ ] `/sitemap.xml` lista 20 URL; `/robots.txt` apunta a él.
   - [ ] `/no-existe` responde 404 con la página propia, no con el home.
   - [ ] Cabeceras `X-Content-Type-Options` y `Referrer-Policy` presentes (F12 → Red).
   - [ ] `/agenda`: los horarios cargan, sin error de CORS en la consola.
   - [ ] Reserva de prueba **con** la casilla de comunicaciones y una URL con UTM (`/?utm_source=prueba&utm_medium=manual&utm_campaign=lanzamiento`). En la base: `data_consent_at_utc`, `data_policy_version = 2026-11-10`, `marketing_consent_at_utc`, `utm_*` y `landing_path` con valor.
   - [ ] Segunda reserva **sin** la casilla de comunicaciones: `marketing_consent_at_utc` en NULL.
   - [ ] El correo interno dice si se autorizaron las comunicaciones.
   - [ ] GA4 → Tiempo real: tras aceptar cookies aparecen `page_view`, `cta_click` y `generate_lead`; tras rechazarlas no aparece nada.
5. Borrar o anotar las reservas de prueba.

**Para volver atrás:** revertir el merge en `main` (`git revert -m 1 <merge>`) y dejar que CI publique. La API nueva sirve al front de la landing sin cambios. No usar `swa deploy` ni `publish-swa` (ADR 0005).

## 5 · Después del lanzamiento

- [ ] **Search Console:** volver a enviar `https://latconservices.com/sitemap.xml` y pedir la indexación del home, `/soluciones` y `/sectores`.
- [ ] **GA4** ([utm.md](utm.md)): retención de datos a 14 meses; dimensiones personalizadas `pagina`, `ubicacion`, `paso`, `tipo` y `porcentaje`; `generate_lead` como evento clave.
- [ ] Mirar Application Insights → Fallas durante la primera semana (la alerta `alert-latcon-failed-requests` ya avisa al correo).
- [ ] Actualizar "Estado actual" de `CLAUDE.md` y cerrar el paso 8b.

**Quedan para después del lanzamiento:**

- Volver obligatoria la autorización en la API, cuando ya no quede en circulación el formulario sin casilla (ADR 0006).
- Traducción a EN, PT y FR (ADR 0004).
- Material propio: capturas de sectores y de `/desarrollo-a-la-medida`, fotos de drones.
