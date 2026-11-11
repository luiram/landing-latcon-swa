/**
 * Contenido de /soluciones, las seis páginas de escalón y /soluciones/drones.
 * Fuente: docs/contenido-sitio.md §4 y docs/brief-drones.md.
 * Solo en español hasta la fase de traducción (ADR 0004). Sin cifras, casos ni clientes (reglas 6 y 7).
 */
import type { DatosImagen } from "@/components/ui/Imagen";
import type { DatosPrueba } from "@/components/sections/FranjaPrueba";
import type { EnlaceNav } from "@/lib/navegacion";
import { CTA_PRINCIPAL, ESCALONES, FAMILIAS, RUTAS } from "./mapa";
import { INICIO } from "./inicio";

const escalon = (n: number) => ESCALONES[n - 1];

/**
 * "Qué necesitas antes" / "Qué viene después". `destino` enlaza a otro escalón; `enlace`, a otra página
 * (el primer escalón no tiene uno anterior: enlaza al diagnóstico). Regla 8: siempre hay uno de los dos.
 */
type Paso = { titulo: string; texto: string; destino?: number; enlace?: EnlaceNav };

export type PaginaEscalon = {
  slug: string;
  numero: number;
  /** Regla 1: "de X a Y", nunca una categoría. */
  titulo: string;
  /** El título empieza por el nombre del escalón (Regla 3) y sigue con lo que se busca. */
  metadatos: { titulo: string; descripcion: string };
  dondeEstas: string;
  queConstruimos: { intro?: string; items: readonly string[]; imagen?: DatosImagen; enlace?: EnlaceNav };
  loQueCambia: string;
  antes: Paso;
  despues: Paso;
  /** Bloque adicional al final de "Qué construimos". */
  extra?: { titulo: string; texto: string };
  /** Espacio de caso reservado (§2). Sin casos, la franja no se muestra. */
  casos: readonly DatosPrueba[];
};

const slugDe = (ruta: string) => ruta.split("/").at(-1)!;

const ESTRATEGIA: PaginaEscalon = {
  slug: slugDe(RUTAS.estrategia),
  numero: 1,
  titulo: "De la estrategia en el papel al indicador que alguien mira el lunes",
  metadatos: {
    titulo: "Definir qué medir: diseño de indicadores de gestión",
    descripcion: "Despliegue de objetivos, diseño de indicadores y una rutina de gestión que produce acciones. El primer escalón: decidir qué vale la pena medir.",
  },
  dondeEstas:
    "Hay objetivos definidos, hay reuniones de seguimiento, y aun así nadie sabe con certeza si el mes va bien. Cada área lleva sus propios números y ninguno se puede comparar con el otro.",
  queConstruimos: {
    items: [
      "Despliegue de objetivos: de la estrategia declarada a lo que cada área hace el lunes",
      "Diseño de indicadores: qué medir, con qué meta y con qué frecuencia. Pocos y comparables, no un catálogo",
      "RPPA: la rutina de gestión en el nivel operativo, para que el indicador se mire, se discuta y produzca una acción",
      "Acompañamiento directivo: seguimiento por resultados con los equipos que deciden",
    ],
  },
  loQueCambia: "El indicador deja de ser un número que se reporta y pasa a ser un número que cambia decisiones.",
  antes: {
    titulo: "Una conversación de 30 minutos",
    texto:
      "Este es el primer escalón, y es donde debería empezar cualquiera que no esté seguro de qué medir. Para arrancar basta el diagnóstico: revisamos cómo fluye tu operación y te decimos por dónde empezar.",
    enlace: { etiqueta: `${CTA_PRINCIPAL.etiqueta} →`, ruta: CTA_PRINCIPAL.ruta },
  },
  despues: { titulo: escalon(2).nombre, texto: "Definido el indicador, hay que conseguir el dato que lo alimenta.", destino: 2 },
  extra: {
    titulo: "Y esto es lo que nos hace distintos",
    texto:
      "Una consultoría entrega el documento con los indicadores y se va; después alguien tiene que conseguir el dato, armar el tablero y sostener la rutina, y ahí es donde el tablero muere. Nosotros hacemos las dos mitades. El indicador no se queda en el papel porque los cinco escalones siguientes existen.",
  },
  casos: [],
};

