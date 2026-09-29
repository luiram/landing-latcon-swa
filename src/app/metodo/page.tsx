import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BandaCTA } from "@/components/sections/BandaCTA";
import { Hero } from "@/components/sections/Hero";
import { TextoConImagen } from "@/components/sections/TextoConImagen";
import { Timeline } from "@/components/sections/Timeline";
import { METODO } from "@/config/sitio/empresa-paginas";
import { metadatosPagina } from "@/lib/metadatos";

export const metadata = metadatosPagina({ ...METODO.metadatos, ruta: METODO.ruta });

/** /metodo: Timeline completo y Fase 0 (docs/recomendaciones-sitio.md §1.4, docs/contenido-sitio.md §7). */
export default function MetodoPage() {
  const { hero, etapas, bloques, cierre } = METODO;
  return (
    <LayoutPagina ruta={METODO.ruta} aRasDelFooter>
      <Hero variante="full" {...hero} />
      <Timeline id="etapas" variante="full" {...etapas} />
      <TextoConImagen id="fase-0" variante="full" bloques={bloques} />
      <BandaCTA variante="full" {...cierre} />
    </LayoutPagina>
  );
}
