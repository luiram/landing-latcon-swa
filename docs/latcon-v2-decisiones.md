# LATCON v2 — Decisiones tomadas

Registro de decisiones resueltas en conversación con Claude Code sobre `latcon-plan-maestro-sitio-v2.md` y `latcon-spec-diseno-interactivo.md`, además del diagnóstico de estado del repo frente a ambos documentos. Última actualización: 2026-07-17.

> Este documento complementa, no reemplaza, a `latcon-plan-maestro-sitio-v2.md` (§12 "Pendientes de decisión") y `latcon-spec-diseno-interactivo.md`. Cuando haya diferencia entre lo que dice el plan original y lo que dice este archivo, **manda este archivo** por ser la versión más reciente.

---

## 1. Resueltas

### 1.1 Idioma por defecto
**Inglés** es el idioma por defecto (`/`), con `/es`, `/fr`, `/pt` como subrutas. Ver `CLAUDE.md` → "Arquitectura i18n v2".

### 1.2 CTA de `/pt`
El diagnóstico gratuito de 30 min **no** se atiende en portugués. El CTA en `/pt` lleva a un formulario de contacto (no al booking wizard de `/agenda`), y ese formulario debe estar **localizado en portugués** — no cae a español ni inglés.

### 1.3 Reframe de las 3 tarjetas de soluciones (home)
Se reemplaza el planteamiento de tarjetas actual de producción por el nuevo marco, ya consistente con el hero:

1. **Plan smarter**
2. **Execute without friction**
3. **See and adapt in time**

