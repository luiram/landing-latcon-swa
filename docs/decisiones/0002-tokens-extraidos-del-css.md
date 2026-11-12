# 0002 · Tokens extraídos del CSS publicado

Fecha: 2026-09-27
Estado: aceptada (con una pregunta abierta, al final)

## Contexto
El inventario del paso 0 encontró:

- 14 variables en `@theme`, pero unos 80 `rgba()` literales, 23 sombras sueltas, 40 tamaños de texto distintos (22 arbitrarios) y colores de la paleta por defecto de Tailwind (`neutral`, `stone`, `teal`, `amber`, `white`, `black`).
- Los documentos dan por "confirmados" un azul `#152033` y un verde `#16A34A` que **no existen en el sitio**. El sitio usa naranja `#f58220` como acento, azules grisáceos `#567ba5` y `#4b688c`, gris cálido `#f7f4f2` y casi negro `#101012` en el hero.
- Hay tres naranjas: `#f58220` en la interfaz, `#ff6a00` en el logo y `#FF6B00` en el icono.
- No se carga ninguna fuente web. `LatconLogo.tsx` importa Nunito, pero ese componente no se usa.

## Decisión
1. **Se extrae lo que hay; no se inventa.** La paleta es la del sitio publicado.
2. **Acento de interfaz: `#f58220`.** El naranja del logo (`#ff6a00`) queda como token de marca (`--c-orange-logo`) y no se usa en la interfaz.
3. **Tipografía: fuente del sistema** (`system-ui`, Segoe UI, Roboto, Arial…). No se agrega fuente web.
4. **Tres niveles** en `src/app/globals.css`:
   - Primitivos en `:root`, prefijo `--c-*`. Valores crudos. No generan utilidades y ningún componente los usa directo.
   - Semánticos en `@theme` (`--color-*`): el rol del color. Se conservan los nombres actuales (`bg-page`, `text-primary`, `accent`…) y se agregan `bg-inverse`, `bg-glass`, `on-accent`, `overlay`, `brand-orange` y `brand-charcoal`. Se eliminaron `bg-deep` y `accent-deep`, que no tenían usos.
   - Escalas en `@theme`, nombradas por rol:

| Escala | Tokens | Origen |
|---|---|---|
| Texto | `label` 11 · `caption` 12 · `small` 13 · `body-sm` 14 · `body` 15 · `body-lg` 18 · `title-sm` 18 · `title` 24 · `heading-sm` 28 · `heading` 32 · `heading-lg` 36 · `display-sm` 42 · `display` 48 px | Los tamaños más usados; los arbitrarios se agrupan al paso más cercano |
| Interlineado | `display` 1.1 · `heading` 1.2 · `title` 1.375 · `body` 1.7 · `body-loose` 1.92 | 25 valores en uso, agrupados |
| Tracking | `display` 0 · `heading` -0.02em · `title` -0.015em · `label` 0.12em · `eyebrow` 0.14em | 12 valores en uso |
| Anchos | `prose-narrow` 34rem · `prose` 38rem · `prose-wide` 42rem · `page` 75rem | 12 valores en uso |
| Sección | `section-sm` 5rem · `section-md` 6rem · `section-lg` 7rem | `py-20`, `py-24`, `py-28` |
| Radios | `control` 8px · `card-sm` 12px · `card` 16px · `pill` | `rounded-lg`, `-xl`, `-2xl`, `-full` |
| Sombras | `card`, `card-hover`, `card-accent`, `card-accent-hover`, `control-inset`, `control-hover`, `popover`, `glass` | Las 23 sombras sueltas |
| Movimiento | `ease-out-soft`, `--duration-fast/base/reveal` | `Button` y `Reveal` |

5. **Los colores con transparencia van como `rgba()` literal dentro de `globals.css`**, con un comentario que indica su primitivo. Se probó `color-mix()` y `rgb(from var(--c-…) r g b / a)`: Chrome los calcula como `color(srgb …)` y los redondea distinto, lo que cambió entre 3 y 112 píxeles por página. Con `rgba()` literal la paridad es exacta.
6. **Regla verificable:** ningún hex, `rgb()`, `rgba()` ni color de la paleta de Tailwind fuera de `globals.css`. `npm run check:tokens` los cuenta; con `-- --strict` falla.
   - Línea base al cerrar el paso 1: **253 valores** (1 hex, 41 `rgba()`, 66 de paleta, 57 tamaños, 38 interlineados, 26 tracking, 22 sombras, 2 radios). Meta del paso 3: 0.
   - Excepciones: `global-error.tsx` (reemplaza `<html>` y no puede depender del CSS global) y `LocaleFlag.tsx` (colores de banderas: son dato, no marca).
7. Cuando el conteo de paleta llegue a 0, se desactiva la paleta por defecto de Tailwind (`--color-*: initial` en `@theme`) para que no se pueda volver a usar.

