/**
 * Mapa del sitio: única fuente de rutas y etiquetas de navegación.
 * Lo consumen el header, el footer y el breadcrumb (y más adelante sitemap.xml y la escalera).
 * Fuente: docs/recomendaciones-sitio.md §1.3 y docs/contenido-sitio.md (Regla 3).
 * Solo en español hasta la fase de traducción (ADR 0004).
 */
import type { EnlaceNav, EntradaMenu, GrupoNav, PaginaMapa } from "@/lib/navegacion";

export const RUTAS = {
  inicio: "/",
  sectores: "/sectores",
  energia: "/sectores/energia-petroleo-gas",
  agroindustria: "/sectores/agroindustria",
  avicultura: "/sectores/avicultura",
  floricultura: "/sectores/floricultura",
  soluciones: "/soluciones",
  estrategia: "/soluciones/estrategia-e-indicadores",
  captura: "/soluciones/captura-de-datos",
  drones: "/soluciones/drones",
  visibilidad: "/soluciones/visibilidad-operativa",
  automatizacion: "/soluciones/automatizacion",
  prediccion: "/soluciones/inteligencia-predictiva",
  zeroTouch: "/soluciones/zero-touch",
  desarrollo: "/desarrollo-a-la-medida",
  metodo: "/metodo",
  nosotros: "/nosotros",
  agenda: "/agenda",
  recursos: "/recursos",
  privacidad: "/privacidad",
  tratamientoDatos: "/tratamiento-de-datos",
} as const;

/** Los seis escalones se nombran igual en todo el sitio (Regla 3 de docs/contenido-sitio.md). */
export const ESCALONES = [
  { numero: 1, nombre: "Definir qué medir", familia: "definir", ruta: RUTAS.estrategia },
  { numero: 2, nombre: "Capturar el dato", familia: "capturar", ruta: RUTAS.captura },
  { numero: 3, nombre: "Ver lo que pasa", familia: "capturar", ruta: RUTAS.visibilidad },
  { numero: 4, nombre: "Automatizar", familia: "automatizar", ruta: RUTAS.automatizacion },
  { numero: 5, nombre: "Anticipar", familia: "automatizar", ruta: RUTAS.prediccion },
  { numero: 6, nombre: "Resolver solo", familia: "automatizar", ruta: RUTAS.zeroTouch },
] as const;

const escalon = (n: number): EnlaceNav => {
  const e = ESCALONES.find((x) => x.numero === n)!;
  return { etiqueta: e.nombre, ruta: e.ruta };
};

export const SECTORES: readonly EnlaceNav[] = [
  { etiqueta: "Energía, petróleo y gas", ruta: RUTAS.energia },
  { etiqueta: "Agroindustria", ruta: RUTAS.agroindustria },
  { etiqueta: "Avicultura", ruta: RUTAS.avicultura },
  { etiqueta: "Floricultura", ruta: RUTAS.floricultura },
];

export const FAMILIAS: readonly GrupoNav[] = [
  {
    titulo: "Definir y medir",
    frase: "Qué medir, con qué meta y cómo sostener la rutina",
    enlaces: [escalon(1)],
  },
  {
    titulo: "Capturar y ver",
    frase: "Del sensor y el dron al tablero que sí se usa",
    enlaces: [escalon(2), { etiqueta: "Drones", ruta: RUTAS.drones }, escalon(3)],
  },
  {
    titulo: "Automatizar y decidir",
    frase: "Que el proceso corra solo y avise antes de fallar",
    enlaces: [escalon(4), escalon(5), escalon(6)],
  },
];

export const CTA_PRINCIPAL: EnlaceNav = { etiqueta: "Agenda tu diagnóstico gratuito", ruta: RUTAS.agenda };

/** Menú principal. Orden aprobado: Sectores · Soluciones · Método · Nosotros. Recursos queda fuera hasta definir su cadencia. */
export const MENU: readonly EntradaMenu[] = [
  {
    tipo: "desplegable",
    id: "sectores",
    etiqueta: "Sectores",
    grupos: [{ titulo: "Dónde ya trabajamos", enlaces: SECTORES }],
    pie: [{ etiqueta: "Ver todos los sectores", ruta: RUTAS.sectores }],
  },
  {
    tipo: "desplegable",
    id: "soluciones",
    etiqueta: "Soluciones",
    grupos: FAMILIAS,
    pie: [
      { etiqueta: "Lo que construimos", ruta: RUTAS.desarrollo },
      { etiqueta: "Ver las seis etapas", ruta: RUTAS.soluciones },
    ],
  },
  { tipo: "enlace", etiqueta: "Método", ruta: RUTAS.metodo },
  { tipo: "enlace", etiqueta: "Nosotros", ruta: RUTAS.nosotros },
];

/** Columnas de navegación del footer. */
export const COLUMNAS_FOOTER: readonly GrupoNav[] = [
  { titulo: "Sectores", enlaces: SECTORES },
  {
    titulo: "Soluciones",
    enlaces: [...ESCALONES.map((e) => escalon(e.numero)), { etiqueta: "Drones", ruta: RUTAS.drones }],
  },
  {
    titulo: "Empresa",
    enlaces: [
      { etiqueta: "Método", ruta: RUTAS.metodo },
      { etiqueta: "Nosotros", ruta: RUTAS.nosotros },
      { etiqueta: "Lo que construimos", ruta: RUTAS.desarrollo },
      { etiqueta: "Agenda", ruta: RUTAS.agenda },
    ],
  },
];

export const ENLACES_LEGALES: readonly EnlaceNav[] = [
  { etiqueta: "Privacidad", ruta: RUTAS.privacidad },
  { etiqueta: "Política de tratamiento de datos", ruta: RUTAS.tratamientoDatos },
];

/** Registro de páginas para el breadcrumb: etiqueta y página padre. */
export const PAGINAS: Readonly<Record<string, PaginaMapa>> = {
  [RUTAS.inicio]: { etiqueta: "Inicio" },
  [RUTAS.sectores]: { etiqueta: "Sectores", padre: RUTAS.inicio },
  ...Object.fromEntries(SECTORES.map((s) => [s.ruta, { etiqueta: s.etiqueta, padre: RUTAS.sectores }])),
  [RUTAS.soluciones]: { etiqueta: "Soluciones", padre: RUTAS.inicio },
  ...Object.fromEntries(ESCALONES.map((e) => [e.ruta, { etiqueta: e.nombre, padre: RUTAS.soluciones }])),
  [RUTAS.drones]: { etiqueta: "Drones", padre: RUTAS.soluciones },
  [RUTAS.desarrollo]: { etiqueta: "Lo que construimos", padre: RUTAS.inicio },
  [RUTAS.metodo]: { etiqueta: "Método", padre: RUTAS.inicio },
  [RUTAS.nosotros]: { etiqueta: "Nosotros", padre: RUTAS.inicio },
  [RUTAS.agenda]: { etiqueta: "Agenda", padre: RUTAS.inicio },
  [RUTAS.recursos]: { etiqueta: "Recursos", padre: RUTAS.inicio },
  [RUTAS.privacidad]: { etiqueta: "Privacidad", padre: RUTAS.inicio },
  [RUTAS.tratamientoDatos]: { etiqueta: "Tratamiento de datos", padre: RUTAS.inicio },
};
