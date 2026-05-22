Eres un desarrollador frontend senior trabajando sobre la landing page de Latcon Services (latconservices.com). 
Debes implementar una serie de cambios de copywriting, estructura y UX basados en una auditoría estratégica de CRO y conversión B2B. 
No cambies el sistema de diseño visual, la paleta de colores, las tipografías ni los componentes existentes salvo donde se indique explícitamente. 
Mantén todas las imágenes y assets existentes en su lugar.

Antes de hacer cualquier cambio, identifica en el proyecto:
- El archivo principal de la landing (index, page, o el componente raíz de la home)
- Si hay archivos de contenido separados (MDX, JSON, CMS, constantes)
- Si los textos están hardcodeados en el componente o en archivos de contenido separados

Implementa los siguientes cambios en el orden indicado:

---

## CAMBIO 1 — Meta tags (SEO y Open Graph)

Reemplaza:
- title: "Latcon — Soluciones que integran operación, datos y tecnología."
- meta-description: "Soluciones que integran operación, datos y tecnología. Automatización, analítica e IA aplicada con enfoque consultivo."

Por:
- title: "Latcon — Operación, datos y tecnología para empresas en crecimiento"
- meta-description: "¿Qué tanto le cuesta a tu empresa operar con información dispersa? Integramos datos, procesos y tecnología para que tu organización gane visibilidad y capacidad de decisión."

---

## CAMBIO 2 — Sección HERO (reemplazar textos existentes)

Texto actual del eyebrow (encima del h1):
"Arquitectura · Integración · IA aplicada"

Reemplazar por:
"Operación · Datos · Tecnología — para empresas en crecimiento"

Texto actual del h1:
"Conecta información, procesos y decisiones para escalar con visibilidad y control"

Reemplazar por (usar etiqueta h1, mantener el mismo estilo visual):
"¿Qué tanto le cuesta a tu empresa operar con información dispersa y procesos que dependen de personas clave?"

Texto actual del párrafo descriptivo bajo el h1:
"Diseñamos sistemas que integran información, automatización e inteligencia artificial aplicada para dar visibilidad, mejorar la coordinación y fortalecer la toma de decisiones."

Reemplazar por:
"Somos el equipo que entiende tu operación antes de proponer cualquier tecnología. Integramos datos, automatizamos procesos y aplicamos inteligencia para que tu organización gane visibilidad, coordinación y capacidad de decisión — a tu ritmo y con implementación por etapas."

Texto actual del CTA principal:
"Agendar conversación" (enlace a /agenda)

Reemplazar el texto del botón por:
"Agenda tu diagnóstico gratuito"
Mantener el href="/agenda" o la ruta actual al formulario de agendamiento. No cambiar el estilo del botón.

Agregar inmediatamente debajo del botón CTA un texto de refuerzo pequeño (usar un <p> con clase de texto secundario/muted, tamaño pequeño):
"30 minutos · Sin compromiso · Te decimos con honestidad si somos el equipo indicado para tu caso"

Agregar un segundo CTA de tipo enlace de texto (sin estilo de botón, debajo del texto de refuerzo):
Texto: "Conoce nuestro enfoque →"
Href: "#process" (ancla a la sección del proceso)

---

## CAMBIO 3 — Agregar sección "Para quién" NUEVA

Insertar esta sección COMPLETA entre el hero y la sección actual de problemas (la que empieza con "Sin un sistema conectado...").

La sección debe tener el mismo contenedor/padding que las demás secciones de la página.

Estructura HTML semántica de la sección:

