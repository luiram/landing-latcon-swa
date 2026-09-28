import { cn } from "@/lib/cn";
import { Contenedor } from "@/components/ui/Contenedor";

/** `compact`: home. `full`: páginas interiores. */
export type Variante = "compact" | "full";

type SeccionProps = {
  children: React.ReactNode;
  /** Ancla para enlazar la sección (`#metodo`). */
  id?: string;
  variante?: Variante;
  fondo?: "page" | "warm" | "inverse";
  /** Aria-label cuando la sección no tiene título visible. */
  etiqueta?: string;
  className?: string;
};

const RITMO: Record<Variante, string> = {
  compact: "py-section-sm sm:py-section-md lg:py-section-lg",
  full: "py-section-md sm:py-section-lg",
};

const FONDOS = {
  page: "border-border-subtle bg-bg-page",
  warm: "border-border-subtle bg-bg-warm",
  inverse: "border-on-dark/15 bg-bg-inverse",
} as const;

/** Envoltorio común de toda sección: ancla, fondo, borde superior, ritmo vertical y contenedor. */
export function Seccion({ children, id, variante = "compact", fondo = "page", etiqueta, className }: SeccionProps) {
  return (
    <section
      id={id}
      aria-label={etiqueta}
      className={cn("scroll-mt-36 border-t", FONDOS[fondo], RITMO[variante], className)}
    >
      <Contenedor>{children}</Contenedor>
    </section>
  );
}
