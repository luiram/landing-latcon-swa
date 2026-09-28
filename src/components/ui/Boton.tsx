import Link from "next/link";
import { cn } from "@/lib/cn";

type VarianteBoton = "primario" | "secundario" | "inverso";

type Comun = {
  children: React.ReactNode;
  className?: string;
  /** `inverso` va sobre fondo oscuro. */
  variante?: VarianteBoton;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

type BotonComoEnlace = Comun & {
  href: string;
  externo?: boolean;
};

type BotonComoBoton = Comun & {
  href?: undefined;
  externo?: never;
  type?: "button" | "submit";
  disabled?: boolean;
};

export type BotonProps = BotonComoEnlace | BotonComoBoton;

const base =
  "inline-flex items-center justify-center gap-2 rounded-control px-5 py-2.5 text-body-sm leading-5 font-semibold transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-out-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-warm";

const variantes: Record<VarianteBoton, string> = {
  primario:
    "bg-accent text-on-accent shadow-control-inset hover:scale-[1.03] hover:brightness-95 hover:shadow-control-hover motion-reduce:transition-[color,background-color,border-color,box-shadow] motion-reduce:duration-200 motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
  secundario:
    "border border-border-subtle bg-bg-panel text-text-primary shadow-sm hover:border-blue-mid-1/35 hover:bg-bg-elevated hover:shadow-control-outline",
  inverso:
    "border border-on-dark/40 bg-on-dark/14 text-text-on-dark shadow-sm backdrop-blur-sm hover:border-on-dark/55 hover:bg-on-dark/22",
};

/** Botón o enlace con forma de botón. Con `href` es un enlace; sin él, un `<button>`. */
export function Boton(props: BotonProps) {
  const { children, className, variante = "primario", onClick } = props;
  const estilos = cn(base, variantes[variante], className);

  if (props.href) {
    const { href, externo } = props;
    if (externo) {
      return (
        <a
          href={href}
          className={estilos}
          rel="noopener noreferrer"
          target="_blank"
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={estilos} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}>
        {children}
      </Link>
    );
  }

  const { type = "button", disabled } = props as BotonComoBoton;
  return (
    <button
      type={type}
      className={estilos}
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}
