/**
 * Contenido de las páginas de sector y de /sectores. Fuente: docs/contenido-sitio.md §3.
 * Solo en español hasta la fase de traducción (ADR 0004). Sin cifras, casos ni clientes (reglas 6 y 7).
 */
import type { DatosBloque } from "@/components/sections/TextoConImagen";
import type { DatosPrueba } from "@/components/sections/FranjaPrueba";
import type { EnlaceNav } from "@/lib/navegacion";
import { CTA_PRINCIPAL, ESCALONES, RUTAS } from "./mapa";
import { INICIO } from "./inicio";

type Familia = (typeof ESCALONES)[number]["familia"];

const NOMBRE_FAMILIA: Record<Familia, string> = {
  definir: "Definir y medir",
  capturar: "Capturar y ver",
  automatizar: "Automatizar y decidir",
};

const escalon = (n: number) => ESCALONES[n - 1];

/** "Escalones 2 y 3 · Capturar el dato, Ver lo que pasa": qué escalones abarca una familia, según el mapa. */
function escalonesDe(familia: Familia): string {
  const lista = ESCALONES.filter((e) => e.familia === familia);
  const numeros = lista.map((e) => e.numero);
  const cifras = numeros.length > 1 ? `${numeros.slice(0, -1).join(", ")} y ${numeros.at(-1)}` : `${numeros[0]}`;
  return `${numeros.length > 1 ? "Escalones" : "Escalón"} ${cifras} · ${lista.map((e) => e.nombre).join(", ")}`;
}

/** Enlace a la primera página de la familia. */
function enlaceFamilia(familia: Familia): EnlaceNav {
  const primero = ESCALONES.find((e) => e.familia === familia)!;
  return { etiqueta: `${primero.nombre} →`, ruta: primero.ruta };
}

/** Un bloque de "Lo que hacemos aquí": la familia, sus escalones, la lista y la salida. */
function porEtapa(familia: Familia, lista: readonly string[], extra?: Partial<DatosBloque>): DatosBloque {
  return { titulo: NOMBRE_FAMILIA[familia], texto: escalonesDe(familia), lista, enlace: enlaceFamilia(familia), ...extra };
}

export type PaginaSector = {
  slug: string;
  ruta: string;
  nombre: string;
  /** Línea de contexto para las tarjetas del home y de /sectores. */
  linea: string;
  /** Escalón donde suele empezar el sector. */
  empieza: number;
  metadatos: { titulo: string; descripcion: string };
  hero: { antetitulo: string; titulo: string; bajada: string; cta: EnlaceNav };
  /** El dolor y dónde suele empezar. Solo si el documento lo desarrolla. */
  dolor?: { etiquetaResultado?: string; bloques: readonly DatosBloque[] };
  loQueHacemos: readonly DatosBloque[];
  /** Espacio de caso reservado: vacío hasta que un proyecto cierre (§2). Sin casos, la franja no se muestra. */
  casos: readonly DatosPrueba[];
  /** "Por qué nos entienden en este sector", como cierre. */
  cierre: { titulo: string; texto: string };
};

const ENERGIA: PaginaSector = {
  slug: "energia-petroleo-gas",
  ruta: RUTAS.energia,
  nombre: "Energía, petróleo y gas",
  linea: "Eventos de operación, producción diferida e indicadores comparables entre campos",
  empieza: 2,
  metadatos: {
    titulo: "Energía, petróleo y gas: indicadores de operación",
    descripcion: "Eventos de operación, producción diferida e indicadores comparables entre campos, para saber a tiempo qué causa concentra las pérdidas.",
  },
  hero: {
    antetitulo: "Energía, petróleo y gas",
    titulo: "De la falla que se registra en tres formatos al indicador que compara los tres campos",
    bajada:
      "El evento se registra en un lado, el impacto en otro, y la relación entre los dos la sostiene una persona con una hoja de cálculo. Cuando quiere saber qué causa concentra sus pérdidas, la respuesta llega tarde y no es comparable entre campos.",
    cta: CTA_PRINCIPAL,
  },
  dolor: {
    etiquetaResultado: "Dónde suele empezar",
    bloques: [
      {
        titulo: "Lo que solemos oír: tenemos los datos pero no podemos usarlos",
        texto:
          "Los datos están ahí, pero analizarlos en tiempo real requiere tiempo y personal que la operación no tiene disponible. Las oportunidades pasan y los problemas se detectan tarde — cuando ya tienen un costo visible.",
        /** Ilustrativa. Se reemplaza por capturas propias del formulario y del tablero cuando existan (§3). */
        imagen: {
          src: "/verticals/entornos_alta_carga_manual_informacion.webp",
          alt: "Persona consolidando a mano registros en papel y hojas de cálculo",
        },
        resultado: `Escalón 2 · ${escalon(2).nombre}. El dato existe en la cabeza del técnico y en un formato que nadie consolida.`,
      },
    ],
  },
  loQueHacemos: [
    porEtapa("capturar", [
      "Registro de eventos en campo, sin conexión, con ubicación y evidencia fotográfica",
      "Esquema de clasificación único entre campos, con gobernanza que evita que todo termine en \"desconocido\"",
      "Producción diferida asociada al evento, sin cruce manual",
      "Mapa de incidencia: qué zonas concentran eventos y cuáles concentran pérdida, que no siempre son las mismas",
    ]),
    porEtapa("automatizar", [
      "Indicadores comparables mes contra mes y año contra año, calculados solos",
      "Detección de recurrencia por causa, estructura y zona",
      "Anticipación de eventos a partir del histórico acumulado",
    ]),
  ],
  casos: [],
  cierre: {
    titulo: "La conversación arranca en la falla, no en la arquitectura.",
    texto: "Trabajamos con equipos de mantenimiento, no con áreas de tecnología.",
  },
};

