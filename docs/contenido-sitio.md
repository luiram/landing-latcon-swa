# LATCON · Contenido del sitio web

**Documento de trabajo** · v2 · Septiembre 2026
Complementa a *LATCON — Recomendaciones: sitio web, CRM y ERP*
Fuente: copy publicado en latconservices.com + propuestas y briefs internos

---

## El principio de redacción de todo el sitio

La escalera metodológica no se explica en ninguna página. **Se hace evidente por cómo está escrito el copy**, con tres reglas que se aplican sin excepción.

### Regla 1 · Toda página de solución se titula "de X a Y"

Es la fórmula de la referencia: su tercera familia no se llama "Escalamiento", se llama *de victorias aisladas a impacto en toda la empresa*. No dice qué es, dice de dónde a dónde lleva. Y "victorias aisladas" presupone que ya se construyó algo, así que el escalón anterior queda implícito sin mencionarlo.

Un titular categórico ("Visibilidad operativa") obliga al lector a ubicarse solo. Un titular de transición lo ubica.

### Regla 2 · Toda página de solución cierra nombrando el escalón siguiente

Dos bloques fijos al final: **qué necesitas antes** y **qué viene después**, cada uno enlazando. Es la escalera hecha de enlaces en vez de dibujo. El visitante nunca queda en un callejón sin salida y siempre entiende que hay un recorrido.

### Regla 3 · Los seis escalones se nombran igual en todo el sitio

| # | Escalón | Familia |
|---|---|---|
| 1 | Definir qué medir | A · Definir y medir |
| 2 | Capturar el dato | B · Capturar y ver |
| 3 | Ver lo que pasa | B · Capturar y ver |
| 4 | Automatizar | C · Automatizar y decidir |
| 5 | Anticipar | C · Automatizar y decidir |
| 6 | Resolver solo | C · Automatizar y decidir |

Mismo nombre en el menú, en el home, en las páginas de sector, en el autodiagnóstico y en los casos. La repetición es lo que instala el modelo mental.

### Componente nuevo: `EscaleraContextual`

Una franja horizontal con los seis escalones, el actual resaltado y los demás enlazables. Aparece en las siete páginas de solución, siempre en el mismo lugar. Es la versión explícita de lo que las reglas 1 y 2 hacen de forma implícita.

Se suma a las siete secciones de §1.4 del documento de recomendaciones. Pasan a ser ocho.

---

## Marcas de origen

- **[ACTUAL]** — ya existe en el sitio, se mueve o se recorta
- **[NUEVO]** — hay que escribirlo, va propuesto
- **[FUENTE]** — sale de un documento interno existente

---

# 0. Tokens de marca

No hay que definirlos: **ya están en el CSS del sitio publicado.** La tarea es extraerlos a un archivo de tokens que consuman las 21 páginas.

| Token | Valor | Estado |
|---|---|---|
| Azul corporativo | `#152033` | Confirmado |
| Verde acento | `#16A34A` | Confirmado |
| Naranja marca | *(leer del CSS o del SVG del logo)* | Extraer |
| Tipografía web | *(leer del CSS)* | Extraer |
| Escala tipográfica y de espaciado | *(derivar de lo que ya está en uso)* | Extraer |

Treinta minutos de trabajo, no una decisión.

---

# 1. Home

Seis bloques cortos, cinco con salida a una sección.

## #hero — [ACTUAL, se conserva]

**Antetítulo:** Datos · Automatización · IA · Anticipación

**Titular:** ¿Tu empresa ya tiene los datos pero todavía no puede usarlos para decidir a tiempo?

**Bajada:** Integramos tus datos, automatizamos tus procesos y construimos sistemas de IA que le dan a tu equipo señales claras para actuar — antes de que el problema sea visible.

**CTA:** Agenda tu diagnóstico gratuito
**Micro-copy:** 30 minutos · Sin compromiso · Te decimos con honestidad si somos el equipo indicado para tu caso
**CTA secundario [NUEVO]:** Averigua en qué escalón está tu operación →

> El titular actual ya es un "de → a" encubierto: tener los datos contra poder decidir. Funciona. El único cambio es el CTA secundario: hoy manda a otra sección del mismo scroll; debe mandar al autodiagnóstico.

## #donde-trabajamos — [NUEVO] · inmediatamente después del hero

**Titular:** Dónde ya trabajamos
**Bajada:** Operaciones industriales y agroindustriales, en campo y con conectividad intermitente. No llegamos a aprender su sector con su presupuesto.

