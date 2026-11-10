# CLAUDE.md · Sitio web LATCON

Sitio de LATIN CONSULTING SERVICES SAS en latconservices.com. Se está convirtiendo la landing publicada en un sitio de 21 páginas, en la rama `sitio-web`. La landing publicada está etiquetada como `landing-v1`.

## Documentos que mandan

No son sugerencias: son decisiones tomadas. Si algo parece equivocado, se discute antes de implementarlo; no se cambia por cuenta propia.

- [docs/recomendaciones-sitio.md](docs/recomendaciones-sitio.md) — mapa de 21 páginas, 3 familias, sistema de diseño en 3 capas, qué se publica y qué no
- [docs/contenido-sitio.md](docs/contenido-sitio.md) — el copy de cada página y las 3 reglas de redacción de la escalera
- [docs/brief-drones.md](docs/brief-drones.md) — línea de drones
- [docs/buenas-practicas-desarrollo.md](docs/buenas-practicas-desarrollo.md) — procedimiento de desarrollo LATCON
- [docs/decisiones/](docs/decisiones/) — ADR: por qué se decidió cada cosa
- [docs/utm.md](docs/utm.md) — convención de UTM y eventos de GA4: todo enlace o QR externo la sigue
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
- Al cerrar cada paso, actualizar "Estado actual" en el mismo commit.

## Estado actual

Actualizado: 2026-11-10 · Rama `sitio-web` (también en GitHub, sin PR) · En curso: **paso 8a**

| Paso | Estado | Commit |
|---|---|---|
| 0 · Inventario | Aprobado | — (informe, sin cambios) |
| 1 · Tokens, `CLAUDE.md`, ADR | Aprobado | `6d8975e` |
| 2 · Chasis | Aprobado | `7ae5649` |
| 3 · Las 8 secciones | Aprobado. Home rearmado con las secciones, mismo contenido; catálogo en `/catalogo` | `169bf4f` |
| 4 · Home ensamblado | Aprobado. Secuencia de §1.5, contenido en `src/config/sitio/inicio.ts`; sale `About` | `f720cf5` |
| 5 · `/sectores/energia-petroleo-gas` | Aprobado. Armada sin crear ni modificar componentes; contenido en `src/config/sitio/sectores.ts`. Tres hallazgos en el ADR 0003 | `c650421` |
| 6a · Hallazgos del paso 5 y sectores | Aprobado. Los 4 sectores con una sola ruta (`/sectores/[sector]`) y `/sectores` | `d6104fe` |
| 6b · `/soluciones` y sus 7 páginas | Aprobado. Seis escalones con una sola ruta (`/soluciones/[escalon]`), drones y overview; contenido en `src/config/sitio/soluciones.ts` | `4490d6f` |
| 6c · `/metodo`, `/nosotros`, `/desarrollo-a-la-medida` | Aprobado. Contenido en `src/config/sitio/empresa-paginas.ts`; `/desarrollo-a-la-medida` solo texto hasta tener capturas propias | `ab1df69` |
| 7a · Legal | Aprobado. `/tratamiento-de-datos` y `/privacidad` con contenido en `src/config/sitio/legal.ts`; casilla de autorización en `/agenda`; migración `db/migrations/002_autorizacion_y_origen.sql` y la API guarda la autorización | `4112b59` |
| 7b · Instrumentación | Aprobado. Origen de la visita (UTM, página de entrada, referente) en `sessionStorage` y en la reserva; eventos de GA4 (`cta_click`, `scroll_depth`, embudo de `/agenda`); convención en `docs/utm.md` | `b8a68dc` |
| 7c · SEO por página | Aprobado. `sitemap.xml` sale de `PAGINAS` (menos `PAGINAS_SIN_PUBLICAR`); imagen OG y tarjeta de X en todas las páginas; JSON-LD `Organization` con datos legales y `BreadcrumbList` en interiores; títulos con el nombre de la página y el término de búsqueda | `a2eb0c2` |
| 8a · Revisión final (local) | **En curso.** Hecho: página 404, `staticwebapp.config.json` en `public/`, idioma; auditoría de las 20 páginas; textos legales propios, Consent Mode básico, acento `#c2410c` (WCAG AA), drones sin pulverización, casilla opcional de comunicaciones comerciales; sin obligación de RNBD (ADR 0007). Falta: hallazgos importantes de la auditoría (títulos SEO, testimonios aparentes, escalón 1 sin enlace, `/soluciones` desbalanceada, método de drones, `/agenda`), decisiones abiertas y `docs/lanzamiento.md` | `21d229b` y siguientes |
| 8b · Lanzamiento | Pendiente. Cada acción que publica se autoriza por separado | — |

**Decisiones abiertas**

| Decisión | Dónde | Se cierra en |
|---|---|---|
| Publicar o no `/catalogo` (hoy `noindex` y sin enlaces) | ADR 0003 | Paso 8 |
| Publicar avicultura (construida en 6a; sin captura propia del sector) | docs/contenido-sitio.md §9 | Paso 8 |
| Nombrar los modelos DJI en `/soluciones/drones` (verificar posición frente al fabricante) | docs/recomendaciones-sitio.md §1.6b | Antes de publicar |
| Alinear la paleta de la web con la de las propuestas (`#152033`, `#16A34A`) | ADR 0002 | Decisión de marca, sin paso |
| Subir la etiqueta `landing-v1` a GitHub (`sitio-web` ya está, 2026-11-10) | ADR 0005 | Cuando se pida |
| Publicar la migración `002` y la API en Azure (en ese orden, antes del front) | ADR 0006 | Paso 8 |
| Volver obligatoria la autorización en la API cuando salga el formulario sin casilla | ADR 0006 | Después del lanzamiento |
| En GA4: subir la retención a 14 meses, registrar las dimensiones personalizadas y marcar `generate_lead` como evento clave | docs/utm.md | Paso 8 |

