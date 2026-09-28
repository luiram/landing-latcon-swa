# 0003 · Componentes que no conocen su contenido

Fecha: 2026-09-27
Estado: aceptada. Los puntos marcados como *propuesta* se confirman al aprobar el paso 3.

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
   - *Propuesta:* `NavAnclas` y `EscaleraContextual` solo tienen variante `full`, porque nunca aparecen en el home. Dos variantes sin uso son código que nadie mantiene.
6. *Propuesta:* **una sección sin datos no se renderiza.** Un espacio de caso "reservado" no se muestra como bloque vacío: si la página no le pasa casos a la sección, la sección no aparece. Esto lo resuelve el componente, no un `if` en cada página.

## Alternativas descartadas
- Lista plana de componentes con nombre de contenido (la primera versión del documento): proliferan con cada línea de servicio nueva.
- Diseño atómico completo con cinco niveles: burocracia para un equipo de tres.

## Consecuencias
- Cuesta más al arrancar; se paga a partir de la tercera o cuarta página.
- Prueba del sistema: el paso 5 (`/sectores/energia-petroleo-gas`) se arma sin crear ningún componente nuevo.
- `Problems.tsx`, `Verticals.tsx` y `VerticalBlockExpandables.tsx` no se usan hoy; se revisan como referencia y se eliminan en el paso 3.
