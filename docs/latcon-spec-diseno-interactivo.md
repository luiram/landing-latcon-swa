# LATCON — Especificación de diseño interactivo

**Para:** John (desarrollo) · **De:** Luis · **Fecha:** 2026-07-17
**Referencia de patrón:** tryolabs.com (adoptamos técnicas de interacción, nunca sus assets, código, paleta ni copy)

---

## 0. Principios de diseño

1. **Movimiento con propósito.** Cada animación comunica algo del negocio (datos que se conectan, procesos que fluyen). Nada decorativo porque sí.
2. **Efecto museo.** Secciones oscuras = contemplación de un solo elemento con mucho espacio negativo (soluciones, testimonios, CTA final). Secciones claras = lectura y escaneo (para quién, método, equipo). Alternar con transición suave.
3. **Sobriedad.** Máximo una animación protagonista por viewport. El resto son micro-transiciones (150–300 ms).
4. **Accesibilidad primero.** Todo movimiento se desactiva con `prefers-reduced-motion: reduce`. Fallback estático obligatorio en cada componente.
5. **Performance.** Animaciones solo con `transform` y `opacity` (composited). Canvas/WebGL pausado cuando la sección sale del viewport (`IntersectionObserver`). Lighthouse mobile ≥ 90 es criterio de aceptación.

---

## 1. Hero — Sistema de partículas + rotador de frases

### 1.1 Partículas (concepto: "datos dispersos que se conectan")

- **Qué:** campo de puntos (300–600 en desktop, 100–150 en mobile) dispersos que derivan lentamente. Cerca del cursor, los puntos se atraen entre sí y dibujan líneas de conexión que se desvanecen al alejarse. Metáfora directa: LATCON conecta datos dispersos.
- **Técnica:** Canvas 2D es suficiente (no necesitamos esfera 3D como Tryolabs; nuestra metáfora es red, no globo). Si se quiere profundidad, Three.js con `THREE.Points`.
- **Comportamiento del mouse:** radio de influencia ~120 px; dentro del radio, opacidad de líneas 0→0.6 y leve atracción. En touch: mismo efecto en el punto de tap, o modo autónomo (conexiones aleatorias intermitentes).
- **Fallback:** imagen estática SVG de la red (también sirve como poster para reduced-motion y para el primer paint antes de cargar el script).
- **Presupuesto:** script ≤ 15 KB gzip, carga diferida (`defer`), no bloquea LCP.

### 1.2 Rotador de frases

- **Qué:** el titular fija la pregunta y una palabra/frase rota. Cada frase entra con un color de acento distinto de la paleta LATCON.
- **Copy propuesto (validar con Luis antes de implementar):**
  - "¿Tu empresa ya tiene los datos pero todavía **decide tarde**?"
  - "…**trabaja en silos**?"
  - "…**consolida a mano**?"
  - "…**detecta los problemas cuando ya costaron**?"
- **Timing:** 3.5 s por frase; transición salida/entrada 400 ms (slide-up + fade, `transform: translateY` + `opacity`).
- **Técnica:** CSS + ~20 líneas de JS, o el componente de animación del framework del sitio. No usar librería dedicada.
- **Accesibilidad:** el texto completo de todas las variantes en el DOM (visually-hidden) para lectores de pantalla; `aria-live="off"` en el rotador. Con reduced-motion: mostrar solo la primera frase, fija.

---

## 2. Header — CTA persistente

- Header sticky con fondo transparente sobre el hero; al hacer scroll ~80 px, gana fondo (claro u oscuro según sección visible) + sombra sutil. Transición 250 ms.
- Botón **"Agenda tu diagnóstico"** siempre visible a la derecha, estilo pill, color de acento. En mobile: dentro del menú hamburguesa + botón flotante opcional en la parte inferior a partir del 50 % de scroll.
- El link activo del menú se resalta según la sección en viewport (`IntersectionObserver` + scroll-spy).

---

## 3. Soluciones — Tarjetas apiladas con gráfico animado

### 3.1 Stacked cards (scroll-driven)

