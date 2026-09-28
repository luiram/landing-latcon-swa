import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { Etiqueta } from "@/components/ui/Etiqueta";
import { Texto } from "@/components/ui/Texto";
import { Titulo } from "@/components/ui/Titulo";
import type { EnlaceNav } from "@/lib/navegacion";

type AboutProps = {
  antetitulo: string;
  titulo: string;
  parrafos: readonly string[];
  miembros: ReadonlyArray<{ name: string; role: string; credential: string }>;
  etiquetas: readonly string[];
  cta: EnlaceNav;
};

/**
 * Temporal: el bloque "Nosotros" de la landing, tal cual, con el contenido por props.
 * Sale del home en el paso 4; en /nosotros los socios se muestran con GridDeTarjetas (docs/recomendaciones-sitio.md §1.5).
 */
export function About({ antetitulo, titulo, parrafos, miembros, etiquetas, cta }: AboutProps) {
  return (
    <section id="nosotros" className="scroll-mt-36 border-t border-border-subtle bg-bg-warm py-24 sm:py-28">
      <Contenedor>
        <Reveal delay={0.08} y={20}>
          <Texto rol="eyebrow" className="mb-3">
            {antetitulo}
          </Texto>
          <Titulo rol="heading-lg">{titulo}</Titulo>
          <div className="mt-8 space-y-5">
            {parrafos.map((p, i) => (
              <Texto key={`about-p-${i}`} rol="body-sm" className="sm:text-body">
                {p}
              </Texto>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {miembros.map((miembro, i) => (
              <Reveal key={`member-${i}`} delay={0.1 + i * 0.06} y={12}>
                <div className="flex h-full flex-col gap-3 rounded-card-sm border border-border-subtle bg-bg-page p-4">
                  <div className="flex size-12 items-center justify-center rounded-pill border border-border-subtle bg-bg-panel">
                    <svg className="size-6 text-text-muted/40" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.333 0-10 1.667-10 5v1h20v-1c0-3.333-6.667-5-10-5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-body-sm leading-5 font-semibold text-text-primary">{miembro.name}</p>
                    <p className="mt-0.5 text-caption leading-4 font-medium text-accent/90">{miembro.role}</p>
                  </div>
                  <Texto rol="caption" className="sm:text-caption">
                    {miembro.credential}
                  </Texto>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-2">
            {etiquetas.map((t) => (
              <Etiqueta key={t}>{t}</Etiqueta>
            ))}
          </div>
          <div className="mt-10 flex justify-center sm:mt-12">
            <Boton href={cta.ruta}>{cta.etiqueta}</Boton>
          </div>
        </Reveal>
      </Contenedor>
    </section>
  );
}
