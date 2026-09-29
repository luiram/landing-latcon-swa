/**
 * Contenido de /metodo, /nosotros y /desarrollo-a-la-medida.
 * Fuente: docs/contenido-sitio.md §5, §6 y §7. Solo en español hasta la fase de traducción (ADR 0004).
 * Sin cifras, casos ni clientes (reglas 6 y 7).
 */
import { CTA_PRINCIPAL, ESCALONES, RUTAS } from "./mapa";
import { INICIO } from "./inicio";

const escalon = (n: number) => ESCALONES[n - 1];
const irA = (n: number) => ({ etiqueta: `${escalon(n).nombre} →`, ruta: escalon(n).ruta });

/** /metodo: las cuatro etapas textuales, cada una con su resultado, y dos bloques nuevos (§7). */
export const METODO = {
  ruta: RUTAS.metodo,
  metadatos: {
    titulo: "Método",
    descripcion: "Cuatro etapas, cada una con un entregable concreto. No avanzamos a la siguiente hasta que la anterior genera claridad.",
  },
  hero: {
    antetitulo: "Método",
    titulo: INICIO.metodo.encabezado.titulo,
    bajada: INICIO.metodo.encabezado.bajada,
    cta: CTA_PRINCIPAL,
  },
  etapas: {
    etiquetaResultado: "Resultado",
    pasos: [
      {
        titulo: "Entendemos el contexto",
        texto:
          "Conversamos contigo para entender cómo funciona hoy la operación, dónde están las fricciones y qué decisiones necesitan mejor soporte.",
        resultado: "Claridad sobre el problema que realmente vale la pena resolver.",
      },
      {
        titulo: "Diseñamos la solución",
        texto:
          "Traducimos el diagnóstico en una propuesta concreta — para que veas la solución antes de invertir en desarrollarla.",
        resultado: "Una solución clara, validada y alineada con tu realidad.",
      },
      {
        titulo: "Construimos por etapas",
        texto:
          "Desarrollamos la solución con entregas parciales y validaciones continuas, enfocándonos primero en lo que más valor aporta.",
        resultado: "Solución parcial funcionando, validada con usuarios reales antes de la entrega final.",
      },
      {
        titulo: "Implementamos y ajustamos",
        texto:
          "Acompañamos la puesta en marcha y los ajustes necesarios para que la solución empiece a usarse bien y genere resultados desde el inicio.",
        resultado: "Una solución funcionando en contexto real, con adopción y trazabilidad.",
      },
    ],
    cierre: "Y cuando la solución ya funciona, la preparamos para crecer con más integración, analítica y automatización.",
  },
  bloques: [
    {
      titulo: "Por qué no cotizamos antes de entender",
      texto:
        "Antes de proponer nada hacemos un levantamiento sin supuestos: qué sistemas existen, qué datos hay de verdad, quién hace qué hoy y dónde se rompe. Suena obvio y casi nadie lo hace, porque toma tiempo y no se factura. Lo hacemos igual, porque una propuesta construida sobre supuestos se cae en la implementación — y ahí ya es caro para todos.",
    },
    {
      titulo: "El método es nuestro. La escalera es suya.",
      texto:
        "Las cuatro etapas de arriba son cómo ejecutamos un proyecto. La escalera de seis escalones es hasta dónde llega su operación. Un proyecto puede subir un escalón o dos; nadie sube seis de una vez. En el diagnóstico le decimos en cuál está y cuál sigue, aunque la respuesta sea que todavía no necesita lo que vino a pedir.",
      enlace: { etiqueta: "Ver las seis etapas →", ruta: RUTAS.soluciones },
    },
  ],
  cierre: INICIO.cierre,
};

/** /nosotros: bajada nueva y los tres socios sin años (§6). */
export const NOSOTROS = {
  ruta: RUTAS.nosotros,
  metadatos: {
    titulo: "Nosotros",
    descripcion: "Ingeniería de operaciones, desarrollo propio y gestión por resultados, como un solo equipo.",
  },
  hero: {
    antetitulo: "Nosotros",
    titulo: "El equipo que entiende tu operación y construye la solución",
    bajada:
      "Ingeniería de operaciones, desarrollo propio y gestión por resultados, trabajando como un solo equipo desde el diagnóstico hasta la implementación. Definimos qué medir y después lo construimos — por eso el indicador no se queda en el papel.",
    cta: CTA_PRINCIPAL,
  },
  socios: [
    {
      titulo: "Luis Ramírez",
      antetitulo: "Operación · Datos · Arquitectura",
      texto:
        "Ingeniero industrial. Automatización de procesos de información, analítica de datos e implementación de modelos de IA en logística, agroindustria y educación.",
    },
    {
      titulo: "John Ramírez",
      antetitulo: "Desarrollo · IA · Cloud",
      texto:
        "Desarrollo de aplicaciones, machine learning, visión computacional y sistemas multiagente en la nube. Implementación en petróleo, gas y energía.",
    },
    {
      titulo: "César Ramírez",
      antetitulo: "Estrategia · Resultados",
      texto: "Implementación de estrategias operativas y gestión por resultados en distribución, telecomunicaciones y ventas.",
    },
  ],
  cierre: INICIO.cierre,
};

/** /desarrollo-a-la-medida: capacidades por escalón. Solo texto hasta tener capturas propias (§9). */
export const DESARROLLO = {
  ruta: RUTAS.desarrollo,
  metadatos: {
    titulo: "Lo que construimos",
    descripcion: "Aplicaciones sin conexión, plataformas multi-tenant, tableros, visión por computador, modelos predictivos y agentes.",
  },
  hero: {
    antetitulo: "Lo que construimos",
    titulo: "Lo que construimos en cada escalón",
    bajada:
      "No somos una agencia que recibe especificaciones ni una consultora que entrega recomendaciones. El mismo equipo que entiende su operación es el que escribe el código — y por eso la escalera se puede recorrer completa con un solo interlocutor.",
    cta: CTA_PRINCIPAL,
  },
  capacidades: [
    {
      titulo: "Capturar",
      lista: [
        "Aplicaciones móviles que funcionan sin conexión y sincronizan al recuperar señal",
        "Captura georreferenciada de parcelas y activos",
        "Integración con sensores y equipos en campo",
      ],
      enlace: irA(2),
    },
    {
      titulo: "Ver",
      lista: [
        "Plataformas multi-tenant con control de acceso, roles y auditoría",
        "Tableros conectados a la fuente, sin consolidación manual",
        "Integración entre sistemas que hoy no se hablan",
      ],
      enlace: irA(3),
    },
    {
      titulo: "Decidir",
      lista: [
        "Visión por computador para conteo y detección en campo",
        "Modelos predictivos sobre operación real",
        "Agentes y sistemas multiagente",
      ],
      enlace: irA(5),
    },
  ],
  cierre: {
    titulo: "Lo que construimos se le transfiere a usted.",
    texto: "Sin dependencia del proveedor.",
    cta: CTA_PRINCIPAL,
    nota: INICIO.hero.nota,
  },
};
