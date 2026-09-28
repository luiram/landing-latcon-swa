"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Contenedor } from "@/components/ui/Contenedor";

export type Ancla = {
  /** `id` de la sección de destino, sin `#`. */
  id: string;
  etiqueta: string;
};

type NavAnclasProps = {
  anclas: readonly Ancla[];
  /** Nombre accesible del índice, p. ej. "En esta página". */
  etiqueta: string;
};

/**
 * Índice de las secciones de una página interior. Queda fijo bajo el header y marca la sección
 * visible. Solo variante `full`: el home no lo usa (ADR 0003). Con menos de dos anclas no se muestra.
 */
export function NavAnclas({ anclas, etiqueta }: NavAnclasProps) {
  const [activa, setActiva] = useState<string | null>(null);

  useEffect(() => {
    const secciones = anclas
      .map((a) => document.getElementById(a.id))
      .filter((el): el is HTMLElement => el !== null);
    if (secciones.length === 0) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiva(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    secciones.forEach((s) => observador.observe(s));
    return () => observador.disconnect();
  }, [anclas]);

  if (anclas.length < 2) return null;

  return (
    <nav aria-label={etiqueta} className="sticky top-[4.5rem] z-30 border-y border-border-subtle bg-bg-glass/85 backdrop-blur-xl">
      <Contenedor>
        <ul className="-mx-2 flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {anclas.map((ancla) => {
            const actual = activa === ancla.id;
            return (
              <li key={ancla.id} className="shrink-0">
                <a
                  href={`#${ancla.id}`}
                  aria-current={actual ? "location" : undefined}
                  className={cn(
                    "block rounded-pill px-3 py-1.5 text-body-sm leading-5 font-medium transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-accent",
                    actual ? "bg-accent/10 text-accent" : "text-text-muted hover:bg-bg-elevated hover:text-text-primary",
                  )}
                >
                  {ancla.etiqueta}
                </a>
              </li>
            );
          })}
        </ul>
      </Contenedor>
    </nav>
  );
}