<section id="para-quien">
  
  <!-- Encabezado de sección -->
  <p>[etiqueta/eyebrow de sección, mismo estilo que los eyebrows existentes]</p>
  Texto del eyebrow: "Para quién"

  <h2>Trabajamos con empresas que ya tienen un problema real de gestión</h2>
  
  <p>Nuestros clientes suelen llegar cuando alguna de estas situaciones les resulta familiar:</p>

  <!-- Lista de señales de dolor — usar el mismo componente de lista o bullets que usa la sección de problemas -->
  - La operación depende de personas clave y nadie más tiene el contexto completo.
  - Los reportes llegan tarde o están en varias hojas de cálculo sin consolidar.
  - Escalar implica contratar más personas, no tener mejores sistemas.
  - Se perdió trazabilidad: es difícil saber qué pasó, cuándo y por qué.
  - Se tomaron malas decisiones porque los datos llegaron tarde o estaban dispersos.

  <!-- Tres cards de perfil de cliente ideal -->
  <!-- Usar el mismo componente de card o grid que usa la sección de "Soluciones" o "Contextos" -->
  <!-- Si no hay un componente reutilizable, crear tres divs en grid de 3 columnas (responsive: 1 columna en móvil) -->

  Card 1:
  Título: "Empresa en crecimiento"
  Descripción: "Entre 20 y 300 colaboradores. Las ventas crecen pero los sistemas no acompañan ese crecimiento. Todo funciona 'más o menos' hasta que deja de funcionar."
  Señal de reconocimiento (texto en cursiva o muted): "«Tenemos los datos pero no podemos usarlos.»"
  Sectores: Servicios · Retail · Manufactura

  Card 2:
  Título: "Operación distribuida o en campo"
  Descripción: "Equipos en campo, múltiples sedes o procesos que dependen de coordinación entre áreas. La ejecución se cae en la comunicación."
  Señal de reconocimiento: "«Coordinamos todo por WhatsApp y nadie sabe quién hizo qué.»"
  Sectores: Logística · Agroindustria · Servicios de campo

  Card 3:
  Título: "Empresa que ya invirtió en tecnología sin resultados"
  Descripción: "Compraron un ERP, CRM o plataforma que no se adoptó. Invirtieron en desarrollo que quedó a medias. Ahora buscan un equipo que entienda el negocio antes de proponer software."
  Señal de reconocimiento: "«Ya invertimos en tecnología y no funcionó como esperábamos.»"
  Sectores: Cualquier industria con operación compleja

</section>

---

## CAMBIO 4 — Sección de problemas (ajustar solo los textos de señales)

La sección actual con h2 "Sin un sistema conectado, la gestión pierde visibilidad, coordinación y control" está bien estructurada. 
Mantener el h2, el párrafo introductorio y la estructura de los 3 bloques (Visibilidad, Ejecución y coordinación, Escalabilidad y control).

Solo reducir el texto descriptivo de cada señal dentro de cada bloque. Las frases actuales son largas. 
Reemplazar las descripciones de cada señal por versiones más cortas:

Bloque 01 — Visibilidad:
- "Datos dispersos" → descripción: "Fuentes desconectadas sin una lectura común para decidir."
- "Reportes tardíos" → descripción: "Indicadores que llegan cuando ya no sirven para actuar."
- "Baja trazabilidad" → descripción: "Difícil auditar qué ocurrió, cuándo y por qué."

Bloque 02 — Ejecución y coordinación:
- "Procesos manuales" → descripción: "Tareas repetitivas que concentran riesgo y consumen tiempo."
- "Dependencia de personas" → descripción: "Conocimiento en cabezas y chats, no en sistemas compartidos."
- "Retrabajos y coordinación frágil" → descripción: "Desalineación entre áreas con alto costo oculto de alineación."

Bloque 03 — Escalabilidad y control:
- "Dificultad para escalar" → descripción: "Más demanda sin estructura que absorba el crecimiento."
- "Cuellos de botella" → descripción: "Puntos únicos de fallo que frenan entregas y respuesta."
- "Menor control en la gestión" → descripción: "Menos visibilidad de riesgos y desempeño al crecer."

---

## CAMBIO 5 — Sección "Soluciones" — reemplazar encabezado y reestructurar en 3 capacidades

