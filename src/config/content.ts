import type { LandingContent } from "./landing/types";

export const landingContentEs = {
  hero: {
    chipPrefix: "Se rompe primero",
    chipWords: [
      { lead: "en la", emphasis: "planeación" },
      { lead: "en la", emphasis: "programación" },
      { lead: "en la", emphasis: "ejecución" },
      { lead: "en la", emphasis: "adaptación" },
    ],
    title: "El plan es perfecto — hasta que arranca la operación.",
    subtitle:
      "Construimos IA, optimización y software que cierran la brecha entre lo que planeas y lo que realmente pasa.",
    ctaPrimary: "Agenda tu diagnóstico gratuito",
    ctaReassurance: "30 minutos · sin compromiso",
    secondaryCtaLabel: "Conoce nuestro enfoque →",
    secondaryCtaHref: "#process",
  },
  audience: {
    eyebrow: "Para quién",
    title: "Trabajamos con empresas donde los datos, los sistemas y los equipos no se hablan entre sí",
    intro: "",
    profiles: [
      {
        title: "Datos sin análisis",
        description:
          "Los datos existen, pero analizarlos a tiempo exige personas y horas que la operación no tiene disponibles. Cuando el problema aparece en un reporte, ya tiene un costo.",
        quote: "«Tenemos los datos pero no podemos usarlos.»",
        sectors: "Servicios · Retail · Manufactura · Banca · Medios",
      },
      {
        title: "Equipos que trabajan en silos",
        description:
          "Ventas promete sin saber qué se puede producir. Compras reabastece sin ver la demanda real. Cada área trabaja con su propia versión de los datos — y nadie mide lo que eso cuesta.",
        quote: "«Cada área trabaja con números distintos y nadie sabe cuál es el real.»",
        sectors: "Manufactura · Retail · Distribución · Agroindustria",
      },
      {
        title: "Operación distribuida o en campo",
        description:
          "Equipos en campo, múltiples sedes, coordinación por WhatsApp y correo. Sin un registro compartido, es difícil saber qué pasó, quién lo hizo y cuándo — hasta que ya tiene consecuencias.",
        quote: "«Coordinamos todo por WhatsApp y nadie sabe quién hizo qué.»",
        sectors: "Logística · Agroindustria · Servicios de campo",
      },
      {
        title: "Tecnología sin integración",
        description:
          "ERP, CRM, plataformas y aplicativos — cada uno funcionando por separado. Sin integración, la operación depende de ajustes manuales y decisiones basadas en datos incompletos.",
        quote: "«Tenemos varios sistemas pero ninguno le habla al otro.»",
        sectors: "Cualquier industria con operación compleja",
      },
    ],
  },
  solutions: {
    eyebrow: "Soluciones",
    title: "Tres formas de cerrar la brecha.",
    intro:
      "Tres capacidades integradas, un solo objetivo: que lo que pasa se mantenga lo más cerca posible de lo que planeaste.",
    cards: [
      {
        kind: "plan",
        title: "Planea mejor",
        summary: "Modelos de optimización y predicción que convierten tus restricciones en el mejor plan posible.",
      },
      {
        kind: "execute",
        title: "Ejecuta sin fricción",
        summary: "Aplicaciones y automatización que llevan el plan al terreno — con trazabilidad completa.",
      },
      {
        kind: "adapt",
        title: "Detecta y adapta a tiempo",
        summary:
          "Visibilidad, alertas y agentes de IA que detectan desviaciones antes de que se conviertan en costo.",
      },
    ],
  },
  experience: {
    eyebrow: "Experiencia",
    title: "Así se ve cerrar la brecha.",
    cases: [
      {
        industry: "Agricultura",
        pillar: "execute",
        headline: "Del campo a la decisión.",
        situation:
          "La actividad de cosecha se registraba en papel — sin forma de medir el avance frente a los objetivos del programa.",
        built:
          "Una plataforma de extremo a extremo: captura de datos en campo, cultivos georreferenciados y reportes operativos generados con IA.",
        changed: "El programa ahora monitorea sus objetivos con datos de campo en vivo, no con papeles.",
      },
      {
        industry: "Oil & Gas",
        pillar: "plan",
        headline: "Demanda de agua satisfecha al menor costo energético.",
        situation:
          "Una planta de inyección de agua necesitaba configuraciones de bombeo que cumplieran la demanda sin desperdiciar energía.",
        built: "La aplicación web que calcula la configuración óptima de frecuencia para cada escenario.",
        changed: "La operación ahora funciona al menor costo energético que la demanda permite.",
      },
      {
        industry: "Transporte",
        pillar: "adapt",
        headline: "Ver la demanda antes de que llegue el bus.",
        situation:
          "La aglomeración en las estaciones era una suposición hasta que llegaba el bus — demasiado tarde para ajustar.",
        built: "Un piloto de visión computacional que mide la densidad de personas en las estaciones en tiempo real.",
        changed: "La planeación del servicio ahora parte de lo que pasa en el andén, no solo de horarios fijos.",
      },
    ],
  },
  process: {
    eyebrow: "MÉTODO",
    title: "Primero entendemos. Luego construimos.",
    intro:
      "Cada etapa tiene un entregable concreto. No avanzamos a la siguiente hasta que la anterior genera claridad.",
    resultLabel: "Resultado",
    steps: [
      {
        title: "Entendemos el contexto",
        body: "Conversamos contigo para entender cómo funciona hoy la operación, dónde están las fricciones y qué decisiones necesitan mejor soporte.",
        result: "Claridad sobre el problema que realmente vale la pena resolver.",
      },
      {
        title: "Diseñamos la solución",
        body: "Traducimos el diagnóstico en una propuesta concreta — para que veas la solución antes de invertir en desarrollarla.",
        result: "Una solución clara, validada y alineada con tu realidad.",
      },
      {
        title: "Construimos por etapas",
        body: "Desarrollamos la solución con entregas parciales y validaciones continuas, enfocándonos primero en lo que más valor aporta.",
        result: "Solución parcial funcionando, validada con usuarios reales antes de la entrega final.",
      },
      {
        title: "Implementamos y ajustamos",
        body: "Acompañamos la puesta en marcha y los ajustes necesarios para que la solución empiece a usarse bien y genere resultados desde el inicio.",
        result: "Una solución funcionando en contexto real, con adopción y trazabilidad.",
      },
    ],
    closing: "Y cuando ya funciona, la preparamos para crecer — más integración, más analítica, más automatización.",
    strategyNote:
      "En cada etapa: la disciplina de estrategia y gestión por resultados que mantiene la solución alineada con el negocio — no como una consultoría aparte.",
  },
  about: {
    panel: {
      eyebrow: "NOSOTROS",
      headline: "Operación + datos + tecnología",
      body: "Hemos construido plataformas operativas, modelos de ML y automatizaciones con IA en implementaciones reales.",
    },
    title: "El equipo que entiende tu operación y construye la solución.",
    members: [
      {
        name: "Luis Ramírez",
        role: "Operación · Datos · Arquitectura",
        credential: "Ingeniero Industrial. 15 años conectando operación y tecnología en logística, agroindustria e inteligencia de datos.",
      },
      {
        name: "César Ramírez",
        role: "Estrategia · Resultados",
        credential: "5+ años acompañando organizaciones en la implementación de estrategias operativas y gestión por resultados en distribución, telecomunicaciones y ventas.",
      },
      {
        name: "John Ramírez",
        role: "Desarrollo · IA · Cloud",
        credential: "10+ años en apps, ML, visión computacional, sistemas multiagente y cloud.",
      },
    ],
    paragraphs: [
      "No somos una agencia de desarrollo ni una consultora de estrategia. Somos ingeniería de operaciones, desarrollo propio y gestión por resultados — trabajando como un solo equipo desde el diagnóstico hasta la implementación.",
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
    body: "Agenda una sesión de diagnóstico de 30 minutos. Revisamos juntos cómo fluye tu operación, identificamos dónde se pierden datos, tiempo o decisiones — y te damos una recomendación concreta, aunque no trabajes con nosotros.",
    ctaPrimary: "Agenda tu diagnóstico gratuito",
    ctaReassurance: "Sin pitch de ventas · Sin compromiso · 30 minutos",
  },
} satisfies LandingContent;

/** @deprecated Usar getLandingContent desde @/config/landing */
export const content = landingContentEs;
