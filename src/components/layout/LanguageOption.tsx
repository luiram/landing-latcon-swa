import Link from "next/link";
import { cn } from "@/lib/cn";
import type { LocaleCode } from "@/lib/locales";
import { LocaleFlag } from "@/components/layout/LocaleFlag";

type LanguageOptionProps = {
  href: string;
  localeCode: LocaleCode;
  label: string;
  selected: boolean;
  onNavigate: () => void;
};

/**
 * Opción del menú: bandera en marco fijo (vía LocaleFlag) + etiqueta, gap uniforme.
 * Navega a la misma página en el idioma elegido (no solo cambia estado).
 */
export function LanguageOption({ href, localeCode, label, selected, onNavigate }: LanguageOptionProps) {
  return (
    <Link
      href={href}
      role="option"
      aria-selected={selected}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-neutral-800 transition-colors hover:bg-stone-100/90 hover:text-neutral-950",
        selected &&
          "bg-stone-200/55 font-medium text-neutral-950 ring-1 ring-stone-300/40 hover:bg-stone-200/70",
      )}
      onClick={onNavigate}
    >
      <LocaleFlag code={localeCode} variant="row" title={label} />
      <span className="min-w-0 flex-1 leading-snug tracking-tight">{label}</span>
    </Link>
  );
}
