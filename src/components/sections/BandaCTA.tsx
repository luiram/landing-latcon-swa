import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { Texto } from "@/components/ui/Texto";
import { Titulo } from "@/components/ui/Titulo";
import type { EnlaceNav } from "@/lib/navegacion";
import { Seccion, type Variante } from "./Seccion";

type BandaCTAProps = {
  titulo: string;
  texto?: string;
  cta: EnlaceNav;
  /** Micro-copy bajo el botón. */
  nota?: string;
  /** `compact`: fondo claro. `full`: banda oscura que cierra una página interior. */
  variante?: Variante;
  id?: string;
};

/** Titular, botón y micro-copy. Cierra casi todas las páginas. */
export function BandaCTA({ titulo, texto, cta, nota, variante = "compact", id }: BandaCTAProps) {
  const oscura = variante === "full";
  return (
    <Seccion id={id} variante="compact" fondo={oscura ? "inverse" : "page"}>
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <Titulo rol={oscura ? "heading" : "heading-sm"} tono={oscura ? "on-dark" : "normal"}>
            {titulo}
          </Titulo>
          {texto ? (
            <Texto tono={oscura ? "on-dark-muted" : "muted"} className="mt-4">
              {texto}
            </Texto>
          ) : null}
          <div className="mt-8 flex flex-col items-center">
            <Boton href={cta.ruta}>{cta.etiqueta}</Boton>
            {nota ? (
              <Texto rol="caption" tono={oscura ? "on-dark-muted" : "muted"} className="mt-3 max-w-md">
                {nota}
              </Texto>
            ) : null}
          </div>
        </div>
      </Reveal>
    </Seccion>
  );
}