const CAPTURA: PaginaEscalon = {
  slug: slugDe(RUTAS.captura),
  numero: 2,
  titulo: "Del dato que nace y se pierde al dato que llega",
  metadatos: {
    titulo: "Capturar el dato: sensores y captura sin señal",
    descripcion: "Sensores y actuadores, captura móvil que funciona sin señal y drones, para que el dato nazca en un formato que se pueda consolidar y usar.",
  },
  dondeEstas:
    "Ya sabes qué quieres medir. El problema es que el dato nace en un cuaderno, en un WhatsApp o en la cabeza de alguien, y todo lo que viene después hereda ese vacío.",
  queConstruimos: {
    items: [
      "Sensores y actuadores: condiciones medidas en continuo, sin que nadie tenga que ir a mirar",
      "Captura móvil que funciona sin señal: el registro se guarda en el dispositivo y sube cuando vuelve la conexión. Nunca se bloquea por falta de red",
      "Drones: levantamiento aéreo de información que a pie tomaría días",
    ],
    /** Ilustrativa. */
    imagen: {
      src: "/verticals/operaciones_campo_servicios_distribuidos.webp",
      alt: "Técnico en campo junto a un tablero de órdenes de trabajo y una tableta con el registro",
    },
    enlace: { etiqueta: "Ver la línea completa de drones →", ruta: RUTAS.drones },
  },
  loQueCambia: "El dato deja de depender de que alguien se acuerde de anotarlo.",
  antes: { titulo: escalon(1).nombre, texto: "Saber qué vale la pena registrar. Si no está claro, empieza por aquí.", destino: 1 },
  despues: { titulo: escalon(3).nombre, texto: "Con el dato llegando, se puede ver lo que pasa.", destino: 3 },
  casos: [],
};

const VISIBILIDAD: PaginaEscalon = {
  slug: slugDe(RUTAS.visibilidad),
  numero: 3,
  titulo: "Del reporte que llega tarde a la señal que llega a tiempo",
  metadatos: {
    titulo: "Ver lo que pasa: tableros y alertas en tiempo real",
    descripcion: "Fuentes conectadas, tableros en tiempo real y alertas antes de que el problema sea visible, sin consolidar hojas de cálculo cada semana.",
  },
  dondeEstas:
    "El dato existe y está capturado, pero vive en varios sistemas y consolidarlo es trabajo de alguien todas las semanas.",
  queConstruimos: {
    intro:
      "Tu operación genera datos en múltiples sistemas. Los conectamos, los organizamos y los convertimos en señales claras para que tu equipo actúe.",
    items: [
      "Tus fuentes de datos conectadas en un solo lugar, sin consolidación manual",
      "Tableros operativos actualizados en tiempo real, sin depender de reportes manuales",
      "Alertas que llegan antes de que el problema sea visible",
    ],
    imagen: { src: "/solutions/arquitectura_sistemas.webp", alt: "Tablero operativo que reúne datos de varios sistemas" },
  },
  loQueCambia: "Menos tiempo esperando datos. Decisiones que llegan cuando todavía sirven para actuar.",
  antes: {
    titulo: escalon(2).nombre,
    texto: "Que el dato exista y esté llegando. Si todavía nace en papel, empieza por capturarlo.",
    destino: 2,
  },
  despues: {
    titulo: escalon(4).nombre,
    texto: "Ver lo que pasa es necesario, pero sigue exigiendo que alguien mire y actúe. El siguiente paso es automatizar.",
    destino: 4,
  },
  casos: [],
};

const AUTOMATIZACION: PaginaEscalon = {
  slug: slugDe(RUTAS.automatizacion),
  numero: 4,
  titulo: "Del proceso que depende de alguien al proceso que corre solo",
  metadatos: {
    titulo: "Automatizar: flujos e integración de sistemas",
    descripcion: "Flujos automáticos y trazables, sistemas integrados y agentes de IA para tareas repetitivas, sobre procesos que ya se entienden y se miden.",
  },
  dondeEstas: "Ya ve lo que pasa. El problema es que entre verlo y que algo cambie hay tres personas, dos correos y un archivo.",
  queConstruimos: {
    intro:
      "Cada proceso manual es un punto de fallo. Identificamos cuáles frenan tu operación y los convertimos en flujos automáticos, trazables y confiables.",
    items: [
      "Procesos manuales convertidos en flujos automáticos, validados y trazables",
      "ERP, apps, formularios y mensajería integrados en un solo flujo de información",
      "Agentes de IA que ejecutan tareas repetitivas, sin intervención humana",
    ],
    imagen: {
      src: "/solutions/automatizacion_integracion.webp",
      alt: "Flujo automático que conecta mensajería, formularios y sistemas",
    },
  },
  loQueCambia:
    "Operación que fluye sin cuellos de botella, con trazabilidad completa y capacidad de crecer sin agregar complejidad.",
  antes: { titulo: escalon(3).nombre, texto: "No se automatiza un proceso que todavía no se entiende.", destino: 3 },
  despues: {
    titulo: escalon(5).nombre,
    texto: "El proceso ya corre solo, pero sigue reaccionando a lo que ya ocurrió. El siguiente paso es anticipar.",
    destino: 5,
  },
  casos: [],
};

