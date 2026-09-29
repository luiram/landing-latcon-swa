import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BandaCTA } from "@/components/sections/BandaCTA";
import { Hero } from "@/components/sections/Hero";
import { TextoConImagen } from "@/components/sections/TextoConImagen";
import { DESARROLLO } from "@/config/sitio/empresa-paginas";
import { metadatosPagina } from "@/lib/metadatos";

export const metadata = metadatosPagina({ ...DESARROLLO.metadatos, ruta: DESARROLLO.ruta });

/**
 * /desarrollo-a-la-medida: el pilar 5, modo de entrega y no escalón (docs/recomendaciones-sitio.md §1.6b).
 * Solo texto hasta tener capturas propias sin cliente identificable (docs/contenido-sitio.md §9).
 */
export default function DesarrolloPage() {
  const { hero, capacidades, cierre } = DESARROLLO;
  return (
    <LayoutPagina ruta={DESARROLLO.ruta} aRasDelFooter>
      <Hero variante="full" {...hero} />
      <TextoConImagen id="capacidades" variante="full" bloques={capacidades} />
      <BandaCTA variante="full" {...cierre} />
    </LayoutPagina>
  );
}
