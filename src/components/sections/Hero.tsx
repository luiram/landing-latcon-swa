import Image from "next/image";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { Enlace } from "@/components/ui/Enlace";
import { Imagen, type DatosImagen } from "@/components/ui/Imagen";
import { Texto } from "@/components/ui/Texto";
import { Titulo } from "@/components/ui/Titulo";
import type { EnlaceNav } from "@/lib/navegacion";

type DatosHero = {
  antetitulo?: string;
  titulo: string;
  bajada?: string;
  cta?: EnlaceNav;
  /** Micro-copy bajo el botón. */
  nota?: string;
  enlaceSecundario?: EnlaceNav;
};

/** Punto focal de la imagen de fondo (`object-position`) por ancho de pantalla. */
type Encuadre = { base: string; sm?: string; lg?: string };

export type HeroProps =
  | (DatosHero & {
      /** Home: titular sobre imagen oscura a todo el ancho. */
      variante: "compact";
      imagen: DatosImagen & { encuadre?: Encuadre };
    })
  | (DatosHero & {
      /** Interiores: fondo claro, imagen opcional a la derecha. */
      variante: "full";
      imagen?: DatosImagen;
    });

export function Hero(props: HeroProps) {
  return props.variante === "compact" ? <HeroCompact {...props} /> : <HeroFull {...props} />;
}

function HeroCompact({
  antetitulo,
  titulo,
  bajada,
  cta,
  nota,
  enlaceSecundario,
  imagen,
}: Extract<HeroProps, { variante: "compact" }>) {
  const encuadre = imagen.encuadre ?? { base: "center" };
  const estiloEncuadre = {
    "--encuadre": encuadre.base,
    "--encuadre-sm": encuadre.sm ?? encuadre.base,
    "--encuadre-lg": encuadre.lg ?? encuadre.sm ?? encuadre.base,
  } as React.CSSProperties;

  return (
    <section className="relative scroll-mt-36 overflow-hidden border-b border-on-dark/15 bg-bg-inverse pb-20 pt-32 sm:pb-28 sm:pt-36 lg:pb-32 lg:pt-40">
      <div className="pointer-events-none absolute inset-0" aria-hidden style={estiloEncuadre}>
        <Image
          src={imagen.src}
          alt={imagen.alt}
          fill
          priority
          className="object-cover object-[var(--encuadre)] brightness-[0.894] contrast-[0.848] saturate-[0.708] sm:object-[var(--encuadre-sm)] lg:object-[var(--encuadre-lg)]"
          sizes="100vw"
        />
        <div className="velo-fondo absolute inset-0" />
        <div className="velo-texto absolute left-0 top-[10%] h-[66%] w-[min(62rem,72vw)] blur-[3px]" />
        <div className="velo-luz absolute inset-0" />
      </div>

      <Contenedor className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          <Reveal className="lg:col-span-8 xl:col-span-9">
            <div className="max-w-[34rem] sm:max-w-[38rem] lg:max-w-[46rem] xl:max-w-[52rem]">
              {antetitulo ? (
                <p className="inline-flex max-w-full rounded-pill border border-on-dark/12 bg-on-dark/[0.045] px-3.5 py-1.5 text-label font-medium uppercase tracking-label text-text-on-dark/90 text-shadow-glow backdrop-blur-[2px] sm:px-4 sm:text-caption sm:leading-4">
                  {antetitulo}
                </p>
              ) : null}
              <Titulo
                nivel={1}
                rol="display"
                tono="on-dark"
                className="mt-8 max-w-[min(100%,28.5rem)] text-shadow-display sm:mt-9 sm:max-w-[32.5rem] lg:mt-10 lg:max-w-[44rem] xl:max-w-[48rem]"
              >
                {titulo}
              </Titulo>
              {bajada ? (
                <Texto
                  rol="lead"
                  tono="on-dark-muted"
                  className="mt-10 max-w-[min(100%,31rem)] text-shadow-lead sm:mt-11 sm:max-w-[33.5rem] lg:mt-12 lg:max-w-[40.5rem] xl:max-w-[42.5rem]"
                >
                  {bajada}
                </Texto>
              ) : null}
              <Acciones cta={cta} nota={nota} enlaceSecundario={enlaceSecundario} oscuro className="mt-[3.35rem] sm:mt-[3.85rem]" />
            </div>
          </Reveal>
          <div className="hidden min-h-[min(52vh,400px)] lg:col-span-4 lg:block xl:col-span-3" aria-hidden />
        </div>
      </Contenedor>
    </section>
  );
}

function HeroFull({ antetitulo, titulo, bajada, cta, nota, enlaceSecundario, imagen }: Extract<HeroProps, { variante: "full" }>) {
  return (
    <section className="pb-section-sm sm:pb-section-md">
      <Contenedor>
        <div className={cn("grid items-center gap-10", imagen && "lg:grid-cols-2 lg:gap-14")}>
          <Reveal>
            <div className="max-w-prose-wide">
              {antetitulo ? <Texto rol="eyebrow">{antetitulo}</Texto> : null}
              <Titulo nivel={1} rol="display" className={antetitulo ? "mt-4" : undefined}>
                {titulo}
              </Titulo>
              {bajada ? (
                <Texto rol="lead" className="mt-6 max-w-prose">
                  {bajada}
                </Texto>
              ) : null}
              <Acciones cta={cta} nota={nota} enlaceSecundario={enlaceSecundario} className="mt-10" />
            </div>
          </Reveal>
          {imagen ? (
            <Reveal delay={0.08}>
              <Imagen {...imagen} prioridad sizes="(max-width: 1024px) 100vw, 50vw" />
            </Reveal>
          ) : null}
        </div>
      </Contenedor>
    </section>
  );
}

type AccionesProps = Pick<DatosHero, "cta" | "nota" | "enlaceSecundario"> & { oscuro?: boolean; className?: string };

function Acciones({ cta, nota, enlaceSecundario, oscuro, className }: AccionesProps) {
  if (!cta && !enlaceSecundario) return null;
  return (
    <div className={className}>
      {cta ? <Boton href={cta.ruta}>{cta.etiqueta}</Boton> : null}
      {nota ? (
        <Texto rol="caption" tono={oscuro ? "on-dark" : "muted"} className={cn("mt-3 max-w-md", oscuro && "text-text-on-dark/72")}>
          {nota}
        </Texto>
      ) : null}
      {enlaceSecundario ? (
        <div className="mt-4">
          <Enlace href={enlaceSecundario.ruta} tono={oscuro ? "on-dark" : "accent"}>
            {enlaceSecundario.etiqueta}
          </Enlace>
        </div>
      ) : null}
    </div>
  );
}
