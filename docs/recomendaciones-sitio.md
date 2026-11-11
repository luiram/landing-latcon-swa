# LATCON · Recomendaciones de mejora
## Sitio web, CRM y ERP

**Documento de trabajo** · v2 · Septiembre 2026
Base de análisis: contenido publicado en latconservices.com

---

## 0. Resumen de decisiones

| Frente | Decisión | Prioridad |
|---|---|---|
| Sitio web | **Un solo frente.** Mismo dominio y código que hoy. El contenido de la landing se redistribuye por las secciones y el home queda como distribuidor, más liviano que la landing actual | Alta — inmediata |
| CRM | Desarrollo propio. Uso interno primero, producto después | Alta |
| ERP · capa operativa | Desarrollo propio (proyectos, horas, costos, márgenes) | Media |
| ERP · capa fiscal-contable | **No desarrollar.** Integrar por API con proveedor habilitado DIAN | Decisión cerrada |
| Núcleo compartido | Construir el CRM/ERP sobre un core multi-tenant que reusen Florasens, AgriCount, IMS Fairtrade y la plataforma de ventas | Condición de viabilidad |

---

# PARTE 1 · SITIO WEB

> **Decisión de partida.** El proyecto es **un sitio web**, no una landing más un sitio. Mismo dominio y mismo código base que hoy, y **no hay fase previa de "arreglar la landing"**: sus ajustes se ejecutan como parte de la construcción del sitio.
>
> Pero landing y home no son el mismo objeto. Una landing es un embudo: acumula todo en un scroll porque no hay a dónde más ir. Un home es un distribuidor: orienta en diez segundos y reparte hacia las secciones. **El contenido de la landing actual es la materia prima del sitio y se redistribuye (§1.5); el home resultante queda más liviano que la landing de hoy, no más pesado.**
>
> Razones para no tener dos propiedades: compiten entre sí en búsqueda y ninguna acumula autoridad; con tres socios, mantener dos sitios significa dos despliegues, dos analíticas y dos formularios que conectar al CRM, con la garantía de que uno se desactualiza; y el copy actual es el mejor activo que hay hoy, así que se reparte, no se duplica ni se archiva.
>
> La excepción son las **landings de campaña por feria** (§1.8): esas sí son embudos, efímeros y dentro del mismo dominio.

## 1.1 Dos ajustes que no esperan al sitio

Todo lo demás se ejecuta con el sitio. Estos dos no, y por razones distintas:

**a. Footer legal y de contacto.** El sitio está publicado hoy y captura datos personales sin autorización explícita de tratamiento. Es exposición viva frente a la Ley 1581 de 2012, no un pendiente de diseño.

- LATIN CONSULTING SERVICES SAS · NIT 901.229.904-6 · Responsable de IVA
- Cra 7 Este 7-100, Cajicá, Cundinamarca
- +57 318 397 1073 · contacto@latconservices.com
- Enlaces: Privacidad · Política de tratamiento de datos
- En el formulario: casilla explícita de autorización, no premarcada, con enlace a la política

**b. Instrumentación.** La señal de origen no se reconstruye hacia atrás: cada semana sin medir es una semana de datos perdida para siempre, y el CRM la va a necesitar desde su primer día.

- Analítica de comportamiento (scroll, clics de CTA, abandono)
- UTM estructuradas por feria, canal y campaña
- Campo oculto de origen en todos los formularios

Ambos son de esfuerzo bajo y no dependen de ninguna decisión de diseño pendiente.

## 1.2 Diagnóstico del contenido actual

Lo que ya funciona y se conserva tal cual en el home:

- El copy arranca por el dolor del cliente, no por la tecnología.
- La sección "Para quién" está bien construida: cuatro dolores, cada uno con la frase textual que dice el cliente y los sectores donde aplica. Es el activo más fuerte de la página.
- Las tres soluciones tienen estructura consistente: qué es, lo que incluye, resultado.
- Hay un solo CTA y es de baja fricción (diagnóstico gratuito de 30 minutos, sin compromiso).

Lo que falta:

| Vacío | Consecuencia | Se resuelve en |
|---|---|---|
| Cero prueba: sin casos, cifras ni clientes | El tráfico frío no tiene razón para confiar. Hoy no hay ningún proyecto publicable como caso, así que la prueba se construye con sectores y capacidad | §1.5 y páginas de sector |
| No hay evidencia de capacidad de construir producto | El pilar 5 (soluciones digitales) no aparece en ninguna parte | §1.7 |
| Sectores como etiquetas, no como páginas | Sin superficie de búsqueda ni destino para el QR de una feria | §1.6 |
| Una sola salida de conversión | El visitante que no está listo para agendar no tiene qué hacer | §1.5 |
| Sin NIT, dirección, teléfono ni correo en el footer | Resta credibilidad B2B | §1.1 |
| Formulario sin autorización de tratamiento de datos | Exposición frente a Ley 1581 de 2012 | §1.1 |
| Bios por años de experiencia ("15", "10+", "5+") | Invita a comparar socios entre sí | §1.5 |
| Sin instrumentación analítica | Imposible saber qué feria o canal trae negocios | §1.1 |

## 1.3 Mapa del sitio