- **Qué:** las 3 tarjetas de solución se apilan al hacer scroll: la tarjeta activa ocupa el viewport, la siguiente asoma por debajo (~60 px visibles) y al avanzar se desliza encima, escalando ligeramente la anterior (scale 1 → 0.95) y bajando su brillo.
- **Técnica preferida:** CSS puro — `position: sticky; top: X` en cada tarjeta dentro de un contenedor alto, + CSS Scroll-Driven Animations (`animation-timeline: view()`) para el scale/brightness. Fallback para navegadores sin soporte: las tarjetas simplemente hacen sticky sin scale (degradación elegante, sin JS extra). GSAP ScrollTrigger solo si el resultado CSS no convence.
- **Sección oscura** (efecto museo): fondo casi negro de la marca, tarjetas como elemento iluminado.
- **Mobile:** mismo patrón funciona con sticky; verificar altura de tarjeta ≤ 85vh para que siempre asome la siguiente.

### 3.2 Gráfico abstracto animado por solución

Cada tarjeta lleva un gráfico SVG propio, en loop lento (8–12 s), diseñado en casa (reemplaza las fotos webp actuales o convive con ellas):

| Solución | Metáfora visual | Animación |
|---|---|---|
| 01 Visibilidad | Nodos dispersos → convergen a un panel/señal | Pulsos viajando por las líneas hacia un punto central |
| 02 Ejecución sin fricción | Flujo de bloques pasando por compuertas | Bloques avanzando; una compuerta manual se convierte en automática |
| 03 Decisiones con inteligencia | Curva de serie temporal + proyección punteada | La proyección se dibuja (`stroke-dashoffset`) y un punto de alerta parpadea antes del pico |

- **Técnica:** SVG + CSS animations (`stroke-dashoffset`, `transform`). Sin canvas aquí. Pausar con `IntersectionObserver` fuera de viewport.
- **Hover:** acelerar sutilmente la animación o iluminar los nodos (feedback, no fuegos artificiales).

---

## 4. Método — Pasos con revelado por scroll

- Los 4 pasos se revelan secuencialmente al entrar en viewport: fade + translateY(20px), stagger de 120 ms entre pasos.
- Línea conectora vertical/horizontal entre pasos que se "dibuja" con el scroll (`stroke-dashoffset` ligado a scroll timeline).
- Sección clara (lectura). Corregir de paso el bug actual de la landing: los pasos aparecen duplicados/desordenados (02-03-04 y luego 01-04).

## 5. Nosotros / Equipo

- Sección clara. Tarjetas con foto real (pendiente sesión de fotos), hover: elevación sutil (translateY(-4px) + sombra) y la foto pasa de duotono de marca a color.
- Chips de capacidades (Operación, Datos, IA…) con stagger de entrada.

## 6. CTA final — Cierre conversacional

- Sección oscura, efecto museo: solo el titular, una línea de apoyo y el botón. Reutilizar aquí una versión mínima del campo de partículas del hero (mismo componente, densidad reducida ~30 %) para cerrar el círculo visual.
- Botón con micro-interacción al hover: leve expansión (scale 1.03) + flecha que se desplaza.

---

## 7. Stack técnico sugerido

- **Base:** lo que ya use el sitio (Astro/Next/etc.). No introducir framework nuevo por las animaciones.
- **Scroll animations:** CSS Scroll-Driven Animations primero; GSAP + ScrollTrigger como plan B (licencia gratuita cubre este uso).
- **Partículas:** canvas 2D vanilla (~150 líneas propias). Evitar copiar pens/snippets con licencia dudosa; escribir el nuestro o partir de código MIT verificado.
- **Presupuesto total JS de animación:** ≤ 40 KB gzip.

## 8. Criterios de aceptación

1. Lighthouse mobile: Performance ≥ 90, CLS < 0.1, sin degradar LCP actual.
2. `prefers-reduced-motion`: cero movimiento, todo el contenido visible y legible.
3. Todo funcional en Chrome, Safari, Firefox y en mobile real (no solo devtools).
4. Ninguna animación bloquea la lectura ni requiere interacción para ver contenido.
5. Sin assets (íconos, ilustraciones, código, textos) tomados de tryolabs.com — solo patrones de interacción, con expresión 100 % propia.

## 9. Orden de implementación sugerido

1. Header sticky + CTA persistente (rápido, alto impacto)
2. Rotador de frases del hero
3. Alternancia claro/oscuro entre secciones + revelados por scroll del método
4. Tarjetas apiladas de soluciones
5. Gráficos SVG animados (requiere diseño previo)
6. Partículas del hero (lo más costoso; el hero funciona sin ellas mientras tanto)