const PREDICCION: PaginaEscalon = {
  slug: slugDe(RUTAS.prediccion),
  numero: 5,
  titulo: "De explicar lo que pasó a saber lo que viene",
  metadatos: {
    titulo: "Anticipar: modelos predictivos y visión artificial",
    descripcion: "Modelos predictivos, sistemas que aprenden de la operación y análisis visual automatizado, para decidir con lo que viene y no con lo que pasó.",
  },
  dondeEstas: "Los tableros ya explican bien el mes anterior. Lo que falta es enterarse antes, no después.",
  queConstruimos: {
    intro:
      "Tu equipo ya toma decisiones todos los días. La diferencia es si las toma con datos del pasado o con modelos que ven lo que viene — antes de que sea urgente.",
    items: [
      "Modelos predictivos para demanda, inventario y cuellos de botella",
      "Sistemas que aprenden del comportamiento de tu operación y mejoran sus recomendaciones con el tiempo",
      "Análisis visual automatizado para operaciones donde el ojo humano no escala",
    ],
    imagen: {
      src: "/solutions/analitica_avanzada_machine_learning.webp",
      alt: "Equipo revisando modelos predictivos en una pantalla de sala de reuniones",
    },
  },
  loQueCambia: "Decisiones basadas en lo que viene, no en lo que ya pasó. Problemas detectados antes de que tengan costo visible.",
  antes: {
    titulo: escalon(2).nombre,
    texto:
      "Histórico. Un modelo sin datos acumulados es una opinión con matemáticas. Si todavía no los tiene, el camino empieza en capturar el dato.",
    destino: 2,
  },
  despues: {
    titulo: escalon(6).nombre,
    texto: "El modelo avisa, pero alguien tiene que atender el aviso. El último escalón es que se resuelva solo.",
    destino: 6,
  },
  casos: [],
};

const AGENTES_IA: PaginaEscalon = {
  slug: slugDe(RUTAS.agentesIa),
  numero: 6,
  titulo: "De la alerta que alguien tiene que atender al caso que se cierra solo",
  metadatos: {
    titulo: "Resolver solo: agentes de IA para la operación",
    descripcion: "Agentes de IA que detectan, deciden, ejecutan y cierran el caso, con límites definidos, aprobación humana donde hace falta y trazabilidad.",
  },
  dondeEstas:
    "El sistema ya avisa a tiempo y con buen criterio. Pero cada aviso sigue consumiendo el tiempo de una persona, y son muchos avisos.",
  queConstruimos: {
    items: [
      "Comprensión sin fricción: preguntar en lenguaje natural sobre la operación y recibir la respuesta, sin buscar en un tablero ni pedirle un reporte a nadie",
      "Resolución de extremo a extremo: el sistema detecta la situación, decide qué hacer, lo ejecuta y cierra el caso",
      "Arquitectura agéntica: varios agentes especializados que se coordinan, con herramientas propias y memoria del proceso",
      "Control y trazabilidad: qué decide solo, qué requiere aprobación humana y qué queda registrado. Los límites se definen contigo antes de encender nada",
    ],
    /** Ilustrativa: las cifras del tablero dibujado son de ejemplo. */
    imagen: {
      src: "/verticals/transicion_herramientas_a_plataforma.webp",
      alt: "Diagrama de captura en campo, consolidación en la nube y agentes de IA especializados que se coordinan",
    },
  },
  loQueCambia:
    "Es la única etapa que reemplaza horas de operación en vez de mejorarlas. Los cinco escalones anteriores hacen que tu equipo trabaje mejor; este hace que no tenga que trabajar en eso.",
  antes: {
    titulo: escalon(5).nombre,
    texto: "Un sistema no puede resolver solo lo que todavía no sabe predecir.",
    destino: 5,
  },
  despues: {
    titulo: "Medir lo que hace el agente",
    texto:
      "Este es el último escalón, y llegar aquí sin haber recorrido los anteriores no funciona: un agente sobre datos que no existen automatiza el error. Lo que sigue es medir su resultado con los indicadores del primer escalón y decidir qué proceso viene.",
    destino: 1,
  },
  casos: [],
};

