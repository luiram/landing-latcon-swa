# Verificación visual

Capturas y comparaciones del sitio contra `landing-v1` (la landing publicada antes del sitio). Es un paquete aparte: no forma parte del build ni del `package.json` del sitio.

## Instalación (una vez)

```bash
cd scripts/verificacion
npm install
npx playwright install chromium
```

Si ya hay un Chromium de otra versión de Playwright, se puede usar sin descargar otro:

```bash
export CHROMIUM_PATH="$USERPROFILE/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe"
```

## Uso

Desde la raíz del repositorio (`2_plata/`):

```bash
# 1. Línea base: compila landing-v1 en scripts/verificacion/out-landing-v1/ (worktree temporal)
bash scripts/verificacion/linea-base.sh

# 2. Compilar la rama actual
npm run build
```

Desde `scripts/verificacion/`:

| Comando | Qué hace | Cuándo |
|---|---|---|
| `node capturar.js out-landing-v1 landing-v1` | Captura `/`, `/agenda` y `/privacidad` a 1440 y 390 px, con volcado de estilos computados | Una vez por línea base |
| `node capturar.js ../../out actual` | Lo mismo con la rama actual | Tras cada cambio |
| `node comparar.js landing-v1 actual` | Diferencia píxel a píxel (umbral 0) y estilo por estilo. Deja `*.diff.png` si hay diferencias | Cuando un paso no debe cambiar nada visible (paso 1) |
| `node comparar-main.js out-landing-v1 ../../out [ruta]` | Compara solo el `<main>` de una página (por defecto `/`), sin header ni footer | Cuando cambia el chasis pero no el contenido (paso 2) |
| `node comparar-secciones.js <out A> <out B> [ruta]` | Alto de cada sección, palabras en `<main>` y capturas del `<main>` de los dos exports | Cuando cambia el sistema pero no el contenido (paso 3) |
| `node capturar-pagina.js ../../out /metodo metodo` | Captura una página completa a 1440 y 390 px; falla si hay error de consola o desborde horizontal | Páginas nuevas sin línea base |
| `node chasis.js ../../out` | 12 comprobaciones del header, desplegables, teclado, breadcrumb, títulos y móvil | Tras cualquier cambio en `src/components/layout/` |

Todos terminan con código 1 si encuentran diferencias o fallas, salvo `comparar-secciones.js`, que solo informa. Las capturas quedan en `capturas/` (ignorado por git). Para guardar el export de un paso como referencia, se copia `out/` a `out-pasoN/` (ignorado por git).

En Git Bash, una ruta como `/metodo` se convierte en ruta de Windows: anteponer `MSYS_NO_PATHCONV=1`.

Las comparaciones ocultan solo la barra fija (`.fixed`), no todo `header`: las secciones usan `<header>` para su encabezado.

## Cómo son deterministas

- Se sirve el export estático (`out/`) con URLs limpias, igual que Azure Static Web Apps.
- Se bloquea toda la red externa: API de agenda y analítica.
- Se desactivan animaciones y transiciones, y se recorre la página para disparar las apariciones al hacer scroll.
- Dos capturas seguidas del mismo build dan 0 píxeles de diferencia (verificado el 2026-09-27).
