# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Notas de contexto, decisiones y estado del proyecto: ver [MEMORY.md](MEMORY.md)

## Commands

```bash
npm run dev          # Dev server with Turbopack (http://localhost:3000)
npm run build        # Static export to out/
npm run build:api    # Compile Azure Functions (api/dist/)
npm run build:all    # Both above
npm run lint         # ESLint
npm run preview:out  # Serve out/ at http://localhost:3000
```

No test suite exists currently.

## Architecture

**Stack**: Next.js 15 (React 19) + TypeScript + Tailwind CSS v4 + Framer Motion. Deployed as static export (`output: "export"`) to Azure Static Web Apps. The `/agenda` route loads a live booking wizard that calls Azure Functions.

### Content & i18n

**Real per-locale routing** (implemented in Phase 3, 2026-07-17): English lives unprefixed at `/` (route group `src/app/(en)/`); Spanish/French/Portuguese live at `/es` `/fr` `/pt` (dynamic segment `src/app/[locale]/`, `generateStaticParams` returns only `["es","fr","pt"]` — never `"en"`, which lives in the other group). Each group has its own root layout (`<html lang>` fixed per group) — Next.js doesn't support a single root layout with dynamic `lang` when the default locale has no path segment. Navigating between `(en)` and `[locale]` triggers a full page reload (documented Next.js behavior for distinct root layouts, not a bug); `/es`↔`/fr`↔`/pt` navigation is a normal client transition (same layout).

Locale reaches every component as an explicit **prop** (`locale: LocaleCode`), not via Context — `LocaleProvider`/`useLocale`/`useLandingContent`/`LocaleDocument` were removed entirely. Most home sections (`Audience`, `Solutions`, `Process`, `About`, `FinalCta`, `Footer`) are now **Server Components** (no longer need `"use client"` just to read content) — only components with real interactivity stay client: `Hero` (slot prefetch), `Navbar`, `LanguageSelector`, `CookieConsentBanner`, `BookingWizard`.

- `src/lib/localePaths.ts` — `stripLocalePrefix`/`withLocalePrefix`/`switchLocalePath`: single source of truth for building locale-prefixed URLs. `LanguageSelector` uses it (via `usePathname()`) to navigate to the *same page* in another language, not always home.
- `src/lib/seo.ts` — `buildBaseMetadata`, `buildAlternates` (hreflang + x-default), `pathFor`, `AGENDA_METADATA`. Used by every page's `generateMetadata` and by `sitemap.ts`.
- `src/components/layout/RootShell.tsx` — shared body of both root layouts (JSON-LD, GA, cookie banner), parameterized by `locale`.
- `src/components/pages/{Home,Agenda,Privacy,Solutions,Terms,BlogIndex,BlogPost}PageBody.tsx` — the actual page, defined once; both `(en)/page.tsx` and `[locale]/page.tsx` call it with their respective `locale`.
- **Fixed slug across all 4 locales** (Phase 3 decision, see `docs/latcon-v2-decisiones.md`): always `/agenda`, always `/privacy`, always `/solutions`, always `/terms`, always `/blog` — never translated (`/es/privacy`, not `/es/privacidad`).
- Per-locale content still lives in `src/config/landing/{es,en,pt,fr}.ts` (`types.ts` defines `LandingContent`/`SiteContent`; `site.ts` has nav labels, CTA text, `bookingPath`/`privacyUrl` already prefixed via `withLocalePrefix`).