## Alternativas descartadas
- Adoptar `#152033` y `#16A34A` del documento: cambia el color de todos los CTA y de la identidad visible sin haber sido decidido sobre el sitio real.
- Unificar el acento al naranja del logo: cambia todos los botones del sitio.
- Fuente web nueva: decisión de marca que no le corresponde a este paso.
- Migrar los componentes en este paso: el paso 3 los reescribe; migrarlos dos veces es trabajo perdido.

## Consecuencias
- El paso 1 no cambia nada visible. Verificado con capturas de `/`, `/agenda` y `/privacidad` a 1440 y 390 px: 0 píxeles y 0 estilos computados distintos frente a `landing-v1`.
- Al migrar los componentes (paso 3), los valores arbitrarios pasan al paso más cercano de la escala. Habrá diferencias de 1 o 2 px en tamaños sueltos; se revisan en las capturas del paso 3.

## Pregunta abierta
Los documentos comerciales (propuestas) usan `#152033` y `#16A34A`; la web usa otra paleta. Alinear ambas es decisión de marca pendiente. Si se decide cambiar, se cambia en los primitivos y baja a todo el sitio.

## Adiciones · 2026-09-27 (paso 2)
- Tokens nuevos para el chasis, todos extraídos de valores que el navbar ya usaba:
  - `--c-gray-900` (`#262626`, el `neutral-800` de Tailwind del navbar) → `text-strong`, solo para navegación.
  - `glass-edge` (blanco del borde del vidrio), `bg-tinted` (fondo de `/privacidad`) y las sombras `glass-scrolled` y `glass-sm`.
- **`cn()` debe conocer las escalas.** `tailwind-merge` no lee `@theme`: sin configuración trataba `text-body-sm` como un color y descartaba `text-white` del botón. `src/lib/cn.ts` registra todas las escalas; cualquier escala nueva en `@theme` se agrega también ahí.
- `check:tokens` al cerrar el paso 2: **222** (se eliminó `Navbar.tsx`; los archivos nuevos del chasis están en 0).

## Adiciones · 2026-09-28 (paso 3)
- **`check:tokens` en 0.** Se partió de 223, no de los 222 registrados; uno de ellos era un `text-white` dentro de un comentario de `cn.ts`.
- **Paleta de Tailwind desactivada** (`--color-*: initial` en `@theme`), como pedía el punto 7. Verificado: 0 píxeles distintos en las cuatro páginas antes y después de desactivarla.
- Tokens nuevos, todos con valores que ya estaban en el código:
  - `on-dark`: bordes y rellenos sobre fondo oscuro (los `white/12`, `white/15`, `white/40` del hero y del botón inverso).
  - Sombras `control-outline` (hover del botón secundario) y `dialog` (banner de cookies).
  - Sombras de texto `glow`, `display` y `lead` del hero (`text-shadow-*`, Tailwind 4.1+).
  - Utilidades `velo-fondo`, `velo-texto` y `velo-luz`: los once velos del hero, con los mismos valores y en el mismo orden, agrupados en tres capas. Son `@utility` en `globals.css` porque llevan `rgba()` literales.
- **Valores sueltos que pasaron al token más cercano** (visibles en las capturas del paso 3):
  - Titular del hero: 2.4–3.08rem en cuatro pasos → `display-sm` (42 px) y `display` (48 px) desde `lg`.
  - Bajada del hero: 16.7–17.9 px → `body-lg` (18 px).
  - Títulos de sección de 30/36 px → `heading-sm`/`heading-lg` (28/36 px).
  - Título del cierre: 24/30 px → 24/28 px.
  - Cuerpos con `leading-relaxed` (1.625) → `leading-body` (1.7).
  - Bordes de "Lo que incluye" en teal y ámbar (uno por capacidad) → un solo borde azul (`blue-mid-1/25`) para los tres bloques.
  - Selector de idioma (oculto, ADR 0004): los grises `stone` y `neutral` → `bg-elevated`, `text-strong` y `border-subtle`.
  - Días de la semana del calendario de `/agenda`: 10.4 px → `label` (11 px). Micro-copy del banner de cookies: 10 px → 11 px.
- Una utilidad de tamaño de texto sin interlineado propio hereda 1.5. Donde el elemento tenía la altura de `text-sm` o `text-xs` (botones, chips), se fija `leading-5` o `leading-4` para conservar la altura.

## Modificación · 2026-11-10 (paso 8a)
El acento de interfaz pasa de `#f58220` a `#c2410c` (`--c-orange-700`) para cumplir WCAG 2.1 AA (5,2:1 con blanco; el anterior daba 2,59:1). `--c-orange-500` queda como primitivo sin uso en texto. Ver ADR 0007.

## Modificación · 2026-11-11 (paso 8a)
Se revierte la modificación anterior por decisión de marca de la dirección: `#c2410c` se leía rojo y no está en la paleta corporativa. El acento vuelve a `#f58220` (`--c-orange-500`), igual que en `landing-v1`, con las mismas opacidades en los textos naranjas. Se elimina `--c-orange-700`. Se acepta que el acento no cumple WCAG 2.1 AA para texto: 2,6:1 con blanco y 2,4:1 sobre el fondo arena (el mínimo es 4,5:1). Ver ADR 0007, decisión 3.
