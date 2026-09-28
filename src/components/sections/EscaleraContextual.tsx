import Link from "next/link";
import { cn } from "@/lib/cn";
import { Texto } from "@/components/ui/Texto";
import { Seccion } from "./Seccion";

export type Escalon = {
  numero: number;
  nombre: string;
  ruta: string;
};

type EscaleraContextualProps = {
  escalones: readonly Escalon[];
  /** Número del escalón de la página actual. */
  actual: number;
  /** Rótulo sobre la franja, p. ej. "La escalera". También es el nombre accesible. */
  etiqueta: string;
};

/**
 * Los seis escalones en una franja, con el actual resaltado y los demás enlazables.
 * Va en las páginas de solución, siempre en el mismo lugar. Solo variante `full` (ADR 0003).
 */
export function EscaleraContextual({ escalones, actual, etiqueta }: EscaleraContextualProps) {
  if (escalones.length === 0) return null;

  return (
    <Seccion variante="full" fondo="warm" className="py-section-sm sm:py-section-sm">
      <nav aria-label={etiqueta}>
        <Texto rol="eyebrow">{etiqueta}</Texto>
        <ol className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {escalones.map((escalon) => {
            const esActual = escalon.numero === actual;
            const cuerpo = (
              <>
                <span
                  className={cn(
                    "block text-label font-bold tabular-nums tracking-label",
                    esActual ? "text-on-accent/85" : "text-accent/80",
                  )}
                >
                  {String(escalon.numero).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-body-sm leading-title font-semibold">{escalon.nombre}</span>
              </>
            );
            const base = "block h-full rounded-card-sm border px-4 py-3 transition-colors";
            return (
              <li key={escalon.numero}>
                {esActual ? (
                  <span aria-current="step" className={cn(base, "border-accent bg-accent text-on-accent shadow-card-accent")}>
                    {cuerpo}
                  </span>
                ) : (
                  <Link
                    href={escalon.ruta}
                    className={cn(
                      base,
                      "border-border-subtle bg-bg-panel text-text-primary hover:border-accent/40 hover:text-accent",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    )}
                  >
                    {cuerpo}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </Seccion>
  );
}
