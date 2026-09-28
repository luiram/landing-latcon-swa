import { cn } from "@/lib/cn";

type CitaProps = {
  children: React.ReactNode;
  className?: string;
};

/** Frase en boca del cliente. Las comillas van en el contenido. */
export function Cita({ children, className }: CitaProps) {
  return (
    <blockquote className={cn("text-body-sm font-semibold italic leading-body text-text-muted/90", className)}>
      {children}
    </blockquote>
  );
}
