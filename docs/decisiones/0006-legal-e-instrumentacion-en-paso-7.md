# 0006 · Footer legal, autorización de datos e instrumentación en el paso 7

Fecha: 2026-09-27
Estado: aceptada · modificada el 2026-09-27 al aprobar el paso 2 (ver abajo)

## Contexto
El documento de recomendaciones (§1.1 y etapa 0 de §1.9) pide aplicar dos ajustes sobre el sitio publicado antes de construir nada:

- Footer legal (razón social, NIT, dirección, teléfono, correo) y una casilla de autorización de tratamiento de datos en el formulario de `/agenda`, por exposición frente a la Ley 1581 de 2012.
- Instrumentación (analítica de comportamiento, UTM, campo oculto de origen), porque los datos de origen no se recuperan hacia atrás.

A 2026-09-27, el formulario de `/agenda` no tiene casilla de autorización.

## Decisión
Ambos ajustes se hacen en el paso 7 del plan, dentro de `sitio-web`, y no como arreglo previo en `main`.

## Alternativas descartadas
- Arreglo inmediato en `main` sobre `landing-v1`, como pide el documento.

## Consecuencias
- Hasta el lanzamiento, el formulario publicado sigue capturando datos personales sin casilla de autorización explícita. Es una exposición legal aceptada conscientemente.
- Hasta el lanzamiento no se registra el origen de las visitas y reservas (feria, canal, campaña).
- El footer legal del chasis (paso 2) se diseña con espacio para estos datos, pero su contenido definitivo y la casilla se cierran en el paso 7.
- Si aparece una feria o campaña antes del lanzamiento, conviene reabrir esta decisión.

## Modificación · 2026-09-27 (paso 2)
Los datos legales del footer (razón social, NIT, régimen, dirección, teléfono y correo) se adelantaron al paso 2, porque son información fija del documento y el footer se construyó en ese paso. Siguen en el paso 7: la casilla de autorización del formulario, la página `/tratamiento-de-datos` (el footer ya enlaza a ella) y la instrumentación.

## Modificación · 2026-09-29 (paso 7a)
- La política de tratamiento (`/tratamiento-de-datos`) y el aviso de privacidad (`/privacidad`) salen de `src/config/sitio/legal.ts`. Son un borrador con el contenido mínimo del Decreto 1377 de 2013 (arts. 13 y 15); se revisan legalmente antes del lanzamiento.
- El formulario de `/agenda` tiene una casilla obligatoria, no premarcada, con enlace a la política. La reserva envía `consent: { dataProcessing: true, policyVersion }`.
- Prueba de la autorización (Decreto 1377, art. 7): `dbo.meeting_requests.data_consent_at_utc` (hora del servidor) y `data_policy_version`. La migración `002` también crea las columnas de origen (UTM, página de entrada, referente) que llena el paso 7b, para tocar la base una sola vez.
- La API acepta `consent` como **opcional**: el formulario publicado hoy no la envía y no debe romperse. Sin autorización válida, la reserva se guarda con las columnas en NULL. Cuando salga ese formulario, la API debe exigirla.
- Orden de publicación: primero la migración `002`, después la API y al final el front. La API nueva falla si las columnas no existen.
- Cambiar el texto de la política obliga a cambiar `VERSION_POLITICA`.

## Modificación · 2026-09-29 (paso 7b)
- Analítica solo con GA4, sin Microsoft Clarity: no agrega proveedores ni cambia la política, y usa el Consent Mode que ya existe.
- El origen (UTM, primera página, referente externo) se guarda en `sessionStorage` y viaja con la reserva, no por GA4. Así el origen llega a la base aunque la persona rechace las cookies. Está cubierto por la política ("el canal o la campaña por la que llegaste").
- Eventos y convención de UTM en `docs/utm.md`. El clic al CTA se detecta por delegación (cualquier enlace a `/agenda`), sin marcar componentes: ninguna sección conoce la analítica.