Texto actual del h2:
"Soluciones para conectar información, ejecución y decisiones"

Reemplazar por:
"Tres capacidades que transforman cómo gestiona tu organización"

Texto actual del párrafo:
"Combinamos arquitectura, automatización e inteligencia aplicada para construir capacidades que mejoran la gestión desde la operación hasta la dirección."

Reemplazar por:
"No vendemos tecnología por separado. Construimos capacidades integradas — cada una orientada a un resultado de negocio concreto."

Ahora, las 6 cards de soluciones actuales deben reorganizarse en 3 grupos/capacidades. 
Si el diseño actual usa un grid de 6 cards iguales, reemplazar por 3 cards más grandes (o 3 secciones expandibles) con la siguiente estructura:

CAPACIDAD 1 — mantener imagen: arquitectura_sistemas.webp + automatizacion_integracion.webp (usar la primera)
Título: "Visibilidad que llega a tiempo"
Descripción: "Consolidamos tus datos dispersos y construimos tableros operativos que dan una lectura clara de lo que está pasando — sin esperar reportes manuales."
Lo que incluye (lista compacta):
· Arquitectura de datos e integración de fuentes
· Dashboards operativos en tiempo real  
· Alertas automáticas sobre indicadores críticos
Resultado: "Decisiones más rápidas y menos reuniones de alineación."

CAPACIDAD 2 — mantener imagen: automatizacion_integracion.webp + plataforma_saas_sistema.webp (usar la segunda)
Título: "Ejecución sin fricción manual"
Descripción: "Automatizamos los procesos que hoy dependen de personas o mensajes de WhatsApp — para que tu equipo se enfoque en lo que realmente genera valor."
Lo que incluye:
· Flujos de trabajo digitalizados y validados
· Integración entre herramientas (apps, ERP, formularios, mensajería)
· Agentes de IA para clasificación, soporte y coordinación
Resultado: "Menos errores, menos retrabajo y operación que escala sin contratar más personas."

CAPACIDAD 3 — mantener imagen: analitica_avanzada_machine_learning.webp
Título: "Decisiones apoyadas en inteligencia, no en intuición"
Descripción: "Construimos modelos analíticos y sistemas de IA aplicada que anticipan problemas, optimizan recursos y le dan a tu equipo señales accionables."
Lo que incluye:
· Modelos predictivos y de optimización
· Machine learning aplicado a operación y demanda
· Visión computacional y sistemas multiagente
Resultado: "Menor costo operativo y capacidad de anticipar problemas antes de que ocurran."

---

## CAMBIO 6 — Sección "Contextos" (verticals) — solo cambiar el encabezado

Texto actual del h2 (o encabezado de sección):
"Actividades y contextos donde este enfoque genera más impacto"

Reemplazar por:
"Industrias y contextos donde trabajamos"

Texto actual del párrafo introductorio:
"Aplica especialmente bien en contextos donde la coordinación, la trazabilidad y la capacidad de respuesta dependen de integrar mejor información, procesos y decisiones."

Reemplazar por:
"Nuestras soluciones se adaptan a distintos contextos operativos. Estos son los que conocemos con mayor profundidad:"

Agregar al final de esta sección, después de las 4 cards de contextos existentes, un CTA intermedio:
Texto del botón: "¿Tu industria no está aquí? Cuéntanos tu caso →"
Href: "/agenda"
Estilo: botón secundario (outline) o enlace de texto, centrado.

---

## CAMBIO 7 — Sección "Nosotros" — reemplazar textos

Texto actual del eyebrow:
"NOSOTROS"
Mantener.

Texto actual del h2:
"Un equipo que conecta operación, datos y tecnología"
Reemplazar por:
"El equipo detrás de Latcon"

Reemplazar el párrafo descriptivo actual (los dos párrafos largos sobre "equipo interdisciplinario") por:

"El equipo de Latcon combina más de una década de experiencia resolviendo problemas reales de operación, datos y tecnología en empresas de distintas industrias — antes de fundar Latcon.

