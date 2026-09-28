/**
 * Contenido de ejemplo del catálogo de secciones (/catalogo, página interna, noindex).
 * Todo sale de docs/contenido-sitio.md o del contenido de la landing: no hay cifras, casos
 * ni clientes inventados. La página interior de ejemplo es /soluciones/visibilidad-operativa.
 */
import { ESCALONES, RUTAS, SECTORES } from "./mapa";

const [energia, agroindustria, avicultura, floricultura] = SECTORES;

export const CATALOGO = {
  titulo: "Catálogo de secciones",
  descripcion: "Las secciones del sitio con sus variantes, para ver qué existe antes de crear algo nuevo.",

  anclas: {
    etiqueta: "En esta página",
    items: [
      { id: "que-construimos", etiqueta: "Qué construimos" },
      { id: "la-escalera", etiqueta: "La escalera" },
      { id: "antes-y-despues", etiqueta: "Antes y después" },
      { id: "donde-trabajamos", etiqueta: "Dónde trabajamos" },
      { id: "metodo", etiqueta: "Método" },
      { id: "cierre", etiqueta: "Cierre" },
    ],
  },

  heroFull: {
    antetitulo: "Ver lo que pasa · Escalón 3",
    titulo: "Del reporte que llega tarde a la señal que llega a tiempo",
    bajada:
      "El dato existe y está capturado, pero vive en varios sistemas y consolidarlo es trabajo de alguien todas las semanas.",
  },

  queConstruimos: {
    encabezado: { antetitulo: "Qué construimos", titulo: "Del dato disperso a la señal que llega a tiempo" },
    etiquetaLista: "Lo que incluye",
    etiquetaResultado: "Lo que cambia",
    bloques: [
      {
        titulo: "Tus fuentes, en un solo lugar",
        texto:
          "Tu operación genera datos en múltiples sistemas. Los conectamos, los organizamos y los convertimos en señales claras para que tu equipo actúe.",
        imagen: {
          src: "/solutions/arquitectura_sistemas.webp",
          alt: "Tablero operativo que reúne datos de varios sistemas",
        },
        lista: [
          "Tus fuentes de datos conectadas en un solo lugar, sin consolidación manual",
          "Tableros operativos actualizados en tiempo real, sin depender de reportes manuales",
          "Alertas que llegan antes de que el problema sea visible",
        ],
        resultado: "Menos tiempo esperando datos. Decisiones que llegan cuando todavía sirven para actuar.",
      },
    ],
  },

  escalera: { etiqueta: "La escalera", escalones: ESCALONES, actual: 3 },

  antesYDespues: [
    {
      antetitulo: "Qué necesitas antes",
      titulo: ESCALONES[1].nombre,
      texto: "Que el dato exista y esté llegando. Si todavía nace en papel, empiece por capturarlo.",
      enlace: { etiqueta: `${ESCALONES[1].nombre} →`, ruta: ESCALONES[1].ruta },
    },
    {
      antetitulo: "Qué viene después",
      titulo: ESCALONES[3].nombre,
      texto:
        "Ver lo que pasa es necesario, pero sigue exigiendo que alguien mire y actúe. El siguiente paso es automatizar.",
      enlace: { etiqueta: `${ESCALONES[3].nombre} →`, ruta: ESCALONES[3].ruta },
    },
  ],

  dondeTrabajamos: {
    encabezado: {
      titulo: "Dónde ya trabajamos",
      bajada:
        "Operaciones industriales y agroindustriales, en campo y con conectividad intermitente. No llegamos a aprender su sector con su presupuesto.",
    },
    items: [
      {
        titulo: energia.etiqueta,
        linea: "Eventos de operación, producción diferida e indicadores comparables entre campos",
        ruta: energia.ruta,
      },
      {
        titulo: agroindustria.etiqueta,
        linea: "Cacao, aguacate y flores: captura en campo, trazabilidad y automatización de riego",
        ruta: agroindustria.ruta,
      },
      { titulo: avicultura.etiqueta, linea: "Indicadores de lote capturados donde ocurren", ruta: avicultura.ruta },
      {
        titulo: floricultura.etiqueta,
        linea: "Condiciones de invernadero y productividad por unidad de cultivo",
        ruta: floricultura.ruta,
      },
    ],
  },

  familias: {
    encabezado: {
      titulo: "Casi nadie necesita todo. Casi todos necesitan lo siguiente.",
      bajada:
        "Seis etapas en orden. La mayoría entra por la que le duele hoy, y avanza desde ahí. Nadie salta escalones: sin dato capturado no hay tablero, y sin tablero no hay predicción que sirva.",
    },
    tarjetas: [
      {
        titulo: "Definir y medir",
        texto: "De la estrategia en el papel al indicador que alguien mira el lunes",
        pie: "Escalón 1",
        enlace: { etiqueta: "Ver la etapa →", ruta: RUTAS.estrategia },
      },
      {
        titulo: "Capturar y ver",
        texto: "Del cuaderno en el campo al tablero que se actualiza solo",
        pie: "Escalones 2 · 3",
        enlace: { etiqueta: "Ver las etapas →", ruta: RUTAS.captura },
      },
      {
        titulo: "Automatizar y decidir",
        texto: "De reaccionar cuando ya pasó a que no vuelva a pasar",
        pie: "Escalones 4 · 5 · 6",
        enlace: { etiqueta: "Ver las etapas →", ruta: RUTAS.automatizacion },
      },
    ],
  },

  metodoEnlace: { etiqueta: "Ver el método completo →", ruta: RUTAS.metodo },
} as const;