Estructura basada en el patrón de [tryolabs.com](https://tryolabs.com), el comparable más cercano en el mercado (consultora de IA y datos en LatAm, con clientes industriales), adaptada al tamaño real de LATCON.

```
latconservices.com
│
├── [1]  /                                  HOME — distribuidor, no embudo (§1.5)
│         ├─ #hero                          Propuesta de valor + CTA único
│         ├─ #prueba                        Franja de casos → /sectores
│         ├─ #para-quien                    4 tarjetas cortas → /sectores/<sector>
│         ├─ #soluciones                    3 tarjetas de familia → /soluciones
│         ├─ #metodo                        4 etapas en una línea → /metodo
│         └─ #cierre                        CTA final + footer completo
│
├── [2]  /soluciones                        OVERVIEW — las 3 familias
│    │
│    │   ── FAMILIA A · DEFINIR Y MEDIR ──
│    ├── [3]  /soluciones/estrategia-e-indicadores   "No sé qué medir"
│    │         ├─ #despliegue-de-objetivos           De la estrategia a la ejecución
│    │         ├─ #diseno-de-indicadores             Qué medir y con qué meta
│    │         ├─ #rppa                              Rutina de gestión en el nivel operativo
│    │         └─ #acompanamiento-directivo
│    │
│    │   ── FAMILIA B · CAPTURAR Y VER ──
│    ├── [4]  /soluciones/captura-de-datos           "No tengo el dato"
│    │         ├─ #sensores-y-actuadores             IoT en cultivo
│    │         ├─ #captura-movil → [22]
│    │         └─ #drones → [5]
│    │
│    ├── [5]  /soluciones/drones                     Módulo de tecnología agrícola aérea
│    │         ├─ (#pulverizacion retirada, ADR 0007)
│    │         ├─ #monitoreo-multiespectral          Mavic 3 Multispectral
│    │         ├─ #posicionamiento-rtk               D-RTK 3
│    │         ├─ #del-dato-a-la-decision            → enlaza a la familia C
│    │         └─ #como-trabajamos                   Entendemos · Diseñamos · Validamos · Implementamos
│    │
│    ├── [6]  /soluciones/visibilidad-operativa      "No sé qué está pasando"
│    │         ├─ #tableros-e-indicadores            → enlaza a [3] y a [9]
│    │         └─ #reporteria-automatica
│    │
│    │   ── FAMILIA C · AUTOMATIZAR Y DECIDIR ──
│    ├── [7]  /soluciones/automatizacion             "Lo sé, pero todo es manual"
│    │         ├─ #extraccion-de-documentos
│    │         ├─ #flujos-y-aprobaciones
│    │         └─ #agente-de-whatsapp → [24]
│    │
│    ├── [8]  /soluciones/inteligencia-predictiva    "Reacciono tarde"
│    │         ├─ #vision-por-computador → [23]
│    │         ├─ #deteccion-de-anomalias
│    │         └─ #pronostico-y-optimizacion
│    │
│    └── [9]  /soluciones/zero-touch                 "Sé qué va a pasar, pero igual me toca a mí"
│              ├─ #comprension-sin-friccion          Preguntar en lenguaje natural, sin tablero
│              ├─ #resolucion-de-extremo-a-extremo   Detectar, decidir, ejecutar y cerrar
│              ├─ #arquitectura-agentica             Cómo funciona por dentro
│              └─ #control-y-trazabilidad            Límites, aprobación humana, auditoría
│
├── [10] /sectores                          OVERVIEW — rejilla de casos por sector
│    ├── [11]  /sectores/agroindustria      cacao, aguacate — entrada natural a [5]
│    ├── [12]  /sectores/energia-petroleo-gas
│    ├── [13]  /sectores/avicultura
│    └── [14]  /sectores/floricultura
│
├── [15] /desarrollo-a-la-medida             Pilar 5 · lo que construimos, sin nombrar clientes (§1.7)
├── [16] /metodo                             Las 4 etapas en detalle + qué es la Fase 0
├── [17] /nosotros                          Equipo y trayectoria
├── [18] /agenda                            Formulario + calendario
├── [19] /recursos                          Índice
│         └─ /recursos/<slug>               Artículo, guía o descargable  (n páginas)
│
├── [20] /privacidad
├── [21] /tratamiento-de-datos
│
│  ── PÁGINAS POR PROBLEMA · etapa 4, no en el arranque (§1.3b) ──
├── [22] /soluciones/captura-en-campo-sin-conexion
├── [23] /soluciones/conteo-por-vision-artificial
├── [24] /soluciones/agente-de-whatsapp
├── [25] /soluciones/trazabilidad
│
├──      /lp/<evento>                       Landings de campaña (§1.8)   (por feria)
│         ├─ /lp/drones                     Embudo comercial de la línea (§1.6)
│         ├─ /lp/alimentec-2026
│         └─ /lp/congreso-cacao-2026
│
├──      /productos                         APLAZADO — solo cuando haya producto publicable (§1.7)
│         ├─ /productos/florasens           (en desarrollo)
│         └─ /productos/ims-fairtrade       (en desarrollo)
│
└──      /sitemap.xml · /robots.txt         Archivos técnicos, no páginas
```

**Las 21 páginas de la construcción inicial** son las numeradas [1] a [21]; las [22] a [25] son promociones posteriores (§1.3b). Fuera de esa cuenta quedan tres grupos, y por razones distintas:

- `/recursos/<slug>` — son n páginas que crecen con la cadencia editorial, no un alcance fijo.
- `/lp/<evento>` — se crean por feria, según el calendario comercial.
- `/productos` y sus hijas — aplazadas hasta que haya producto publicable (§1.7). Cuando entren, el sitio pasa a 28 páginas.

Tryolabs tiene alrededor de cincuenta. La diferencia es deliberada: con tres socios, cada página adicional es contenido que hay que escribir y mantener.

**El segundo nivel de soluciones son anclas, no páginas.** Es lo que hace la referencia: su menú enlaza directo a `/services/generative-ai#ai-agents-&-copilot`, una sección dentro de la página del servicio, no una página propia. Así el menú puede listar los problemas concretos (que es lo que la gente busca) sin producir diez páginas flacas que nadie mantiene. Si más adelante una de esas anclas acumula suficiente contenido y tráfico propio, se promueve a página.

**El mapa como embudo.** Cada página necesita saber qué pregunta responde, a dónde manda al que sigue interesado y qué le ofrece al que todavía no quiere hablar con nadie.

| # | Ruta | La pregunta que responde | Etapa | Siguiente paso | Salida si no está listo |
|---|---|---|---|---|---|
| 1 | `/` | ¿Esto es para mí? | Descubrir | Su sector | Autodiagnóstico |
| 10 | `/sectores` | ¿Han trabajado en lo mío? | Descubrir | Su sector | Recursos |
| 11–14 | `/sectores/<sector>` | ¿Qué hicieron en mi sector? | Evaluar | Agenda | Descargable del sector |
| 2 | `/soluciones` | ¿Por dónde empiezo yo? | Evaluar | La solución que le cuadre | Autodiagnóstico |
| 3 | `/soluciones/estrategia-e-indicadores` | ¿Por dónde arranco si no tengo nada? | Evaluar | Agenda | Checklist de Fase 0 |
| 4, 6–9 | `/soluciones/<solución>` | ¿Cómo se ve esto resuelto? | Evaluar | Casos del sector | Recursos |
| 5 | `/soluciones/drones` | ¿Qué pueden hacer por mi cultivo desde el aire? | Evaluar | Agenda | Descargable de drones |
| 22–25 | Páginas por problema | Busqué mi problema exacto en Google | Descubrir | Su solución padre | Autodiagnóstico |
| 15 | `/desarrollo-a-la-medida` | ¿Saben construir o solo asesorar? | Evaluar | Método | Recursos |
| 16 | `/metodo` | ¿Cómo trabajan y qué me van a pedir? | Evaluar | Agenda | Checklist de Fase 0 |
| 17 | `/nosotros` | ¿Quiénes son y puedo confiar? | Decidir | Agenda | LinkedIn |
| 18 | `/agenda` | Quiero hablar con ustedes | Decidir | — | Correo directo |
| 19 | `/recursos` | ¿Saben de lo que hablan? | Descubrir | Sector o solución | Suscripción |
| 20–21 | Legales | Obligación legal | — | — | — |
| — | `/lp/<evento>` | Escaneé el QR del stand | Descubrir | Agenda | Descargable |

**Decisión tomada sobre la etapa de decisión.** El sitio **no publica** contexto de precio, plazos, propiedad intelectual ni garantía. Se sigue el patrón de la referencia, que tampoco lo hace: su navegación es Services · AI for Good · Industry cases · Company · Resources · Blog · Contact us, sin ninguna página de precio ni de condiciones. Todo desemboca en agendar.

Queda como decisión consciente, no como omisión. **Señal para revisarla:** si en el CRM aparecen leads que llegan a `/agenda` y no agendan, o prospectos que en la primera llamada arrancan preguntando cuánto cuesta antes de hablar del problema, el hueco está costando y conviene reabrir el punto.

## 1.3b Páginas por problema: el tercer eje

La referencia no organiza todo en un solo eje. Tiene tres: **servicios** agrupados por etapa, **industrias**, y **aplicaciones concretas con URL propia**. Ese tercer eje es el que captura las búsquedas por problema: `/services/price-optimization` es una página completa dedicada a conseguir el mejor precio posible para cada ítem en cada momento, no un ancla dentro de otra.

La propuesta anterior de este documento ponía todo el segundo nivel como anclas. Eso está demasiado apretado: **un ancla no tiene URL propia, así que no captura búsqueda.** El patrón correcto es mixto, como el de ellos: las de poca demanda quedan como anclas, las que la gente busca se promueven a página.

Candidatas para LATCON, por demanda real en español:

| Página | Búsqueda que captura | Sale de |
|---|---|---|
| `/soluciones/captura-en-campo-sin-conexion` | "app captura datos campo sin internet" | Captura de datos |
| `/soluciones/conteo-por-vision-artificial` | "conteo automático con cámara / visión artificial" | Inteligencia predictiva |
| `/soluciones/agente-de-whatsapp` | "agente de WhatsApp con IA para empresas" | Automatización |
| `/soluciones/trazabilidad` | "trazabilidad cacao / trazabilidad agrícola" | Visibilidad operativa |

**Van en la etapa 4, no en el arranque.** Cada una es contenido real que hay que escribir y mantener, y publicarlas vacías es peor que no tenerlas. Primero el núcleo de 21 páginas; estas entran cuando haya con qué llenarlas y, si es posible, con un caso propio de respaldo.

### Dos decisiones de navegación

**a. Qué eje va primero en el menú.** Hoy el mapa pone `/soluciones` antes que `/sectores`. Pero los compradores de LATCON llegan anclados en su industria —cacao, aguacate, petróleo y gas— no en una categoría de solución, y `/sectores` es además la prioridad de construcción. Recomiendo invertirlo en el menú: **Sectores primero, Soluciones después.** La numeración del mapa se mantiene por orden de construcción, no de menú.

**b. Etiquetas en lenguaje de comprador, con la técnica de la referencia.** Ellos hacen tres cosas en el menú a la vez: familia en verbo corto, **una frase explicativa debajo de la familia dentro del propio desplegable**, y las hijas nombradas por resultado (AI Agents, Video analytics, Build your AI team). Bajo Discovery & strategy la frase dice que las preguntas correctas son la base de la hoja de ruta; bajo Build & develop, que es colaboración práctica para entregar IA lista para producción.

Aplicado a LATCON:

| Familia (verbo corto) | Frase debajo, en el menú |
|---|---|
| **Definir y medir** | Qué medir, con qué meta y cómo sostener la rutina |
| **Capturar y ver** | Del sensor y el dron al tablero que sí se usa |
| **Automatizar y decidir** | Que el proceso corra solo y avise antes de fallar |

Y las hijas por resultado, no por tecnología:

| Ruta | Etiqueta interna | Etiqueta en el menú |
|---|---|---|
| `/soluciones/visibilidad-operativa` | Visibilidad operativa | Ver qué pasa en la operación |
| `/soluciones/zero-touch` | Zero-touch | Que se resuelva solo |
| `/soluciones/inteligencia-predictiva` | Inteligencia predictiva | Anticipar lo que va a fallar |
| `/desarrollo-a-la-medida` | Capacidad | Lo que construimos |
| `/soluciones/estrategia-e-indicadores` | Estrategia e indicadores | Definir qué medir |

Nadie busca "capacidad" ni "zero-touch".

**La prueba de validación:** dele el sitio a alguien que no lo conozca y pídale encontrar en cinco minutos qué hace LATCON por su industria y un caso con cifras. Si alguna toma más de tres clics o genera confusión, el mapa tiene un problema, por bueno que sea el diseño.

## 1.4 Sistema de diseño: chasis, primitivas y secciones

Como el sitio entero se ensambla a partir del home, lo primero es separar sus partes para poder reutilizarlas. Hoy están "pegadas" a esa página.

**Tokens de marca** — alinear con los documentos comerciales para que web y propuestas se vean de la misma empresa:

| Token | Valor | Uso |
|---|---|---|
| Azul corporativo | `#152033` | Fondos oscuros, encabezados |
| Verde acento | `#16A34A` | CTA, resultados, confirmaciones |
| Naranja logo | *(por confirmar)* | Solo marca |
| Tipografía web | *(por definir)* | Documentos usan Arial |

### Por qué no una lista plana de componentes

La primera versión de este documento proponía siete componentes con nombre de contenido: `BloqueDolor`, `TarjetaCaso`, `TarjetaProducto`, `TarjetaPersona`… Es la forma intuitiva de empezar y es la que falla primero, por tres razones:

**a. Están todos en la misma capa.** En términos de diseño atómico, los siete son *organismos*: secciones completas de página. No hay capa debajo (el botón, la etiqueta, la tarjeta genérica) ni capa encima (el layout de página). Consecuencia: `TarjetaCaso`, `TarjetaProducto` y `TarjetaPersona` son la misma tarjeta —imagen, título, texto, enlace— construida tres veces. Cambiar el radio de las esquinas son tres ediciones.

**b. Están nombrados por contenido, no por estructura.** Eso garantiza proliferación. Ya pasó dos veces en la elaboración de este documento: al aparecer la línea de drones y al aparecer la familia de estrategia, el instinto era crear `TarjetaDron` y `TarjetaPilar`. La lista sobrevivió solo porque las forzamos dentro de `TarjetaSolucion`, que en la tabla de ensamble termina haciendo cinco trabajos distintos. Con cinco líneas de servicio y 21 páginas, esa lista se rompe.

**c. Falta el chasis.** No hay header, footer, navegación de anclas, breadcrumb ni layout de página. Y con siete páginas de solución que tienen anclas internas, la navegación de anclas no es opcional.

**La prueba que decide:** *si mañana entra una línea de servicio nueva, ¿necesito un componente nuevo?* Con la lista plana, sí. Con lo que sigue, no.

### La estructura que propongo: tres capas

No la ceremonia completa del diseño atómico —cinco niveles con nomenclatura química son burocracia para un equipo de tres— sino la versión mínima que escala. Cerca de veinte piezas en total, que es donde una jerarquía ligera empieza a pagar.

**Capa 0 · Chasis** (3 piezas, se escriben una vez)
`Header` con el menú de 3 familias · `Footer` con datos legales (§1.1) · `LayoutPagina` con título, meta y breadcrumb

**Capa 1 · Primitivas** (7 piezas)
`Boton` · `Etiqueta` (tags de sector) · `Titulo` · `Texto` · `Enlace` · `Imagen` · `Cita`

**Capa 2 · Piezas** (4 piezas)
`Tarjeta` — imagen, antetítulo, título, texto, enlace. **Una sola, con variantes de densidad**, no una por tipo de contenido
`Paso` — numeral + título + descripción (sirve al método y al "cómo trabajamos" de drones)
`ItemLista` · `CampoFormulario`

**Capa 3 · Secciones** (7 piezas — lo que se arrastra para armar una página)
`Hero` — variantes: home, interior, campaña con video
`GridDeTarjetas` — 2, 3 o 4 columnas. No sabe qué contiene
`TextoConImagen` — bloque alternado, izquierda o derecha
`Timeline` — secuencia de `Paso`
`NavAnclas` — índice lateral o superior de las anclas de la página
`FranjaPrueba` — sectores hoy; casos y logos cuando existan proyectos cerrados y publicables
`BandaCTA` — titular + botón + micro-copy

**La diferencia de fondo:** `GridDeTarjetas` no sabe si contiene casos, productos, personas o soluciones. Eso es **dato**, no componente. "TarjetaCaso" deja de existir como pieza y pasa a ser un contenido que se le entrega a `Tarjeta`.

### Cómo se ensambla cada página

Una página es el chasis más una secuencia de secciones. Nada más:

| Página | Secuencia de secciones |
|---|---|
| `/` | Hero · FranjaPrueba · GridDeTarjetas(4 dolores) · GridDeTarjetas(3 familias) · Timeline·compacto · BandaCTA |
| `/soluciones` | Hero · GridDeTarjetas(3 familias) · GridDeTarjetas(7 páginas) · BandaCTA |
| `/soluciones/<cualquiera>` | Hero · NavAnclas · TextoConImagen ×n · GridDeTarjetas(casos) · BandaCTA |
| `/soluciones/drones` | Hero · NavAnclas · TextoConImagen ×4 · Timeline · BandaCTA |
| `/sectores` | Hero · GridDeTarjetas(casos por sector) · BandaCTA |
| `/sectores/<sector>` | Hero · TextoConImagen(dolor) · GridDeTarjetas(soluciones) · FranjaPrueba · Timeline·compacto · BandaCTA |
| `/metodo` | Hero · Timeline·completo · TextoConImagen(Fase 0) · BandaCTA |
| `/nosotros` | Hero · GridDeTarjetas(3 socios) · TextoConImagen(trayectoria) · BandaCTA |
| `/desarrollo-a-la-medida` | Hero · GridDeTarjetas(capacidades) · BandaCTA |
| `/agenda` | Hero · CampoFormulario ×n · BandaCTA |
| `/recursos` | Hero · GridDeTarjetas(artículos) · BandaCTA |
| `/lp/<evento>` | Hero·campaña · TextoConImagen · BandaCTA |

Las siete secciones cubren las 21 páginas. Y `/soluciones/<cualquiera>` es una sola fila para siete páginas: esa es la señal de que la estructura está bien, porque estrategia, drones y zero-touch se arman igual y solo cambia el contenido.

**Lo que esto compra:** una línea de servicio nueva no necesita nada nuevo, solo contenido. Un cambio en el botón se hace en `Boton` y baja a todo el sitio. Y crear una página de sector deja de ser diseño y pasa a ser escribir.

Es la misma lógica del núcleo compartido de la Parte 2, aplicada al diseño en vez de al código: separar lo que es mecánica reutilizable de lo que es contenido específico.

**Una salvedad honesta:** esto cuesta más que la lista de siete al arrancar. Se paga en la tercera o cuarta página, y las 21 están en el plan. Si el sitio fueran cinco páginas, la lista plana sería la respuesta correcta.

**Herramienta:** conviene un catálogo visual de las piezas (Storybook o equivalente) para que cualquiera —John, tú o alguien externo— vea qué existe antes de inventar algo nuevo. Sin ese catálogo, en seis meses hay tres botones distintos.

## 1.5 El home: distribuidor, no embudo

El home actual es una landing: seis bloques largos, cada uno con su desarrollo completo, en un solo scroll. Funciona cuando no hay a dónde ir. Con un sitio detrás, ese mismo contenido se vuelve un obstáculo: el visitante lee mucho antes de llegar a lo suyo, y las páginas interiores nacen vacías porque su contenido se quedó en el home.

**A dónde se va cada bloque de la landing actual:**

| Bloque de hoy | Qué se queda en el home | A dónde se va el detalle |
|---|---|---|
| "Para quién" — 4 dolores con descripción larga y cita del cliente | 4 tarjetas de un renglón, cada una enlazando a su sector | La descripción y la cita van a `/sectores/<sector>`, que es donde el dolor se vuelve específico |
| 3 soluciones con "lo que incluye" y "resultado" (ahora 3 familias y 7 páginas, §1.6b) | 3 tarjetas de familia (Definir y medir · Capturar y ver · Automatizar y decidir) | El detalle completo va a `/soluciones/<solución>` |
| Método, 4 etapas con entregable | Los 4 nombres de etapa en una línea, enlazando a `/metodo` | El entregable por etapa y la explicación de la Fase 0 van a `/metodo` |
| Nosotros, 3 socios con bio | **Nada.** Sale del home | Completo a `/nosotros` |

**Lo que se agrega al home:** la franja de prueba, que es el único bloque nuevo y va alto, justo después del hero. Tres casos con cifra, anonimizados si hay confidencialidad ("Productor cacaotero, Santander"), enlazando a `/sectores`. Es el lugar que en la referencia ocupan los logos de clientes.

Estructura por caso: `Sector · Situación inicial · Qué hicimos · Resultado medible · Tiempo`

Candidatos según proyectos en curso:
- [ ] Sector energía — registro y análisis de eventos eléctricos y producción diferida
- [ ] Agroindustria cacao — trazabilidad y cumplimiento de certificación
- [ ] Agroindustria aguacate — automatización de riego
- [ ] Floricultura — monitoreo de invernadero
- [ ] *(pendiente definir cuáles se pueden publicar y con qué nivel de detalle)*

**Resultado:** el home pasa de seis bloques largos a **seis bloques cortos, cinco de ellos con salida a una sección**. Menos scroll que hoy, no más, a pesar de tener un bloque nuevo.

**Segunda vía de conversión.** Además de agendar, una salida de menor fricción. El patrón que usa la referencia es un **evaluador gratuito atado a una línea de servicio**: el visitante sube su propio conjunto de datos siguiendo una plantilla y recibe un puntaje personalizado de qué tan preparados están. Califica al prospecto y captura el contacto sin pedirle una llamada.

Traducido a LATCON, en orden de preferencia:
- **Autodiagnóstico de madurez** de 6–8 preguntas que devuelve en qué escalón de la escalera está el visitante y qué le seguiría. Es el que mejor alimenta el CRM, porque las respuestas entran como campos calificados y no como un correo suelto, y además le enseña la escalera al comprador mientras responde.
- Demo navegable genérico, con datos ficticios y sin identificar producto ni cliente (§1.7)
- Descargable: checklist de la Fase 0 (levantamiento sin supuestos)

**Reescritura de biografías** (ahora en `/nosotros`). Reemplazar antigüedad por capacidad. Referencia para Luis: *automatización de procesos de información, analítica de datos e implementación de modelos de IA.* Aplicar el mismo criterio a César y John para que las tres tarjetas sean comparables en forma, no en años.

## 1.6 Páginas de sector: la prioridad del sitio

Son el destino del QR en el stand de Alimentec, SmartCity, el Congreso Avicultor y el Congreso del Cacao. Un asistente que escanea y cae en el home genérico pierde el contexto que acaba de tener en la conversación; uno que cae en `/sectores/agroindustria` lo mantiene.

Además son la única superficie de búsqueda real del sitio: nadie busca "consultoría en datos", buscan "trazabilidad cacao Fairtrade" o "monitoreo de invernadero".

**Plantilla:** mismo esqueleto del home, vocabulario del sector.
`Dolor del sector → Cómo se ve resuelto → Casos del sector → Capacidad o producto asociado → CTA`

Siguiendo el patrón de la referencia (§1.3), **los casos viven dentro de la página de su sector**, no en una sección aparte. `/sectores` funciona como overview: una rejilla de `TarjetaCaso` de todos los sectores que lleva a cada página.

## 1.6b Las tres familias de soluciones

Los cinco pilares comerciales de LATCON se reparten así:

| Pilar comercial | Dónde vive |
|---|---|
| 1 · Estrategia y gestión | `/soluciones/estrategia-e-indicadores` |
| 2 · Gestión por indicadores | `/soluciones/estrategia-e-indicadores` + `/soluciones/visibilidad-operativa` |
| 3 · Analítica y gestión de datos | `/soluciones/visibilidad-operativa` + `/soluciones/inteligencia-predictiva` |
| 4 · IA y agentes inteligentes | `/soluciones/inteligencia-predictiva` + `/soluciones/zero-touch` |
| 5 · Soluciones digitales | `/desarrollo-a-la-medida` — no es un escalón, es el modo de entrega |

Los escalones se agrupan en **tres familias**, siguiendo el patrón de la referencia (Discovery / Build / Scale). El menú muestra tres grupos y siete páginas, no siete opciones planas.

| Familia | Páginas | El dolor del cliente |
|---|---|---|
| **A · Definir y medir** | Estrategia e indicadores | "No sé qué medir" |
| **B · Capturar y ver** | Captura de datos · Drones · Visibilidad operativa | "No tengo el dato" · "No sé qué está pasando" |
| **C · Automatizar y decidir** | Automatización · Inteligencia predictiva · Zero-touch | "Todo es manual" · "Reacciono tarde" · "Igual me toca a mí" |

Las familias son **agrupadores de navegación, no páginas**. `/soluciones` es el overview que las presenta; las páginas son las siete.

### Familia A · lo que la distingue de una consultoría

Es el pilar más antiguo de LATCON y hasta ahora era el gran ausente del sitio. Su entrada no puede ser "hacemos planeación estratégica": eso lo dice todo el mundo y no diferencia nada.

**Lo que sí diferencia:** una consultoría tradicional entrega un documento con los indicadores definidos y se va; el cliente queda con la tarea de conseguir el dato, armar el tablero y sostener la rutina. En LATCON el mismo equipo que define el indicador construye después la captura, el tablero y la automatización. **El indicador no se queda en el papel porque las familias B y C existen.**

Esa es literalmente la escalera: la familia A es el punto de partida y las otras dos son lo que hace que sirva para algo. Ninguna consultora de gestión tiene las familias B y C, y ninguna casa de software tiene la A.

El titular de la página debería decir eso, no "planeación estratégica y despliegue de objetivos". Algo en la línea de: *definimos qué medir, y después lo dejamos funcionando.*

**Cambio de copy en el home.** La frase actual "no somos una agencia de desarrollo ni una consultora de estrategia" **se retira**: contradice el pilar 1 y además define a LATCON por lo que no es. El reemplazo es la afirmación positiva de arriba, que dice lo mismo sin negar nada.

### Familia B · el módulo de drones

**Drones tiene página propia**, no ancla, porque el brief define cuatro frentes con contenido suficiente: monitoreo multiespectral, levantamiento y mapeo, posicionamiento RTK e integración de datos (pulverización retirada en el paso 8a, ADR 0007).

El brief propone un video de dron agrícola en el hero del home. **No lo recomiendo, y es la única cosa del brief que discutiría.**

El hero es lo único que ve todo el mundo, incluidos SierraCol en petróleo y gas, un avicultor en Cali o una empresa de flores. Un dron sobrevolando un cultivo en el hero le dice a esos tres que LATCON es una empresa de agricultura. Drones es una línea fuerte, no es la compañía. Además choca con la decisión de §1.5: el home es distribuidor, no embudo.

**Dónde sí darle fuerza, sin costo para el resto:**

| Vehículo | Qué lleva |
|---|---|
| `/soluciones/drones` | El módulo completo del brief: 4 frentes, posicionamiento, cómo trabajamos, CTA |
| `/sectores/agroindustria` | Bloque propio con enlace. Es donde el visitante ya viene interesado |
| `/lp/drones` | **Aquí sí va el video en el hero.** Embudo de campaña: una oferta, un CTA, sin menú. Destino de pauta, del QR en el Congreso del Cacao y de la firma de correo |
| `/` (home) | Nada propio: entra dentro de la tarjeta de la familia B |

`/lp/drones` resuelve la tensión: le da al mensaje de drones toda la fuerza que el brief pide, con su propio hero y su propio video, sin que el home renuncie a los otros tres sectores. Y como es landing, se mide su conversión por separado.

**Dos advertencias del brief que conviene sostener.** La restricción con DJI es correcta: nada de logos ni fotografías oficiales sin autorización. Mencionar los modelos por nombre es un hecho verificable y es distinto de usar su material gráfico, pero conviene verificar la posición de LATCON frente al fabricante o el distribuidor antes de publicar.

Y hay una tensión interna en el propio brief: dice "evitar apariencia de catálogo o tienda" y a la vez lista cuatro referencias de equipo con su modelo. La forma de sostener las dos cosas es que el modelo aparezca **como consecuencia de la solución, no como encabezado**: primero el problema del cultivo, después la configuración, y el modelo al final como dato técnico. Si el modelo encabeza el bloque, es catálogo.

### Familia C · el escalón que cierra el ciclo

Las familias A y B terminan entregándole información a una persona para que decida. **Zero-touch es donde el sistema detecta, decide, ejecuta y cierra sin que nadie intervenga.** Que sea el último escalón no es un detalle de orden: es el único que reemplaza horas de operación en vez de mejorarlas, y eso es lo que justifica su precio.

**Comprensión sin fricción y zero-touch van juntos en una página, no separados.** Son dos caras de lo mismo: la primera quita la fricción para *entender* (preguntar en lenguaje natural en vez de leer un tablero) y la segunda la quita para *actuar*. Misma arquitectura agéntica, se venden juntas, y partirlas dejaría dos páginas flacas explicando media idea cada una. Sí conviene enlace cruzado desde `#tableros-e-indicadores`: quien ya tiene tableros es el candidato natural de comprensión sin fricción.

**El ancla `#control-y-trazabilidad` no es relleno.** La objeción a cualquier cosa autónoma es siempre la misma: "¿y si se equivoca?". En operaciones industriales esa objeción mata la venta. La página tiene que responderla explícitamente —qué decide solo, qué requiere aprobación humana, qué queda registrado— o el resto del contenido no se lee. Es el equivalente comercial del bloque de gobernanza que ustedes le vendieron a SierraCol.

**Sobre el nombre de la ruta:** propuse `/soluciones/zero-touch` por ser el término comercial que ya usan, pero en búsqueda en español rinde más "agentes de IA". Vale evaluar `/soluciones/agentes-ia` con "Zero-Touch" como titular. Es decisión comercial, no técnica.

**Y tienen con qué probarlo.** El sistema multiagente de control de inventario es material real para el bloque de prueba de esta página y para `/desarrollo-a-la-medida`, sin depender de que Florasens o el IMS lleguen a producción. De las siete páginas de solución, esta es la que hoy tiene la demostración más lista.

## 1.7 Páginas de producto: qué se puede publicar y qué no

El portafolio tiene restricciones que cambian la recomendación:

| Producto | Estado | Qué se puede publicar |
|---|---|---|
| **AgriCount** | Entregado a cliente, bajo condiciones de privacidad que impiden nombrarlo | **Nada con nombre.** Verificar en el contrato si se permite siquiera un caso anonimizado |
| **Florasens** | En desarrollo | Nada todavía. Publicar un producto sin operación real invita a la pregunta "¿quién lo usa?" |
| **IMS Fairtrade** | En desarrollo | Nada todavía. Mismo criterio |

**Consecuencia:** las páginas de producto no entran en esta construcción. Se publican una por una, a medida que cada producto llegue a operación con cliente y su publicación esté autorizada.

**Lo que sí entra ahora es `/desarrollo-a-la-medida`**, que además es donde vive el pilar 5 (soluciones digitales): en vez de "conozca Florasens", una página que muestre lo que el equipo sabe construir —captura en campo sin conexión, sincronización diferida, visión por computador para conteo, geolocalización de parcelas, multi-tenant— con capturas propias y sin cliente identificable. Respalda la afirmación del home sin exponer a nadie.

Antes de publicar cualquier cosa relacionada con AgriCount, incluso anonimizada, hay que leer la cláusula de confidencialidad del contrato. Es una verificación de media hora que evita un problema serio.

## 1.8 Landings de campaña: lo único que va aparte

Una feria sí justifica una página propia: una sola oferta, un solo CTA, sin menú, para el QR del stand. Pero **no es un sitio separado**: es una ruta dentro del mismo dominio, armada con los mismos componentes.

```
/lp/alimentec-2026
/lp/congreso-cacao-2026
```

Cada una con su UTM propia. Se publican para el evento y después se retiran o se dejan quietas, sin afectar el sitio.

| Pieza | Qué es | Vida |
|---|---|---|
| `/` | La landing actual, ajustada | Permanente |
| Soluciones, sectores, desarrollo a la medida, método, recursos | Sitio | Permanente |
| `/lp/<evento>` | Una oferta, un CTA, sin menú | Por evento |

## 1.9 Secuencia de construcción

| Etapa | Entregable |
|---|---|
| 0 | Footer legal e instrumentación sobre el sitio publicado (§1.1) |
| 1 | Chasis + primitivas + las 7 secciones (§1.4) + home redistribuido + `/nosotros` y `/agenda` |
| 2 | `/sectores` overview + las 4 páginas de sector + `/soluciones/drones` y `/lp/drones` |
| 3 | `/soluciones` con sus 7 páginas y anclas + `/desarrollo-a-la-medida` |
| 4 | `/recursos` con cadencia editorial definida + páginas por problema [22]–[25] (§1.3b) |
| — | `/productos`: cuando cada producto llegue a operación con cliente y su publicación esté autorizada |
| — | `/lp/<evento>`: por feria, según calendario comercial |

---

# PARTE 2 · CRM

## 2.1 El encuadre previo (aplica también al ERP)

Ya hay cuatro productos multi-tenant en vuelo: **Florasens, AgriCount, IMS Fairtrade y la plataforma de ventas**. Todos sobre FastAPI + PostgreSQL. Todos necesitan lo mismo: tenants, autenticación, roles, usuarios, suscripciones, auditoría, notificaciones.

Esto es reutilización **interna** de la fontanería y no se ve afectado por las restricciones de publicación de §1.7: que AgriCount no se pueda nombrar en la web, o que Florasens y el IMS sigan en desarrollo, no impide que compartan el mismo núcleo técnico. Al contrario, es el argumento a favor: el núcleo se construye una vez y sirve a los cuatro sin importar cuál sea publicable.

> Si el CRM/ERP se construye como un quinto producto aislado, es un sumidero de capacidad en el año en que hay que facturar.
> Si se construye como **el núcleo compartido** que los otros cuatro reusan, deja de ser un costo nuevo y pasa a ser la pieza que abarata todo lo demás.

Esta es la condición de viabilidad de todo lo que sigue.

## 2.2 Por qué construir en vez de comprar (aquí sí aplica)

Ningún CRM del mercado modela la metodología de LATCON:

- No conoce la **Fase 0** de levantamiento cerrado
- No distingue **Momento 1** (diagnóstico + ROI preliminar, tarifa fija) de **Momento 2** (propuesta técnico-económica + demo navegable)
- No calcula ni versiona el **Factor Multiplicador** (2.2–3.0)
- No aplica **compuertas de margen** (bruto ≥40%, neto ≥20%, stress test +30% esfuerzo)
- No relaciona propuesta ↔ demo ↔ alcance protegido

Eso convierte el desarrollo en algo más que uso interno: **un CRM para empresas que venden proyectos técnicos con propuesta y demo de por medio** es un nicho real y desatendido. Cero superficie regulatoria y alcance acotado.

## 2.3 Alcance funcional mínimo

**Módulo 1 · Leads y origen**
- Captura desde formularios web y autodiagnóstico, sin retecleo
- Origen trazado: feria, campaña, referido, convocatoria
- Calificación por categoría de servicio del catálogo LATCON

**Módulo 2 · Oportunidades por momentos**
- Estado explícito: Contacto → Fase 0 → Momento 1 → Momento 2 → Cierre
- Entregable asociado a cada momento, con fecha y responsable
- Alerta de oportunidad estancada

**Módulo 3 · Propuestas**
- Versionado de propuestas y demos
- Tabla de alcance vinculada (protección de alcance)
- Cálculo de FM y verificación automática de compuertas de margen

**Módulo 4 · Analítica comercial**
- Conversión por canal, por feria y por sector
- Costo de adquisición por origen
- Tiempo promedio entre momentos

## 2.4 Pipeline actual como banco de pruebas

Hay volumen suficiente para validar el CRM desde el primer día sin datos sintéticos: los frentes en curso con SierraCol, CIB, SANAYA, La Cacaotera Real, riego de aguacate, Cáscara Verde, más la convocatoria de retos agroindustriales y su cotización de múltiples ítems.

*Este pipeline hoy vive en carpetas y memoria. Ese es el argumento operativo, además del comercial.*

---

# PARTE 3 · ERP

## 3.1 La partición que define todo

El ERP no se decide como una sola cosa. Son dos capas con lógicas opuestas.

### Capa operativa → **CONSTRUIR**

Proyectos · Horas · Costos · Márgenes · Órdenes de trabajo · Compras · Inventario

Es donde está el valor y es exactamente lo que LATCON ya sabe hacer. Y resuelve un problema hoy abierto:

> La tarifa se apoya en el FM 2.2–3.0 y las propuestas prometen margen bruto ≥40% y neto ≥20%. **Sin días reales medidos contra días cotizados, esas compuertas son una declaración, no un control.**

Con dos o tres proyectos cerrados y medidos, el FM deja de ser un supuesto y pasa a ser un dato defendible frente al cliente.

### Capa fiscal-contable → **NO CONSTRUIR**

Facturación electrónica · Nómina electrónica · Documento soporte · Retenciones · ICA municipal · NIIF · Medios magnéticos

**El sustento normativo:**

- El software propio *es* una modalidad válida ante la DIAN, pero debe pasar por el procedimiento de habilitación en el **ambiente de producción en habilitación**, demostrando cumplimiento de reglas de validación, interoperabilidad y anexos técnicos (Resolución 165 de 2023, precisado por el Concepto 13246 de 2025).
- Solo el software que **supera satisfactoriamente la etapa de pruebas** sirve para cumplir la obligación formal de facturar.
- Y el punto decisivo para el modelo de negocio: al operar como **proveedor tecnológico**, cada software o actualización ofrecido a clientes debe pasar **individualmente** por ese ambiente para su aprobación específica.

**Traducción operativa:** cada cambio de anexo técnico de la DIAN obliga a recertificar y a migrar a todos los clientes a la vez. Es un negocio de cumplimiento normativo permanente, no de software.

**Alternativa:** integrar por API con un proveedor ya habilitado y quedarse con la capa donde LATCON diferencia.

## 3.2 Frontera de arquitectura

```
┌─────────────────────────────────────────┐
│  NÚCLEO COMPARTIDO                      │
│  tenants · auth · roles · usuarios      │
│  suscripciones · auditoría · notif.     │
│  → reusado por Florasens, AgriCount,    │
│    IMS Fairtrade, plataforma de ventas  │
└─────────────────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼──────┐   ┌──────▼──────────┐
│   CRM    │   │  ERP OPERATIVO  │
│ propio   │   │  proyectos,     │
│          │   │  horas, costos  │
└──────────┘   └──────┬──────────┘
                      │  API
              ┌───────▼──────────────┐
              │  CAPA FISCAL         │
              │  proveedor habilitado│
              │  (no propio)         │
              └──────────────────────┘
```

---

# PARTE 4 · SECUENCIA GENERAL

| # | Hito | Por qué en este orden |
|---|---|---|
| 1 | Footer legal e instrumentación | Exposición legal viva y señal que no se reconstruye hacia atrás |
| 2 | Sitio web: home redistribuido y páginas de sector con sus casos | Es el frente comercial y el que alimenta al CRM con leads trazados |
| 3 | CRM interno en operación | Sin regulación, valor inmediato, ordena el pipeline actual |
| 4 | ERP operativo: horas y costos | Convierte el FM en dato medido |
| 5 | Integración fiscal por API | Cuando ya haya volumen que lo justifique |
| 6 | Empaquetado como producto | **No antes de 2 trimestres de uso propio** |

Los hitos 2 y 3 se retroalimentan: el sitio genera los leads que el CRM ordena, y el CRM documenta los casos que le faltan al sitio. Si hay capacidad para trabajarlos en paralelo, conviene; si no, el sitio primero.

**Regla de cierre:** no vender el CRM/ERP hasta haberlo usado internamente al menos dos trimestres. Es el principio de "nunca asumir" de la Fase 0 aplicado a LATCON misma — y de paso produce el caso de éxito que hoy le falta a la web.

---

# PARTE 5 · DECISIONES PENDIENTES

- [ ] Confirmar hex del naranja del logo y definir tipografía web
- [ ] Elegir herramienta de catálogo visual de componentes (Storybook u otra)
- [ ] Confirmar el orden del menú: ¿Sectores antes que Soluciones?
- [ ] Aprobar las etiquetas de menú y las frases descriptivas por familia
- [ ] Confirmar las 4 páginas por problema de la etapa 4, o ajustarlas según lo que se busque de verdad
- [ ] Revisar la cláusula de confidencialidad del contrato de AgriCount
- [ ] Definir qué casos se pueden publicar y con qué nivel de detalle por cliente
- [ ] Elegir la segunda vía de conversión (autodiagnóstico / demo / descargable)
- [ ] Priorizar los 4 sectores: ¿cuáles primero según calendario de ferias?
- [ ] Escribir el copy del home que reemplaza "no somos una agencia de desarrollo ni una consultora de estrategia"
- [ ] Decidir la ruta y el titular de la solución de agentes: `/soluciones/zero-touch` o `/soluciones/agentes-ia`
- [x] Verificar la posición de LATCON frente a DJI o su distribuidor antes de publicar el módulo de drones → decidido 2026-11-11: el sitio no nombra al fabricante ni a los modelos
- [ ] Conseguir material audiovisual propio de drones en operación (o licencia comercial verificable)
- [ ] Definir stack del núcleo compartido y estrategia de migración de los 4 productos existentes
- [ ] Seleccionar proveedor habilitado DIAN para la integración fiscal
- [ ] Definir quién sostiene el desarrollo del CRM sin restar capacidad facturable
- [ ] Definir cadencia editorial de `/recursos` (o descartar la sección por ahora)

---

*Documento de trabajo — sujeto a revisión.*
