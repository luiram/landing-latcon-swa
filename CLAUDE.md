# CLAUDE.md · Sitio web LATCON

Sitio de LATIN CONSULTING SERVICES SAS en latconservices.com. Se está convirtiendo la landing publicada en un sitio de 21 páginas, en la rama `sitio-web`. La landing publicada está etiquetada como `landing-v1`.

## Documentos que mandan

No son sugerencias: son decisiones tomadas. Si algo parece equivocado, se discute antes de implementarlo; no se cambia por cuenta propia.

- [docs/recomendaciones-sitio.md](docs/recomendaciones-sitio.md) — mapa de 21 páginas, 3 familias, sistema de diseño en 3 capas, qué se publica y qué no
- [docs/contenido-sitio.md](docs/contenido-sitio.md) — el copy de cada página y las 3 reglas de redacción de la escalera
- [docs/brief-drones.md](docs/brief-drones.md) — línea de drones
- [docs/buenas-practicas-desarrollo.md](docs/buenas-practicas-desarrollo.md) — procedimiento de desarrollo LATCON
- [docs/decisiones/](docs/decisiones/) — ADR: por qué se decidió cada cosa
- [MEMORY.md](MEMORY.md) — bitácora de la landing (agenda, correo, Azure, SEO)

## Reglas que no se renegocian

1. Construir en este repositorio, este dominio y este código base. La landing pasa a ser el home; no crear un sitio paralelo.
2. Dejar el home más corto que la landing `landing-v1`: menos de 6.130 px de alto a 1440 px y menos de 992 palabras en `<main>`.
3. No escribir hex, `rgb()`, `rgba()` ni colores de la paleta de Tailwind fuera de `src/app/globals.css`. Usar los tokens. Verificar con `npm run check:tokens`.
4. No crear un componente que conozca su contenido. Pasar el contenido como props. Antes de crear un componente, comprobar que ninguno existente sirva con otra variante.
5. Dar a cada sección variante `compact` (home) y `full` (interiores), salvo las excepciones del ADR 0003.
6. No inventar cifras, porcentajes ni testimonios. Hoy no hay ningún caso publicable.
7. No nombrar clientes. No mencionar AgriCount en ninguna forma.
8. Titular toda página de solución como "de X a Y", nunca con una categoría. Cerrarla con "Qué necesitas antes" y "Qué viene después", cada uno con enlace.

## Cómo se trabaja

Ocho pasos con compuerta. No avanzar al siguiente sin aprobación del anterior. Cada paso aprobado cierra con un commit.

| # | Paso |
|---|---|
| 0 | Inventario del repositorio |
| 1 | Tokens extraídos del CSS actual, `CLAUDE.md` y primeros ADR |
| 2 | Chasis: header con menú de 3 familias, footer legal, layout de página |
| 3 | Las 8 secciones con sus variantes: Hero · GridDeTarjetas · TextoConImagen · Timeline · NavAnclas · FranjaPrueba · EscaleraContextual · BandaCTA |
| 4 | Home ensamblado |
| 5 | `/sectores/energia-petroleo-gas` sin crear ningún componente nuevo (prueba del sistema) |
| 6 | Resto de sectores y páginas de solución |
| 7 | Instrumentación (UTM, analítica), SEO por página, páginas legales |
| 8 | Revisión final y lanzamiento. Después: traducción a EN, PT y FR |

- Entregar un paso por sesión. No adelantar pasos siguientes.
- Presentar el plan antes de escribir código en cambios estructurales.
- Avisar si un pedido contradice los documentos de `docs/`.
- Construir solo en español. Congelar EN, PT y FR hasta después del lanzamiento (ADR 0004).

## Comandos

```bash
npm run dev            # Servidor de desarrollo (http://localhost:3000)
npm run build          # Export estático a out/
npm run build:api      # Compila Azure Functions (api/dist/)
npm run lint           # ESLint
npm run check:tokens   # Valores fuera de tokens (-- --strict para fallar)
npm run preview:out    # Sirve out/ en http://localhost:3000
```

No hay suite de pruebas.

## Arquitectura

- Next.js 15 (App Router) con `output: "export"`, React 19, TypeScript, Tailwind CSS 4 y Framer Motion. Alias `@/*` → `src/*`.
- Hosting: Azure Static Web Apps. `/agenda` llama a Azure Functions (`api/`) con SQL y correo ACS. Ver [docs/azure-swa.md](docs/azure-swa.md).
- Tokens: `src/app/globals.css`. Primitivos en `:root` (`--c-*`), semánticos y escalas en `@theme`. Tailwind 4 no tiene `tailwind.config`.
- Contenido: `src/config/landing/{es,en,pt,fr}.ts` (`es.ts` reexporta `src/config/content.ts`). El idioma vive en `localStorage` (`latcon-locale`) vía `LocaleProvider`; no hay rutas por idioma.
- Componentes: `src/components/{layout,sections,ui,motion,analytics}`. Hoy las secciones leen su contenido con `useLandingContent()`; el paso 3 las convierte en componentes que reciben props.
- Movimiento: `src/components/motion/Reveal.tsx` (aparición al hacer scroll).

## Despliegue

- Publicar el front solo con push a `main` (GitHub Actions). Push a `sitio-web` no publica nada.
- Revisar `sitio-web` con un pull request hacia `main`: crea un entorno de vista previa sin tocar producción. No fusionarlo hasta el paso 8.
- No ejecutar `swa deploy` ni `publish-swa` con un `out/` de otra rama.
- Publicar la API con `scripts/deploy/publish-functions.ps1` después de cambios en `api/`.

## Marca

- Logo: `public/logo/logo_latcon.svg` (web y correos ACS). En la navbar, `h-[46px]` dentro de una barra `h-[48px]`. No reintroducir `logo_1_primary_horizontal*`.
- El naranja del logo (`--c-orange-logo`) no se usa en la interfaz; el acento de interfaz es `--color-accent`.
- No usar WhatsApp como CTA. El único CTA es agendar el diagnóstico (`/agenda`).
