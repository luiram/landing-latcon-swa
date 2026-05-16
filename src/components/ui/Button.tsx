import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "inverse";

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

type ButtonAsLink = Common & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = Common & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
  href?: undefined;
  external?: never;
};

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-warm";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-[0_1px_0_rgba(255,255,255,0.22)_inset] hover:scale-[1.03] hover:brightness-95 hover:shadow-[0_12px_36px_-14px_rgba(245,130,32,0.42)] motion-reduce:transition-[color,background-color,border-color,box-shadow] motion-reduce:duration-200 motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
  secondary:
    "border border-border-subtle bg-bg-panel text-text-primary shadow-sm hover:border-blue-mid-1/35 hover:bg-bg-elevated hover:shadow-[0_0_0_1px_rgba(86,123,165,0.1)]",
  inverse:
    "border border-white/40 bg-white/14 text-white shadow-sm backdrop-blur-sm hover:border-white/55 hover:bg-white/22",
};

export function Button(props: ButtonProps) {
  const { children, className, variant = "primary", onClick } = props;
  const styles = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          className={styles}
          rel="noopener noreferrer"
          target="_blank"
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={styles}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  const { type = "button", disabled, ...rest } = props as ButtonAsButton;
  return (
    <button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      {...rest}
    >
      {children}
    </button>
  );
}