Cuatro tarjetas, una por sector, cada una con una línea de contexto y enlace a su página:

| Sector | Línea |
|---|---|
| Energía, petróleo y gas | Eventos de operación, producción diferida e indicadores comparables entre campos |
| Agroindustria | Cacao, aguacate y flores: captura en campo, trazabilidad y automatización de riego |
| Avicultura | Indicadores de lote capturados donde ocurren |
| Floricultura | Condiciones de invernadero y productividad por unidad de cultivo |

**Sin cifras y sin nombres.** Es el equivalente de la banda de logos de la referencia, adaptado a lo que LATCON puede publicar hoy (§2). Comunica alcance y familiaridad con el sector, que es lo que el visitante necesita en los primeros diez segundos, y **no depende de ninguna autorización ni de ningún dato pendiente**.

> Cuando existan casos cerrados y publicables, esta franja se enriquece con una cifra por sector. El componente es el mismo; solo cambia el contenido.

## #para-quien — [ACTUAL, recortado]

**Titular:** Trabajamos con empresas donde los datos, los sistemas y los equipos no están conectados

Los cuatro dolores se conservan con título y frase del cliente. La descripción larga se va a la página de sector.

| Título | Frase que se conserva | Escalón que sugiere | Enlaza a |
|---|---|---|---|
| Datos sin análisis | «Tenemos los datos pero no podemos usarlos.» | 3 · Ver | `/sectores/energia-petroleo-gas` |
| Áreas que operan en silos | «Cada área trabaja con números distintos y nadie sabe cuál es el real.» | 1 · Definir | `/sectores/agroindustria` |
| Operación distribuida o en campo | «Coordinamos todo por WhatsApp y nadie sabe quién hizo qué.» | 2 · Capturar | `/sectores/agroindustria` |
| Tecnología sin integración | «Tenemos varios sistemas pero ninguno le habla al otro.» | 4 · Automatizar | `/sectores` |

> El escalón no se imprime en la tarjeta. Determina a dónde enlaza y qué se le muestra después. El visitante se autoclasifica sin darse cuenta — que es exactamente el punto.

## #soluciones — [NUEVO, reemplaza el bloque actual]

**Titular:** Casi nadie necesita todo. Casi todos necesitan lo siguiente.

**Bajada:** Seis etapas en orden. La mayoría entra por la que le duele hoy, y avanza desde ahí. Nadie salta escalones: sin dato capturado no hay tablero, y sin tablero no hay predicción que sirva.

| Familia | Titular de transición | Escalones |
|---|---|---|
| **Definir y medir** | De la estrategia en el papel al indicador que alguien mira el lunes | 1 |
| **Capturar y ver** | Del cuaderno en el campo al tablero que se actualiza solo | 2 · 3 |
| **Automatizar y decidir** | De reaccionar cuando ya pasó a que no vuelva a pasar | 4 · 5 · 6 |

> Esa bajada hace tres trabajos a la vez: presenta la escalera, justifica su orden, y desactiva de entrada al cliente que llega pidiendo IA sin tener el dato. Es la conversación difícil, resuelta antes de la reunión.

## #metodo — [ACTUAL, recortado a una línea por etapa]

**Titular:** Así trabajamos: primero entendemos, luego construimos
**Bajada:** Cada etapa tiene un entregable concreto. No avanzamos a la siguiente hasta que la anterior genera claridad.

01. Entendemos el contexto · 02. Diseñamos la solución · 03. Construimos por etapas · 04. Implementamos y ajustamos

**Enlace:** Ver el método completo →

> Ojo con no confundirlos en el copy: el **método** es cómo se ejecuta un proyecto (cuatro etapas). La **escalera** es hasta dónde llega la operación del cliente (seis escalones). Uno es de LATCON, el otro es del cliente.

## #cierre — [ACTUAL, se conserva]

**Titular:** Cada semana sin visibilidad tiene un costo. Averigüemos juntos si podemos ayudarte a reducirlo.

**Texto:** Agenda una sesión de diagnóstico de 30 minutos. Revisamos juntos cómo fluye tu operación, identificamos dónde se pierden datos, tiempo o decisiones — y te damos una recomendación concreta, aunque no trabajes con nosotros.

**Micro-copy:** Sin pitch de ventas · Sin compromiso · 30 minutos

## Footer — [NUEVO]

