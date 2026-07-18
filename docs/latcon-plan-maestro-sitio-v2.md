# LATCON — Plan Maestro Sitio Web v2

**Handoff para Claude Code (VSCode, repo GitHub + Azure)**
Fecha: 2026-07-17 · Aprobado por: Luis Ramírez · Estado: para afinar en el repo

> **Instrucción inicial para Claude Code:** antes de ejecutar cualquier fase, auditar el repo existente: framework, sistema de estilos, estructura de componentes, soporte i18n actual y pipeline de deploy (GitHub Actions → Azure). Reportar hallazgos y ajustar este plan a lo que ya existe. El sitio actual en producción es https://latconservices.com (landing de una página con anchors: Para quién, Soluciones, Método, Nosotros + /agenda + /privacidad).

---

## 1. Contexto y objetivo

LATCON Services: consultora de inteligencia de datos y operaciones. Equipo: Luis Ramírez (ingeniería industrial, operación, datos, arquitectura), César Ramírez (estrategia, gestión por resultados, equipos de alto rendimiento), John Ramírez (desarrollo, IA, cloud — implementador del sitio).

**Objetivo:** evolucionar la landing actual a un sitio corporativo completo v2, con nuevo posicionamiento, cuatro idiomas y diseño elegante, sobrio y muy dinámico. Cliente objetivo: directores/gerentes de empresas medianas (50–300 empleados) con operación compleja. El copy debe entenderlo un vicepresidente — valor, no detalle técnico.

**Reglas de copy innegociables** (van también al CLAUDE.md):
- Sin métricas fabricadas. Todo debe poder sustentarse honestamente.
- Nunca posicionar a LATCON como "agencia de desarrollo" — es una consultora que también construye.
- Tono consultivo, directo, sin jerga técnica innecesaria.
- "Keep it simple": no desbordar en sofisticación; algunas soluciones no llevan IA y eso es una virtud, no una carencia.

## 2. Posicionamiento y hero

**Idea central (aprobada):** cerrar la brecha entre lo planeado y lo ejecutado. LATCON construye soluciones que apoyan la planeación, programación y ejecución de operaciones, entendiendo que los proyectos tienen variantes y riesgos no planeados — las soluciones deben ser flexibles y adaptativas. La estrategia y gestión de proyectos (expertise de César) se integra a los desarrollos.

**Hero (dirección aprobada, EN):**

> **"Plans are perfect — until the operation starts."**
> We build AI, optimization and software that close the gap between what you plan and what actually happens.

- Rotador de palabras con cambio de color de acento: planning · scheduling · execution · adaptation (o variantes de la brecha; pulir redacción final con Luis).
- Fondo: sistema de partículas "datos dispersos que se conectan" (ver §8).
- CTA: "Book your free diagnostic" (30 min · no strings attached).

## 3. Idiomas

- **Inglés por defecto** (raíz `/`), luego **español** (`/es`), **francés** (`/fr`) y **portugués** (`/pt`).
- Selector de idioma en el header. hreflang + sitemap por idioma para SEO.
- Sesión de diagnóstico confirmada en EN/ES/FR. **Pendiente:** confirmar si se atiende en portugués; si no, en `/pt` el CTA lleva a formulario de contacto en vez de booking.
- Todo el copy se escribe primero en inglés (fase 1), se traduce después (fase 2). No traducir con calco literal; adaptar.

## 4. Arquitectura del sitio v1

```
/            Home (nueva, ver §5)
/solutions   Detalle de soluciones y capacidades (nueva, ver §6)
/blog        Blog + posts (nueva, ver §7)
/agenda      Booking existente (traducir a 4 idiomas)
/privacy     Existente (traducir)
/terms       Nueva (falta en el sitio actual)
+ réplica bajo /es, /fr, /pt
```

**Excluido de v1** (documentado para fases futuras, NO construir ahora):
- **Páginas por industria** (`/industries/agriculture`, `/oil-and-gas`, `/transportation`): dolores del sector + casos anónimos de esa industria + capacidades + CTA. Los casos viven mientras tanto en la home (§5.4).
- **Página Perfil B**: oferta separada para emprendedores (apps, web, cloud), lenguaje simple, formulario "cuéntanos tu idea". No mezclar con el mensaje B2B.
- **Sección de impacto**: visión en salud, clima, educación. En v1 estos temas son solo línea editorial del blog (§7).

## 5. Home — sección por sección

Orden: Hero → Para quién → Soluciones (tarjetas) → Experiencia (casos) → Método → Equipo → CTA final. Alternancia claro/oscuro (§8).

### 5.1 Header
Sticky, transparente sobre hero, gana fondo al hacer scroll (~80 px). Menú: Solutions · Experience · Method · About · Blog + selector de idioma + botón persistente "Book your free diagnostic". Scroll-spy en links activos.

### 5.2 Para quién
Mantener la esencia de los 4 dolores actuales (datos sin análisis, silos, operación en campo, sistemas sin integración) pero condensada y en inglés. Puede reducirse a 3–4 tarjetas breves con la cita textual del cliente («Cada área trabaja con números distintos…») como elemento distintivo — esas citas funcionan muy bien, conservarlas.

