import { cn } from "@/lib/cn";

export type RolTexto = "lead" | "body" | "body-sm" | "small" | "caption" | "label" | "eyebrow";

type TextoProps = {
  children: React.ReactNode;
  rol?: RolTexto;
  /** Por defecto: `accent` para `eyebrow` y `label`; `muted` para el resto. */
  tono?: "muted" | "normal" | "accent" | "on-dark" | "on-dark-muted";
  como?: "p" | "span" | "div";
  className?: string;
};

const ROLES: Record<RolTexto, string> = {
  /** Bajada del hero */
  lead: "text-body-lg leading-body-loose",
  /** Cuerpo de sección: 14 px en móvil, 15 px desde sm */
  body: "text-body-sm leading-body sm:text-body",
  "body-sm": "text-body-sm leading-body",
  /** Cuerpo de tarjeta compacta */
  small: "text-small leading-body",
  /** Micro-copy bajo un botón */
  caption: "text-caption leading-body sm:text-body-sm",
  /** Rótulo en mayúsculas dentro de un bloque: "Lo que incluye", "Resultado" */
  label: "text-label font-semibold uppercase tracking-label",
  /** Antetítulo de sección */
  eyebrow: "text-caption font-semibold uppercase tracking-eyebrow",
};

const TONOS = {
  muted: "text-text-muted",
  normal: "text-text-primary",
  accent: "text-accent",
  "on-dark": "text-text-on-dark",
  "on-dark-muted": "text-text-on-dark-muted",
} as const;

export function Texto({ children, rol = "body", tono, como: Etiqueta = "p", className }: TextoProps) {
  const tonoFinal = tono ?? (rol === "eyebrow" || rol === "label" ? "accent" : "muted");
  return <Etiqueta className={cn("text-pretty", ROLES[rol], TONOS[tonoFinal], className)}>{children}</Etiqueta>;
}