LATIN CONSULTING SERVICES SAS · NIT 901.229.904-6 · Responsable de IVA
Cra 7 Este 7-100, Cajicá, Cundinamarca, Colombia
+57 318 397 1073 · contacto@latconservices.com
Privacidad · Política de tratamiento de datos

---

# 2. Casos: qué se puede publicar hoy y qué no

## La situación real, sin adornos

Conviene decirlo con claridad antes de escribir una línea de caso:

| Proyecto | Estado | ¿Publicable como caso? |
|---|---|---|
| SierraCol · eventos eléctricos | Propuesta en negociación, sin firmar | **No.** Todavía no existe |
| IMS Fairtrade | En desarrollo | **No.** No está en operación con cliente |
| Riego de aguacate | Cliente potencial | **No.** Todavía no es proyecto |
| AgriCount | Entregado y en operación | **No.** Confidencialidad impide nombrarlo (§1.7 del doc de recomendaciones) |

**Conclusión:** hoy no hay un solo caso publicable. Escribirlos en pasado sería falso, y en un sector donde el comprador conoce a los demás compradores, eso se paga caro.

Por eso el home lleva la franja de sectores y no una de casos, y por eso las páginas de sector se construyen sobre **capacidad demostrable**, no sobre resultados que todavía no existen.

## Lo que sí se puede afirmar hoy

Sin exagerar nada y sin pedir permiso a nadie:

- En qué sectores se ha trabajado
- Qué se sabe construir, con capturas propias del producto
- Cómo se trabaja, con el método y sus entregables
- Qué problema resuelve cada escalón

Eso es suficiente para un sitio creíble. Lo que no es suficiente es inventar cifras.

## La plantilla, para cuando existan

Cuando el primer proyecto cierre, el caso se escribe así. Se identifica por **industria y escala, nunca por cliente**, de modo que no hace falta autorización para nombrar:

`Industria · Escalón de entrada → Escalón de llegada · Situación · Qué construimos · Lo que cambió`

Declarar los dos escalones hace que la escalera se vea recorrida y no declarada: es la diferencia entre un modelo y una prueba.

**Ejemplo de la forma** (redacción tentativa para cuando el proyecto de eventos eléctricos esté entregado):

> **Energía · Operador de campos petroleros · Escalón 2 → Escalón 5**
> Tres campos registraban sus eventos eléctricos en formatos distintos, y el impacto en producción se cruzaba a mano en un archivo paralelo. Construimos captura en campo sin conexión con un modelo único de clasificación para los tres campos, y sobre eso un tablero de incidencia e impacto. *(Cifra de resultado — pendiente del cierre del proyecto.)*

**Regla de redacción:** cifras de escala del proyecto sí (campos, hectáreas, número de categorías); cifras financieras del cliente no.

**Orden de llegada previsto:** el proyecto de eventos eléctricos es el primero que puede producir un caso, y para entonces las páginas de sector ya estarán publicadas. El caso se agrega, no bloquea.

# 3. Páginas de sector

**Cambio estructural:** el bloque "lo que resolvemos aquí" deja de ser una lista plana y **se agrupa por los tres escalones de familia**. Así el visitante ve la escalera en su propio vocabulario, en la página donde más gente aterriza desde búsqueda.

## `/sectores` — overview [NUEVO]

**Titular:** Conocemos cómo se opera en su industria
**Bajada:** No llegamos a aprender su operación con su presupuesto. Estos son los sectores donde ya trabajamos y en qué escalón suele empezar cada uno.

Rejilla con los cuatro sectores, cada uno con lo que se hace ahí y en qué escalón suele empezar. Los casos entran cuando existan (§2).

## `/sectores/energia-petroleo-gas` — [FUENTE: propuesta SierraCol]

**Titular:** De la falla que se registra en tres formatos al indicador que compara los tres campos

**Bajada:** El evento se registra en un lado, el impacto en otro, y la relación entre los dos la sostiene una persona con una hoja de cálculo. Cuando quiere saber qué causa concentra sus pérdidas, la respuesta llega tarde y no es comparable entre campos.

**El dolor, desarrollado [ACTUAL]:** Los datos están ahí, pero analizarlos en tiempo real requiere tiempo y personal que la operación no tiene disponible. Las oportunidades pasan y los problemas se detectan tarde — cuando ya tienen un costo visible.

**Dónde suele empezar este sector:** escalón 2. El dato existe en la cabeza del técnico y en un formato que nadie consolida.

