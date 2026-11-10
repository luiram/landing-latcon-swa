import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Encabezado, type DatosEncabezado } from "@/components/piezas/Encabezado";
import { Tarjeta, type DatosTarjeta, type DensidadTarjeta } from "@/components/piezas/Tarjeta";
import { Boton } from "@/components/ui/Boton";
import type { EnlaceNav } from "@/lib/navegacion";
import { Seccion, type Variante } from "./Seccion";

type GridDeTarjetasProps = {
  tarjetas: readonly DatosTarjeta[];
  encabezado?: DatosEncabezado;
  /** 1: una sola tarjeta a todo el ancho, para no dejar la fila vacía. */
  columnas?: 1 | 2 | 3 | 4;
  /** Por defecto: `compacta` en `compact`, `normal` en `full`. */
  densidad?: DensidadTarjeta;
  cta?: EnlaceNav;
  variante?: Variante;
  fondo?: "page" | "warm";
  id?: string;
};

const COLUMNAS = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/** Grilla de tarjetas. No sabe si contiene sectores, casos, personas o soluciones. Sin tarjetas no se muestra. */
export function GridDeTarjetas({
  tarjetas,
  encabezado,
  columnas = 3,
  densidad,
  cta,
  variante = "compact",
  fondo,
  id,
}: GridDeTarjetasProps) {
  if (tarjetas.length === 0) return null;
  const densidadFinal = densidad ?? (variante === "compact" ? "compacta" : "normal");

  return (
    <Seccion id={id} variante={variante} fondo={fondo}>
      {encabezado ? (
        <Reveal>
          <Encabezado {...encabezado} rol={variante === "compact" ? "heading" : "heading-lg"} />
        </Reveal>
      ) : null}

      <div className={cn("grid gap-5 sm:gap-6", COLUMNAS[columnas], encabezado && "mt-14 sm:mt-16")}>
        {tarjetas.map((tarjeta, i) => (
          <Reveal key={tarjeta.titulo} delay={0.08 + i * 0.05} y={14}>
            <Tarjeta {...tarjeta} densidad={densidadFinal} nivel={encabezado ? 3 : 2} />
          </Reveal>
        ))}
      </div>

      {cta ? (
        <Reveal delay={0.1} className="mt-14 flex justify-center sm:mt-16">
          <Boton href={cta.ruta}>{cta.etiqueta}</Boton>
        </Reveal>
      ) : null}
    </Seccion>
  );
}