**Decidido en el paso 6:** escalón 6 en `/soluciones/agentes-ia`; `/recursos` queda fuera del sitio hasta definir su cadencia; `/lp/drones` se aplaza hasta tener video.

**Conocido y aceptado:** no quedan enlaces internos rotos. Pendiente de material, no de código: capturas propias (sectores y `/desarrollo-a-la-medida`), fotos de drones y las etiquetas de `/nosotros` (hoy fuera). El error de lint en `src/app/global-error.tsx` ya estaba en `landing-v1`. `check:tokens -- --strict` pasa (0) y la paleta de Tailwind está desactivada: mantenerlo así. El home mide 4.086 px a 1440 (medido en el paso 8a) (landing: 5.879; límite: 6.130) y tiene 451 palabras en `<main>` (landing y límite: 992). El enlace secundario del hero va a `/soluciones` hasta que exista el autodiagnóstico (§8 de contenido).

## Comandos

```bash
npm run dev            # Servidor de desarrollo (http://localhost:3000)
npm run build          # Export estático a out/
npm run build:api      # Compila Azure Functions (api/dist/)
npm run lint           # ESLint
npm run check:tokens   # Valores fuera de tokens (-- --strict para fallar)
npm run preview:out    # Sirve out/ en http://localhost:3000
```

No hay suite de pruebas. La verificación visual contra `landing-v1` (capturas, comparación píxel a píxel y pruebas del chasis) está en [scripts/verificacion/](scripts/verificacion/README.md).

## Arquitectura

- Next.js 15 (App Router) con `output: "export"`, React 19, TypeScript, Tailwind CSS 4 y Framer Motion. Alias `@/*` → `src/*`.
- Hosting: Azure Static Web Apps. `/agenda` llama a Azure Functions (`api/`) con SQL y correo ACS. Ver [docs/azure-swa.md](docs/azure-swa.md).
- Tokens: `src/app/globals.css`. Primitivos en `:root` (`--c-*`), semánticos y escalas en `@theme`. Tailwind 4 no tiene `tailwind.config`. Toda escala nueva en `@theme` se registra también en `src/lib/cn.ts` (tailwind-merge).
- Chasis: toda página se envuelve en `LayoutPagina` (`src/components/layout/`) y exporta sus metadatos con `metadatosPagina()` (`src/lib/metadatos.ts`). Una página nueva se registra en `PAGINAS` de `mapa.ts` y así entra sola al breadcrumb, a su JSON-LD y a `sitemap.xml`. El título de metadatos empieza por el nombre de la página y sigue con lo que se busca ("Anticipar: modelos predictivos y visión artificial"). Rutas, menú, footer y breadcrumb salen de `src/config/sitio/mapa.ts`; datos legales de `src/config/sitio/empresa.ts`.
- Contenido: `src/config/sitio/` (el home en `inicio.ts`, solo español). `src/config/landing/{es,en,pt,fr}.ts` guarda la landing anterior y sus traducciones; hoy solo la lee `/catalogo`, y queda como referencia para la traducción. Cada página importa su contenido y se lo pasa a las secciones como props. El idioma está fijo en español durante la construcción (`IDIOMA_FIJO` en `LocaleProvider`, ADR 0004); no hay rutas por idioma.
- Componentes (ADR 0003): primitivas en `src/components/ui/`, piezas en `src/components/piezas/`, secciones en `src/components/sections/`, además de `layout`, `motion` y `analytics`. Ninguna sección conoce su contenido. Antes de crear un componente, revisar `/catalogo` (`npm run dev` → http://localhost:3000/catalogo).
- Secciones: `variante="compact"` en el home y `"full"` en interiores. Con la lista vacía no se renderizan. Son componentes de servidor; solo `NavAnclas` y `Reveal` corren en el cliente.
- Movimiento: `src/components/motion/Reveal.tsx` (aparición al hacer scroll).

## Despliegue

- Publicar el front solo con push a `main` (GitHub Actions). Push a `sitio-web` no publica nada.
- Revisar `sitio-web` con un pull request hacia `main`: crea un entorno de vista previa sin tocar producción. No fusionarlo hasta el paso 8.
- No ejecutar `swa deploy` ni `publish-swa` con un `out/` de otra rama.
- Publicar la API con `scripts/deploy/publish-functions.ps1` después de cambios en `api/`.
- La configuración de Azure (404, cabeceras) está en `public/staticwebapp.config.json`: el despliegue sube solo `out/`, así que un archivo en la raíz del repo no llega. Sin `navigationFallback`: el sitio es multipágina y un fallback convertiría cada 404 en el home con estado 200.

## Marca

- Logo: `public/logo/logo_latcon.svg` (web y correos ACS). En la navbar, `h-[46px]` dentro de una barra `h-[48px]`. No reintroducir `logo_1_primary_horizontal*`.
- El naranja del logo (`--c-orange-logo`) no se usa en la interfaz; el acento de interfaz es `--color-accent` (`#c2410c`, AA con blanco). No usar el acento con opacidad en texto.
- No usar WhatsApp como CTA. El único CTA es agendar el diagnóstico (`/agenda`).
