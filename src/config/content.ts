import type { LandingContent } from "./landing/types";

export const landingContentEs = {
  hero: {
    chip: "Datos · Automatización · IA · Anticipación",
    title: "¿Tu empresa ya tiene los datos pero todavía no puede usarlos para decidir a tiempo?",
    subtitle:
      "Integramos tus datos, automatizamos tus procesos y construimos sistemas de IA que le dan a tu equipo señales claras para actuar — antes de que el problema sea visible.",
    ctaPrimary: "Agenda tu diagnóstico gratuito",
    ctaReassurance: "30 minutos · Sin compromiso · Te decimos con honestidad si somos el equipo indicado para tu caso",
    secondaryCtaLabel: "Conoce nuestro enfoque →",
    secondaryCtaHref: "#process",
  },
  audience: {
    eyebrow: "Para quién",
    title: "Trabajamos con empresas donde los datos, los sistemas y los equipos no están conectados",
    intro: "",
    profiles: [
      {
        title: "Datos sin análisis",
        description:
          "Los datos están ahí, pero analizarlos en tiempo real requiere tiempo y personal que la operación no tiene disponible. Las oportunidades pasan y los problemas se detectan tarde — cuando ya tienen un costo visible.",
        quote: "«Tenemos los datos pero no podemos usarlos.»",
        sectors: "Servicios · Retail · Manufactura · Banca · Medios",
      },
      {
        title: "Áreas que operan en silos",
        description:
          "Ventas promete sin saber qué puede producir. Compras reabastece sin ver la demanda real. Producción planifica sin conocer lo que viene. Cada área trabaja con su propia versión de los datos — y la descoordinación tiene un costo que nadie mide.",
        quote: "«Cada área trabaja con números distintos y nadie sabe cuál es el real.»",
        sectors: "Manufactura · Retail · Distribución · Agroindustria",
      },
      {
        title: "Operación distribuida o en campo",
        description:
          "Equipos en campo, múltiples sedes o procesos entre áreas que se coordinan por WhatsApp y correo. Sin trazabilidad centralizada, es difícil saber qué pasó, quién lo hizo y cuándo — hasta que el error ya tiene consecuencias.",
        quote: "«Coordinamos todo por WhatsApp y nadie sabe quién hizo qué.»",
        sectors: "Logística · Agroindustria · Servicios de campo",
      },
      {
        title: "Tecnología sin integración",
        description:
          "Tienen ERP, CRM, plataformas y aplicativos — cada uno funcionando por separado. Sin integración entre sistemas, la operación genera ajustes manuales, reprocesos y decisiones basadas en datos incompletos. Buscan un equipo que conecte lo que ya tienen antes de proponer algo nuevo.",
        quote: "«Tenemos varios sistemas pero ninguno le habla al otro.»",
        sectors: "Cualquier industria con operación compleja",
      },
    ],
  },
  problems: {
    title: "Sin un sistema conectado, la gestión pierde visibilidad, coordinación y control",
    intro:
      "El problema no suele aparecer en un solo punto. Comienza con información dispersa, se refleja en la ejecución diaria y termina limitando la capacidad de coordinar, decidir y escalar con control.",
    signalsHeading: "Señales habituales",
    groups: [
      {
        title: "01. Visibilidad",
        narrative: "Lectura tardía de lo que pasa, datos dispersos y poca trazabilidad para dirección y equipos.",
        signals: [
          { title: "Datos dispersos", body: "Fuentes desconectadas sin una lectura común para decidir." },
          { title: "Reportes tardíos", body: "Indicadores que llegan cuando ya no sirven para actuar." },
          { title: "Baja trazabilidad", body: "Difícil auditar qué ocurrió, cuándo y por qué." },
        ],
      },
      {
        title: "02. Ejecución y coordinación",
        narrative: "Seguimiento frágil, dependencia de personas y coordinación que no escala con la complejidad.",
        signals: [
          { title: "Procesos manuales", body: "Tareas repetitivas que concentran riesgo y consumen tiempo." },
          { title: "Dependencia de personas", body: "Conocimiento en cabezas y chats, no en sistemas compartidos." },
          { title: "Retrabajos y coordinación frágil", body: "Desalineación entre áreas con alto costo oculto de alineación." },
        ],
      },
      {
        title: "03. Escalabilidad y control",
        narrative: "Al crecer volumen o complejidad, aparecen cuellos de botella y se debilita el control en la gestión.",
        signals: [
          { title: "Dificultad para escalar", body: "Más demanda sin estructura que absorba el crecimiento." },
          { title: "Cuellos de botella", body: "Puntos únicos de fallo que frenan entregas y respuesta." },
          { title: "Menor control en la gestión", body: "Menos visibilidad de riesgos y desempeño al crecer." },
        ],
      },
    ],
  },
  solutions: {
    eyebrow: "SOLUCIONES",
    title: "Así conectamos lo que hoy está desconectado en tu operación.",
    intro:
      "Tres capacidades integradas. Un solo objetivo: que tu equipo actúe con información real y a tiempo.",
    srOnlyCarousel: "Tres capacidades en pasarela horizontal con navegación por puntos.",
    prevCapabilityAria: "Capacidad anterior",
    nextCapabilityAria: "Capacidad siguiente",
    capabilitiesNavAria: "Navegación entre capacidades",
    capabilityNavAria: (title: string, index: number, total: number) =>
      `${title} (${index} de ${total})`,
    includesLabel: "Lo que incluye",
    resultLabel: "Resultado",
    capabilities: [
      {
        line: "integrate",
        image: "/solutions/arquitectura_sistemas.webp",
        imageAlt: "Visibilidad operativa: dashboards e integración de datos.",
        title: "Visibilidad que llega a tiempo",
        body: "Tu operación genera datos en múltiples sistemas. Los conectamos, los organizamos y los convertimos en señales claras — para que tu equipo actúe, no que espere.",
        includes: [
          "Tus fuentes de datos conectadas en un solo lugar — sin consolidación manual",
          "Tableros operativos actualizados en tiempo real — sin depender de reportes manuales",
          "Alertas que llegan antes de que el problema sea visible",
        ],
        result: "Menos tiempo esperando datos · Decisiones que llegan cuando todavía sirven para actuar",
      },
      {
        line: "coordinate",
        image: "/solutions/automatizacion_integracion.webp",
        imageAlt: "Automatización e integración de procesos operativos.",
        title: "Ejecución sin fricción manual",
        body: "Cada proceso manual es un punto de fallo. Identificamos cuáles frenan tu operación y los convertimos en flujos automáticos, trazables y confiables.",
        includes: [
          "Procesos manuales convertidos en flujos automáticos, validados y trazables",
          "ERP, apps, formularios y mensajería integrados en un solo flujo de información",
          "Agentes de IA que ejecutan tareas repetitivas — sin intervención humana",
        ],
        result: "Menos errores, menos retrabajo y operación que escala sin contratar más personas.",
      },
      {
        line: "amplify",
        image: "/solutions/analitica_avanzada_machine_learning.webp",
        imageAlt: "Analítica avanzada y machine learning aplicado a la gestión.",
        title: "Decisiones apoyadas en inteligencia, no en intuición",
        body: "Tu equipo ya toma decisiones todos los días. La diferencia es si las toma con datos del pasado o con modelos que ven lo que viene — antes de que sea urgente.",
        includes: [
          "Modelos predictivos para demanda, inventario y cuellos de botella — antes de que sean urgentes",
          "Sistemas que aprenden del comportamiento de tu operación y mejoran sus recomendaciones con el tiempo",
          "Análisis visual automatizado para operaciones donde el ojo humano no escala",
        ],
        result: "Menor costo operativo y capacidad de anticipar problemas antes de que ocurran.",
      },
    ],
  },
  verticals: {
    title: "Industrias y contextos donde trabajamos",
    intro:
      "Nuestras soluciones se adaptan a distintos contextos operativos. Estos son los que conocemos con mayor profundidad:",
    useCasesLabel: "Casos de uso",
    componentsLabel: "Componentes",
    midCtaLabel: "¿Tu industria no está aquí? Cuéntanos tu caso →",
    blocks: [
      {
        title: "Entornos con alta carga manual de información",
        body: "Reducimos la dependencia de registros manuales, formatos dispersos y tareas repetitivas mediante formularios digitales, flujos de captura estructurada, validaciones automáticas y tableros que organizan la información y hacen más ágil la ejecución.",
        image: "/verticals/entornos_alta_carga_manual_informacion.webp",
        imageAlt:
          "Entornos con carga manual de información: formularios digitales, captura estructurada, validaciones y tableros operativos.",
        useCases: [
          "Digitalización de formularios y registros manuales",
          "Validación y consolidación de información dispersa",
          "Seguimiento de incidencias, hallazgos o actividades repetitivas",
          "Clasificación, priorización y soporte con agentes de IA",
        ],
        components: [
          "Formularios digitales y captura estructurada",
          "Reglas y validaciones automáticas",
          "Consolidación de datos y trazabilidad",
          "Dashboards de seguimiento y control",
          "Integración en la nube",
          "Agentes de IA para clasificación y asistencia",
        ],
      },
      {
        title: "Transición de herramientas sueltas a plataforma",
        body: "Acompañamos la transición desde herramientas dispersas, archivos sueltos y procesos desconectados hacia una plataforma más estructurada, conectada y escalable, capaz de centralizar la gestión y dar mayor visibilidad sobre la operación y las decisiones.",
        image: "/verticals/transicion_herramientas_a_plataforma.webp",
        imageAlt:
          "Ilustración abstracta: paso de herramientas dispersas a una plataforma integrada y escalable.",
        useCases: [
          "Consolidación de información capturada desde móvil, formularios y mensajería",
          "Centralización de indicadores, registros y seguimiento en una sola plataforma",
          "Digitalización de flujos donde hoy intervienen múltiples herramientas",
          "Análisis y soporte a decisiones con modelos y agentes de IA",
        ],
        components: [
          "Aplicaciones móviles y formularios digitales",
          "Integración con mensajería y canales de captura",
          "Servicios en la nube y consolidación de datos",
          "Plataformas web con dashboards y registro de información",
          "Modelos matemáticos y analítica aplicada",
          "Agentes de IA integrados al flujo operativo",
        ],
      },
      {
        title: "Operaciones de campo y servicios distribuidos",
        body: "Diseñamos soluciones para coordinar ventas, mantenimientos, instalaciones y entregas en operaciones distribuidas, optimizando rutas, asignaciones y seguimiento mediante modelos matemáticos y agentes de IA que apoyan la ejecución donde más se necesitan.",
        image: "/verticals/operaciones_campo_servicios_distribuidos.webp",
        imageAlt:
          "Operaciones distribuidas: coordinación de ventas, mantenimiento, instalaciones y entregas con optimización y apoyo de IA.",
        useCases: [
          "Coordinación de visitas comerciales y ventas en campo",
          "Seguimiento de instalaciones y mantenimientos",
          "Coordinación de entregas y servicios distribuidos",
          "Asignación inteligente de recursos y soporte con agentes de IA",
        ],
        components: [
          "Aplicaciones móviles para equipos en campo",
          "Mapas operativos y geolocalización",
          "Órdenes de trabajo y seguimiento en tiempo real",
          "Dashboards de coordinación y control",
          "Modelos matemáticos de asignación y ruteo",
          "Agentes de IA para soporte operativo",
        ],
      },
      {
        title: "Agroindustria y gestión en campo",
        body: "Integramos captura en campo, georreferenciación y análisis visual para transformar imágenes y datos territoriales en trazabilidad, visibilidad y decisiones más precisas sobre el territorio.",
        image: "/verticals/agroindustria_gestion_campo.webp",
        imageAlt:
          "Agroindustria y gestión en campo: captura en campo, georreferenciación y análisis visual sobre el territorio.",
        useCases: [
          "Medición de productividad por lote o unidad productiva",
          "Detección temprana de enfermedades y anomalías en cultivo",
          "Monitoreo georreferenciado de variables de entorno",
          "Seguimiento y validación de actividades en campo",
        ],
        components: [
          "Captura móvil georreferenciada",
          "Mapas operativos y capas territoriales",
          "Visión computacional sobre imágenes",
          "Dashboards de seguimiento productivo",
          "Integración en la nube",
          "Modelos de análisis y agentes de IA",
        ],
      },
    ],
  },
  process: {
    eyebrow: "MÉTODO",
    title: "Cómo llevamos una necesidad real a una solución que funciona",
    intro:
      "No empezamos por tecnología. Empezamos por entender el contexto, diseñar bien la solución y construir solo lo que realmente aporta valor.",
    resultLabel: "Resultado",
    steps: [
      {
        title: "Entendemos el contexto",
        body: "Conversamos contigo para entender cómo funciona hoy la operación, dónde están las fricciones y qué decisiones necesitan mejor soporte.",
        result: "Claridad sobre el problema que realmente vale la pena resolver.",
      },
      {
        title: "Diseñamos la solución",
        body: "Traducimos esa necesidad en una propuesta concreta: estructura, flujo o prototipo, para que puedas visualizar la solución antes de desarrollar.",
        result: "Una solución clara, validada y alineada con tu realidad.",
      },
      {
        title: "Construimos por etapas",
        body: "Desarrollamos la solución con entregas parciales y validaciones continuas, enfocándonos primero en lo que más valor aporta.",
        result: "Avances visibles, aprendizaje rápido y mejor uso de la inversión.",
      },
      {
        title: "Implementamos y ajustamos",
        body: "Acompañamos la puesta en marcha y los ajustes necesarios para que la solución empiece a usarse bien y genere resultados desde el inicio.",
        result: "Una solución funcionando en contexto real, con adopción y trazabilidad.",
      },
    ],
    closing:
      "Y cuando la solución ya funciona, la preparamos para crecer con más integración, analítica y automatización.",
  },
  about: {
    panel: {
      eyebrow: "NOSOTROS",
      headline: "Operación + datos + tecnología",
      body: "Hemos construido plataformas operativas, modelos de ML y automatizaciones con IA en implementaciones reales.",
    },
    title: "El equipo detrás de Latcon",
    paragraphs: [
      "El equipo de Latcon tiene experiencia directa construyendo las soluciones que ofrece: hemos diseñado plataformas operativas que integran aplicación web, dashboards, repositorio de datos en la nube y apps móviles para iOS y Android — y hemos implementado modelos de machine learning y automatizaciones con sistemas multiagente de IA en contextos reales de operación.",
      "Integramos tres perfiles complementarios: una consultora con más de cinco años en implementación de estrategia y gestión por resultados, y dos ingenieros con más de una década en automatización, desarrollo de software, analítica aplicada, visión computacional y sistemas de IA.",
      "Nuestro enfoque no parte del software: primero entendemos cómo funciona tu operación, dónde están las fricciones reales y qué decisiones necesitan mejor soporte. A partir de ahí, diseñamos e implementamos la solución.",
    ],
    tags: [
      "Operación",
      "Datos",
      "Automatización",
      "Analítica",
      "IA",
      "SaaS",
      "Visión",
      "Multiagentes",
    ],
  },
  finalCta: {
    title: "Cada semana sin visibilidad tiene un costo. Averigüemos juntos si podemos ayudarte a reducirlo.",
    body: "Agenda una sesión de diagnóstico de 30 minutos. Revisamos juntos tu operación, identificamos los principales puntos de fricción y te damos una recomendación concreta — aunque no trabajes con nosotros.",
    ctaPrimary: "Agenda tu diagnóstico gratuito",
    ctaReassurance: "Sin pitch de ventas · Sin compromiso · 30 minutos",
  },
} satisfies LandingContent;

/** @deprecated Usar getLandingContent desde @/config/landing */
export const content = landingContentEs;