**Lo que hacemos aquí, por etapa:**

*Capturar y ver*
- Registro de eventos en campo, sin conexión, con ubicación y evidencia fotográfica
- Esquema de clasificación único entre campos, con gobernanza que evita que todo termine en "desconocido"
- Producción diferida asociada al evento, sin cruce manual
- Mapa de incidencia: qué zonas concentran eventos y cuáles concentran pérdida, que no siempre son las mismas

*Automatizar y decidir*
- Indicadores comparables mes contra mes y año contra año, calculados solos
- Detección de recurrencia por causa, estructura y zona
- Anticipación de eventos a partir del histórico acumulado

**Por qué nos entienden en este sector:** trabajamos con equipos de mantenimiento, no con áreas de tecnología. La conversación arranca en la falla, no en la arquitectura.

**Prueba disponible hoy:** capturas propias del formulario de captura y del tablero, sin cliente identificable.
**Espacio de caso:** reservado, se llena cuando el proyecto cierre (§2).
**CTA:** Agenda tu diagnóstico

## `/sectores/agroindustria` — [NUEVO]

**Titular:** Del dato que nace en el cuaderno al que llega a tiempo para decidir

**Bajada:** Cuadernos, WhatsApp y planillas que alguien digita en la noche. Para cuando la información llega a una decisión, la ventana para actuar ya se cerró — y en agro esa ventana dura días, no meses.

**El dolor, desarrollado [ACTUAL]:** Equipos en campo, múltiples sedes o procesos entre áreas que se coordinan por WhatsApp y correo. Sin trazabilidad centralizada, es difícil saber qué pasó, quién lo hizo y cuándo — hasta que el error ya tiene consecuencias.

**Dónde suele empezar este sector:** escalón 2, y a veces en el 1, cuando ni siquiera está definido qué vale la pena registrar.

**Lo que hacemos aquí, por etapa:**

*Definir y medir*
- Qué registrar en campo y con qué criterio, antes de comprar un solo sensor
- Indicadores por unidad real de la operación: lote, parcela, productor

*Capturar y ver*
- Captura en campo que funciona sin señal y sincroniza al recuperar conexión
- Parcelas y productores georreferenciados, con evidencia asociada
- Sensores y actuadores en cultivo: riego, condiciones, alertas
- Drones para pulverización, monitoreo multiespectral y levantamiento
- Trazabilidad para certificación y cumplimiento

*Automatizar y decidir*
- Riego y labores que se ejecutan solos según condición medida
- Conteo y detección por visión por computador
- Anticipación de rendimiento y de riesgo por zona

**Por qué nos entienden en este sector:** el equipo viene de trabajar con productores de cacao, aguacate y flores. Sabemos que la conectividad falla, que el operario tiene las manos ocupadas y que una app que exige señal no se usa.

**Prueba disponible hoy:** capturas de captura georreferenciada de parcelas y de conteo por visión, sin cliente identificable.
**Espacio de caso:** reservado (§2).
**Enlace destacado:** Tecnología con drones → · **CTA:** Agenda tu diagnóstico

## `/sectores/avicultura` — [NUEVO]

**Titular:** De la planilla que se consolida cuando el lote ya cerró a la alerta que llega el martes

**Bajada:** En avicultura el costo de reaccionar tarde no se mide en meses sino en lotes. Conversión, mortalidad y consumo cuentan una historia todos los días, y esa historia normalmente vive en planillas que se revisan cuando ya no hay nada que corregir.

**Dónde suele empezar este sector:** escalón 3. Los indicadores existen y son estándar del sector; lo que falta es que lleguen a tiempo.

**Lo que hacemos aquí, por etapa:**

*Capturar y ver*
- Registro diario por galpón, capturado donde ocurre
- Conversión, mortalidad y consumo comparables entre lotes y entre granjas

*Automatizar y decidir*
- Alertas por desviación durante el lote, no al cerrarlo
- Detección de anomalías sobre el histórico acumulado
- Anticipación de resultado de lote a partir de los primeros días

**Por qué nos entienden en este sector:** partimos de los indicadores que el sector ya usa. No proponemos métricas nuevas antes de que las que existen estén bien medidas.

**Prueba disponible hoy:** ninguna específica del sector. Ver §9 sobre si esta página entra en el primer lanzamiento.

## `/sectores/floricultura` — [NUEVO]

