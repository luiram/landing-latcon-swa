# 0003 · Componentes que no conocen su contenido

Fecha: 2026-09-27
Estado: aceptada. Las dos propuestas se confirmaron al aprobar el plan del paso 3 (2026-09-28).

## Contexto
Hoy cada sección del home llama a `useLandingContent()` y lee su parte (`content.audience`, `content.process`…). La sección sabe qué contenido muestra, así que no se puede reutilizar en otra página. `Audience`, `About` y `Verticals` son la misma tarjeta construida tres veces. El documento de recomendaciones (§1.4) define un sistema en 3 capas para las 21 páginas.

## Decisión
1. **Tres capas, según §1.4 de docs/recomendaciones-sitio.md**, más el chasis:
   - Chasis: `Header`, `Footer`, `LayoutPagina` (paso 2).
   - Primitivas: `Boton`, `Etiqueta`, `Titulo`, `Texto`, `Enlace`, `Imagen`, `Cita`.
   - Piezas: `Tarjeta` (una sola, con variantes de densidad), `Paso`, `ItemLista`, `CampoFormulario`.
   - Secciones: `Hero`, `GridDeTarjetas`, `TextoConImagen`, `Timeline`, `NavAnclas`, `FranjaPrueba`, `EscaleraContextual`, `BandaCTA`.
   - El paso 3 construye primitivas y piezas antes que las secciones. Se reutilizan y adaptan las que ya existen (`Button`, `Tag`, `Card`, `Container`, `SectionHeader`, `Reveal`).
2. **Las secciones reciben el contenido como props.** Ninguna sección importa `useLandingContent()` ni un archivo de contenido. Es la página la que lee el contenido y se lo pasa.
3. **Los nombres de componente describen estructura, no contenido.** No existen `TarjetaCaso`, `TarjetaDron` ni `TarjetaPersona`: son datos que se le pasan a `Tarjeta`.
4. **Antes de crear un componente, se comprueba que ninguno existente sirva con otra variante.** Si hace falta uno nuevo después del paso 3, se registra en un ADR con la razón.
5. **Variantes `compact` (home) y `full` (interiores)** en toda sección que aparece en ambos contextos: `Hero`, `GridDeTarjetas`, `TextoConImagen`, `Timeline`, `FranjaPrueba` y `BandaCTA`.
   - **Confirmado:** `NavAnclas` y `EscaleraContextual` solo tienen variante `full`, porque nunca aparecen en el home. Dos variantes sin uso son código que nadie mantiene.
6. **Confirmado: una sección sin datos no se renderiza.** Un espacio de caso "reservado" no se muestra como bloque vacío: si la página no le pasa casos a la sección, la sección no aparece. Esto lo resuelve el componente, no un `if` en cada página.

## Alternativas descartadas
- Lista plana de componentes con nombre de contenido (la primera versión del documento): proliferan con cada línea de servicio nueva.
- Diseño atómico completo con cinco niveles: burocracia para un equipo de tres.
- Storybook como catálogo: más pesado de mantener que una página interna para un equipo de tres.

## Consecuencias
- Cuesta más al arrancar; se paga a partir de la tercera o cuarta página.
- Prueba del sistema: el paso 5 (`/sectores/energia-petroleo-gas`) se arma sin crear ningún componente nuevo.
- `Problems.tsx`, `Verticals.tsx` y `VerticalBlockExpandables.tsx` no se usan hoy; se revisan como referencia y se eliminan en el paso 3.

## Cómo quedó · 2026-09-28 (paso 3)

**Carpetas**

| Capa | Carpeta | Componentes |
|---|---|---|
| Primitivas | `src/components/ui/` | `Boton`, `Etiqueta`, `Titulo`, `Texto`, `Enlace`, `Imagen`, `Cita`, `Contenedor` |
| Piezas | `src/components/piezas/` | `Tarjeta`, `Paso`, `ItemLista`, `Encabezado` |
| Secciones | `src/components/sections/` | las 8, más `Seccion` (envoltorio común) y `About` (temporal) |

**Qué significa cada variante**

| Sección | `compact` | `full` |
|---|---|---|
| `Hero` | Titular sobre imagen oscura a todo el ancho | Fondo claro, imagen opcional a la derecha |
| `GridDeTarjetas` | Tarjetas `compacta`, título de sección 28/32 px | Tarjetas `normal`, título 28/36 px, más aire |
| `TextoConImagen` | Título 28/32 px | Título 28/36 px, más aire |
| `Timeline` | Nombres de etapa en una línea, con enlace al detalle | Tarjetas con texto y resultado |
| `FranjaPrueba` | Franja de una fila con borde superior | Tarjetas; la cifra se destaca cuando exista |
| `BandaCTA` | Fondo claro | Banda oscura |

El ritmo vertical sale de los tokens `section-*`: `compact` usa 80/96/112 px y `full` 96/112 px.

**Registrados aquí por la regla 4**
- `Encabezado` (pieza): antetítulo, título y bajada. Reemplaza a `SectionHeader` y a las cuatro copias escritas a mano en las secciones.
- `Seccion` (interno de las secciones): ancla, fondo, borde, ritmo vertical y contenedor. No lo usan las páginas.
- `Contenedor`: es el `Container` de siempre con nombre en español.
- Nombres en español en todo el sistema (`Boton`, `Etiqueta`, `Tarjeta`…), como en los documentos.