Integramos tres perfiles complementarios: una consultora especializada en implementación de estrategia y gestión por resultados, y dos ingenieros con experiencia en automatización, desarrollo de aplicaciones, dashboards, machine learning, visión computacional, geolocalización y sistemas multiagente.

Nuestro enfoque no parte del software: primero entendemos cómo funciona tu operación, dónde están las fricciones reales y qué decisiones necesitan mejor soporte. A partir de ahí, diseñamos e implementamos la solución."

Mantener las etiquetas/tags al final (Operación, Datos, Automatización, Analítica, IA, SaaS, Visión, Multiagentes) tal como están.

---

## CAMBIO 8 — CTA final (antes del footer)

El CTA actual en la sección "Nosotros" o al final de la página dice:
"Agendar conversación" (enlace a /agenda)

Reemplazar por un bloque de CTA más completo. Mantener el mismo contenedor/estilo de sección.

Agregar un h2 o párrafo destacado antes del botón:
"¿Listo para entender si podemos ayudarte?"

Agregar un párrafo de apoyo:
"Agenda una sesión de diagnóstico de 30 minutos. Revisamos juntos tu operación, identificamos los principales puntos de fricción y te damos una recomendación concreta — aunque no trabajes con nosotros."

Botón principal:
Texto: "Agenda tu diagnóstico gratuito"
Href: "/agenda" (o la ruta actual al formulario)
Estilo: botón primario, mismo estilo que el CTA del hero.

Texto de refuerzo bajo el botón (pequeño, muted):
"Sin pitch de ventas · Sin compromiso · 30 minutos"

---

## CAMBIO 9 — Formulario de agendamiento (/agenda)

El formulario actual tiene 4 pasos. El Paso 1 muestra 8 campos de datos antes del calendario. 
Esto genera fricción alta y abandono. Invertir el orden de pasos:

Nuevo orden:
- Paso 1: Selección de fecha y hora (el calendario con días disponibles — lo que actualmente es el Paso 2)
- Paso 2: Datos de contacto (nombre completo, cargo, correo, teléfono/WhatsApp, empresa)
- Paso 3: Contexto (sector — cambiar de campo de texto a <select> con opciones: Agroindustria, Logística, Manufactura, Servicios, Retail, Tecnología, Otro — y el campo "Necesidad principal" como textarea obligatorio + "Comentario" opcional)
- Paso 4: Confirmación con resumen de fecha, hora y datos ingresados

Cambios adicionales en el formulario:
- El título "Agendar conversación" en todos los pasos → reemplazar por "Agenda tu diagnóstico gratuito"
- En el Paso 2 (datos), hacer "Ciudad / país" opcional en lugar de obligatorio
- Agregar debajo del botón "Continuar" en cada paso un texto pequeño: "Recibirás una confirmación por correo con los detalles de la sesión."

---

## NOTAS GENERALES PARA CURSOR

1. No cambiar ningún estilo visual, color, tipografía ni layout salvo donde se indica explícitamente.
2. No eliminar ninguna sección existente — solo agregar, reordenar textos o insertar la sección nueva "Para quién".
3. Todas las imágenes (.webp) deben mantenerse en su posición y src originales.
4. El href de todos los CTAs que apuntan al formulario debe mantener la ruta existente (/agenda o la que corresponda en el proyecto).
5. Si el proyecto usa i18n o archivos de traducción, hacer los cambios en el archivo del idioma español.
6. Si algún texto está en un CMS headless o archivo de datos externo, indicarlo en lugar de hardcodearlo.
7. Después de implementar los cambios del 1 al 8, mostrar un resumen de qué archivos fueron modificados.
8. El cambio 9 (formulario) puede requerir lógica adicional según cómo esté construido — si es un componente propio o una integración de terceros (Calendly, HubSpot, etc.), indicarlo antes de modificar.