**Titular:** Del recorrido y la experiencia al bloque que se explica con datos

**Bajada:** Temperatura, humedad, riego y labores por cama generan información continua. Sin captura ni consolidación, las decisiones se toman por recorrido — que funciona hasta que hay que explicar por qué un bloque rindió distinto.

**Dónde suele empezar este sector:** escalón 2.

**Lo que hacemos aquí, por etapa:**

*Capturar y ver*
- Sensores de condiciones en invernadero, con histórico consultable
- Registro de labores por bloque, cama y barilla
- Tableros de productividad por unidad de cultivo

*Automatizar y decidir*
- Modelos que relacionan condiciones con resultado
- Alertas por condición fuera de rango

**Por qué nos entienden en este sector:** trabajamos con la unidad real de la operación —bloque, cama, barilla— no con promedios de finca.

**Prueba disponible hoy:** capturas de monitoreo de invernadero, sin cliente identificable.

---

# 4. Páginas de solución

**Esqueleto fijo para las siete.** La repetición es lo que instala el modelo mental:

1. Titular de transición ("de X a Y")
2. `EscaleraContextual` con el escalón actual resaltado
3. Dónde estás si esto te suena
4. Qué construimos
5. Lo que cambia
6. **Qué necesitas antes** → enlace al escalón anterior
7. **Qué viene después** → enlace al escalón siguiente
8. Caso + CTA

## `/soluciones` — overview [NUEVO]

**Titular:** Seis etapas. La mayoría entra por la que le duele hoy.

**Bajada:** No es un catálogo donde se elige lo que suena mejor. Es un recorrido con orden: sin dato capturado no hay tablero, sin tablero no hay modelo que sirva, y sin nada de eso no hay proceso que se resuelva solo. Le decimos en qué escalón está aunque implique decirle que todavía no necesita lo que vino a pedir.

Las tres familias con su titular de transición, y dentro de cada una las páginas hijas.

**Cierre:** ¿No sabe en qué escalón está? Averígüelo en cinco minutos →

## `/soluciones/estrategia-e-indicadores` — [NUEVO] · escalón 1

**Titular:** De la estrategia en el papel al indicador que alguien mira el lunes

**Dónde estás si esto te suena:** Hay objetivos definidos, hay reuniones de seguimiento, y aun así nadie sabe con certeza si el mes va bien. Cada área lleva sus propios números y ninguno se puede comparar con el otro.

**Qué construimos:**
- **Despliegue de objetivos.** De la estrategia declarada a lo que cada área hace el lunes.
- **Diseño de indicadores.** Qué medir, con qué meta y con qué frecuencia. Pocos y comparables, no un catálogo.
- **RPPA.** La rutina de gestión en el nivel operativo: que el indicador se mire, se discuta y produzca una acción.
- **Acompañamiento directivo.** Seguimiento por resultados con los equipos que deciden.

**Lo que cambia:** El indicador deja de ser un número que se reporta y pasa a ser un número que cambia decisiones.

**Qué necesitas antes:** Nada. Este es el primer escalón, y es donde debería empezar cualquiera que no esté seguro de qué medir.

**Qué viene después:** Definido el indicador, hay que conseguir el dato que lo alimenta. Eso es *capturar el dato* →

**Y esto es lo que nos hace distintos:** una consultoría entrega el documento con los indicadores y se va; después alguien tiene que conseguir el dato, armar el tablero y sostener la rutina, y ahí es donde el tablero muere. Nosotros hacemos las dos mitades. El indicador no se queda en el papel porque los cinco escalones siguientes existen.

## `/soluciones/captura-de-datos` — [NUEVO] · escalón 2

**Titular:** Del dato que nace y se pierde al dato que llega

**Dónde estás si esto te suena:** Ya sabe qué quiere medir. El problema es que el dato nace en un cuaderno, en un WhatsApp o en la cabeza de alguien, y todo lo que viene después hereda ese vacío.

**Qué construimos:**
- **Sensores y actuadores.** Condiciones medidas en continuo, sin que nadie tenga que ir a mirar.
- **Captura móvil que funciona sin señal.** El registro se guarda en el dispositivo y sube cuando vuelve la conexión. Nunca se bloquea por falta de red.
- **Drones.** Levantamiento aéreo de información que a pie tomaría días. Ver la línea completa →

**Lo que cambia:** El dato deja de depender de que alguien se acuerde de anotarlo.

