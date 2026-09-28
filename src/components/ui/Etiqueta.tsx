import { cn } from "@/lib/cn";

type EtiquetaProps = {
  children: React.ReactNode;
  className?: string;
};

/** Chip de texto corto: sectores, tecnologías, temas. */
export function Etiqueta({ children, className }: EtiquetaProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border border-border-subtle bg-bg-elevated/90 px-3 py-1 text-caption leading-4 font-medium text-text-muted transition-colors duration-200",
        "hover:border-accent/28 hover:bg-bg-elevated hover:text-text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