const AGROINDUSTRIA: PaginaSector = {
  slug: "agroindustria",
  ruta: RUTAS.agroindustria,
  nombre: "Agroindustria",
  linea: "Cacao, aguacate y flores: captura en campo, trazabilidad y automatización de riego",
  empieza: 2,
  metadatos: {
    titulo: "Agroindustria: trazabilidad y captura en campo",
    descripcion: "Captura en campo sin señal, trazabilidad para certificación, drones y riego automatizado, para decidir con información de todo el lote.",
  },
  hero: {
    antetitulo: "Agroindustria",
    titulo: "Del dato que nace en el cuaderno al que llega a tiempo para decidir",
    bajada:
      "Cuadernos, WhatsApp y planillas que alguien digita en la noche. Para cuando la información llega a una decisión, la ventana para actuar ya se cerró — y en agro esa ventana dura días, no meses.",
    cta: CTA_PRINCIPAL,
  },
  dolor: {
    etiquetaResultado: "Dónde suele empezar",
    bloques: [
      {
        titulo: "Lo que solemos oír: coordinamos todo por WhatsApp y nadie sabe quién hizo qué",
        texto:
          "Equipos en campo, múltiples sedes o procesos entre áreas que se coordinan por WhatsApp y correo. Sin trazabilidad centralizada, es difícil saber qué pasó, quién lo hizo y cuándo — hasta que el error ya tiene consecuencias.",
        resultado: `Escalón 2 · ${escalon(2).nombre}, y a veces el 1, cuando ni siquiera está definido qué vale la pena registrar.`,
      },
    ],
  },
  loQueHacemos: [
    porEtapa("definir", [
      "Qué registrar en campo y con qué criterio, antes de comprar un solo sensor",
      "Indicadores por unidad real de la operación: lote, parcela, productor",
    ]),
    porEtapa(
      "capturar",
      [
        "Captura en campo que funciona sin señal y sincroniza al recuperar conexión",
        "Parcelas y productores georreferenciados, con evidencia asociada",
        "Sensores y actuadores en cultivo: riego, condiciones, alertas",
        "Drones para monitoreo multiespectral, mapeo y levantamiento",
        "Trazabilidad para certificación y cumplimiento",
      ],
      {
        /** Ilustrativa. Se reemplaza por capturas propias de parcelas georreferenciadas y conteo (§3). */
        imagen: {
          src: "/verticals/agroindustria_gestion_campo.webp",
          alt: "Dron sobre un cultivo, mapa de parcelas en una tableta, conteo de frutos e índice de vegetación",
        },
        /** "Enlace destacado" del documento. */
        enlace: { etiqueta: "Tecnología con drones →", ruta: RUTAS.drones },
      },
    ),
    porEtapa("automatizar", [
      "Riego y labores que se ejecutan solos según condición medida",
      "Conteo y detección por visión por computador",
      "Anticipación de rendimiento y de riesgo por zona",
    ]),
  ],
  casos: [],
  cierre: {
    titulo: "Una app que exige señal no se usa.",
    texto:
      "El equipo viene de trabajar con productores de cacao, aguacate y flores. Sabemos que la conectividad falla y que el operario tiene las manos ocupadas.",
  },
};

