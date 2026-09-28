import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Miga } from "@/lib/navegacion";

type BreadcrumbProps = {
  migas: readonly Miga[];
  etiqueta: string;
};

export function Breadcrumb({ migas, etiqueta }: BreadcrumbProps) {
  if (migas.length < 2) return null;
  return (
    <nav aria-label={etiqueta}>
      <ol className="flex flex-wrap items-center gap-1.5 text-caption text-text-muted">
        {migas.map((miga, i) => (
          <li key={miga.ruta} className="flex items-center gap-1.5">
            {i > 0 ? <ChevronRight aria-hidden className="size-3 text-text-muted/60" /> : null}
            {miga.actual ? (
              <span aria-current="page" className="font-medium text-text-primary">
                {miga.etiqueta}
              </span>
            ) : (
              <Link
                href={miga.ruta}
                className="rounded-control transition-colors hover:text-blue-mid-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                {miga.etiqueta}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