### 5.3 Soluciones — SIMPLIFICADA (decisión clave)
En la home **solo** tarjetas apiladas estilo scroll-stack (referencia de patrón: home de Tryolabs): se ve la tarjeta principal completa y las de atrás asoman parcialmente. Cada tarjeta: **título + resumen de 2 líneas + gráfico animado demostrativo**. Nada más. El detalle completo se mueve a `/solutions`.

Propuesta de las 3 tarjetas alineadas al nuevo posicionamiento (validar con Luis — mapean las 3 actuales al marco plan→ejecución):

| # | Tarjeta (EN) | Resumen | Gráfico animado |
|---|---|---|---|
| 01 | **Plan smarter** | Optimization and predictive models that turn your constraints into the best possible plan. | Nodos/recursos que convergen en una ruta óptima |
| 02 | **Execute without friction** | Applications and automation that carry the plan into the field — with full traceability. | Bloques fluyendo por compuertas que pasan de manual a automático |
| 03 | **See and adapt in time** | Visibility, alerts and AI agents that detect deviation before it becomes cost. | Curva real vs. plan; alerta que parpadea antes de la desviación |

Cada tarjeta enlaza a su ancla en `/solutions`.

### 5.4 Experiencia — casos anónimos (sección nueva)
Sección oscura tipo museo. Casos por industria, formato **situación → qué construimos (1 línea) → qué cambió**. Lenguaje de vicepresidente. Sin nombres de cliente. NO mencionar Transmilenio. Borradores EN (pulir en el repo):

**Agriculture — cocoa sector, Colombia**
- *Productivity you can measure.* A cocoa-sector program needed objective productivity measurements across plantations. We built a computer vision application that measures productivity directly from field imagery. Yield decisions are now based on measured reality, not estimates.
- *From field to decision.* Harvest and post-harvest activities were captured on paper, with no way to track program goals. We built an end-to-end platform: field data capture, geo-referenced crops, and an analytics tool with AI-generated operational reports. The program now monitors its objectives with live field data.

**Oil & Gas**
- *Water demand met at minimum energy cost.* A water injection plant needed pump configurations that met water demand without wasting energy. We built the web application that defines the optimal frequency setup. The operation meets demand at the lowest possible energy consumption.
- *One view from sensor to budget.* Monitoring artificial lift systems meant juggling failure reports, capex/opex tracking and energy-savings targets (IMM→PMM motor replacements). We built an end-to-end business intelligence tool — from data model to dashboard. Management now tracks failures, budget and savings in a single view.
- *Alerts that explain themselves.* Well sensor alerts required expert time to interpret. We built an AI agent that reads failure alerts, identifies probable causes and supports the definition of solutions. Response time drops; expertise scales.
- *New detection logic, live in days.* Every new alert engine required manual setup and risky deployments. We built an orchestration tool that validates, registers and schedules alert engines (Python/R) automatically. Detection capabilities grow in a controlled, repeatable way.

**Transportation** (empresa de transporte público — sin nombre)
- *Seeing demand before the bus arrives.* A public transport operator piloted computer vision to measure crowd density at stations in real time — input for better service planning.
- *The fleet, on one screen.* Operations dashboard for fleet monitoring: the daily operation, visible and traceable.

### 5.5 Método
Los 4 pasos actuales (Entender → Diseñar → Construir → Implementar), en inglés, con revelado por scroll y línea conectora animada. **Corregir el bug actual: los pasos aparecen duplicados/desordenados en producción.** Añadir la nota de que la estrategia y gestión por resultados acompaña todo el ciclo (rol de César — diferenciador frente a firmas puramente técnicas).

### 5.6 Equipo
Sección clara. Luis, César, John con foto real (**pendiente: sesión de fotos**), hover duotono→color, chips de capacidades. Mantener el párrafo diferenciador ("Not a dev agency, not a strategy firm…") adaptado al inglés.

### 5.7 CTA final
Sección oscura museo: titular + línea de apoyo + botón. Reutilizar partículas del hero a ~30 % densidad. Mantener espíritu del actual: "Every week without visibility has a cost" + sin pitch, sin compromiso, 30 minutos.

## 6. Página /solutions (nueva)

Aquí vive el detalle que sale de la home. Estructura por las mismas 3 áreas de §5.3, cada una con: qué incluye (bullets del sitio actual, traducidos y actualizados), resultado esperado, y capacidades aplicables. Además, **sección de capacidades transversales** (hoy no existen en el sitio y deben aparecer):

- AI & ML models (incl. computer vision, AI agents)
- Application development — **with or without AI**: "the right tool for the problem; simple and effective beats sophisticated and unused"
- Operations management applications (planning, scheduling, execution, field data capture)
- Energy efficiency applications (con experiencia real: ver casos O&G)
- **Operations research optimization (LP / MIP)** para reducción de costos y uso eficiente de recursos
- End-to-end business intelligence (del modelado de datos al dashboard)
- Strategy & high-performance team management integrada a la entrega

