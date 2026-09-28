import { cn } from "@/lib/cn";

/**
 * El rol define el tamaño; el nivel, la jerarquía del documento. Son independientes:
 * un h2 puede verse como título de tarjeta y un h3 como título de sección.
 */
export type RolTitulo = "display" | "heading-lg" | "heading" | "heading-sm" | "title" | "title-sm" | "item";

type TituloProps = {
  children: React.ReactNode;
  nivel?: 1 | 2 | 3 | 4;
  rol?: RolTitulo;
  tono?: "normal" | "on-dark";
  className?: string;
};

const ROLES: Record<RolTitulo, string> = {
  display: "text-display-sm leading-display tracking-display lg:text-display",
  "heading-lg": "text-heading-sm leading-heading tracking-heading sm:text-heading-lg",
  heading: "text-heading-sm leading-heading tracking-heading sm:text-heading",
  "heading-sm": "text-title leading-heading tracking-heading sm:text-heading-sm",
  title: "text-title-sm leading-title tracking-heading sm:text-title",
  "title-sm": "text-title-sm leading-title tracking-title",
  item: "text-body leading-title tracking-title",
};

const TONOS = {
  normal: "text-text-primary",
  "on-dark": "text-text-on-dark",
} as const;

export function Titulo({ children, nivel = 2, rol = "heading", tono = "normal", className }: TituloProps) {
  const Etiqueta = `h${nivel}` as const;
  return <Etiqueta className={cn("text-balance font-semibold", ROLES[rol], TONOS[tono], className)}>{children}</Etiqueta>;
}
