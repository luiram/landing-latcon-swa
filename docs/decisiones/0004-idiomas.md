# 0004 · Idiomas: se construye en español y se traduce al final

Fecha: 2026-09-27
Estado: aceptada

## Contexto
`landing-v1` está publicada en español, inglés, portugués y francés. El idioma se guarda en `localStorage` y el contenido se elige en el navegador, así que Google solo ve la versión en español. Los documentos del sitio (copy de 21 páginas) solo existen en español, y la mayor parte del copy nuevo es propuesta, no versión final. Hasta ahora la regla era aplicar todo cambio en los 4 idiomas (MEMORY.md).

## Decisión
- Todo el sitio se construye y se revisa solo en español.
- La traducción a inglés, portugués y francés es lo último que se hace, cuando todo esté aplicado y funcionando.
- Mientras tanto, `en.ts`, `pt.ts` y `fr.ts` quedan congelados. Los componentes nuevos no se bloquean por la falta de traducción.
- La regla de MEMORY.md ("todos los cambios en ES, EN, PT y FR") queda suspendida para el sitio nuevo. Sigue vigente para arreglos que se hagan en `main` sobre la landing publicada.

## Alternativas descartadas
- Traducir cada paso en los 4 idiomas: multiplica por cuatro el trabajo sobre un copy que todavía va a cambiar.

## Consecuencias
- El chasis (paso 2) se construye con el selector de idioma preparado, pero los textos solo en español.
- **Pendiente de decidir antes del lanzamiento (paso 8):** si el sitio sale en español y el selector se oculta hasta que existan las traducciones, o si el lanzamiento espera a la traducción. Hoy el público puede elegir 4 idiomas; lanzar solo en español quita tres.
- Cuando se traduzca, conviene evaluar rutas por idioma (`/en/…`) para que esas versiones sean visibles en búsqueda.

## Aplicación · 2026-09-27 (paso 2)
- `LocaleProvider` tiene `IDIOMA_FIJO = "es"`: ignora el idioma guardado en `localStorage`. Para la fase de traducción se cambia a `null`.
- El selector de idioma no aparece en el header nuevo. `LanguageSelector`, `LanguageOption` y `LocaleFlag` se conservan para la traducción.
- `LocaleDocument` ya no reemplaza el título ni la descripción de la página; solo sincroniza `lang`. Antes pisaba el `<title>` de `/agenda` y `/privacidad` con el del home.
