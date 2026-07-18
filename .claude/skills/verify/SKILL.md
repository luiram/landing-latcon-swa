---
name: verify
description: Cómo levantar y probar en navegador real este sitio (Next.js static export, Azure SWA)
---

# Verificar cambios de UI/routing en este proyecto

## Build + preview

```bash
npm run build          # genera out/
npm run preview:out    # sirve out/ en el puerto 3000 (usa `serve`)
```

**Usar siempre el puerto 3000**, no otro. `ALLOWED_ORIGINS` en la Azure Function (ver `.env.local` →
`NEXT_PUBLIC_FUNCTIONS_BASE_URL`, apunta a producción) solo permite `http://localhost:3000` y
`https://latconservices.com`. Cualquier otro puerto local produce errores de CORS en `/agenda`
que parecen bugs pero son solo el puerto equivocado.

## Navegador real (Playwright, no está en package.json)

No agregar Playwright como dependencia del proyecto. Instalarlo aislado en el scratchpad de la sesión:

```bash
cd <scratchpad>/pw-verify && npm init -y && npm install --no-save playwright
npx playwright install chromium   # el binario suele ya estar cacheado en %LOCALAPPDATA%/ms-playwright
```

Luego correr un script Node ad-hoc con `chromium.launch()` desde ese directorio.

## Gotchas encontrados

- **Banner de cookies es un modal real** (`role="dialog" aria-modal="true"`, overlay que intercepta clicks).
  Bloquea CUALQUIER interacción con la página hasta que se acepta. En cualquier script de prueba,
  aceptar cookies primero (`button.bg-accent` dentro del dialog) antes de interactuar con nada más.
  (Este banner está pendiente de rediseño a no-modal, ver `docs/latcon-v2-decisiones.md` §1.6 — cuando
  eso se implemente, este paso deja de ser necesario.)
- **Espera de navegación**: usar `Promise.all([page.waitForURL(...), locator.click()])`, no
  `click()` seguido de `waitForLoadState("networkidle")` — con fetches que fallan (ej. CORS en
  puerto equivocado) `networkidle` puede no asentar limpio y da falsos negativos.
- **`/agenda` es de producción real** (`NEXT_PUBLIC_FUNCTIONS_BASE_URL` en `.env.local` apunta al
  Function App productivo). Verificar carga de horarios (GET `/api/slots`) es seguro y de solo
  lectura. **Nunca completar el wizard hasta el paso de confirmación** (POST `/api/appointments`)
  en una sesión de verificación — crearía una cita real en la base de datos de producción y
  dispararía correos reales.
- El árbol de rutas usa route groups (`(en)/` + `[locale]/`) con root layouts distintos — cruzar
  entre inglés y el resto de idiomas fuerza un full page reload por diseño de Next.js (no es un bug
  si se ve un reload completo al cambiar de EN a otro idioma).
