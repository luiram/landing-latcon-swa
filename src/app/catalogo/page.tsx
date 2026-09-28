import type { Metadata } from "next";
import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BandaCTA } from "@/components/sections/BandaCTA";
import { EscaleraContextual } from "@/components/sections/EscaleraContextual";
import { FranjaPrueba } from "@/components/sections/FranjaPrueba";
import { GridDeTarjetas } from "@/components/sections/GridDeTarjetas";
import { Hero } from "@/components/sections/Hero";
import { NavAnclas } from "@/components/sections/NavAnclas";
import { TextoConImagen } from "@/components/sections/TextoConImagen";
import { Timeline } from "@/components/sections/Timeline";
import { Contenedor } from "@/components/ui/Contenedor";
import { landingContentEs } from "@/config/landing/es";
import { CATALOGO } from "@/config/sitio/catalogo";
import { CTA_PRINCIPAL } from "@/config/sitio/mapa";

/**
 * Catálogo interno de secciones (ADR 0003). No está en el menú, el footer ni el sitemap.
 * Muestra cada sección con sus variantes. Las variantes del home (Hero compact, GridDeTarjetas
 * normal, TextoConImagen compact, Timeline full) se ven en `/`. Su publicación se decide en el paso 8.
 */
export const metadata: Metadata = {
  title: `${CATALOGO.titulo} — Latcon`,
  description: CATALOGO.descripcion,
  robots: { index: false, follow: false },
};

export default function CatalogoPage() {
  const { process, finalCta } = landingContentEs;

  return (
    <LayoutPagina ruta="/catalogo">
      <Muestra nombre="Hero · full" />
      <Hero variante="full" {...CATALOGO.heroFull} cta={CTA_PRINCIPAL} />

      <Muestra nombre="NavAnclas · full (fijo bajo el header)" />
      <NavAnclas etiqueta={CATALOGO.anclas.etiqueta} anclas={CATALOGO.anclas.items} />

      <Muestra nombre="TextoConImagen · full" />
      <TextoConImagen id="que-construimos" variante="full" {...CATALOGO.queConstruimos} />

      <Muestra nombre="EscaleraContextual · full (escalón 3 resaltado)" />
      <div id="la-escalera" className="scroll-mt-36">
        <EscaleraContextual {...CATALOGO.escalera} />
      </div>

      <Muestra nombre="GridDeTarjetas · full, 2 columnas, sin encabezado (Qué necesitas antes / Qué viene después)" />
      <GridDeTarjetas id="antes-y-despues" variante="full" columnas={2} tarjetas={CATALOGO.antesYDespues} />

      <Muestra nombre="FranjaPrueba · compact" />
      <FranjaPrueba id="donde-trabajamos" variante="compact" {...CATALOGO.dondeTrabajamos} />

      <Muestra nombre="FranjaPrueba · full" />
      <FranjaPrueba variante="full" {...CATALOGO.dondeTrabajamos} />

      <Muestra nombre="GridDeTarjetas · compact, 3 columnas" />
      <GridDeTarjetas variante="compact" columnas={3} {...CATALOGO.familias} />

      <Muestra nombre="GridDeTarjetas · sin tarjetas: no se renderiza" />
      <GridDeTarjetas tarjetas={[]} />

      <Muestra nombre="Timeline · compact" />
      <Timeline
        id="metodo"
        variante="compact"
        encabezado={{ titulo: process.title, bajada: process.intro }}
        pasos={process.steps.map((s) => ({ titulo: s.title, texto: s.body }))}
        enlace={CATALOGO.metodoEnlace}
      />

      <Muestra nombre="BandaCTA · full" />
      <BandaCTA
        id="cierre"
        variante="full"
        titulo={finalCta.title}
        texto={finalCta.body}
        cta={CTA_PRINCIPAL}
        nota={finalCta.ctaReassurance}
      />

      <Muestra nombre="BandaCTA · compact" />
      <BandaCTA titulo={finalCta.title} cta={CTA_PRINCIPAL} nota={finalCta.ctaReassurance} />
    </LayoutPagina>
  );
}

/** Rótulo del catálogo sobre cada muestra. Solo existe en esta página. */
function Muestra({ nombre }: { nombre: string }) {
  return (
    <div className="border-t-2 border-dashed border-accent/50 bg-accent/5">
      <Contenedor>
        <p className="py-2 font-mono text-caption leading-4 text-accent">{nombre}</p>
      </Contenedor>
    </div>
  );
}
