import { cn } from "@/lib/cn";
import { Cita } from "@/components/ui/Cita";
import { Enlace } from "@/components/ui/Enlace";
import { Imagen, type DatosImagen } from "@/components/ui/Imagen";
import { Texto } from "@/components/ui/Texto";
import { Titulo } from "@/components/ui/Titulo";
import type { EnlaceNav } from "@/lib/navegacion";

/** Todo es opcional salvo el título. Un caso, un sector, una persona o una solución son datos, no tarjetas distintas. */
export type DatosTarjeta = {
  titulo: string;
  antetitulo?: string;
  texto?: string;
  cita?: string;
  /** Línea final separada: sectores, tecnologías, etapa. */
  pie?: string;
  imagen?: DatosImagen;
  enlace?: EnlaceNav;
};

export type DensidadTarjeta = "compacta" | "normal" | "destacada";

type TarjetaProps = DatosTarjeta & {
  densidad?: DensidadTarjeta;
  nivel?: 2 | 3 | 4;
  className?: string;
};

const DENSIDADES: Record<DensidadTarjeta, string> = {
  compacta: "rounded-card-sm p-4",
  normal: "rounded-card p-5 sm:p-6",
  destacada: "rounded-card border-accent/30 p-5 shadow-card-accent sm:p-6",
};

export function Tarjeta({
  titulo,
  antetitulo,
  texto,
  cita,
  pie,
  imagen,
  enlace,
  densidad = "normal",
  nivel = 3,
  className,
}: TarjetaProps) {
  const compacta = densidad === "compacta";
  return (
    <article
      className={cn(
        "flex h-full flex-col border border-border-subtle bg-bg-panel shadow-card transition-all duration-300",
        DENSIDADES[densidad],
        enlace && "hover:border-accent/30 hover:shadow-card-accent-hover",
        className,
      )}
    >
      {imagen ? <Imagen {...imagen} sizes="(max-width: 640px) 100vw, 33vw" className="mb-5 rounded-card-sm" /> : null}
      {antetitulo ? (
        <Texto rol="label" className="mb-2">
          {antetitulo}
        </Texto>
      ) : null}
      <Titulo nivel={nivel} rol={compacta ? "item" : "title-sm"}>
        {titulo}
      </Titulo>
      {texto ? (
        <Texto rol={compacta ? "small" : "body-sm"} className={cn("flex-1", compacta ? "mt-2" : "mt-3")}>
          {texto}
        </Texto>
      ) : null}
      {cita ? <Cita className="mt-4">{cita}</Cita> : null}
      {pie ? (
        <p className="mt-4 border-t border-border-subtle pt-4 text-caption leading-4 font-medium uppercase tracking-wide text-accent/85">
          {pie}
        </p>
      ) : null}
      {enlace ? (
        <Enlace href={enlace.ruta} className={cn("mt-auto self-start", compacta ? "pt-3" : "pt-5")}>
          {enlace.etiqueta}
        </Enlace>
      ) : null}
    </article>
  );
}