CTA de diagnóstico al cierre.

## 7. Blog

- Colección de contenido con soporte 4 idiomas (un post puede existir solo en algunos idiomas).
- **Línea editorial** (aprobada): productividad en el campo · salud (acercar servicios escasos a la población) · cambio climático (alertas tempranas en zonas de riesgo geográfico) · energía (optimización y eficiencia — con experiencia real) · educación (IA en procesos educativos y administrativos).
- v1 lanza con 2–3 artículos. Teaser de últimos posts en la home (opcional, si no recarga).

## 8. Diseño e interacción

**Identidad — refresh parcial (aprobado):** se mantiene el logo. Ampliar paleta y tipografía para lograr contraste "museo": fondo casi-negro de marca para secciones de contemplación (soluciones, experiencia, CTA final) donde un solo elemento se ilumina con mucho espacio negativo; claro cálido para secciones de lectura (para quién, método, equipo). Un color de acento dominante para CTAs y datos animados. Elegante, sobrio, muy dinámico.

**Spec de interacciones** (resumen; el detalle completo está en `latcon-spec-diseno-interactivo.md`, incluirlo en el repo):
1. Hero: partículas canvas 2D "datos que se conectan", reactivas al mouse (radio ~120 px), ≤15 KB gzip, defer, fallback SVG estático.
2. Rotador de frases: 3.5 s/frase, slide-up+fade 400 ms, color de acento por frase, `aria-live="off"`.
3. Tarjetas apiladas: `position: sticky` + CSS Scroll-Driven Animations (scale 1→0.95 + brightness); GSAP ScrollTrigger solo como plan B.
4. Gráficos por solución: SVG + CSS (`stroke-dashoffset`, `transform`), loop 8–12 s, pausa fuera de viewport.
5. Método: revelado con stagger 120 ms + línea que se dibuja con el scroll.
6. Micro-interacciones: hovers 150–300 ms, solo `transform`/`opacity`.

**Reglas duras:** `prefers-reduced-motion` desactiva todo movimiento; presupuesto JS de animación ≤40 KB gzip; máximo una animación protagonista por viewport; animaciones solo compositadas; canvas pausado fuera de viewport.

## 9. Técnico

- **Infra existente (no migrar):** repo GitHub, deploy en Azure. Verificar si es Azure Static Web Apps → activar/usar entornos de preview por PR para revisión de Luis y César.
- **Framework:** auditar el actual. Si es Astro/Next, continuar sobre él. Requisitos que debe cumplir: i18n por rutas (EN raíz + /es /fr /pt), colección de contenido para blog, islas de interactividad, SEO sólido (hreflang, sitemaps, OG por idioma).
- **CLAUDE.md en la raíz del repo** con: reglas de copy (§1), posicionamiento (§2), convenciones i18n, tokens de diseño del refresh, reglas duras de animación (§8), y la instrucción de nunca inventar métricas ni casos.
- Flujo de trabajo: fases pequeñas → PR → preview en Azure → aprobación de Luis → merge. Usar plan mode de Claude Code por sección.

## 10. Fases de implementación

1. **Auditoría del repo** + creación de CLAUDE.md + este plan al repo (`/docs`).
2. **Copy maestro EN**: hero, home completa, /solutions, casos — aprobación de Luis antes de código.
3. **i18n**: estructura de rutas 4 idiomas + traducciones ES/FR/PT del copy aprobado.
4. **Home v2** en orden: header sticky+CTA → rotador → alternancia claro/oscuro + revelados → tarjetas apiladas → gráficos SVG → partículas (lo más costoso al final; la home funciona sin ellas).
5. **/solutions** + fix del bug de método + /terms.
6. **Blog** + 2–3 artículos.
7. **QA y lanzamiento**: Lighthouse mobile ≥90, CLS <0.1, reduced-motion, revisión de los 4 idiomas en dispositivos reales.

## 11. Criterios de aceptación

1. Performance mobile ≥90, sin degradar LCP; CLS <0.1.
2. Cero movimiento con `prefers-reduced-motion`; todo el contenido accesible.
3. Los 4 idiomas completos y consistentes; hreflang correcto.
4. Ningún asset, código, ícono o texto tomado de tryolabs.com — solo patrones de interacción con expresión 100 % propia.
5. Ningún caso con datos identificables de cliente; ninguna métrica no sustentable.
6. Copy comprensible para un vicepresidente sin perfil técnico.

## 12. Pendientes de decisión (resolver con Luis)

- [ ] ¿Diagnóstico de 30 min se atiende en portugués? (define CTA de `/pt`)
- [ ] Validar reframe de las 3 tarjetas de soluciones (§5.3) vs. mantener las 3 actuales
- [ ] Redacción final del rotador del hero
- [ ] Sesión de fotos del equipo
- [ ] Confirmar framework actual del repo (John)
- [ ] Nombres/temas de los 2–3 artículos iniciales del blog
