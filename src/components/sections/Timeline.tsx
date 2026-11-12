import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Encabezado, type DatosEncabezado } from "@/components/piezas/Encabezado";
import { Paso, type DatosPaso } from "@/components/piezas/Paso";
import { Boton } from "@/components/ui/Boton";
import { Enlace } from "@/components/ui/Enlace";
import { Texto } from "@/components/ui/Texto";
import type { EnlaceNav } from "@/lib/navegacion";
import { Seccion, type Variante } from "./Seccion";

type TimelineProps = {
  pasos: readonly DatosPaso[];
  encabezado?: DatosEncabezado;
  /** Rótulo sobre el resultado de cada paso (solo `full`). */
  etiquetaResultado?: string;
  /** Frase centrada bajo los pasos. */
  cierre?: string;
  /** `compact`: enlace a la página con el detalle. */
  enlace?: EnlaceNav;
  cta?: EnlaceNav;
  /** `compact`: solo los nombres de etapa en una línea. `full`: tarjetas con texto y resultado. */
  variante?: Variante;
  id?: string;
};

const COLUMNAS: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-3 lg:grid-cols-5",
  6: "md:grid-cols-3",
};

/** Secuencia de pasos numerados. Sin pasos no se muestra. */
export function Timeline({
  pasos,
  encabezado,
  etiquetaResultado,
  cierre,
  enlace,
  cta,
  variante = "compact",
  id,
}: TimelineProps) {
  if (pasos.length === 0) return null;
  const compact = variante === "compact";

  return (
    <Seccion id={id} variante={variante}>
      {encabezado ? (
        <Reveal>
          <Encabezado {...encabezado} rol={compact ? "heading" : "heading-lg"} />
        </Reveal>
      ) : null}

      {compact ? (
        <ol className={cn("grid gap-x-6 gap-y-4 sm:grid-cols-2", COLUMNAS[pasos.length] ?? "md:grid-cols-4", encabezado && "mt-10")}>
          {pasos.map((paso, i) => (
            <Reveal key={paso.titulo} as="li" delay={i * 0.06} y={10} className="flex gap-2 border-t border-accent/30 pt-3">
              <span className="text-body-sm leading-title font-bold tabular-nums text-accent/80">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <span className="text-body-sm leading-title font-semibold text-text-primary">{paso.titulo}</span>
            </Reveal>
          ))}
        </ol>
      ) : (
        <ol
          className={cn(
            "flex flex-col gap-4 md:grid md:grid-rows-[auto_1fr_auto] md:gap-x-6 md:gap-y-0 lg:gap-x-8",
            COLUMNAS[pasos.length] ?? "md:grid-cols-4",
            encabezado && "mt-12 md:mt-14",
          )}
        >
          {pasos.map((paso, i) => (
            <Reveal
              key={paso.titulo}
              as="li"
              delay={i * 0.08}
              y={14}
              className="md:row-span-3 md:grid md:min-h-0 md:grid-rows-subgrid"
            >
              <Paso {...paso} numero={i + 1} etiquetaResultado={etiquetaResultado} className="md:row-span-3 md:grid md:grid-rows-subgrid" />
            </Reveal>
          ))}
        </ol>
      )}

      {cierre ? (
        <Reveal delay={0.32}>
          <Texto className="mx-auto mt-12 max-w-2xl text-center sm:mt-14">{cierre}</Texto>
        </Reveal>
      ) : null}

      {enlace ? (
        <Reveal delay={0.2} className="mt-8">
          <Enlace href={enlace.ruta}>{enlace.etiqueta}</Enlace>
        </Reveal>
      ) : null}

      {cta ? (
        <Reveal delay={0.38} className="mt-10 flex justify-center sm:mt-12">
          <Boton href={cta.ruta}>{cta.etiqueta}</Boton>
        </Reveal>
      ) : null}
    </Seccion>
  );
}