**Qué necesitas antes:** Saber qué vale la pena registrar. Si no está claro, empiece en *definir qué medir* →

**Qué viene después:** Con el dato llegando, se puede ver lo que pasa →

## `/soluciones/drones` — [FUENTE: brief del módulo] · dentro del escalón 2

**Titular:** Del recorrido a pie a la información de todo el lote

**Bajada:** Integramos drones, sensores, datos y analítica para ayudar a productores y organizaciones agrícolas a mejorar la eficiencia de sus operaciones y tomar mejores decisiones en campo.

**Posicionamiento:** No vendemos solamente drones. Diseñamos soluciones para el campo. Nuestro enfoque combina equipo, configuración, capacitación, datos, tecnología y acompañamiento. La solución se define según las características del cultivo, la operación y los objetivos del cliente.

**Qué construimos:** Pulverización agrícola · Monitoreo y análisis RGB y multiespectral · Posicionamiento de alta precisión · Integración de la captura con procesamiento y analítica

**Cómo trabajamos:** 01 Entendemos · 02 Diseñamos · 03 Validamos · 04 Implementamos

**Qué viene después:** El dron captura; lo que decide qué hacer con eso está en los escalones siguientes. *Ver lo que pasa* → · *Anticipar* →

**Cierre:** ¿Quieres conocer qué solución con drones puede aplicarse a tu operación? Hablemos de tu proyecto →

> Recordatorio de redacción: el modelo del equipo va al final de cada bloque como dato técnico, nunca como encabezado. Si el modelo encabeza, es catálogo. Y el bloque final es el que evita que la página se lea como venta de equipo: el dron no es el producto, es el primer escalón.

## `/soluciones/visibilidad-operativa` — [ACTUAL, reencuadrado] · escalón 3

**Titular:** Del reporte que llega tarde a la señal que llega a tiempo

**Dónde estás si esto te suena:** El dato existe y está capturado, pero vive en varios sistemas y consolidarlo es trabajo de alguien todas las semanas.

**Qué construimos [ACTUAL]:** Tu operación genera datos en múltiples sistemas. Los conectamos, los organizamos y los convertimos en señales claras para que tu equipo actúe.
- Tus fuentes de datos conectadas en un solo lugar, sin consolidación manual
- Tableros operativos actualizados en tiempo real, sin depender de reportes manuales
- Alertas que llegan antes de que el problema sea visible

**Lo que cambia [ACTUAL]:** Menos tiempo esperando datos. Decisiones que llegan cuando todavía sirven para actuar.

**Qué necesitas antes:** Que el dato exista y esté llegando. Si todavía nace en papel, empiece en *capturar el dato* →

**Qué viene después:** Ver lo que pasa es necesario, pero sigue exigiendo que alguien mire y actúe. El siguiente paso es *automatizar* →

## `/soluciones/automatizacion` — [ACTUAL, reencuadrado] · escalón 4

**Titular:** Del proceso que depende de alguien al proceso que corre solo

**Dónde estás si esto te suena:** Ya ve lo que pasa. El problema es que entre verlo y que algo cambie hay tres personas, dos correos y un archivo.

**Qué construimos [ACTUAL]:** Cada proceso manual es un punto de fallo. Identificamos cuáles frenan tu operación y los convertimos en flujos automáticos, trazables y confiables.
- Procesos manuales convertidos en flujos automáticos, validados y trazables
- ERP, apps, formularios y mensajería integrados en un solo flujo de información
- Agentes de IA que ejecutan tareas repetitivas, sin intervención humana

**Lo que cambia [ACTUAL]:** Operación que fluye sin cuellos de botella, con trazabilidad completa y capacidad de crecer sin agregar complejidad.

**Qué necesitas antes:** Ver lo que pasa. No se automatiza un proceso que todavía no se entiende →

**Qué viene después:** El proceso ya corre solo, pero sigue reaccionando a lo que ya ocurrió. El siguiente paso es *anticipar* →

## `/soluciones/inteligencia-predictiva` — [ACTUAL, reencuadrado] · escalón 5

**Titular:** De explicar lo que pasó a saber lo que viene

**Dónde estás si esto te suena:** Los tableros ya explican bien el mes anterior. Lo que falta es enterarse antes, no después.

