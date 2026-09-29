/**
 * Contenido de las páginas de sector. Fuente: docs/contenido-sitio.md §3.
 * Solo en español hasta la fase de traducción (ADR 0004). Sin cifras, casos ni clientes (reglas 6 y 7).
 */
import type { DatosPrueba } from "@/components/sections/FranjaPrueba";
import { CTA_PRINCIPAL, ESCALONES, FAMILIAS, RUTAS } from "./mapa";
import { INICIO } from "./inicio";

const capturar = ESCALONES[1];
const [, capturarYVer, automatizarYDecidir] = FAMILIAS;

/** "Escalones 2 y 3 · Capturar el dato, Ver lo que pasa": qué escalones abarca una familia, según el mapa. */
const escalonesDe = (familia: (typeof ESCALONES)[number]["familia"]) => {
  const lista = ESCALONES.filter((e) => e.familia === familia);
  const numeros = lista.map((e) => e.numero);
  const cifras = numeros.length > 1 ? `${numeros.slice(0, -1).join(", ")} y ${numeros.at(-1)}` : `${numeros[0]}`;
  return `${numeros.length > 1 ? "Escalones" : "Escalón"} ${cifras} · ${lista.map((e) => e.nombre).join(", ")}`;
};

export const ENERGIA = {
  ruta: RUTAS.energia,
  metadatos: {
    titulo: "Energía, petróleo y gas",
    descripcion: "Eventos de operación, producción diferida e indicadores comparables entre campos.",
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
        titulo: "«Tenemos los datos pero no podemos usarlos.»",
        texto:
          "Los datos están ahí, pero analizarlos en tiempo real requiere tiempo y personal que la operación no tiene disponible. Las oportunidades pasan y los problemas se detectan tarde — cuando ya tienen un costo visible.",
        /** Ilustrativa. Se reemplaza por capturas propias del formulario y del tablero cuando existan (§3). */
        imagen: {
          src: "/verticals/entornos_alta_carga_manual_informacion.webp",
          alt: "Persona consolidando a mano registros en papel y hojas de cálculo",
        },
        resultado: `Escalón ${capturar.numero} · ${capturar.nombre}. El dato existe en la cabeza del técnico y en un formato que nadie consolida.`,
      },
    ],
  },

  escalera: { etiqueta: "Dónde suele empezar este sector", escalones: ESCALONES, actual: capturar.numero },

  loQueHacemos: {
    encabezado: { titulo: "Lo que hacemos aquí, por etapa" },
    bloques: [
      {
        titulo: capturarYVer.titulo,
        texto: escalonesDe("capturar"),
        lista: [
          "Registro de eventos en campo, sin conexión, con ubicación y evidencia fotográfica",
          "Esquema de clasificación único entre campos, con gobernanza que evita que todo termine en \"desconocido\"",
          "Producción diferida asociada al evento, sin cruce manual",
          "Mapa de incidencia: qué zonas concentran eventos y cuáles concentran pérdida, que no siempre son las mismas",
        ],
      },
      {
        titulo: automatizarYDecidir.titulo,
        texto: escalonesDe("automatizar"),
        lista: [
          "Indicadores comparables mes contra mes y año contra año, calculados solos",
          "Detección de recurrencia por causa, estructura y zona",
          "Anticipación de eventos a partir del histórico acumulado",
        ],
      },
    ],
  },

  /** Espacio de caso reservado: vacío hasta que el proyecto cierre (§2). Sin casos, la franja no se muestra. */
  casos: [] as readonly DatosPrueba[],

  metodo: INICIO.metodo,

  cierre: {
    titulo: "La conversación arranca en la falla, no en la arquitectura.",
    texto: "Trabajamos con equipos de mantenimiento, no con áreas de tecnología.",
    cta: CTA_PRINCIPAL,
    nota: INICIO.hero.nota,
  },
};