/** En el orden de la escalera. */
export const ESCALONES_PAGINAS: readonly PaginaEscalon[] = [
  ESTRATEGIA,
  CAPTURA,
  VISIBILIDAD,
  AUTOMATIZACION,
  PREDICCION,
  AGENTES_IA,
];

/** Textos comunes a las páginas de escalón: el esqueleto fijo de §4. */
export const COMUN_ESCALON = {
  etiquetaEscalera: "La escalera",
  dondeEstas: "Dónde estás si esto te suena",
  queConstruimos: "Qué construimos",
  loQueCambia: "Lo que cambia",
  antes: "Qué necesitas antes",
  despues: "Qué viene después",
  cierre: INICIO.cierre,
};

/** Tarjeta "antes" o "después" de una página de escalón. */
export function tarjetaPaso(antetitulo: string, paso: Paso) {
  const destino = paso.destino ? escalon(paso.destino) : undefined;
  return {
    antetitulo,
    titulo: paso.titulo,
    texto: paso.texto,
    enlace: destino ? { etiqueta: `${destino.nombre} →`, ruta: destino.ruta } : paso.enlace,
  };
}

/**
 * /soluciones/drones. Sin modelos de equipo hasta verificar la posición frente al fabricante (§1.6b).
 * Sin pulverización ni aspersión: exige explotador UAS certificado (RAC 100) y requisitos del ICA
 * que LATCON no tiene hoy (docs/consulta-legal.md tema 9, ADR 0007).
 */
export const DRONES = {
  ruta: RUTAS.drones,
  metadatos: {
    titulo: "Drones agrícolas: monitoreo multiespectral y mapeo",
    descripcion:
      "Monitoreo RGB y multiespectral, levantamiento y mapeo del lote, posicionamiento RTK y la captura del dron integrada con analítica para decidir en campo.",
  },
  hero: {
    antetitulo: `Drones · Escalón 2 · ${escalon(2).nombre}`,
    titulo: "Del recorrido a pie a la información de todo el lote",
    bajada:
      "Integramos drones, sensores, datos y analítica para ayudar a productores y organizaciones agrícolas a mejorar la eficiencia de sus operaciones y tomar mejores decisiones en campo.",
    cta: CTA_PRINCIPAL,
  },
  posicionamiento: [
    {
      titulo: "No vendemos solamente drones. Diseñamos soluciones para el campo.",
      texto:
        "Nuestro enfoque combina equipo, configuración, capacitación, datos, tecnología y acompañamiento. La solución se define según las características del cultivo, la operación y los objetivos del cliente.",
      /** Ilustrativa. Sin material oficial del fabricante (brief §6). */
      imagen: {
        src: "/verticals/agroindustria_gestion_campo.webp",
        alt: "Dron sobre un cultivo, mapa de parcelas en una tableta, conteo de frutos e índice de vegetación",
      },
    },
  ],
  frentes: {
    encabezado: { titulo: "Qué construimos" },
    /**
     * Modelos pendientes de verificación, para agregar al final de cada tarjeta como dato técnico (pie):
     * monitoreo Mavic 3 Multispectral; posicionamiento D-RTK 3.
     */
    tarjetas: [
      {
        titulo: "Monitoreo y análisis",
        texto: "Captura de información RGB y multiespectral para seguimiento, análisis y toma de decisiones agrícolas.",
      },
      {
        titulo: "Posicionamiento de alta precisión",
        texto: "Tecnología RTK para operaciones que requieren precisión, repetibilidad y control de información geoespacial.",
      },
      {
        titulo: "Levantamiento y mapeo",
        texto: "Mapas y modelos del lote para medir áreas, planear labores y comparar el cultivo de una visita a la siguiente.",
      },
      {
        titulo: "Datos que se convierten en decisiones",
        texto: "Integración de la captura en campo con procesamiento, almacenamiento, analítica e inteligencia artificial.",
      },
    ],
  },
  comoTrabajamos: {
    encabezado: { titulo: "Cómo trabajamos" },
    pasos: [
      { titulo: "Entendemos el contexto", texto: "Conocemos el cultivo, la operación y la necesidad." },
      { titulo: "Diseñamos la solución", texto: "Definimos la tecnología y la configuración adecuadas." },
      { titulo: "Construimos por etapas", texto: "Probamos y ajustamos la solución en condiciones reales." },
      { titulo: "Implementamos y ajustamos", texto: "Acompañamos la puesta en operación y la evolución de la solución." },
    ],
    /** Mismas etapas que /metodo (auditoría del paso 8a). */
    enlace: { etiqueta: "Ver el método completo →", ruta: RUTAS.metodo },
  },
  /** Regla 8 de CLAUDE.md: "Qué necesitas antes" y "Qué viene después", cada uno con enlace. */
  antesYDespues: {
    encabezado: {
      antetitulo: "Antes y después",
      titulo: "El dron es una forma de capturar el dato. Antes hay que saber qué medir; después, qué hacer con él.",
    },
    antes: {
      titulo: escalon(1).nombre,
      texto: "Saber qué vale la pena registrar en el lote antes de elegir el equipo.",
      destino: 1,
    },
    despues: [
      { titulo: escalon(3).nombre, texto: "Lo que captura el dron llega a un tablero que se actualiza solo.", destino: 3 },
      { titulo: escalon(5).nombre, texto: "Con el histórico de vuelos, anticipar rendimiento y riesgo por zona.", destino: 5 },
    ],
  },
  cierre: {
    titulo: "¿Quieres conocer qué solución con drones puede aplicarse a tu operación?",
    texto: "Hablemos de tu proyecto.",
    cta: CTA_PRINCIPAL,
    nota: INICIO.hero.nota,
  },
};

