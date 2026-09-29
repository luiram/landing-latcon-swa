import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Encabezado, type DatosEncabezado } from "@/components/piezas/Encabezado";
import { ItemLista } from "@/components/piezas/ItemLista";
import { Boton } from "@/components/ui/Boton";
import { Enlace } from "@/components/ui/Enlace";
import { Imagen, type DatosImagen } from "@/components/ui/Imagen";
import { Texto } from "@/components/ui/Texto";
import { Titulo } from "@/components/ui/Titulo";
import type { EnlaceNav } from "@/lib/navegacion";
import { Seccion, type Variante } from "./Seccion";

export type DatosBloque = {
  titulo: string;
  texto?: string;
  imagen?: DatosImagen;
  lista?: readonly string[];
  resultado?: string;
  /** Salida del bloque, p. ej. a la página de su familia. */
  enlace?: EnlaceNav;
};

type TextoConImagenProps = {
  bloques: readonly DatosBloque[];
  encabezado?: DatosEncabezado;
  /** Rótulos comunes a todos los bloques, p. ej. "Lo que incluye" y "Resultado". */
  etiquetaLista?: string;
  etiquetaResultado?: string;
  /** Antepone 01., 02.… al título de cada bloque. */
  numerado?: boolean;
  /** Lado de la imagen en el primer bloque; los siguientes alternan. */
  inicio?: "izquierda" | "derecha";
  cta?: EnlaceNav;
  variante?: Variante;
  fondo?: "page" | "warm";
  id?: string;
};

/** Bloques de texto con imagen que alternan de lado. Sin bloques no se muestra. */
export function TextoConImagen({
  bloques,
  encabezado,
  etiquetaLista,
  etiquetaResultado,
  numerado,
  inicio = "izquierda",
  cta,
  variante = "compact",
  fondo,
  id,
}: TextoConImagenProps) {
  if (bloques.length === 0) return null;

  return (
    <Seccion id={id} variante={variante} fondo={fondo}>
      {encabezado ? (
        <Reveal>
          <Encabezado {...encabezado} rol={variante === "compact" ? "heading" : "heading-lg"} />
        </Reveal>
      ) : null}

      <div className={cn("space-y-16 sm:space-y-20 lg:space-y-24", encabezado && "mt-14 sm:mt-16")}>
        {bloques.map((bloque, i) => {
          const imagenDerecha = (i % 2 === 1) !== (inicio === "derecha");
          return (
            <Reveal key={bloque.titulo} delay={i * 0.06}>
              <article className={cn("grid gap-8", bloque.imagen && "lg:grid-cols-2 lg:items-center lg:gap-14")}>
                {bloque.imagen ? (
                  <Imagen
                    {...bloque.imagen}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={cn(imagenDerecha && "lg:order-2")}
                  />
                ) : null}

                <div className={cn(bloque.imagen ? imagenDerecha && "lg:order-1" : "max-w-prose-wide")}>
                  <Titulo nivel={encabezado ? 3 : 2} rol="title">
                    {numerado ? (
                      <span className="mr-2 text-accent/80">{String(i + 1).padStart(2, "0")}.</span>
                    ) : null}
                    {bloque.titulo}
                  </Titulo>
                  {bloque.texto ? <Texto className="mt-3 sm:mt-4">{bloque.texto}</Texto> : null}

                  {bloque.lista && bloque.lista.length > 0 ? (
                    <div className="mt-5 border-t border-blue-mid-1/25 pt-5">
                      {etiquetaLista ? <Texto rol="label">{etiquetaLista}</Texto> : null}
                      <ul className="mt-2.5 space-y-1.5 text-body-sm leading-body text-text-muted">
                        {bloque.lista.map((item) => (
                          <ItemLista key={item}>{item}</ItemLista>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {bloque.resultado ? (
                    <p className="mt-4 border-t border-blue-mid-1/25 pt-4 text-body-sm leading-title font-medium text-text-primary">
                      {etiquetaResultado ? (
                        <Texto rol="label" como="span">
                          {etiquetaResultado}:{" "}
                        </Texto>
                      ) : null}
                      {bloque.resultado}
                    </p>
                  ) : null}

                  {bloque.enlace ? (
                    <Enlace href={bloque.enlace.ruta} className="mt-5">
                      {bloque.enlace.etiqueta}
                    </Enlace>
                  ) : null}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {cta ? (
        <Reveal delay={0.1} className="mt-14 flex justify-center sm:mt-16">
          <Boton href={cta.ruta}>{cta.etiqueta}</Boton>
        </Reveal>
      ) : null}
    </Seccion>
  );
}
