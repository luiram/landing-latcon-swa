import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BandaCTA } from "@/components/sections/BandaCTA";
import { GridDeTarjetas } from "@/components/sections/GridDeTarjetas";
import { Hero } from "@/components/sections/Hero";
import { NOSOTROS } from "@/config/sitio/empresa-paginas";
import { metadatosPagina } from "@/lib/metadatos";

export const metadata = metadatosPagina({ ...NOSOTROS.metadatos, ruta: NOSOTROS.ruta });

/** /nosotros: los tres socios, sin años (docs/contenido-sitio.md §6). */
export default function NosotrosPage() {
  const { hero, socios, cierre } = NOSOTROS;
  return (
    <LayoutPagina ruta={NOSOTROS.ruta} aRasDelFooter>
      <Hero variante="full" {...hero} />
      <GridDeTarjetas id="equipo" variante="full" columnas={3} tarjetas={socios} />
      <BandaCTA variante="full" {...cierre} />
    </LayoutPagina>
  );
}
