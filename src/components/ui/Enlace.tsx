import Link from "next/link";
import { cn } from "@/lib/cn";

type EnlaceProps = {
  href: string;
  children: React.ReactNode;
  tono?: "accent" | "normal" | "on-dark";
  className?: string;
};

const TONOS = {
  accent: "text-accent hover:text-text-primary",
  normal: "text-text-primary hover:text-accent",
  "on-dark": "text-text-on-dark-muted hover:text-text-on-dark",
} as const;

/** Enlace de texto. Una URL con protocolo se abre en otra pestaña. */
export function Enlace({ href, children, tono = "accent", className }: EnlaceProps) {
  const estilos = cn(
    "inline-flex items-center gap-1 text-body-sm leading-5 font-semibold underline-offset-4 transition-colors hover:underline",
    TONOS[tono],
    className,
  );

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={estilos} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={estilos}>
      {children}
    </Link>
  );
}