const AVICULTURA: PaginaSector = {
  slug: "avicultura",
  ruta: RUTAS.avicultura,
  nombre: "Avicultura",
  linea: "Indicadores de lote capturados donde ocurren",
  empieza: 3,
  metadatos: {
    titulo: "Avicultura: conversión y mortalidad por lote",
    descripcion: "Conversión, mortalidad y consumo comparables entre lotes, con alertas durante el lote para actuar antes del cierre y no después.",
  },
  hero: {
    antetitulo: "Avicultura",
    titulo: "De la planilla que se consolida cuando el lote ya cerró a la alerta que llega el martes",
    bajada:
      "En avicultura el costo de reaccionar tarde no se mide en meses sino en lotes. Conversión, mortalidad y consumo cuentan una historia todos los días, y esa historia normalmente vive en planillas que se revisan cuando ya no hay nada que corregir.",
    cta: CTA_PRINCIPAL,
  },
  dolor: {
    bloques: [
      {
        titulo: `Suele empezar en el escalón 3 · ${escalon(3).nombre}`,
        texto: "Los indicadores existen y son estándar del sector; lo que falta es que lleguen a tiempo.",
      },
    ],
  },
  loQueHacemos: [
    porEtapa("capturar", [
      "Registro diario por galpón, capturado donde ocurre",
      "Conversión, mortalidad y consumo comparables entre lotes y entre granjas",
    ]),
    porEtapa("automatizar", [
      "Alertas por desviación durante el lote, no al cerrarlo",
      "Detección de anomalías sobre el histórico acumulado",
      "Anticipación de resultado de lote a partir de los primeros días",
    ]),
  ],
  casos: [],
  cierre: {
    titulo: "Partimos de los indicadores que el sector ya usa.",
    texto: "No proponemos métricas nuevas antes de que las que existen estén bien medidas.",
  },
};

const FLORICULTURA: PaginaSector = {
  slug: "floricultura",
  ruta: RUTAS.floricultura,
  nombre: "Floricultura",
  linea: "Condiciones de invernadero y productividad por unidad de cultivo",
  empieza: 2,
  metadatos: {
    titulo: "Floricultura: monitoreo de invernadero y labores",
    descripcion: "Condiciones de invernadero, labores por bloque y productividad por unidad de cultivo, capturadas en campo y reunidas en un solo tablero.",
  },
  hero: {
    antetitulo: "Floricultura",
    titulo: "Del recorrido y la experiencia al bloque que se explica con datos",
    bajada:
      "Temperatura, humedad, riego y labores por cama generan información continua. Sin captura ni consolidación, las decisiones se toman por recorrido — que funciona hasta que hay que explicar por qué un bloque rindió distinto.",
    cta: CTA_PRINCIPAL,
  },
  loQueHacemos: [
    porEtapa("capturar", [
      "Sensores de condiciones en invernadero, con histórico consultable",
      "Registro de labores por bloque, cama y barilla",
      "Tableros de productividad por unidad de cultivo",
    ]),
    porEtapa("automatizar", ["Modelos que relacionan condiciones con resultado", "Alertas por condición fuera de rango"]),
  ],
  casos: [],
  cierre: {
    titulo: "Trabajamos con la unidad real de la operación.",
    texto: "Bloque, cama, barilla — no promedios de finca.",
  },
};

/** En el orden del menú. */
export const SECTORES_PAGINAS: readonly PaginaSector[] = [ENERGIA, AGROINDUSTRIA, AVICULTURA, FLORICULTURA];

/** Textos comunes a las cuatro páginas de sector. */
export const COMUN_SECTOR = {
  etiquetaEscalera: "Dónde suele empezar este sector",
  encabezadoLoQueHacemos: { titulo: "Lo que hacemos aquí, por etapa" },
  metodo: INICIO.metodo,
  cta: CTA_PRINCIPAL,
  nota: INICIO.hero.nota,
};

/** /sectores: overview. */
export const SECTORES_OVERVIEW = {
  ruta: RUTAS.sectores,
  metadatos: {
    titulo: "Sectores: tecnología para energía y agroindustria",
    descripcion:
      "Energía, agroindustria, avicultura y floricultura: dónde ya trabajamos y en qué escalón suele empezar cada sector.",
  },
  hero: {
    antetitulo: "Sectores",
    titulo: "Conocemos cómo se opera en su industria",
    bajada:
      "No llegamos a aprender su operación con su presupuesto. Estos son los sectores donde ya trabajamos y en qué escalón suele empezar cada uno.",
    cta: CTA_PRINCIPAL,
  },
  tarjetas: SECTORES_PAGINAS.map((s) => ({
    titulo: s.nombre,
    texto: s.linea,
    pie: `Suele empezar en el escalón ${s.empieza} · ${escalon(s.empieza).nombre}`,
    enlace: { etiqueta: "Ver el sector →", ruta: s.ruta },
  })),
  cierre: INICIO.cierre,
};
