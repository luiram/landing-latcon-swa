import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { LocaleCode } from "@/lib/locales";

type LocaleFlagProps = {
  code: LocaleCode;
  className?: string;
  title?: string;
  /** compact = trigger; row = opciones del menú (mismo marco, distinto tamaño) */
  variant?: "compact" | "row";
  /**
   * default = marco suave con fondo (dropdown, listas).
   * minimal = solo contorno fino, sin cápsula gris (p. ej. trigger en navbar).
   */
  chrome?: "default" | "minimal";
};

/** Mismas proporciones 3:2 en ambos modos; `slice` unifica el relleno del SVG. */
const frame = {
  compact: "h-4 w-6",
  row: "h-5 w-[30px]",
} as const;

/**
 * Banderas SVG en un marco fijo + `slice` para tamaño visual uniforme (EE. UU. ya no se ve más grande).
 */
export function LocaleFlag({
  code,
  className,
  title,
  variant = "row",
  chrome = "default",
}: LocaleFlagProps) {
  const box = frame[variant];

  const frameClass =
    chrome === "minimal"
      ? "rounded-[2px] ring-1 ring-neutral-800/10"
      : "rounded-[3px] bg-neutral-200/40 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]";

  const inner = (viewBox: string, children: ReactNode) => (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden",
        frameClass,
        box,
        className,
      )}
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        className="block h-full w-full"
        aria-hidden={!title}
        role={title ? "img" : undefined}
      >
        {title ? <title>{title}</title> : null}
        {children}
      </svg>
    </span>
  );

  switch (code) {
    case "es":
      /* Colombia: franjas amarillo (mitad), azul, rojo — proporción 2:3 */
      return inner(
        "0 0 3 2",
        <>
          <rect width="3" height="1" y="0" fill="#FCD116" />
          <rect width="3" height="0.5" y="1" fill="#003893" />
          <rect width="3" height="0.5" y="1.5" fill="#CE1126" />
        </>,
      );
    case "en":
      /* Reino Unido (Union Jack simplificado, lectible en tamaño compacto) */
      return inner(
        "0 0 60 30",
        <>
          <rect width="60" height="30" fill="#012169" />
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="10" strokeLinecap="square" />
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="6" strokeLinecap="square" />
          <path d="M30 0 V30 M0 15 H60" stroke="#fff" strokeWidth="10" strokeLinecap="square" />
          <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" strokeWidth="6" strokeLinecap="square" />
        </>,
      );
    case "pt":
      /* Português: bandera de Brasil (proporción ~10:7 en viewBox 20 14) */
      return inner(
        "0 0 20 14",
        <>
          <rect width="20" height="14" fill="#009739" />
          <path fill="#FFDF00" d="M10 1.2 18.2 7 10 12.8 1.8 7z" />
          <circle cx="10" cy="7" r="3.6" fill="#002776" />
        </>,
      );
    case "fr":
      return inner(
        "0 0 3 2",
        <>
          <rect width="1" height="2" fill="#002395" />
          <rect x="1" width="1" height="2" fill="#fff" />
          <rect x="2" width="1" height="2" fill="#ED2939" />
        </>,
      );
    default:
      return null;
  }
}