**Qué construimos [ACTUAL]:** Tu equipo ya toma decisiones todos los días. La diferencia es si las toma con datos del pasado o con modelos que ven lo que viene — antes de que sea urgente.
- Modelos predictivos para demanda, inventario y cuellos de botella
- Sistemas que aprenden del comportamiento de tu operación y mejoran sus recomendaciones con el tiempo
- Análisis visual automatizado para operaciones donde el ojo humano no escala

**Lo que cambia [ACTUAL]:** Decisiones basadas en lo que viene, no en lo que ya pasó. Problemas detectados antes de que tengan costo visible.

**Qué necesitas antes:** Histórico. Un modelo sin datos acumulados es una opinión con matemáticas. Si todavía no los tiene, el camino empieza en *capturar el dato* →

**Qué viene después:** El modelo avisa, pero alguien tiene que atender el aviso. El último escalón es que *se resuelva solo* →

## `/soluciones/zero-touch` — [NUEVO] · escalón 6

**Titular:** De la alerta que alguien tiene que atender al caso que se cierra solo

**Dónde estás si esto te suena:** El sistema ya avisa a tiempo y con buen criterio. Pero cada aviso sigue consumiendo el tiempo de una persona, y son muchos avisos.

**Qué construimos:**
- **Comprensión sin fricción.** Preguntar en lenguaje natural sobre la operación y recibir la respuesta, sin buscar en un tablero ni pedirle un reporte a nadie.
- **Resolución de extremo a extremo.** El sistema detecta la situación, decide qué hacer, lo ejecuta y cierra el caso.
- **Arquitectura agéntica.** Varios agentes especializados que se coordinan, con herramientas propias y memoria del proceso.
- **Control y trazabilidad.** Qué decide solo, qué requiere aprobación humana y qué queda registrado. Los límites se definen con usted antes de encender nada.

**Lo que cambia:** Es la única etapa que reemplaza horas de operación en vez de mejorarlas. Los cinco escalones anteriores hacen que su equipo trabaje mejor; este hace que no tenga que trabajar en eso.

**Qué necesitas antes:** Anticipar. Un sistema no puede resolver solo lo que todavía no sabe predecir →

**Qué viene después:** Nada. Este es el último escalón, y llegar aquí sin haber recorrido los anteriores no funciona: un agente sobre datos que no existen automatiza el error.

> El bloque de control no es una concesión, es lo que hace vendible el resto. La objeción siempre es "¿y si se equivoca?".

---

# 5. `/desarrollo-a-la-medida` — [NUEVO]

**Titular:** Lo que construimos en cada escalón

**Bajada:** No somos una agencia que recibe especificaciones ni una consultora que entrega recomendaciones. El mismo equipo que entiende su operación es el que escribe el código — y por eso la escalera se puede recorrer completa con un solo interlocutor.

**Capacidades, agrupadas por escalón, con captura propia y sin cliente identificable:**

*Capturar*
- Aplicaciones móviles que funcionan sin conexión y sincronizan al recuperar señal
- Captura georreferenciada de parcelas y activos
- Integración con sensores y equipos en campo

*Ver*
- Plataformas multi-tenant con control de acceso, roles y auditoría
- Tableros conectados a la fuente, sin consolidación manual
- Integración entre sistemas que hoy no se hablan

*Decidir*
- Visión por computador para conteo y detección en campo
- Modelos predictivos sobre operación real
- Agentes y sistemas multiagente

**Cierre:** Lo que construimos se le transfiere a usted. Sin dependencia del proveedor.

---

# 6. `/nosotros` — [ACTUAL, reescrito]

**Titular:** El equipo que entiende tu operación y construye la solución

**Bajada [REEMPLAZA la frase que se retira]:**
Ingeniería de operaciones, desarrollo propio y gestión por resultados, trabajando como un solo equipo desde el diagnóstico hasta la implementación. Definimos qué medir y después lo construimos — por eso el indicador no se queda en el papel.

> Se retira: "No somos una agencia de desarrollo ni una consultora de estrategia". Contradice la línea de estrategia e indicadores y define a LATCON por lo que no es. Y el reemplazo dice implícitamente la escalera completa en una frase: definir, construir, sostener.

**Los tres socios, sin años:**

**Luis Ramírez** — Operación · Datos · Arquitectura
Ingeniero industrial. Automatización de procesos de información, analítica de datos e implementación de modelos de IA en logística, agroindustria y educación.

**John Ramírez** — Desarrollo · IA · Cloud
Desarrollo de aplicaciones, machine learning, visión computacional y sistemas multiagente en la nube. Implementación en petróleo, gas y energía.

