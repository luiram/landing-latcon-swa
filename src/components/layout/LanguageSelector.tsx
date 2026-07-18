"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { LOCALES, type LocaleCode } from "@/lib/locales";
import { switchLocalePath } from "@/lib/localePaths";
import { LocaleFlag } from "@/components/layout/LocaleFlag";
import { LanguageOption } from "@/components/layout/LanguageOption";

type LanguageSelectorProps = {
  locale: LocaleCode;
  className?: string;
};

export function LanguageSelector({ locale, className }: LanguageSelectorProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Idioma: ${current.label}`}
        className={cn(
          "group inline-flex h-9 items-center justify-center gap-1 rounded-full border-0 bg-transparent px-1 text-neutral-800 transition-[background-color,color] duration-200",
          "hover:bg-white/50",
          open && "bg-white/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        )}
        onClick={() => setOpen((v) => !v)}
      >
        <LocaleFlag code={current.code} variant="compact" chrome="minimal" />
        <ChevronDown
          className={cn(
            "size-2 shrink-0 text-neutral-800/35 transition-[transform,color] duration-200 group-hover:text-neutral-800/48",
            open && "rotate-180 text-neutral-800/52",
          )}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+0.375rem)] z-[60] min-w-[14rem] overflow-hidden rounded-2xl border border-border-subtle/95 bg-bg-page/98 p-1.5 shadow-[0_20px_50px_-16px_rgba(75,104,140,0.22),0_8px_24px_-8px_rgba(0,0,0,0.08)] backdrop-blur-md"
        >
          {LOCALES.map((item) => (
            <li key={item.code} role="presentation" className="list-none">
              <LanguageOption
                href={switchLocalePath(pathname, item.code)}
                label={item.label}
                localeCode={item.code}
                selected={item.code === locale}
                onNavigate={() => setOpen(false)}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
