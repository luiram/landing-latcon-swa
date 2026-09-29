import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BandaCTA } from "@/components/sections/BandaCTA";
import { GridDeTarjetas } from "@/components/sections/GridDeTarjetas";
import { Hero } from "@/components/sections/Hero";
import { SECTORES_OVERVIEW } from "@/config/sitio/sectores";
import { metadatosPagina } from "@/lib/metadatos";

export const metadata = metadatosPagina({ ...SECTORES_OVERVIEW.metadatos, ruta: SECTORES_OVERVIEW.ruta });

/** /sectores: overview de los cuatro sectores. Los casos entran cuando existan (docs/contenido-sitio.md §2). */
export default function SectoresPage() {
  const { hero, tarjetas, cierre } = SECTORES_OVERVIEW;
  return (
    <LayoutPagina ruta={SECTORES_OVERVIEW.ruta} aRasDelFooter>
      <Hero variante="full" {...hero} />
      <GridDeTarjetas id="sectores" variante="full" columnas={2} tarjetas={tarjetas} />
      <BandaCTA variante="compact" {...cierre} />
    </LayoutPagina>
  );
}