**César Ramírez** — Estrategia · Resultados
Implementación de estrategias operativas y gestión por resultados en distribución, telecomunicaciones y ventas.

**Etiquetas [ACTUAL]:** Operación · Datos · Automatización · Analítica · IA · SaaS · Visión · Multiagentes

---

# 7. `/metodo` — [ACTUAL, completo]

Las cuatro etapas se conservan textuales, cada una con su resultado. Se agregan dos bloques:

**#que-es-la-fase-0 [NUEVO]**

**Titular:** Por qué no cotizamos antes de entender

**Texto:** Antes de proponer nada hacemos un levantamiento sin supuestos: qué sistemas existen, qué datos hay de verdad, quién hace qué hoy y dónde se rompe. Suena obvio y casi nadie lo hace, porque toma tiempo y no se factura. Lo hacemos igual, porque una propuesta construida sobre supuestos se cae en la implementación — y ahí ya es caro para todos.

**#metodo-y-escalera [NUEVO]**

**Titular:** El método es nuestro. La escalera es suya.

**Texto:** Las cuatro etapas de arriba son cómo ejecutamos un proyecto. La escalera de seis escalones es hasta dónde llega su operación. Un proyecto puede subir un escalón o dos; nadie sube seis de una vez. En el diagnóstico le decimos en cuál está y cuál sigue, aunque la respuesta sea que todavía no necesita lo que vino a pedir.

---

# 8. Autodiagnóstico — [NUEVO]

La segunda vía de conversión, y la pieza que vuelve accionable la escalera.

**Patrón de referencia:** un evaluador gratuito atado a una línea de servicio, donde el visitante aporta información propia y recibe un resultado personalizado. Califica el prospecto y captura el contacto sin exigir una llamada.

**Formato:** 6 a 8 preguntas cerradas, tres minutos.

**Qué devuelve:**
- El escalón en el que está hoy
- Qué le falta para el siguiente
- Un enlace a la página de solución correspondiente
- La opción de agendar, con el resultado ya en contexto

**Qué le da al CRM:** el escalón entra como campo calificado, no como un correo suelto. Se puede segmentar el pipeline por escalón y saber qué escalón convierte mejor.

**Preguntas propuestas:**
1. ¿Sus indicadores están definidos y son los mismos para todas las áreas?
2. ¿El dato de la operación se registra donde ocurre o se digita después?
3. ¿Cuánto tarda en saber cómo va el mes?
4. ¿Cuántas personas tocan un dato antes de que llegue a una decisión?
5. ¿Sus sistemas se hablan entre sí?
6. ¿Se entera de los problemas antes o después de que tengan costo?
7. ¿Cuántas horas al mes se van en tareas que siempre son iguales?
8. ¿Tiene histórico acumulado de su operación?

---

# 9. Lo que todavía falta

| Falta | Quién lo consigue | Bloquea |
|---|---|---|
| Primer caso publicable | Se produce solo cuando cierre un proyecto | Nada. El sitio está diseñado para no depender de eso |
| Naranja y tipografía del CSS | Luis, 30 minutos | El archivo de tokens |
| Capturas propias de producto sin cliente identificable | Luis y John | `/desarrollo-a-la-medida` |
| Material audiovisual de drones, propio o con licencia | Comercial | `/soluciones/drones` y `/lp/drones` |
| Lógica de puntuación del autodiagnóstico | Luis | La segunda vía de conversión |

**Ninguno bloquea el arranque.** El home queda completo con la franja de sectores, y las cuatro páginas de sector se sostienen con capacidad y capturas propias. El único que conviene evaluar es `/sectores/avicultura`, que es el que menos material propio tiene: si no hay ni una captura del sector, mejor dejarlo fuera del primer lanzamiento que publicarlo flaco.

---

# 10. Una advertencia sobre capacidad

El sitio y SierraCol compiten por la misma persona. SierraCol son 16 semanas con hitos de cobro atados a fechas; el sitio no tiene fecha externa. Cuando dos cosas compiten y solo una tiene fecha, la que no la tiene se detiene.

Dos formas de que no pase: darle al sitio una fecha propia atada a algo real —la próxima feria funciona bien— o aceptar explícitamente que arranca después del Sprint 2 de SierraCol y decirlo, en vez de descubrirlo en noviembre.

---

*Documento de trabajo — el copy marcado [NUEVO] es propuesta, no versión final.*