/** Tarjeta que lleva a una página de escalón, con su titular de transición. */
export function tarjetaEscalon(numero: number, etiqueta = "Ver la etapa →") {
  const e = escalon(numero);
  const pagina = ESCALONES_PAGINAS.find((p) => p.numero === numero)!;
  return { titulo: e.nombre, texto: pagina.titulo, pie: `Escalón ${numero}`, enlace: { etiqueta, ruta: e.ruta } };
}

/** /soluciones: overview. Las familias son agrupadores de navegación, no páginas (§1.6b). */
export const SOLUCIONES_OVERVIEW = {
  ruta: RUTAS.soluciones,
  metadatos: {
    titulo: "Soluciones: transformación digital por etapas",
    descripcion: "Seis etapas en orden, de definir qué medir a que el caso se resuelva solo. La mayoría entra por la que le duele hoy.",
  },
  hero: {
    antetitulo: "Soluciones",
    titulo: "Seis etapas. La mayoría entra por la que le duele hoy.",
    bajada:
      "No es un catálogo donde se elige lo que suena mejor. Es un recorrido con orden: sin dato capturado no hay tablero, sin tablero no hay modelo que sirva, y sin nada de eso no hay proceso que se resuelva solo. Le decimos en qué escalón está aunque implique decirle que todavía no necesita lo que vino a pedir.",
    cta: CTA_PRINCIPAL,
  },
  familias: FAMILIAS.map((familia, i) => ({
    id: ["definir-y-medir", "capturar-y-ver", "automatizar-y-decidir"][i],
    encabezado: {
      antetitulo: familia.titulo,
      titulo: INICIO.soluciones.tarjetas[i].texto,
    },
    tarjetas: familia.enlaces.map((enlace) => {
      const numero = ESCALONES.find((e) => e.ruta === enlace.ruta)?.numero;
      return numero
        ? tarjetaEscalon(numero)
        : {
            titulo: enlace.etiqueta,
            texto: DRONES.hero.titulo,
            pie: "Dentro del escalón 2",
            enlace: { etiqueta: "Ver la línea →", ruta: enlace.ruta },
          };
    }),
  })),
  /** El documento cierra con el autodiagnóstico (§8), que todavía no existe: mientras tanto, el diagnóstico. */
  cierre: {
    titulo: "¿No sabes en qué escalón estás?",
    texto:
      "En el diagnóstico te decimos en cuál estás y cuál sigue, aunque la respuesta sea que todavía no necesitas lo que viniste a pedir.",
    cta: CTA_PRINCIPAL,
    nota: INICIO.cierre.nota,
  },
};
