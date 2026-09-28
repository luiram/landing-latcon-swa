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
