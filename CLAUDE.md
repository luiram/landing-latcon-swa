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

All page text lives in `src/config/landing/{es,en,pt,fr}.ts`. There is **no URL-based routing per locale** — the locale is stored in `localStorage` (`latcon-locale`) and managed via `LocaleProvider` (React Context). Components access content via `useLandingContent()` which returns `{ content, site }` for the active locale.

- `src/config/landing/types.ts` — `LandingContent` and `SiteContent` types (single source of truth for what fields exist)
- `src/config/landing/site.ts` — nav labels, CTA text, brand strings (shared UI chrome across locales)
- `src/lib/locales.ts` — `LocaleCode` type (`"es" | "en" | "pt" | "fr"`) and `LOCALE_CODES` array

To add a new locale: add `LocaleCode`, create the config file, export from `index.ts`, add a flag to `LanguageSelector`.

### Landing sections

`src/app/page.tsx` composes 8 section components from `src/components/sections/`. Each section is a client component that calls `useLandingContent()` directly — no prop drilling. Sections are self-contained and independent.

### Booking wizard (`/agenda`)

`src/features/booking/BookingWizard.tsx` is a 5-step state-machine form:

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

- Background scale: `--color-bg-page`, `--color-bg-warm`, `--color-bg-panel`, `--color-bg-elevated`, `--color-bg-deep`
- Blues: `--color-blue-mid-1`, `--color-blue-mid-2`, `--color-accent-deep`
- Accent orange: `--color-accent` (`#f58220`)
- Text: `--color-text-primary`, `--color-text-muted`
- Border: `--color-border-subtle`

Utility: `src/lib/cn.ts` wraps `clsx` + `tailwind-merge`.

### Motion

`src/components/motion/Reveal.tsx` wraps Framer Motion `motion.div` for scroll-triggered fade-in. Used throughout sections for stagger animations.

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
Emprendimiento nuevo con equipo de 3 personas:
- 1 consultora con +5 años en implementación de estrategia y gestión por resultados
- 2 desarrolladores con +10 años en automatización, ML, visión computacional, geolocalización y sistemas multiagente

## Meta comercial
Generar reuniones comerciales calificadas con pymes, empresas medianas,
agroindustria, logística y operaciones de campo.

## Decisiones de copy ya tomadas
- Hero recomendado (Opción C ajustada):
  Titular: "¿Qué tanto le cuesta a tu empresa operar con información 
  dispersa y procesos que dependen de personas clave?"
  Subtítulo: "Somos el equipo que entiende tu operación antes de proponer 
  cualquier tecnología. Integramos datos, automatizamos procesos y aplicamos 
  inteligencia para que tu organización gane visibilidad, coordinación y 
  capacidad de decisión — a tu ritmo y con implementación por etapas."
- CTA principal: "Agenda tu diagnóstico gratuito" → /agenda
- No usar WhatsApp como CTA (fase 2)
- No usar métricas inventadas (+12 empresas, etc.)

## Cambios a implementar
Ver archivo: LATCON_PROMPT_LANDING.md (prompt completo de 9 cambios)

## Reglas para Claude
- No cambiar estilos visuales, paleta ni tipografías
- Mantener todos los assets .webp en su posición original
- Preguntar el framework antes de modificar cualquier archivo
- Usar /plan antes de ejecutar cambios que toquen más de 2 archivos