/**
 * Contenido del home. Fuente: docs/contenido-sitio.md §1 ("Seis bloques cortos, cinco con salida a una sección").
 * Solo en español hasta la fase de traducción (ADR 0004). La landing anterior sigue en src/config/content.ts.
 * Sin cifras, sin casos y sin nombres de clientes (reglas 6 y 7 de CLAUDE.md).
 */
import { CTA_PRINCIPAL, RUTAS, SECTORES } from "./mapa";

const [energia, agroindustria, avicultura, floricultura] = SECTORES;

export const INICIO = {
  hero: {
    antetitulo: "Datos · Automatización · IA · Anticipación",
    titulo: "¿Tu empresa ya tiene los datos pero todavía no puede usarlos para decidir a tiempo?",
    bajada:
      "Integramos tus datos, automatizamos tus procesos y construimos sistemas de IA que le dan a tu equipo señales claras para actuar — antes de que el problema sea visible.",
    cta: CTA_PRINCIPAL,
    nota: "30 minutos · Sin compromiso · Te decimos con honestidad si somos el equipo indicado para tu caso",
    /** Irá al autodiagnóstico (§8) cuando exista; mientras tanto, a la página que explica los seis escalones. */
    enlaceSecundario: { etiqueta: "Averigua en qué escalón está tu operación →", ruta: RUTAS.soluciones },
    imagen: {
      src: "/hero-background.webp",
      alt: "",
      encuadre: { base: "68% center", sm: "70% center", lg: "84% center" },
    },
  },

  dondeTrabajamos: {
    encabezado: {
      titulo: "Dónde ya trabajamos",
      bajada:
        "Operaciones industriales y agroindustriales, en campo y con conectividad intermitente. No llegamos a aprender tu sector con tu presupuesto.",
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

  /** El escalón que sugiere cada dolor no se imprime: decide a dónde enlaza (§1, #para-quien). */
  paraQuien: {
    encabezado: {
      antetitulo: "Para quién",
      titulo: "Trabajamos con empresas donde los datos, los sistemas y los equipos no están conectados",
      bajada: "Cuatro situaciones que solemos oír en la primera conversación.",
    },
    tarjetas: [
      {
        titulo: "Datos sin análisis",
        texto: "Tenemos los datos pero no podemos usarlos.",
        enlace: { etiqueta: `${energia.etiqueta} →`, ruta: energia.ruta },
      },
      {
        titulo: "Áreas que operan en silos",
        texto: "Cada área trabaja con números distintos y nadie sabe cuál es el real.",
        enlace: { etiqueta: `${agroindustria.etiqueta} →`, ruta: agroindustria.ruta },
      },
      {
        titulo: "Operación distribuida o en campo",
        texto: "Coordinamos todo por WhatsApp y nadie sabe quién hizo qué.",
        enlace: { etiqueta: `${agroindustria.etiqueta} →`, ruta: agroindustria.ruta },
      },
      {
        titulo: "Tecnología sin integración",
        texto: "Tenemos varios sistemas pero ninguno le habla al otro.",
        enlace: { etiqueta: "Ver todos los sectores →", ruta: RUTAS.sectores },
      },
    ],
  },

  soluciones: {
    encabezado: {
      antetitulo: "Soluciones",
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

  metodo: {
    encabezado: {
      antetitulo: "Método",
      titulo: "Así trabajamos: primero entendemos, luego construimos",
      bajada: "Cada etapa tiene un entregable concreto. No avanzamos a la siguiente hasta que la anterior genera claridad.",
    },
    pasos: [
      { titulo: "Entendemos el contexto" },
      { titulo: "Diseñamos la solución" },
      { titulo: "Construimos por etapas" },
      { titulo: "Implementamos y ajustamos" },
    ],
    enlace: { etiqueta: "Ver el método completo →", ruta: RUTAS.metodo },
  },

  cierre: {
    titulo: "Cada semana sin visibilidad tiene un costo. Averigüemos juntos si podemos ayudarte a reducirlo.",
    texto:
      "Agenda una sesión de diagnóstico de 30 minutos. Revisamos juntos cómo fluye tu operación, identificamos dónde se pierden datos, tiempo o decisiones — y te damos una recomendación concreta, aunque no trabajes con nosotros.",
    cta: CTA_PRINCIPAL,
    nota: "Sin pitch de ventas · Sin compromiso · 30 minutos",
  },
} as const;
