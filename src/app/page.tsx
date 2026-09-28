import type { Metadata } from "next";
import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { About } from "@/components/sections/About";
import { BandaCTA } from "@/components/sections/BandaCTA";
import { GridDeTarjetas } from "@/components/sections/GridDeTarjetas";
import { Hero } from "@/components/sections/Hero";
import { TextoConImagen } from "@/components/sections/TextoConImagen";
import { Timeline } from "@/components/sections/Timeline";
import { landingContentEs as contenido } from "@/config/landing/es";
import { CTA_PRINCIPAL } from "@/config/sitio/mapa";
import { PrefetchAgenda } from "@/features/booking/PrefetchAgenda";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Home con el contenido de la landing, armado con las secciones del sistema (paso 3).
 * La secuencia nueva del home (docs/recomendaciones-sitio.md §1.5) llega en el paso 4.
 */
export default function Home() {
  const { hero, audience, solutions, process, about, finalCta } = contenido;

  return (
    <LayoutPagina ruta="/">
      <PrefetchAgenda />
      <Hero
        variante="compact"
        antetitulo={hero.chip}
        titulo={hero.title}
        bajada={hero.subtitle}
        cta={{ etiqueta: hero.ctaPrimary, ruta: CTA_PRINCIPAL.ruta }}
        nota={hero.ctaReassurance}
        enlaceSecundario={{ etiqueta: hero.secondaryCtaLabel, ruta: hero.secondaryCtaHref }}
        imagen={{
          src: "/hero-background.webp",
          alt: "",
          encuadre: { base: "68% center", sm: "70% center", lg: "84% center" },
        }}
      />
      <GridDeTarjetas
        id="para-quien"
        encabezado={{ antetitulo: audience.eyebrow, titulo: audience.title, bajada: audience.intro }}
        columnas={2}
        densidad="normal"
        tarjetas={audience.profiles.map((p) => ({
          titulo: p.title,
          texto: p.description,
          cita: p.quote,
          pie: p.sectors,
        }))}
      />
      <TextoConImagen
        id="solutions"
        encabezado={{ antetitulo: solutions.eyebrow, titulo: solutions.title, bajada: solutions.intro }}
        etiquetaLista={solutions.includesLabel}
        etiquetaResultado={solutions.resultLabel}
        numerado
        bloques={solutions.capabilities.map((c) => ({
          titulo: c.title,
          texto: c.body,
          imagen: { src: c.image, alt: c.imageAlt },
          lista: c.includes,
          resultado: c.result,
        }))}
        cta={CTA_PRINCIPAL}
      />
      <Timeline
        id="process"
        variante="full"
        encabezado={{ antetitulo: process.eyebrow, titulo: process.title, bajada: process.intro }}
        etiquetaResultado={process.resultLabel}
        pasos={process.steps.map((s) => ({ titulo: s.title, texto: s.body, resultado: s.result }))}
        cierre={process.closing}
        cta={CTA_PRINCIPAL}
      />
      <About
        antetitulo={about.panel.eyebrow}
        titulo={about.title}
        parrafos={about.paragraphs}
        miembros={about.members}
        etiquetas={about.tags}
        cta={CTA_PRINCIPAL}
      />
      <BandaCTA
        titulo={finalCta.title}
        texto={finalCta.body}
        cta={{ etiqueta: finalCta.ctaPrimary, ruta: CTA_PRINCIPAL.ruta }}
        nota={finalCta.ctaReassurance}
      />
    </LayoutPagina>
  );
}