To add a new locale: add it to `LocaleCode` (`src/lib/locales.ts`), create the config file, export from `landing/index.ts`, add to the `LOCALES` array, add to `generateStaticParams` in `[locale]/layout.tsx` (unless it's the new default).

### Landing sections

`src/components/pages/HomePageBody.tsx` composes 7 section components from `src/components/sections/`, in order: `Hero → Audience → Solutions → Experience → Process → About → FinalCta`, taking `locale` as a prop. Both `(en)/page.tsx` and `[locale]/page.tsx` render it. Sections are self-contained and independent; most are Server Components now (see Content & i18n above). `Solutions`, `Experience` and `FinalCta` are dark "museum" sections (`bg-bg-deep`); the rest are light.

### Booking wizard (`/agenda`)

`src/features/booking/BookingWizard.tsx` is a 5-step state-machine form. It receives `locale: LocaleCode` as a prop (from `AgendaPageBody`, not from Context) — same for `prefetchSlots(locale)` in `Hero.tsx`, which used to hardcode `locale=es` regardless of the active language (fixed in Phase 3).

1. **Select slot** — calls `fetchSlots()` → GET `/api/slots?locale=…` — returns available 30-min slots for next 5 business days (Tue–Thu only, 8am–4pm Bogotá time)
2. **Contact info** — name, email, phone, company (regex-validated client-side)
3. **Context** — sector dropdown + free-text need (options from `bookingCopy.ts`)
4. **Review** — read-only summary
5. **Confirmation** — calls `createAppointment()` → POST `/api/appointments` with idempotency UUID; shows email delivery status

**Conflict handling**: 409 / `SLOT_TAKEN` response reloads slots and resets to step 1.

Key utilities:
- `bookingCalendarUtils.ts` — `nextBookingDayIsos()` generates the next 5 valid booking days (skips Mon, Fri, weekends)
- `bookingSlotDisplay.ts` — filters slots per day (hides past/booked)
- `bookingApi.ts` — `fetchSlots()` and `createAppointment()` typed calls
- `bookingCopy.ts` — per-locale labels + sector options for the wizard

The API base URL comes from `NEXT_PUBLIC_FUNCTIONS_BASE_URL` (set in `.env.local`).

### Styling

Tailwind v4 — **no `tailwind.config.ts`**. All custom tokens are defined in `src/app/globals.css` inside the `@theme` block:

- Light background scale: `--color-bg-page`, `--color-bg-warm`, `--color-bg-panel`, `--color-bg-elevated`
- **Dark "museum" scale** (real since Phase 4, 2026-07-18): `--color-bg-deep` (`#101012`), `--color-bg-deep-panel` (`#18181b`), `--color-border-deep`. Text on dark: `--color-text-on-dark`/`-muted` (pre-existing, now actually used).
- Blues: `--color-blue-mid-1`, `--color-blue-mid-2`, `--color-accent-deep`
- Accent orange: `--color-accent` (`#f58220`)
- Text (light sections): `--color-text-primary`, `--color-text-muted`
- Border (light sections): `--color-border-subtle`
- `--font-sans` (system-ui, everywhere) vs `--font-heading-deep` (Nunito, **only** on H2s of the 3 dark sections — never on the Hero H1, which is the LCP element; see `src/lib/fonts.ts`)

`Button.tsx` needs `onDark` prop on dark sections (swaps the focus-ring offset color — otherwise keyboard focus looks broken on `bg-bg-deep`). Utility: `src/lib/cn.ts` wraps `clsx` + `tailwind-merge`.

### Motion

`src/components/motion/Reveal.tsx` wraps Framer Motion `motion.div` for scroll-triggered fade-in — still the base primitive for every section. Since Phase 4 (Home v2), also:
- `src/components/motion/ParticleField.tsx` + `ParticleCanvas.tsx` — canvas 2D particle system (poster SVG first paint/reduced-motion fallback, `next/dynamic({ssr:false})` for the heavy engine, particles in refs not state). `density`/`interactive` props; used in `Hero` (1, interactive) and `FinalCta` (0.3, ambient only).
- `src/components/sections/HeroChipRotator.tsx` — rotating word in the hero eyebrow chip; `chipWords: {lead, emphasis}[]` per locale (the connector word varies by grammatical gender in Portuguese, so it lives in content, not the component).
- `src/components/sections/MethodConnector.tsx` (`MethodStepsScroller`) — scroll-linked line behind Método's steps; wraps `children` and owns its own ref so `Process.tsx` stays a Server Component.
- `src/components/graphics/{Plan,Execute,Adapt}Graphic.tsx` + `SolutionGraphic.tsx` dispatcher — per-pillar SVG/CSS animations for the stacked Solutions cards, paused via `src/lib/useInViewport.ts` when off-screen.
- Solutions stacked cards: CSS-first (`position: sticky` + `@supports (animation-timeline: view())`, see `.solution-*` classes in `globals.css`) — Firefox and Safari <26 degrade to plain sticky (no scale/brightness), by design (see `docs/latcon-v2-decisiones.md` §1.15).

### Path alias

`@/*` maps to `src/*` (configured in `tsconfig.json`).

## Production

- **Site**: https://latconservices.com
- **Booking**: https://latconservices.com/agenda
- Azure Functions API runs separately; see `docs/azure-swa.md`
- CI/CD via GitHub Actions → Azure Static Web Apps; see `docs/github-ci.md`

# CLAUDE.md — Latcon Landing Page

## Contexto del proyecto
Landing page de Latcon Services (latconservices.com).
Emprendimiento nuevo con equipo de 3 personas (según `docs/latcon-plan-maestro-sitio-v2.md`):
- **Luis Ramírez** — ingeniería industrial, operación, datos, arquitectura
- **César Ramírez** — estrategia, gestión por resultados, equipos de alto rendimiento
- **John Ramírez** — desarrollo, IA, cloud — implementador del sitio

## Meta comercial
Generar reuniones comerciales calificadas con directores/gerentes de empresas medianas (50–300 empleados) con operación compleja: pymes, agroindustria, logística, oil & gas y operaciones de campo. El copy debe entenderlo un vicepresidente sin perfil técnico — valor, no detalle técnico.

## Estado del sitio: v2 completo (Fases 1-6) — solo falta QA/lanzamiento (Fase 7)

Fuente completa de decisiones: `docs/latcon-plan-maestro-sitio-v2.md`, `docs/latcon-spec-diseno-interactivo.md` y `docs/latcon-v2-decisiones.md` (registro de todo lo decidido en conversación con Claude Code — **es la fuente de verdad más reciente**, por encima de los 2 docs anteriores si hay contradicción). **No asumir que una pieza de v2 ya está implementada solo porque los docs la mencionan** — auditar el código primero; este archivo puede haber quedado desactualizado si hubo trabajo posterior no reflejado aquí.

**Posicionamiento:** cerrar la brecha entre lo planeado y lo ejecutado — *"Plans are perfect — until the operation starts."* LATCON construye AI, optimización y software que cierran esa brecha, con la disciplina de estrategia y gestión por resultados (César) integrada a cada desarrollo, no como track separado.

**Reglas de copy v2 (innegociables):**
- Cero métricas fabricadas — todo debe poder sustentarse honestamente.
- Nunca posicionar a LATCON como "agencia de desarrollo" — es una consultora que también construye.
- Tono consultivo, directo, sin jerga técnica innecesaria.
- "Keep it simple": algunas soluciones no llevan IA y eso es una virtud, no una carencia.
- Copy nuevo se redacta primero en inglés (idioma por defecto de v2), se traduce después — no calco literal.

### Fase 3 — i18n (implementada 2026-07-17)
Inglés por defecto en `/`, `/es` `/fr` `/pt` como subrutas — ver "Content & i18n" arriba para el detalle técnico (route groups, `generateStaticParams`, slug fijo). El diagnóstico gratuito de `/agenda` **sí se atiende en portugués** (decisión revertida respecto al plan original: mismo `BookingWizard`, sin formulario de contacto separado).

### Fase 4 — Home v2: copy + diseño interactivo (implementada y verificada 2026-07-18)
Las 7 secciones de la home (`Hero → Audience → Solutions → Experience → Process → About → FinalCta`) ya tienen el copy v2 en los 4 idiomas **y** la capa de interacción del spec:
- Hero: rotador de palabras en el chip (`HeroChipRotator`), partículas canvas de fondo.
- Solutions: tarjetas apiladas scroll-driven + gráfico SVG animado por pilar (plan/execute/adapt) — el contenido se adelgazó a `{eyebrow, title, intro, cards: {kind, title, summary}[]}`, el detalle rico (`includes`/`result`/`capabilities`) vive en `/solutions` (Fase 5, implementada — ver abajo); cada tarjeta enlaza a su ancla (`/solutions#plan|execute|adapt`).
- Experience: sección nueva, 3 casos anónimos por industria (Agriculture/Oil & Gas/Transportation), un pilar distinto cada uno, bloques apilados (no carousel — decisión tomada, ver `docs/latcon-v2-decisiones.md` §1.15).
- Método: bug de doble-render corregido (un solo `<ol>`, responsive por ítem — antes dos árboles completos DOM), línea conectora animada, nota de César (`process.strategyNote`).
- CTA final: fondo oscuro, partículas al 30% sin mouse-tracking.
- Efecto "museo": `Solutions`/`Experience`/`FinalCta` oscuras, alternando con las secciones claras — ver tokens en "Styling" arriba.

Verificado end-to-end en Chromium (Playwright): 0 errores de consola, Método renderiza 4 pasos (no 8), `prefers-reduced-motion` desactiva partículas y congela el rotador, revisión visual de capturas (se corrigió en el momento que las partículas del Hero eran demasiado prominentes en reposo). **No se corrió Lighthouse formal todavía** — pendiente antes de dar la fase por cerrada para producción. Ver `.claude/skills/verify/SKILL.md` para la receta de verificación de este proyecto (incluye el gotcha de CORS: usar siempre puerto 3000 para probar `/agenda`).

### Fase 5 — `/solutions` y `/terms` (implementada y verificada 2026-07-18)
Ambas páginas construidas sobre el molde de `/privacy` (mismo patrón de `page.tsx` × 2 route groups, content-file propio con getter, `PageBody` Server Component). Detalle en `docs/latcon-v2-decisiones.md` §1.16:
- `/solutions`: página de fondo claro con los 3 pilares en tarjetas oscuras tipo "museo" (reutiliza `.solution-card-surface`, sin el `position:sticky` del teaser de home), cada una con `SolutionGraphic` + bullets de "qué incluye"/"resultado"/"capacidades" (`SolutionsPageContent` en `types.ts`). Anclas `id="plan"|"execute"|"adapt"` — destino de los links del teaser de home.
- `/terms`: clon directo de `/privacy` (`TermsContent`, mismo shape que `PrivacyContent` a propósito duplicado, no generalizado). **Las 4 traducciones (incl. la EN original) son borrador pendiente de revisión legal antes de publicar** — construir la página no esperó esa revisión.
- Navbar "Solutions" ahora navega a la página (`<Link>`, ya no ancla `#solutions` de home — ese teaser sigue existiendo sin cambios). Footer suma link a Terms.

### Fase 6 — Blog (implementado y verificado 2026-07-18, solo inglés)
Arquitectura en `src/config/blog/` (`types.ts`, `en.ts` con los 3 posts reales, `es.ts`/`fr.ts`/`pt.ts` vacíos, `index.ts` con los getters) — contenido como datos TS tipados (`BlogBlock = paragraph|heading|list`), no MDX; ver razonamiento y detalle completo en `docs/latcon-v2-decisiones.md` §1.17.
- `/blog` (índice) + `/blog/[slug]` (3 posts) existen y funcionan en inglés. `/es`, `/fr`, `/pt` de `/blog` existen pero muestran un estado "próximamente" honesto — **decisión explícita de lanzar solo en EN primero**, no un olvido; la arquitectura ya soporta traducciones sin cambios de código.
- **Gotcha real de Next `output:"export"`**: no se puede tener `src/app/[locale]/blog/[slug]/page.tsx` mientras `generateStaticParams` devuelva `[]` para los 3 locales a la vez — Next lo rechaza con un mensaje engañoso ("missing generateStaticParams()") aunque la función exista. Por eso ese archivo **no existe todavía** — se recrea (clonando el patrón de `[locale]/solutions/page.tsx`) en cuanto haya al menos un post traducido. El índice `[locale]/blog/page.tsx` no tiene este problema y ya existe.
- Nav "Blog" agregado en los 4 idiomas, al final de `site.nav` — reutiliza el render condicional `<Link>`/`<a>` de `Navbar.tsx` ya generalizado en Fase 5, sin tocar ese componente.
- Tiempo de lectura calculado en runtime desde conteo de palabras (`src/lib/readingTime.ts`), no es un campo de contenido.
- Sin teaser de blog en home (el plan maestro lo marca opcional).

### Fase 7 — pendiente
QA y lanzamiento: Lighthouse mobile ≥90, CLS <0.1, revisión en dispositivos reales, revisión de los 4 idiomas.

**Reglas duras de animación** (de `docs/latcon-spec-diseno-interactivo.md`, aplicadas en Fases 4-5, siguen vigentes para Fase 7):
- `prefers-reduced-motion: reduce` desactiva todo movimiento; fallback estático obligatorio en cada componente animado.
- Presupuesto total de JS de animación ≤ 40 KB gzip (partículas solas ≤ 15 KB gzip), carga diferida.
- Máximo una animación protagonista por viewport; el resto son micro-transiciones de 150–300 ms.
- Animaciones solo con `transform`/`opacity` (composited); canvas/WebGL pausado fuera de viewport (`IntersectionObserver`).
- Ningún asset, ícono, código o copy tomado de tryolabs.com — solo patrones de interacción, con expresión propia.
- Lighthouse mobile ≥ 90 y CLS < 0.1 son criterio de aceptación — **todavía sin correr formalmente sobre el sitio (Fase 7)**.

## Deuda técnica / gotchas conocidos
- El banner de cookies (`CookieConsentBanner.tsx`) es un **modal real** que bloquea toda interacción con la página hasta aceptar — confirmado al verificar la Fase 3 en navegador. Rediseño a no-modal ya especificado en `docs/latcon-v2-decisiones.md` §1.6, no implementado todavía.
- `staticwebapp.config.json` vive en `public/` (no en la raíz del repo) — así es como llega a `out/` en el build. No volver a crearlo en la raíz.
- Cruzar entre el grupo de rutas `(en)` y `[locale]` (p. ej. cambiar de inglés a español) fuerza un full page reload — comportamiento esperado de Next.js con root layouts distintos, no un bug a corregir.
- `Problems.tsx`, `Verticals.tsx` y el `src/config/site.ts` huérfano fueron eliminados en la Fase 2 (ver `docs/latcon-v2-decisiones.md` §1.9) — si aparecen mencionados en docs viejos, ya no existen.
- La opacidad de `ParticleCanvas.tsx`/`ParticleField.tsx` se ajustó a ojo tras revisión visual (Fase 4) para que se lean como textura ambiental, no confeti — valores actuales: fill `rgba(245,130,32,0.28)` r=1, líneas de proximidad `×0.03`, líneas de influencia del puntero `×0.45`. Puede necesitar otra pasada en dispositivo real (los valores solo se validaron en Chromium/desktop vía Playwright).
- Layout de las tarjetas apiladas de `Solutions.tsx` en mobile tiene espacio vertical de más alrededor del gráfico SVG — pulido pendiente, necesita revisión en dispositivo real antes de tocarlo a ciegas.
- `src/components/*/LatconLogo.tsx` (declara `next/font/google` pero no se usa en ningún lado) sigue huérfano — puede borrarse cuando se confirme que nada lo referencia. (`public/solutions/*.webp` ya se eliminó en Fase 5 — dejó de aplicar esta nota.)
- `/terms` (los 4 idiomas, incluido el EN original) es borrador de contenido legal **pendiente de revisión de un abogado antes de publicar en producción** — ver `docs/latcon-v2-decisiones.md` §1.5/§1.16.
- Los 3 posts del blog solo existen en inglés (decisión explícita, ver Fase 6 arriba) — `src/app/[locale]/blog/[slug]/page.tsx` **no existe** a propósito (Next `output:"export"` rechaza esa ruta mientras devuelva 0 páginas en los 3 locales a la vez); recrearla es el primer paso al agregar la primera traducción — ver `docs/latcon-v2-decisiones.md` §1.17.
- Lighthouse mobile formal (≥90, CLS<0.1) no se ha corrido sobre el sitio — solo hubo verificación funcional (Playwright) y revisión visual manual en cada fase. Es la Fase 7 del plan maestro; no dar el sitio por cerrado para producción sin correrlo.

## Reglas para Claude
- Mantener todos los assets .webp en su posición original.
- El refresh visual v2 está aprobado (ver arriba) — ya no aplica "no cambiar paleta ni tipografías" a secas; sí aplica pedir aprobación de Luis para cualquier decisión de diseño no cubierta explícitamente por los docs de v2.
- Usar /plan antes de ejecutar cambios que toquen más de 2 archivos.
- Antes de dar por hecho que una pieza de v2 ya existe, auditar el código — `docs/latcon-v2-decisiones.md` documenta el estado real al 2026-07-18, pero puede haber avanzado desde entonces.