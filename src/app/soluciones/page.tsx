import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BandaCTA } from "@/components/sections/BandaCTA";
import { GridDeTarjetas } from "@/components/sections/GridDeTarjetas";
import { Hero } from "@/components/sections/Hero";
import { SOLUCIONES_OVERVIEW } from "@/config/sitio/soluciones";
import { metadatosPagina } from "@/lib/metadatos";

export const metadata = metadatosPagina({ ...SOLUCIONES_OVERVIEW.metadatos, ruta: SOLUCIONES_OVERVIEW.ruta });

/** /soluciones: las tres familias con su titular de transición y sus páginas (docs/contenido-sitio.md §4). */
export default function SolucionesPage() {
  const { hero, familias, cierre } = SOLUCIONES_OVERVIEW;
  return (
    <LayoutPagina ruta={SOLUCIONES_OVERVIEW.ruta} aRasDelFooter>
      <Hero variante="full" {...hero} />
      {familias.map((familia) => (
        <GridDeTarjetas key={familia.id} variante="full" columnas={3} {...familia} />
      ))}
      <BandaCTA variante="full" {...cierre} />
    </LayoutPagina>
  );
}
