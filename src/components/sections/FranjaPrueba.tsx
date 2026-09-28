import Link from "next/link";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Encabezado, type DatosEncabezado } from "@/components/piezas/Encabezado";
import { Texto } from "@/components/ui/Texto";
import { Seccion, type Variante } from "./Seccion";

/**
 * Hoy: sector y una línea de contexto. Cuando haya casos cerrados y publicables, la cifra
 * (y su explicación) se agrega como dato; el componente no cambia. Nunca se inventa una cifra.
 */
export type DatosPrueba = {
  titulo: string;
  linea: string;
  ruta?: string;
  cifra?: string;
};

type FranjaPruebaProps = {
  items: readonly DatosPrueba[];
  encabezado?: DatosEncabezado;
  /** `compact`: franja de una fila en el home. `full`: bloques más amplios en interiores. */
  variante?: Variante;
  id?: string;
};

/** Prueba de trayectoria: sectores hoy, casos cuando existan. Sin items no se muestra. */
export function FranjaPrueba({ items, encabezado, variante = "compact", id }: FranjaPruebaProps) {
  if (items.length === 0) return null;
  const compact = variante === "compact";

  return (
    <Seccion id={id} variante={variante} fondo="warm">
      {encabezado ? (
        <Reveal>
          <Encabezado {...encabezado} rol={compact ? "heading-sm" : "heading"} />
        </Reveal>
      ) : null}

      <ul
        className={cn(
          "grid sm:grid-cols-2",
          items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
          compact ? "gap-x-8 gap-y-6" : "gap-6",
          encabezado && (compact ? "mt-10" : "mt-12"),
        )}
      >
        {items.map((item, i) => (
          <Reveal key={item.titulo} as="li" delay={i * 0.05} y={10}>
            <Item {...item} compact={compact} />
          </Reveal>
        ))}
      </ul>
    </Seccion>
  );
}

function Item({ titulo, linea, ruta, cifra, compact }: DatosPrueba & { compact: boolean }) {
  const contenido = (
    <>
      {cifra ? (
        <p className="mb-2 text-heading-sm leading-heading font-semibold tracking-heading text-accent">{cifra}</p>
      ) : null}
      <p
        className={cn(
          "font-semibold text-text-primary transition-colors",
          compact ? "text-body leading-title" : "text-title-sm leading-title tracking-title",
          ruta && "group-hover:text-accent",
        )}
      >
        {titulo}
        {ruta ? (
          <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
            →
          </span>
        ) : null}
      </p>
      <Texto rol={compact ? "body-sm" : "body"} className="mt-2">
        {linea}
      </Texto>
    </>
  );

  const marco = cn(
    "block h-full",
    compact ? "border-t-2 border-accent/40 pt-4" : "rounded-card border border-border-subtle bg-bg-panel p-6 shadow-card",
  );

  return ruta ? (
    <Link href={ruta} className={cn("group", marco, "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent")}>
      {contenido}
    </Link>
  ) : (
    <div className={marco}>{contenido}</div>
  );
}