**Aplazados**
- `CampoFormulario`: se construye cuando se toque `/agenda`. Hoy el wizard de reservas tiene sus propios campos y nada más lo usaría.
- Variante "campaña con video" del `Hero` (§1.4): se construye con la primera landing de campaña (`/lp/<evento>`).

**Otras decisiones del paso**
- "Qué necesitas antes / Qué viene después" (regla 8) es un `GridDeTarjetas` de 2 columnas, no un componente.
- Los seis escalones ya vivían en `src/config/sitio/mapa.ts` (`ESCALONES`); `EscaleraContextual` los recibe de ahí.
- `About` pasó a recibir props, pero es temporal: sale del home en el paso 4 y sus socios vuelven en `/nosotros` como `GridDeTarjetas`.
- `LatconLogo.tsx`, `Card.tsx` y el hook `useLandingContent` se eliminaron: ya no los usaba nadie.
- Catálogo interno en `/catalogo` (`noindex`, fuera del menú, del footer y del sitemap), con contenido real de `docs/contenido-sitio.md`. Su publicación se decide en el paso 8.
- Las secciones son componentes de servidor; solo `NavAnclas` y `Reveal` corren en el cliente. El JS inicial del home bajó de 189 kB a 160 kB.

## Paso 4 · 2026-09-28
El home se armó sin componentes nuevos. Dos ajustes de piezas existentes:
- `Paso`: el texto es opcional, porque `Timeline` compact muestra solo el nombre de la etapa.
- `Tarjeta`: el enlace va al pie de la tarjeta, así que en una fila los enlaces quedan alineados aunque los textos tengan distinto largo.

`About.tsx` se eliminó. Como el home ya no usa `GridDeTarjetas` con densidad normal, `TextoConImagen` compact ni `Timeline` full, esas variantes pasaron a tener muestra en `/catalogo`.

## Paso 5 · prueba del sistema · 2026-09-28
`/sectores/energia-petroleo-gas` se armó **sin crear ni modificar ningún componente** (`git diff src/components` vacío). Solo hubo contenido (`src/config/sitio/sectores.ts`) y una página.

| Bloque del documento | Cómo se resolvió |
|---|---|
| Titular, bajada, CTA | `Hero` full |
| El dolor y "dónde suele empezar" | `TextoConImagen` full: la frase del cliente como título y el escalón como resultado |
| Escalón de entrada | `EscaleraContextual` con el escalón 2 resaltado (también sirve en páginas de sector) |
| Lo que hacemos, por etapa | `TextoConImagen` full sin imágenes, un bloque por familia con su lista |
| Espacio de caso reservado | `FranjaPrueba` con la lista vacía: no se muestra hasta que haya un caso |
| Método | `Timeline` compact, mismo contenido que el home |
| Por qué nos entienden + CTA | `BandaCTA` full |

**Hallazgos, para resolver al empezar el paso 6** (se ven en las siete páginas que faltan):
1. `LayoutPagina` deja 96 px de fondo claro al final de las páginas interiores. Cuando la última sección es la banda oscura de `BandaCTA` full, queda una franja blanca entre la banda y el footer.
2. `TextoConImagen` sin imagen ocupa todo el ancho de la página: las listas quedan en líneas de más de 150 caracteres. Debería limitarse al ancho de lectura.
3. `TextoConImagen` no tiene enlace por bloque: "Capturar y ver" no lleva a su familia. Las páginas de solución lo van a necesitar para "Qué necesitas antes / Qué viene después" si no se usa `GridDeTarjetas`.

Los tres son variantes o ajustes de componentes existentes, no componentes nuevos.

## Paso 6a · 2026-09-28
Hallazgos del paso 5, resueltos sin componentes nuevos:
1. `LayoutPagina` acepta `aRasDelFooter`: la página termina en su última sección, sin el espacio inferior. Lo usan las páginas que cierran con `BandaCTA`.
2. `TextoConImagen`: un bloque sin imagen se limita al ancho de lectura (`prose-wide`).
3. `TextoConImagen`: cada bloque acepta un `enlace` opcional (en los sectores, cada familia lleva a su primera página; en agroindustria, "Capturar y ver" lleva a drones).
4. `TextoConImagen`: el `texto` del bloque es opcional (lo necesitan páginas de solución que solo tienen lista).

Los cuatro sectores comparten una sola página con ruta dinámica (`src/app/sectores/[sector]/page.tsx`, `generateStaticParams`, `dynamicParams = false`): el sector es dato, no página.

## Paso 6b · 2026-09-28
Sin cambios en componentes. Las seis páginas de escalón comparten una ruta (`src/app/soluciones/[escalon]/page.tsx`) con el esqueleto fijo de docs/contenido-sitio.md §4: Hero · EscaleraContextual · TextoConImagen (dónde estás, qué construimos, lo que cambia) · GridDeTarjetas (antes / después) · FranjaPrueba (vacía) · BandaCTA. Drones (`/soluciones/drones`) es una página aparte porque su estructura es otra (brief). El escalón 6 vive en `/soluciones/agentes-ia`.
