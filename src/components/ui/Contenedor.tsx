import { cn } from "@/lib/cn";

type ContenedorProps = {
  children: React.ReactNode;
  className?: string;
};

/** Ancho de página con márgenes laterales. */
export function Contenedor({ children, className }: ContenedorProps) {
  return <div className={cn("mx-auto w-full max-w-page px-5 sm:px-6 lg:px-8", className)}>{children}</div>;
}
