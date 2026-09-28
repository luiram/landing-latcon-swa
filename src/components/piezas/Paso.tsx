import { cn } from "@/lib/cn";
import { Texto } from "@/components/ui/Texto";
import { Titulo } from "@/components/ui/Titulo";

export type DatosPaso = {
  titulo: string;
  texto: string;
  /** Entregable de la etapa. */
  resultado?: string;
};

type PasoProps = DatosPaso & {
  numero: number;
  /** Rótulo sobre el resultado, p. ej. "Resultado". */
  etiquetaResultado?: string;
  className?: string;
};

/**
 * Numeral, título, texto y resultado, en tres filas. Dentro de una grilla, pasarle
 * `row-span-3 grid grid-rows-subgrid` alinea los resultados de pasos vecinos (lo hace Timeline).
 */
export function Paso({ numero, titulo, texto, resultado, etiquetaResultado, className }: PasoProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-card border border-accent/30 bg-bg-panel shadow-card-accent",
        "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/48 hover:shadow-card-accent-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <Titulo nivel={3} rol="item" className="px-5 pt-5 pb-1">
        <span className="font-bold tabular-nums text-accent/80">{String(numero).padStart(2, "0")}.</span>{" "}
        <span>{titulo}</span>
      </Titulo>
      <Texto rol="small" className="min-h-0 px-5 pb-3">
        {texto}
      </Texto>
      {resultado ? (
        <div className="border-t border-accent/22 px-5 pt-5 pb-5">
          {etiquetaResultado ? <Texto rol="label">{etiquetaResultado}</Texto> : null}
          <Texto rol="body-sm" tono="normal" className="mt-2.5 font-medium leading-title">
            {resultado}
          </Texto>
        </div>
      ) : (
        <div aria-hidden />
      )}
    </div>
  );
}