### 1.4 Capacidades de `/solutions` — reorganizadas por etapa (copy aprobado)
El primer borrador (lista plana de 7 capacidades) sonaba muy anclado a casos puntuales de cliente. Se revisó cómo organiza Tryolabs sus servicios —**solo la estructura/orden, nunca su copy ni assets** ([www.tryolabs.com](https://www.tryolabs.com))—: usan un modelo de madurez en 3 etapas (Discovery & Strategy → Build & Develop → Scale & Optimize). Ese patrón estructural es equivalente al marco plan→ejecución→adaptación que Latcon ya tenía aprobado en el hero, así que las 7 capacidades transversales se organizan dentro de esas 3 etapas en vez de quedar como lista plana.

El copy se revisó con lectura de gerente general de Oil & Gas / Energía / Agricultura / Educación / Sostenibilidad — a propósito general, sin nombrar sector ni caso puntual de cliente:

**01 — Plan smarter**
- *Operations research & optimization (LP/MIP)*: "Turning your real constraints — budget, capacity, resource scarcity, demand variability — into the best achievable plan, not the most convenient one to compute."
- *Strategy & high-performance team execution*: "Integrated into every engagement: the operating discipline and team alignment that make a plan survivable once it meets reality — not a separate consulting track."

**02 — Execute without friction**
- *Operations management applications* (planning, scheduling, execution, field data capture): "Software that carries the plan into the field and captures what actually happens there — so execution stays traceable instead of becoming tribal knowledge."
- *Application development — with or without AI*: "The right tool for the problem. Some of what you need is a well-built application, not a model — we build both, and we tell you which one you actually need."
- *Energy efficiency applications*: "Efficiency treated as an operating variable, not an audit finding — built into how equipment and processes run, from individual configuration to plant-wide performance."

**03 — See and adapt in time**
- *AI & ML models* (incl. computer vision, AI agents): "Models that turn operational and environmental signals into early warning — so issues surface while they're still cheap to fix, and expertise scales beyond the few people who hold it today."
- *End-to-end business intelligence*: "From scattered systems and spreadsheets to one model your leadership can actually trust — visibility that lets decisions respond to real conditions, not last month's report."

Estas 7 capacidades ya reflejan, en lenguaje general, requerimientos reales recibidos de clientes en Oil & Gas (captura móvil de operación → alertas de mantenimiento; eficiencia energética) y Agricultura (planeación/programación/ejecución con captura automática; control de microclima; monitoreo ambiental para picos de demanda) — sin nombrar sector ni caso puntual en el copy final.

### 1.5 Contenido de `/terms`
No estaba definido en los docs originales. Es una página de **Términos de Uso del sitio** (distinta de `/privacidad`, que cubre datos personales; los términos contractuales de servicio van en las propuestas/contratos firmados por proyecto, no aquí). Secciones:

1. Aceptación de los términos por el uso del sitio.
2. Descripción del sitio y su propósito informativo (el contenido no constituye una oferta contractual vinculante).
3. Naturaleza de la sesión de diagnóstico gratuita agendada vía `/agenda`: conversación exploratoria sin compromiso, no un acuerdo de servicio.
4. Propiedad intelectual (marca, logo, contenido del sitio).
5. Uso aceptable (no scraping, no uso indebido del formulario de agenda).
6. Enlaces a terceros (descargo de responsabilidad).
7. Limitación de responsabilidad / el sitio se ofrece "as is".
8. Ley aplicable y jurisdicción: **Colombia**.
9. Cambios a estos términos.
10. Contacto — reutilizar el mismo correo/página de contacto que `/privacidad`.

Se redacta primero en inglés, se traduce después (misma regla que el resto del copy v2).

### 1.6 Banner de cookies — rediseño a no-bloqueante
Estado actual verificado en `src/components/analytics/CookieConsentBanner.tsx`: hoy es un **modal bloqueante** — `role="dialog" aria-modal="true"` con overlay `bg-black/28 backdrop-blur-[2px]` y `document.body.style.overflow = "hidden"` mientras está visible, es decir, impide el scroll de la página hasta que el usuario elige una opción.

Dirección aprobada (inspirada en el banner de tryolabs.com, con los colores propios de Latcon): banner **no-modal**, sin overlay oscuro de fondo, sin bloquear el scroll, tono discreto que combine con la sección clara del inicio de la página. Ajustes concretos:
- Quitar el overlay de fondo (`bg-black/28 backdrop-blur-[2px]`).
- Quitar el bloqueo de `document.body.style.overflow = "hidden"`.
- Pasar los botones a un tono sobrio (negro/oscuro sólido) en vez del naranja de acento actual, para no competir visualmente con los CTAs principales del sitio.

**No implementado todavía** — es un cambio de componente aislado, se puede hacer en paralelo a las demás fases sin depender de ellas.

### 1.7 Fotos del equipo
Se sigue con el ícono/placeholder actual de `About.tsx` por ahora. La sesión de fotos reales queda pendiente por separado y **no bloquea** el resto del avance. El hover duotono→color de la sección Equipo se implementa cuando existan las fotos (o se prepara la lógica desde ya y se activa al reemplazar el placeholder).

### 1.8 Copy maestro EN — Fase 2 completa (resuelve el rotador del hero)

Copy fuente: `src/config/content.ts` (fuente real del ES en producción — `landing/es.ts` solo re-exporta desde ahí, ver `CLAUDE.md`). Cada pieza es adaptación/condensación, no traducción literal. Nada de esto está todavía implementado en código — vive solo en este documento hasta que se construya la Fase 4 (Home v2) y la página `/solutions`/`/terms`.

#### Hero
- **H1:** "Plans are perfect — until the operation starts."
- **Subtítulo:** "We build AI, optimization and software that close the gap between what you plan and what actually happens."
- **CTA:** "Book your free diagnostic" · reassurance: "30 min · no strings attached"
- **Rotador (resuelve el pendiente):** reutiliza el campo `hero.chip` existente (hoy un eyebrow estático) como rotador de una palabra, prefijo fijo + palabra en color de acento, 3.5 s por palabra: *"It breaks first in **planning**."* → *"...in **scheduling**."* → *"...in **execution**."* → *"...in **adaptation**."*

#### Para quién (Audience)
- **Eyebrow:** "Who we work with" · **Título:** "We work with companies where data, systems and teams don't talk to each other"
- Se mantienen los 4 perfiles (no se redujo a 3, cada uno tiene cita distintiva y sectores propios):

| Perfil | Cuerpo | Cita | Sectores |
|---|---|---|---|
| Data without analysis | "The data exists, but analyzing it in time takes people and hours the operation doesn't have. By the time a problem shows up in a report, it already has a cost." | "We have the data. We just can't use it." | Services · Retail · Manufacturing · Banking · Media |
| Teams working in silos | "Sales promises without knowing what can be produced. Purchasing restocks without seeing real demand. Every area works from its own version of the truth — and no one measures what that costs." | "Every area works with different numbers, and no one knows which one is real." | Manufacturing · Retail · Distribution · Agribusiness |
| Distributed or field operations | "Field teams, multiple sites, work coordinated over WhatsApp and email. Without a shared record, it's hard to know what happened, who did it, and when — until it already has consequences." | "We coordinate everything over WhatsApp, and no one knows who did what." | Logistics · Agribusiness · Field services |
| Technology without integration | "ERP, CRM, platforms and tools — each running on its own. Without integration, the operation runs on manual workarounds and decisions based on incomplete data." | "We have several systems, but none of them talk to each other." | Any industry with complex operations |

#### Soluciones (home, 3 tarjetas resumen)
Reemplaza el eyebrow/título/intro viejo ("Así conectamos lo desconectado") por uno consistente con el hero nuevo:
- **Eyebrow:** "Solutions" · **Título:** "Three ways we close the gap." · **Intro:** "Three integrated capabilities, one goal: keep what's happening as close as possible to what you planned."
- **01 Plan smarter:** "Optimization and predictive models that turn your constraints into the best possible plan." *(ya venía del plan maestro §5.3)*
- **02 Execute without friction:** "Applications and automation that carry the plan into the field — with full traceability."
- **03 See and adapt in time:** "Visibility, alerts and AI agents that detect deviation before it becomes cost."

#### Experiencia (casos anónimos)
- **Eyebrow:** "Experience" · **Título:** "What closing the gap looks like."
- Se curaron **3 de los 8** casos borrador del plan maestro §5.4 (uno por industria, cada uno ilustra un pilar distinto) para respetar el principio "museo" (un elemento a la vez). Los 5 restantes quedan disponibles para una futura página de casos más completa, no se descartan:

| Industria | Pilar | Headline | Situación | Construimos | Cambió |
|---|---|---|---|---|---|
| Agriculture | Execute | *From field to decision.* | Harvest activity was tracked on paper — no way to measure progress against program goals. | An end-to-end platform: field data capture, geo-referenced crops, AI-generated operational reports. | The program now monitors its objectives with live field data, not paper trails. |
| Oil & Gas | Plan | *Water demand met at minimum energy cost.* | A water injection plant needed pump configurations that met demand without wasting energy. | The web application that calculates the optimal frequency setup for every scenario. | The operation now runs at the lowest energy cost demand allows. |
| Transportation | See & adapt | *Seeing demand before the bus arrives.* | Station crowding was a guess until the bus showed up — too late to adjust. | A computer vision pilot that measures crowd density at stations in real time. | Service planning now starts from what's happening at the platform, not fixed schedules alone. |

#### Método
- **Eyebrow:** "Method" · **Título:** "First we understand. Then we build." · **Intro:** "Every stage ends in something concrete. We don't move to the next one until the last one is clear."

| # | Paso | Cuerpo | Resultado |
|---|---|---|---|
| 01 | Understand the context | "We talk to you to understand how the operation actually runs today, where the friction is, and which decisions need better support." | "Clarity on the problem that's actually worth solving." |
| 02 | Design the solution | "We translate the diagnostic into a concrete proposal — so you see the solution before investing in building it." | "A clear solution, validated and aligned with your reality." |
| 03 | Build in stages | "We develop the solution through partial deliveries and continuous validation, starting with what creates the most value." | "A working partial solution, validated with real users before final delivery." |
| 04 | Implement and adjust | "We support the rollout and the adjustments needed so the solution gets adopted well and starts producing results from day one." | "A solution running in a real context, adopted and traceable." |

- **Closing:** "Once it's working, we prepare it to grow — more integration, more analytics, more automation."
- **Nota de César** (corre junto a la línea conectora, no es un 5º paso — reusa a propósito la misma frase que la capacidad de Strategy en `/solutions` §1.4): "Through every stage: the strategy and results-management discipline that keeps the solution aligned with the business — not a separate consulting track."
- Recordatorio de implementación: antes de construir la línea conectora, corregir el bug de doble render de `Process.tsx` (ver "Deuda técnica" en `CLAUDE.md`).

#### Equipo (About)
- **Eyebrow:** "About us" · **Headline del panel:** "Operations + data + technology" · **Cuerpo del panel:** "We've built operational platforms, ML models and AI automation in real-world implementations." · **Título:** "The team that understands your operation and builds the solution."

| Nombre | Rol | Credencial |
|---|---|---|
| Luis Ramírez | Operations · Data · Architecture | "Industrial Engineer. 15 years connecting operations and technology across logistics, agribusiness and data intelligence." |
| César Ramírez | Strategy · Results | "5+ years helping organizations implement operating strategy and results-driven management across distribution, telecom and sales." |
| John Ramírez | Development · AI · Cloud | "10+ years in applications, ML, computer vision, multi-agent systems and cloud." |

- **Párrafo diferenciador:** "Not a dev agency. Not a strategy firm. We're operations engineering, in-house development and results-driven management — working as one team, from diagnosis through implementation."
- **Chips:** Operations · Data · Automation · Analytics · AI · SaaS · Vision · Multi-agent
- Fotos siguen en placeholder (ver §1.7); hover duotono→color se activa cuando existan.

#### CTA final (home)
- **Título:** "Every week without visibility has a cost. Let's find out together if we can help you reduce it."
- **Cuerpo:** "Book a 30-minute diagnostic session. We'll look at how your operation actually flows, where data, time or decisions are getting lost — and give you a concrete recommendation, even if you don't end up working with us."
- **CTA:** "Book your free diagnostic" · reassurance: "No sales pitch · No strings attached · 30 minutes"

#### `/solutions` (página de detalle)
Mapeo de los 3 pilares viejos (`content.ts → solutions.capabilities`) a los 3 nuevos: ES "Decisiones con inteligencia" → EN **Plan smarter** · ES "Ejecución sin fricción" → EN **Execute without friction** · ES "Visibilidad que llega a tiempo" → EN **See and adapt in time**.

- **Eyebrow:** "Solutions" · **Título:** "Three moments where the gap opens — and how we close each one." · **Intro:** "Plan smarter, execute without friction, see and adapt in time. Below, what each one actually includes."

**01 — Plan smarter**: "You make decisions every day either way. The difference is whether they're based on what already happened, or on models that see what's coming — before it's urgent."
- Qué incluye: predictive models for demand, inventory and bottlenecks · optimization models (LP/MIP) that turn constraints into the best achievable plan · systems that learn from your operation's behavior and improve their recommendations over time
- Resultado: "Decisions based on what's coming, not just what already happened · Problems caught before they have a visible cost."
- Capacidades aplicables: Operations research & optimization (LP/MIP) · Strategy & high-performance team execution

**02 — Execute without friction**: "Every manual process is a point of failure. We find the ones slowing your operation down and turn them into automated, traceable, reliable flows."
- Qué incluye: manual processes converted into automated, validated and traceable flows · ERP, apps, forms and messaging integrated into a single flow of information · AI agents that execute repetitive tasks — without human intervention
- Resultado: "An operation that flows without bottlenecks, fully traceable, able to grow without adding complexity."
- Capacidades aplicables: Operations management applications · Application development — with or without AI · Energy efficiency applications

**03 — See and adapt in time**: "Your operation generates data across multiple systems. We connect it, organize it, and turn it into clear signals your team can act on."
- Qué incluye: your data sources connected in one place — no manual consolidation · operational dashboards updated in real time — no dependence on manual reports · alerts that arrive before the problem becomes visible
- Resultado: "Less time waiting on data · Decisions that arrive while they can still change the outcome."
- Capacidades aplicables: AI & ML models · End-to-end business intelligence

- **Cierre de página:** "Ready to see where your plan and your operation are furthest apart?" → botón "Book your free diagnostic" (30 min · no strings attached).

#### `/terms` (borrador — pendiente de revisión legal antes de publicar)
**Título:** "Terms of Use" · **Last updated:** 2026-07-17 · **Ley aplicable:** Colombia · **Contacto:** contacto@latconservices.com (mismo que `/privacidad`, confirmado en `src/config/landing/privacy.ts`)

1. **Acceptance of these Terms** — "By accessing or using this website, you agree to these Terms of Use. If you don't agree with them, please don't use the site."
2. **About this site** — "This website is an informational resource about LATCON Services and the work we do. Nothing on this site — including service descriptions or case summaries — constitutes a binding offer or contractual commitment. Any actual engagement is governed by a separate, signed agreement between LATCON and the client."
3. **The free diagnostic session** — "Booking a session through /agenda schedules an exploratory conversation, not a service agreement. It carries no cost and no obligation for either party. Any proposal, scope or pricing discussed afterward is only binding once formalized in a separate written agreement."
4. **Intellectual property** — "The LATCON name, logo, and the content of this site (text, graphics, design) belong to LATCON Services or are used with permission. You may not copy, reproduce or reuse them without our written consent, beyond personal, non-commercial reference."
5. **Acceptable use** — "You agree not to misuse this site — including automated scraping or data extraction, attempts to disrupt its normal operation, or submitting false or malicious information through the booking form."
6. **Third-party links** — "This site may link to third-party resources. We don't control, and aren't responsible for, their content or practices."
7. **Limitation of liability** — "This site is provided \"as is.\" To the extent permitted by law, LATCON is not liable for damages arising from your use of, or inability to use, this site."
8. **Governing law** — "These Terms are governed by the laws of Colombia. Any dispute will be subject to the jurisdiction of Colombian courts."
9. **Changes to these Terms** — "We may update these Terms from time to time. Changes take effect once published on this page; the \"last updated\" date above reflects the most recent revision."
10. **Contact** — "Questions about these Terms? Reach us at contacto@latconservices.com."

### 1.9 Limpieza de código huérfano (ejecutada)
Decisión: eliminar tanto `Problems.tsx` como `Verticals.tsx` — sus contenidos quedan cubiertos por las secciones nuevas de v2 ("Para quién" ya cubre los dolores de `Problems.tsx`; "Experiencia" cubre los casos por industria que tenía `Verticals.tsx`; las páginas por industria completas siguen siendo trabajo de una fase futura, no v1, y se redactarán desde cero en ese momento en vez de reciclar este contenido).

Ejecutado en la rama `portal`:
- Eliminados: `src/components/sections/Problems.tsx`, `Verticals.tsx`, `VerticalBlockExpandables.tsx`.
- Eliminados los campos `problems` y `verticals` de `LandingContent` (`src/config/landing/types.ts`) y sus datos correspondientes en los 4 locales (`src/config/content.ts` [es], `landing/en.ts`, `landing/fr.ts`, `landing/pt.ts`).
- Quitada la entrada `"#verticals"` de `NAV_HREFS` en `src/components/layout/Navbar.tsx` (scroll-spy).
- Eliminado el archivo huérfano `src/config/site.ts` (sin ningún import en el repo). `docs/README.md` actualizado para apuntar a `src/config/landing/site.ts`, que es el real.
- `npm run build` verificado: compila limpio, First Load JS bajó levemente (home 190→183 KB) como beneficio secundario.

### 1.10 Temas de los 3 posts iniciales del blog (aprobados)
Anclados en experiencia real de Latcon (no en las líneas editoriales donde todavía no hay casework propio, para no prometer de más):

1. "Why your field data still lives on paper (and what it's costing you)" — línea editorial "productividad en el campo", ligado al caso de Agricultura de §1.8.
2. "The real cost of energy inefficiency in production" — línea editorial "energía", ligado al caso de Oil & Gas de §1.8.
3. "Early warning, not the fire alarm" — línea editorial "cambio climático/riesgo", centrado en operaciones en general, sin reclamar casos específicos de clima que Latcon no tiene todavía.

Falta: redactar cada post (título arriba es tema, no titular final) — se hace al llegar a la Fase 6 (Blog) del plan maestro.

### 1.11 Traducción ES del copy maestro v2 (aprobada)
Traducción/adaptación al español del copy EN de §1.8 — no es calco literal. Donde el v2 no cambia de fondo respecto al v1 (Equipo, CTA final, gran parte de Método), el español coincide casi textual con `content.ts` porque el propio inglés se había adaptado desde ahí. Aprobado por Luis (2026-07-17) con 2 correcciones ya incorporadas: las citas de "Para quién" quedan exactas al v1 (sin coma añadida antes de "pero"), y la nota de César en Método se simplificó a "no como una consultoría aparte" (en vez de "no un frente aparte de consultoría").

**Hero:** H1 "El plan es perfecto — hasta que arranca la operación." · Subtítulo "Construimos IA, optimización y software que cierran la brecha entre lo que planeas y lo que realmente pasa." · CTA "Agenda tu diagnóstico gratuito" · "30 minutos · sin compromiso" · Rotador: "Se rompe primero en la planeación." → "...en la programación." → "...en la ejecución." → "...en la adaptación."

**Para quién:** Eyebrow "Para quién" · Título "Trabajamos con empresas donde los datos, los sistemas y los equipos no se hablan entre sí"

| Perfil | Cuerpo | Cita | Sectores |
|---|---|---|---|
| Datos sin análisis | "Los datos existen, pero analizarlos a tiempo exige personas y horas que la operación no tiene disponibles. Cuando el problema aparece en un reporte, ya tiene un costo." | «Tenemos los datos pero no podemos usarlos.» | Servicios · Retail · Manufactura · Banca · Medios |
| Equipos que trabajan en silos | "Ventas promete sin saber qué se puede producir. Compras reabastece sin ver la demanda real. Cada área trabaja con su propia versión de los datos — y nadie mide lo que eso cuesta." | «Cada área trabaja con números distintos y nadie sabe cuál es el real.» | Manufactura · Retail · Distribución · Agroindustria |
| Operación distribuida o en campo | "Equipos en campo, múltiples sedes, coordinación por WhatsApp y correo. Sin un registro compartido, es difícil saber qué pasó, quién lo hizo y cuándo — hasta que ya tiene consecuencias." | «Coordinamos todo por WhatsApp y nadie sabe quién hizo qué.» | Logística · Agroindustria · Servicios de campo |
| Tecnología sin integración | "ERP, CRM, plataformas y aplicativos — cada uno funcionando por separado. Sin integración, la operación depende de ajustes manuales y decisiones basadas en datos incompletos." | «Tenemos varios sistemas pero ninguno le habla al otro.» | Cualquier industria con operación compleja |

**Soluciones (home):** Eyebrow "Soluciones" · Título "Tres formas de cerrar la brecha." · Intro "Tres capacidades integradas, un solo objetivo: que lo que pasa se mantenga lo más cerca posible de lo que planeaste."
- 01 **Planea mejor** — "Modelos de optimización y predicción que convierten tus restricciones en el mejor plan posible."
- 02 **Ejecuta sin fricción** — "Aplicaciones y automatización que llevan el plan al terreno — con trazabilidad completa."
- 03 **Detecta y adapta a tiempo** — "Visibilidad, alertas y agentes de IA que detectan desviaciones antes de que se conviertan en costo."

**Experiencia:** Eyebrow "Experiencia" · Título "Así se ve cerrar la brecha."

| Industria | Headline | Situación | Construimos | Cambió |
|---|---|---|---|---|
| Agricultura | *Del campo a la decisión.* | "La actividad de cosecha se registraba en papel — sin forma de medir el avance frente a los objetivos del programa." | "Una plataforma de extremo a extremo: captura de datos en campo, cultivos georreferenciados y reportes operativos generados con IA." | "El programa ahora monitorea sus objetivos con datos de campo en vivo, no con papeles." |
| Oil & Gas | *Demanda de agua satisfecha al menor costo energético.* | "Una planta de inyección de agua necesitaba configuraciones de bombeo que cumplieran la demanda sin desperdiciar energía." | "La aplicación web que calcula la configuración óptima de frecuencia para cada escenario." | "La operación ahora funciona al menor costo energético que la demanda permite." |
| Transporte | *Ver la demanda antes de que llegue el bus.* | "La aglomeración en las estaciones era una suposición hasta que llegaba el bus — demasiado tarde para ajustar." | "Un piloto de visión computacional que mide la densidad de personas en las estaciones en tiempo real." | "La planeación del servicio ahora parte de lo que pasa en el andén, no solo de horarios fijos." |

**Método:** Eyebrow "Método" · Título "Primero entendemos. Luego construimos." · Intro "Cada etapa tiene un entregable concreto. No avanzamos a la siguiente hasta que la anterior genera claridad."

| # | Paso | Cuerpo | Resultado |
|---|---|---|---|
| 01 | Entendemos el contexto | "Conversamos contigo para entender cómo funciona hoy la operación, dónde están las fricciones y qué decisiones necesitan mejor soporte." | "Claridad sobre el problema que realmente vale la pena resolver." |
| 02 | Diseñamos la solución | "Traducimos el diagnóstico en una propuesta concreta — para que veas la solución antes de invertir en desarrollarla." | "Una solución clara, validada y alineada con tu realidad." |
| 03 | Construimos por etapas | "Desarrollamos la solución con entregas parciales y validaciones continuas, enfocándonos primero en lo que más valor aporta." | "Solución parcial funcionando, validada con usuarios reales antes de la entrega final." |
| 04 | Implementamos y ajustamos | "Acompañamos la puesta en marcha y los ajustes necesarios para que la solución empiece a usarse bien y genere resultados desde el inicio." | "Una solución funcionando en contexto real, con adopción y trazabilidad." |

Cierre: "Y cuando ya funciona, la preparamos para crecer — más integración, más analítica, más automatización." Nota de César: "En cada etapa: la disciplina de estrategia y gestión por resultados que mantiene la solución alineada con el negocio — no como una consultoría aparte."

**Equipo y CTA final:** coinciden ~100% con el copy v1 existente en `content.ts` — se reutilizan sin cambios (eyebrow "Nosotros", los 3 perfiles del equipo, párrafo diferenciador, chips, y todo el CTA final "Cada semana sin visibilidad tiene un costo...").

**`/solutions`:** Eyebrow "Soluciones" · Título "Tres momentos donde se abre la brecha — y cómo cerramos cada uno." · Intro "Planea mejor, ejecuta sin fricción, detecta y adapta a tiempo. A continuación, qué incluye cada una."
- **01 Planea mejor**: "De todas formas tomas decisiones todos los días. La diferencia es si se basan en lo que ya pasó, o en modelos que anticipan lo que viene — antes de que sea urgente." · Incluye: modelos predictivos para demanda, inventario y cuellos de botella · modelos de optimización (LP/MIP) que convierten restricciones en el mejor plan posible · sistemas que aprenden del comportamiento de tu operación y mejoran sus recomendaciones con el tiempo · Resultado: "Decisiones basadas en lo que viene, no solo en lo que ya pasó · Problemas detectados antes de que tengan un costo visible." · Capacidades: Investigación de operaciones y optimización (LP/MIP) · Estrategia y ejecución de equipos de alto desempeño
- **02 Ejecuta sin fricción**: "Cada proceso manual es un punto de fallo. Identificamos los que frenan tu operación y los convertimos en flujos automáticos, trazables y confiables." · Incluye: procesos manuales convertidos en flujos automáticos, validados y trazables · ERP, aplicativos, formularios y mensajería integrados en un solo flujo de información · agentes de IA que ejecutan tareas repetitivas — sin intervención humana · Resultado: "Una operación que fluye sin cuellos de botella, completamente trazable, capaz de crecer sin agregar complejidad." · Capacidades: Aplicaciones de gestión de operaciones · Desarrollo de software — con o sin IA · Aplicaciones de eficiencia energética
- **03 Detecta y adapta a tiempo**: "Tu operación genera datos en múltiples sistemas. Los conectamos, los organizamos y los convertimos en señales claras para que tu equipo actúe." · Incluye: tus fuentes de datos conectadas en un solo lugar — sin consolidación manual · tableros operativos actualizados en tiempo real — sin depender de reportes manuales · alertas que llegan antes de que el problema sea visible · Resultado: "Menos tiempo esperando datos · Decisiones que llegan mientras todavía pueden cambiar el resultado." · Capacidades: Modelos de IA y machine learning · Inteligencia de negocio de extremo a extremo

Cierre de página: "¿Listo para ver dónde tu plan y tu operación se alejan más?" → "Agenda tu diagnóstico gratuito"

**`/terms`:** Título "Términos de Uso" · Última actualización: 17 de julio de 2026 · Ley aplicable: Colombia · Contacto: contacto@latconservices.com. Las 10 secciones siguen la misma estructura que la versión EN de §1.8, traducidas (aceptación, sobre el sitio, sesión de diagnóstico, propiedad intelectual, uso aceptable, enlaces a terceros, limitación de responsabilidad, ley aplicable, cambios, contacto).

### 1.12 Traducción FR del copy maestro v2 (aprobada)
Igual criterio que ES: reuso del v1 francés donde el v2 no cambia de fondo (Equipo, CTA final, casi todo Método), traducción/adaptación nueva donde sí cambia — no calco literal. Se usó "écart" (brecha) como hilo conductor a propósito, repetido en Hero, Soluciones y Experiencia, igual que "cierran la brecha" en español. Aprobado por Luis (2026-07-17).

**Hero:** H1 "Le plan est parfait — jusqu'à ce que l'opération commence." · Subtítulo "Nous construisons de l'IA, de l'optimisation et des logiciels qui comblent l'écart entre ce que vous planifiez et ce qui se passe réellement." · CTA "Réservez votre diagnostic gratuit" · "30 minutes · sans engagement" · Rotador: "Le premier écart apparaît en planification." → "...en programmation." → "...en exécution." → "...en adaptation."

**Para quién:** Eyebrow "Pour qui" · Título "Nous travaillons avec des entreprises où les données, les systèmes et les équipes ne se parlent pas entre eux"

| Perfil | Cuerpo | Cita | Sectores |
|---|---|---|---|
| Données sans analyse | "Les données sont là, mais les analyser à temps demande du personnel et des heures que l'opération n'a pas. Quand le problème apparaît dans un rapport, il a déjà un coût." | « Nous avons les données mais nous ne pouvons pas les utiliser. » | Services · Distribution · Industrie · Banque · Médias |
| Équipes qui travaillent en silos | "Le commercial promet sans savoir ce qui peut être produit. Les achats réapprovisionnent sans voir la demande réelle. Chaque service travaille avec sa propre version des données — et personne ne mesure ce que ça coûte." | « Chaque service travaille avec des chiffres différents et personne ne sait lequel est le bon. » | Industrie · Distribution · Commerce · Agro-industrie |
| Opération distribuée ou terrain | "Équipes sur le terrain, plusieurs sites, coordination par WhatsApp et e-mail. Sans registre partagé, difficile de savoir ce qui s'est passé, qui l'a fait et quand — jusqu'à ce que ça ait déjà des conséquences." | « Nous coordonnons tout sur WhatsApp et personne ne sait qui a fait quoi. » | Logistique · Agro-industrie · Services de terrain |
| Technologie sans intégration | "ERP, CRM, plateformes et applications — chacun fonctionne séparément. Sans intégration, l'opération dépend d'ajustements manuels et de décisions basées sur des données incomplètes." | « Nous avons plusieurs systèmes mais aucun ne parle à l'autre. » | Toute industrie à opération complexe |

**Soluciones (home):** Eyebrow "Solutions" · Título "Trois façons de combler l'écart." · Intro "Trois capacités intégrées, un seul objectif : que ce qui se passe reste aussi proche que possible de ce que vous avez planifié."
- 01 **Planifiez mieux** — "Des modèles d'optimisation et de prédiction qui transforment vos contraintes en le meilleur plan possible."
- 02 **Exécutez sans friction** — "Des applications et de l'automatisation qui portent le plan sur le terrain — avec une traçabilité complète."
- 03 **Détectez et adaptez à temps** — "De la visibilité, des alertes et des agents IA qui détectent les écarts avant qu'ils ne deviennent un coût."

**Experiencia:** Eyebrow "Expérience" · Título "Combler l'écart, en pratique."

| Industria | Headline | Situación | Construimos | Cambió |
|---|---|---|---|---|
| Agriculture | *Du terrain à la décision.* | "L'activité de récolte était suivie sur papier — aucun moyen de mesurer l'avancement par rapport aux objectifs du programme." | "Une plateforme de bout en bout : capture de données sur le terrain, cultures géoréférencées et rapports opérationnels générés par IA." | "Le programme suit désormais ses objectifs avec des données de terrain en direct, pas avec des papiers." |
| Oil & Gas | *La demande en eau satisfaite au coût énergétique minimum.* | "Une usine d'injection d'eau avait besoin de configurations de pompage qui répondaient à la demande sans gaspiller d'énergie." | "L'application web qui calcule la configuration de fréquence optimale pour chaque scénario." | "L'opération fonctionne désormais au coût énergétique le plus bas que la demande permet." |
| Transport | *Voir la demande avant l'arrivée du bus.* | "L'affluence en station était une supposition jusqu'à l'arrivée du bus — trop tard pour ajuster." | "Un pilote de vision par ordinateur qui mesure la densité de personnes en station en temps réel." | "La planification du service part désormais de ce qui se passe sur le quai, pas seulement des horaires fixes." |

**Método:** Eyebrow "Méthode" · Título "D'abord comprendre. Ensuite construire." · Intro "Chaque étape a un livrable concret. Nous ne passons à la suivante qu'une fois que la précédente crée de la clarté." Los 4 pasos y el cierre se reusan del v1 (`landing/fr.ts`) tal cual, salvo el cierre ajustado a la cadencia "más X, más Y": "Et une fois qu'elle fonctionne, nous la préparons à croître — plus d'intégration, plus d'analytique, plus d'automatisation." Nota de César: "À chaque étape : la discipline de stratégie et de gestion par les résultats qui garde la solution alignée avec l'entreprise — pas comme un service de conseil séparé."

**Equipo y CTA final:** coinciden ~100% con `landing/fr.ts` — se reutilizan sin cambios.

**`/solutions`:** Eyebrow "Solutions" · Título "Trois moments où l'écart se creuse — et comment nous comblons chacun." · Intro "Planifiez mieux, exécutez sans friction, détectez et adaptez à temps. Voici ce que chacune inclut réellement."
- **01 Planifiez mieux**: "De toute façon, vous prenez des décisions tous les jours. La différence, c'est si elles se basent sur ce qui s'est déjà passé, ou sur des modèles qui anticipent ce qui arrive — avant que ce soit urgent." · Incluye: modèles prédictifs pour la demande, les stocks et les goulots d'étranglement · modèles d'optimisation (LP/MIP) qui transforment les contraintes en le meilleur plan possible · systèmes qui apprennent du comportement de votre opération et améliorent leurs recommandations avec le temps · Resultado: "Des décisions basées sur ce qui arrive, pas seulement sur ce qui s'est déjà passé · Des problèmes détectés avant qu'ils n'aient un coût visible." · Capacidades: Recherche opérationnelle et optimisation (LP/MIP) · Stratégie et exécution d'équipes à haute performance
- **02 Exécutez sans friction**: "Chaque processus manuel est un point de défaillance. Nous identifions ceux qui ralentissent votre opération et les transformons en flux automatisés, traçables et fiables." · Incluye: processus manuels convertis en flux automatisés, validés et traçables · ERP, applications, formulaires et messagerie intégrés dans un seul flux d'information · agents IA qui exécutent des tâches répétitives — sans intervention humaine · Resultado: "Une opération qui fonctionne sans goulots d'étranglement, entièrement traçable, capable de croître sans ajouter de complexité." · Capacidades: Applications de gestion des opérations · Développement logiciel — avec ou sans IA · Applications d'efficacité énergétique
- **03 Détectez et adaptez à temps**: "Votre opération génère des données dans plusieurs systèmes. Nous les connectons, les organisons et les transformons en signaux clairs sur lesquels votre équipe peut agir." · Incluye: vos sources de données connectées en un seul endroit — sans consolidation manuelle · tableaux de bord opérationnels mis à jour en temps réel — sans dépendre de rapports manuels · alertes qui arrivent avant que le problème ne devienne visible · Resultado: "Moins de temps à attendre les données · Des décisions qui arrivent quand elles peuvent encore changer le résultat." · Capacidades: Modèles d'IA et de machine learning · Business intelligence de bout en bout

Cierre de página: "Prêt à voir où votre plan et votre opération s'éloignent le plus ?" → "Réservez votre diagnostic gratuit"

**`/terms`:** Título "Conditions d'utilisation" · Dernière mise à jour : 17 juillet 2026 · Loi applicable : Colombie · Contact : contacto@latconservices.com. Mismas 10 secciones que EN/ES, traducidas.

### 1.13 Traducción PT del copy maestro v2 (aprobada)
Portugués brasileño, consistente con el v1 existente (`landing/pt.ts` ya usa "Varejo", terminología BR). Aprobado por Luis (2026-07-17).

**Hero:** H1 "O plano é perfeito — até a operação começar." · Subtítulo "Construímos IA, otimização e software que fecham a lacuna entre o que você planeja e o que realmente acontece." · CTA "Agende seu diagnóstico gratuito" · "30 minutos · sem compromisso" · Rotador: "Quebra primeiro no planejamento." → "...na programação." → "...na execução." → "...na adaptação." (nota: "planejamento" es masculino, los otros 3 femeninos — el portugués maneja bien la alternancia no/na)

**Para quién:** Eyebrow "Para quem" · Título "Trabalhamos com empresas onde os dados, os sistemas e as equipes não conversam entre si"

| Perfil | Cuerpo | Cita | Sectores |
|---|---|---|---|
| Dados sem análise | "Os dados estão lá, mas analisá-los a tempo exige pessoal e horas que a operação não tem disponíveis. Quando o problema aparece em um relatório, já tem um custo." | "Temos os dados, mas não conseguimos usá-los." | Serviços · Varejo · Manufatura · Serviços Financeiros · Mídia |
| Equipes que trabalham em silos | "Vendas promete sem saber o que pode ser produzido. Compras reabastece sem ver a demanda real. Cada área trabalha com sua própria versão dos dados — e ninguém mede o que isso custa." | "Cada área trabalha com números diferentes e ninguém sabe qual é o real." | Manufatura · Varejo · Distribuição · Agroindústria |
| Operação distribuída ou em campo | "Equipes em campo, múltiplas unidades, coordenação por WhatsApp e e-mail. Sem um registro compartilhado, é difícil saber o que aconteceu, quem fez e quando — até que já tenha consequências." | "Coordenamos tudo pelo WhatsApp e ninguém sabe quem fez o quê." | Logística · Agroindústria · Serviços de campo |
| Tecnologia sem integração | "ERP, CRM, plataformas e aplicativos — cada um funcionando separadamente. Sem integração, a operação depende de ajustes manuais e decisões baseadas em dados incompletos." | "Temos vários sistemas, mas nenhum fala com o outro." | Qualquer indústria com operação complexa |

**Soluciones (home):** Eyebrow "Soluções" · Título "Três formas de fechar a lacuna." · Intro "Três capacidades integradas, um único objetivo: manter o que acontece o mais próximo possível do que você planejou."
- 01 **Planeje melhor** — "Modelos de otimização e previsão que transformam suas restrições no melhor plano possível."
- 02 **Execute sem atrito** — "Aplicações e automação que levam o plano para o campo — com rastreabilidade completa."
- 03 **Detecte e adapte a tempo** — "Visibilidade, alertas e agentes de IA que detectam desvios antes que se tornem custo."

**Experiencia:** Eyebrow "Experiência" · Título "Assim se vê fechar a lacuna."

| Industria | Headline | Situación | Construimos | Cambió |
|---|---|---|---|---|
| Agricultura | *Do campo à decisão.* | "A atividade de colheita era registrada em papel — sem forma de medir o avanço frente aos objetivos do programa." | "Uma plataforma de ponta a ponta: captura de dados em campo, cultivos georreferenciados e relatórios operacionais gerados por IA." | "O programa agora monitora seus objetivos com dados de campo ao vivo, não com papéis." |
| Oil & Gas | *Demanda de água atendida ao menor custo energético.* | "Uma planta de injeção de água precisava de configurações de bombeamento que atendessem a demanda sem desperdiçar energia." | "A aplicação web que calcula a configuração ótima de frequência para cada cenário." | "A operação agora funciona no menor custo energético que a demanda permite." |
| Transporte | *Ver a demanda antes de o ônibus chegar.* | "A lotação nas estações era um palpite até o ônibus chegar — tarde demais para ajustar." | "Um piloto de visão computacional que mede a densidade de pessoas nas estações em tempo real." | "O planejamento do serviço agora parte do que acontece na plataforma, não só dos horários fixos." |

**Método:** Eyebrow "Método" · Título "Primeiro entendemos. Depois construímos." · Intro "Cada etapa tem uma entrega concreta. Não avançamos para a próxima até que a anterior gere clareza." Los 4 pasos se reusan de `landing/pt.ts` tal cual. Cierre ajustado: "E quando já funciona, a preparamos para crescer — mais integração, mais analítica, mais automação." Nota de César: "A cada etapa: a disciplina de estratégia e gestão por resultados que mantém a solução alinhada ao negócio — não como uma consultoria à parte."

**Equipo y CTA final:** coinciden ~100% con `landing/pt.ts` — se reutilizan sin cambios.

**`/solutions`:** Eyebrow "Soluções" · Título "Três momentos onde a lacuna se abre — e como fechamos cada um." · Intro "Planeje melhor, execute sem atrito, detecte e adapte a tempo. A seguir, o que cada uma realmente inclui."
- **01 Planeje melhor**: "De qualquer forma, você toma decisões todos os dias. A diferença é se elas se baseiam no que já aconteceu, ou em modelos que veem o que vem — antes que seja urgente." · Incluye: modelos preditivos para demanda, inventário e gargalos · modelos de otimização (LP/MIP) que transformam restrições no melhor plano possível · sistemas que aprendem com o comportamento da sua operação e melhoram suas recomendações ao longo do tempo · Resultado: "Decisões baseadas no que vem, não só no que já aconteceu · Problemas detectados antes de terem um custo visível." · Capacidades: Pesquisa operacional e otimização (LP/MIP) · Estratégia e execução de equipes de alta performance
- **02 Execute sem atrito**: "Cada processo manual é um ponto de falha. Identificamos os que travam sua operação e os transformamos em fluxos automatizados, rastreáveis e confiáveis." · Incluye: processos manuais convertidos em fluxos automatizados, validados e rastreáveis · ERP, aplicativos, formulários e mensageria integrados em um único fluxo de informação · agentes de IA que executam tarefas repetitivas — sem intervenção humana · Resultado: "Uma operação que flui sem gargalos, totalmente rastreável, capaz de crescer sem adicionar complexidade." · Capacidades: Aplicações de gestão de operações · Desenvolvimento de software — com ou sem IA · Aplicações de eficiência energética
- **03 Detecte e adapte a tempo**: "Sua operação gera dados em múltiplos sistemas. Nós os conectamos, organizamos e transformamos em sinais claros para sua equipe agir." · Incluye: suas fontes de dados conectadas em um só lugar — sem consolidação manual · painéis operacionais atualizados em tempo real — sem depender de relatórios manuais · alertas que chegam antes que o problema se torne visível · Resultado: "Menos tempo esperando dados · Decisões que chegam enquanto ainda podem mudar o resultado." · Capacidades: Modelos de IA e machine learning · Business intelligence de ponta a ponta

Cierre de página: "Pronto para ver onde seu plano e sua operação mais se distanciam?" → "Agende seu diagnóstico gratuito"

**`/terms`:** Título "Termos de Uso" · Última atualização: 17 de julho de 2026 · Lei aplicável: Colômbia · Contato: contacto@latconservices.com. Mismas 10 secciones que EN/ES/FR, traducidas.

### 1.14 Fase 3 — Migración i18n a rutas por idioma (ejecutada y verificada)

Alcance: solo estructura de rutas para las páginas que ya existían (home, `/agenda`, `/privacidad`→`/privacy`) — **no** se crearon `/solutions`, `/blog`, `/terms` (siguen siendo Fases 5-6), ni se tocó el rediseño visual (Fase 4). El copy v2 de §1.8-§1.13 tampoco se cableó todavía a `content.ts`/`en.ts`/`fr.ts`/`pt.ts` — la home sigue mostrando el copy v1 (ES) / traducciones v1 existentes (EN/FR/PT), ahora servido en las rutas correctas.

**Arquitectura implementada:** route groups de Next.js con root layouts múltiples — `src/app/(en)/` (sin prefijo, sirve `/`) + `src/app/[locale]/` (`generateStaticParams` → solo `["es","fr","pt"]`, `dynamicParams: false`). Es el patrón oficial de Next.js para locale-por-defecto-sin-prefijo + resto-con-prefijo en `output: "export"` (sin middleware disponible). Detalle técnico completo en `CLAUDE.md` → "Content & i18n".

**Decisiones cerradas en esta fase:**
- **Slug de privacidad: fijo en los 4 idiomas** (`/privacy` siempre, no traducido) — Opción A de las dos evaluadas. Mismo precedente para `/solutions`, `/terms`, `/blog`.
- **`/pt/agenda` — reversión de la decisión de §1.2/§6.5**: en vez de placeholder o formulario de contacto nuevo, usa el mismo `BookingWizard` que los otros 3 idiomas. El backend ya soportaba `locale="pt"` de punta a punta (confirmado: `bookingCopy.ts` ya traía la traducción PT completa del wizard). `/pt/agenda` es simétrica a `/es/agenda`, `/fr/agenda`, `/agenda` — sin caso especial. **Esto reemplaza lo dicho en §1.2 y §6.5 sobre el formulario de contacto en portugués.**

**Se eliminó el sistema de idioma por Context+localStorage** (`LocaleProvider`, `useLandingContent`, `LocaleDocument`) — el locale ahora llega por prop desde la ruta. Efecto secundario positivo: 6 de 8 componentes de sección pasaron de Client a Server Component (menos JS al cliente); First Load JS de la home bajó de ~190 KB a ~175 KB.

**Bugs incidentales corregidos de paso:** `<Link href="/">` roto en el paso 5 del wizard de reserva; `prefetchSlots()` con `locale=es` hardcodeado sin importar el idioma activo; página de privacidad no usaba los campos `metaTitle`/`metaDescription` que ya existían en `privacy.ts`; `staticwebapp.config.json` en la raíz del repo nunca llegaba a `out/` (movido a `public/`); `navigationFallback` enmascaraba 404s reales (reemplazado por `responseOverrides` con 404 real).

**Verificación:** `npm run build` limpio + verificación end-to-end en Chromium real (Playwright, instalado aparte, no como dependencia del proyecto) contra la API de producción real (sin someter una reserva real). Confirmado: cambio de idioma preserva la página actual, `<html lang>` correcto por ruta, hreflang en sitemap y metadata, 404 real para locale inválido, wizard de agenda funcional. Receta de verificación guardada en `.claude/skills/verify/SKILL.md`.

**Housekeeping pendiente detectado durante esta fase (no bloqueante):**
- El banner de cookies (`CookieConsentBanner.tsx`) es un modal real que bloquea toda la página hasta aceptar — confirma la necesidad del rediseño ya especificado en §1.6, todavía no implementado.
- `docs/github-ci.md:92` tenía una referencia desactualizada a la estructura de `out/` — corregida.

### 1.15 Fase 4 — Home v2 ejecutada y verificada (copy + diseño interactivo)

Las 7 sub-fases (A-G) del plan se ejecutaron completas en la rama `portal`: copy v2 cableado en los 4 idiomas (Para quién, Soluciones, Método, Equipo, CTA final + secciones nuevas), paleta oscura real (`--color-bg-deep` redefinida a `#101012`, ya no es el placeholder claro), rotador de frases del hero, sección "Experience" nueva (3 casos, bloques apilados), fix del bug de doble-render de Método + línea conectora animada, tarjetas apiladas de Soluciones (CSS scroll-driven con fallback), 3 gráficos SVG animados por pilar, CTA final oscuro, y sistema de partículas canvas (Hero densidad 100%, CTA final 30% sin mouse-tracking).

**Verificado end-to-end en Chromium real** (no solo build): 0 errores de consola, rotador con las 4 frases accesibles vía `sr-only`, Método renderiza los 4 pasos una sola vez (antes 8 — bug confirmado corregido), Experience muestra los 3 casos, `prefers-reduced-motion` desactiva el canvas de partículas por completo (fallback poster) y congela el rotador en la primera palabra, mobile mantiene los mismos 4 pasos de Método sin duplicar. Capturas de pantalla revisadas visualmente — se detectó y corrigió en el momento que las partículas del Hero se veían demasiado prominentes en reposo (opacidad/tamaño bajados) para cumplir "casi invisibles" del spec.

**Decisión adicional tomada durante la ejecución:** el modelo de datos ingenuo del rotador (prefijo fijo + palabra suelta) se habría roto en portugués, porque la preposición contraída cambia por género palabra a palabra ("**no** planejamento" vs "**na** programação"). Se corrigió a `chipWords: {lead, emphasis}[]`, con el conector resuelto por idioma en el contenido, no en el componente.

**Housekeeping detectado durante la implementación, no crítico:**
- `public/solutions/*.webp` (fotos que usaba el grid viejo de Soluciones) quedaron sin uso — no se borraron; Fase 5 decide su destino al construir `/solutions`.
- `LatconLogo.tsx` sigue sin usarse en ningún lado (ya lo estaba antes de esta fase) — la fuente Nunito de Fase 4 se centralizó aparte en `src/lib/fonts.ts`, no reabre ese componente.
- Espaciado vertical de las tarjetas apiladas de Soluciones en mobile quedó con más espacio en blanco del ideal alrededor del gráfico — funcional, candidato a ajuste fino de altura/aspect-ratio cuando se revise en dispositivo real.

### 1.16 Fase 5 — `/solutions` y `/terms` ejecutadas y verificadas

Arquitectura clonada del molde de `/privacy` (Fase 3): 4 `page.tsx` nuevos (`(en)/solutions`, `[locale]/solutions`, `(en)/terms`, `[locale]/terms`), content-files nuevos (`src/config/landing/solutions.ts` → `getSolutionsPageContent`, `terms.ts` → `getTermsContent`), tipos `SolutionsPageContent`/`TermsContent` en `types.ts` (este último duplica a propósito el shape de `PrivacyContent`, sin generalizar — ver razonamiento en el plan de la fase). `seo.ts`/`sitemap.ts` extendidos con `PageKind` `"solutions"|"terms"`.

**Decisiones de diseño tomadas con Luis para esta fase:**
- El link "Solutions" del navbar pasa de anclar `#solutions` en home a navegar a la página `/solutions` completa (`<Link>` en vez de `<a>` cuando el href no empieza por `#`; `"#solutions"` sale de `NAV_HREFS` del scroll-spy — mismo precedente que `"#para-quien"`, que ya no tenía scroll-spy). El teaser de Soluciones en home sigue existiendo sin cambios de contenido.
- `/solutions` es una página de fondo **claro** (como `/privacy`), con los 3 pilares presentados cada uno en una tarjeta oscura tipo "museo" (reutiliza `.solution-card-surface` de `globals.css` tal cual — es puramente visual, sin el `position:sticky` del teaser) que contiene el `SolutionGraphic` correspondiente — no una página oscura completa ni alternancia de secciones como en home.
- Las tarjetas del teaser de Soluciones en home ahora enlazan a `/solutions#plan|execute|adapt` (cumple el plan maestro §5.3: "cada tarjeta enlaza a su ancla en /solutions").
- Footer suma un segundo link ("Terms of use"/"Términos de uso"/etc.) junto al de Privacy.

**Vacíos de contenido resueltos en esta fase** (no estaban en el copy aprobado de §1.8-§1.13, se redactaron siguiendo el tono ya validado en `privacy.ts`):
- Labels de los 3 grupos de bullets de `/solutions` ("Qué incluye"/"Resultado"/"Capacidades" y equivalentes EN/FR/PT) — el doc original los tenía en español incluso dentro de la sección en inglés, no eran copy final.
- Meta tags (`metaTitle`/`metaDescription`) de ambas páginas en los 4 idiomas — no estaban definidos, se siguió el patrón `"X — Latcon"` ya usado en `privacy.ts`.
- **Traducción ES/FR/PT completa de `/terms`** — el copy aprobado en §1.8-§1.13 solo redactaba el body completo en inglés; los otros 3 idiomas solo tenían la estructura (10 puntos) documentada, no el texto. Se tradujo con el mismo registro legal de `privacy.ts` (mismo email de contacto, mismo formato de fecha). **Igual que la versión EN, las 4 versiones de `/terms` quedan como borrador pendiente de revisión legal antes de publicar** — no es un requisito nuevo, ya estaba abierto para EN.

**Verificado end-to-end en Chromium (Playwright)**: 26 checks automatizados sin fallos — carga de las 8 páginas nuevas (2 páginas × 4 idiomas) sin errores de consola, `<html lang>` correcto, hreflang completo (5 entradas), `sitemap.xml` con las 8 URLs nuevas, click en cada tarjeta del teaser de home aterriza en el ancla correcta de `/solutions` en los 4 idiomas, navbar "Solutions" navega en vez de scrollear, footer con los 2 links, scroll-spy del resto de secciones de home intacto tras el cambio en `NAV_HREFS`, `prefers-reduced-motion` congela los gráficos SVG dentro de las tarjetas.

**Nota de proceso sobre la revisión visual**: la primera captura de pantalla `fullPage` de `/solutions` pareció mostrar la 3ª tarjeta (Adapt) y el cierre con CTA como ausentes (gran espacio en blanco antes del footer). Se investigó antes de asumir que era un bug real: con scroll incremental manual (en vez de un `fullPage` screenshot instantáneo) las 3 tarjetas y el cierre se ven completos — era un artefacto del propio script de verificación (Framer Motion `whileInView` no llega a disparar su `IntersectionObserver` en el instante en que Playwright redimensiona el viewport para la captura completa), no un problema de la página. Se confirmó además, por separado, que un deep-link directo a `/solutions#adapt` (el flujo real que produce el click en la tarjeta del teaser) muestra la sección con `opacity: 1` de inmediato — el caso de uso real está cubierto.

**Housekeeping ejecutado**: `public/solutions/*.webp` (3 fotos huérfanas del grid viejo, cero referencias en `src/`) eliminadas — los 3 `SolutionGraphic` SVG ya cubrían el mismo rol visual por pilar.

### 1.17 Fase 6 — Blog ejecutado y verificado (arquitectura + 3 posts en inglés)

**Decisión de alcance (confirmada con Luis):** los 3 posts se redactaron y publicaron en inglés únicamente. `/es/blog`, `/fr/blog`, `/pt/blog` existen y muestran un estado "próximamente" honesto en su idioma — no listan contenido en inglés disfrazado de traducción. Mismo flujo EN-primero-luego-traduce usado en todo el resto del copy v2; la traducción de los 3 posts a ES/FR/PT queda como fast-follow explícito (ver "Aún abiertos"), no un olvido.

**Arquitectura**: contenido como datos TS tipados (`src/config/blog/{types,en,es,fr,pt,index}.ts`), no MDX — el repo no tenía ninguna dependencia de Markdown y con solo 3 posts en v1 no se justificaba agregar ese tooling. Un post es `{slug, title, excerpt, metaDescription, date, dateLabel, topic, body: BlogBlock[]}`, con `body` como bloques tipados (`paragraph`/`heading`/`list`) — type-checked en build. El tiempo de lectura se calcula en runtime desde el conteo de palabras (`src/lib/readingTime.ts`), no es un campo de contenido que pueda quedar desactualizado. `es.ts`/`fr.ts`/`pt.ts` son arrays vacíos hoy — poblarlos después no requiere tocar ningún otro archivo (`getBlogPosts`/`getBlogSlugs`/`generateStaticParams` ya leen de ahí dinámicamente).

**Los 3 posts publicados** (~500-650 palabras cada uno, sin métricas fabricadas, casos anónimos consistentes con los ya aprobados en §1.8):
1. *"Why your field data still lives on paper — and what that's costing you"* (Field productivity, 30-jun-2026) — ligado al caso de Agricultura.
2. *"The real cost of energy inefficiency in production"* (Energy, 9-jul-2026) — ligado a los casos de Oil & Gas.
3. *"Early warning, not the fire alarm"* (Risk & resilience, 18-jul-2026) — sobre operaciones en general, sin reclamar casework de clima que Latcon no tiene, tal como exigía §1.10.

**Gotcha real de Next.js `output:"export"` encontrado y resuelto**: `src/app/[locale]/blog/[slug]/page.tsx` (la ruta para posts traducidos) rompía el build con *"Page ... is missing generateStaticParams()"* — un mensaje engañoso, porque la función sí existía. La causa real: con 0 posts traducidos hoy, `generateStaticParams` devuelve `[]` para **las 3 variantes de locale a la vez**, y Next.js no acepta una ruta dinámica anidada que resuelva a cero páginas en absolutamente todas las variantes del padre bajo export estático. **Se eliminó ese archivo** (no se puede dejar "pre-escrito y vacío" — Next no lo permite). Queda documentado aquí como el primer paso de la traducción del blog: crear `src/app/[locale]/blog/[slug]/page.tsx` clonando el patrón ya usado en `[locale]/solutions/page.tsx`/`[locale]/terms/page.tsx` (`generateStaticParams({params}) { return getBlogSlugs(params.locale).map(slug => ({slug})) }`, `dynamicParams = false`) — trivial una vez que `es.ts` (o el locale que sea) tenga al menos un post real. El índice `[locale]/blog/page.tsx` sí existe y funciona hoy (no tiene este problema, no es una ruta dinámica anidada).

**Nav**: "Blog" agregado al final de `site.nav` en los 4 idiomas (plan maestro §5.1 ya lo pedía), reutiliza el mismo render condicional `<Link>` de Navbar.tsx que ya se generalizó en Fase 5 — cero cambios a `Navbar.tsx` en esta fase.

**Verificado con Playwright**: 18 checks sin fallos — `/blog` + 3 posts cargan sin errores de consola, `/es|fr|pt/blog` muestran el estado "próximamente" en su idioma (no vacío, no error), un slug en inglés visitado bajo `/es/blog/` da 404 real, nav "Blog" navega en los 4 idiomas, sitemap incluye el índice (4 locales) + los 3 posts (solo `en`, confirmado que NO incluye URLs `/es/blog/<slug>` falsas), tiempos de lectura calculados razonables (2-3 min). Revisión visual (con el mismo método de scroll incremental que evitó el artefacto de Fase 5): jerarquía tipográfica limpia, CTA de cierre a `/agenda` en cada post, mobile con line-length legible.

Sin teaser de blog en home — el plan maestro §7 lo marca explícitamente como opcional, se deja fuera para no tocar `HomePageBody.tsx` sin necesidad.

---

## 2. Aún abiertos

- **Revisión legal de `/terms`** antes de publicar (el borrador es razonable pero no reemplaza revisión de un abogado), en los 4 idiomas — incluye las traducciones ES/FR/PT redactadas en Fase 5 (§1.16), no solo el EN original.
- **Traducción de los 3 posts del blog a ES/FR/PT** (§1.17) — decisión explícita de lanzar solo en inglés primero; la arquitectura ya soporta agregarlos sin tocar código, salvo recrear `src/app/[locale]/blog/[slug]/page.tsx` (trivial, ver gotcha en §1.17) en cuanto exista el primer post traducido.
- **Sesión de fotos del equipo** — acción externa de Luis, no bloquea nada; el hover duotono→color de Equipo sigue sin implementarse hasta que existan.
- **Banner de cookies no-modal** (§1.6) — dirección ya definida, todavía no implementado.
- **Ajuste fino del espaciado mobile de las tarjetas de Soluciones** (home) y revisión visual en dispositivos reales (no solo Chromium desktop/mobile emulado) — ver §1.15.
- **Lighthouse mobile real** (el criterio de aceptación ≥90 no se ha corrido formalmente todavía) — pendiente antes de considerar el sitio 100% cerrado para producción; Fase 7 del plan maestro.

---

## 3. Historial de fases ejecutadas

| Fecha | Fase | Resultado |
|---|---|---|
| 2026-07-17 | Fase 1 — Auditoría + CLAUDE.md + docs | Diagnóstico completo del repo vs. los 2 docs nuevos; `CLAUDE.md` actualizado con posicionamiento v2, reglas de copy, i18n objetivo y reglas de animación; este documento creado. Trabajo hecho en la rama `portal`. |
| 2026-07-17 | Fase 2 — Copy maestro EN | Hero (con rotador resuelto), Para quién, Soluciones (home), Experiencia, Método, Equipo, CTA final, `/solutions` completo y `/terms` completo — todo en inglés, redactado a partir del copy ES real de `content.ts`. Ver §1.8. Aún sin implementar en código. |
| 2026-07-17 | Limpieza de huérfanos + traducción ES | Eliminados `Problems.tsx`, `Verticals.tsx`, `VerticalBlockExpandables.tsx` y `src/config/site.ts` (ver §1.9); `npm run build` verificado. Traducción ES completa del copy v2 aprobada (§1.11). Temas de blog aprobados (§1.10). |
| 2026-07-17 | Traducción FR + PT | Copy maestro v2 completo en francés (§1.12) y portugués (§1.13), aprobados por Luis. Con esto, los 4 idiomas (EN/ES/FR/PT) del copy v2 quedan completos y documentados — ninguno implementado en código todavía. |
| 2026-07-18 | Fase 3 — Migración i18n | Rutas por idioma reales implementadas (route groups `(en)` + `[locale]`), slug fijo `/privacy`, reversión de `/pt/agenda` a wizard normal, Context de idioma eliminado, verificado end-to-end en navegador real. Ver §1.14. Copy v2 aún no cableado (sigue siendo Fase 4). |
| 2026-07-18 | Fase 4 — Home v2 | Copy v2 cableado en 4 idiomas, paleta oscura real, rotador del hero, sección Experience nueva, fix de Método + línea conectora, tarjetas apiladas de Soluciones + 3 SVGs, CTA final oscuro, sistema de partículas. Verificado en Chromium (funcional + visual). Ver §1.15. Falta Lighthouse formal y revisión en dispositivos reales. |
| 2026-07-18 | Fase 5 — `/solutions` + `/terms` | Páginas nuevas construidas en los 4 idiomas sobre el molde de `/privacy`; navbar "Solutions" ahora navega a la página; tarjetas del teaser de home enlazan a sus anclas; footer suma link a Terms; labels/meta/traducción ES-FR-PT de `/terms` redactados (vacíos que no cubría el copy aprobado). Verificado con 26 checks Playwright sin fallos. Ver §1.16. `/terms` sigue pendiente de revisión legal en los 4 idiomas. |
| 2026-07-18 | Fase 6 — Blog | Arquitectura de contenido (datos TS tipados, sin MDX) + 3 posts redactados y publicados en inglés; `/es\|fr\|pt/blog` con estado "próximamente" honesto; nav "Blog" en los 4 idiomas. Verificado con 18 checks Playwright sin fallos. Ver §1.17 (incluye gotcha real de Next static export con rutas dinámicas anidadas vacías). Traducción ES/FR/PT queda como fast-follow explícito. |
