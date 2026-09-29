import { notFound } from "next/navigation";
import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BandaCTA } from "@/components/sections/BandaCTA";
import { EscaleraContextual } from "@/components/sections/EscaleraContextual";
import { FranjaPrueba } from "@/components/sections/FranjaPrueba";
import { Hero } from "@/components/sections/Hero";
import { TextoConImagen } from "@/components/sections/TextoConImagen";
import { Timeline } from "@/components/sections/Timeline";
import { ESCALONES } from "@/config/sitio/mapa";
import { COMUN_SECTOR, SECTORES_PAGINAS } from "@/config/sitio/sectores";
import { metadatosPagina } from "@/lib/metadatos";

type Parametros = { params: Promise<{ sector: string }> };

/** Solo existen los sectores del contenido: cualquier otra ruta es 404 en el export estático. */
export const dynamicParams = false;

export function generateStaticParams() {
  return SECTORES_PAGINAS.map((s) => ({ sector: s.slug }));
}

export async function generateMetadata({ params }: Parametros) {
  const { sector } = await params;
  const pagina = SECTORES_PAGINAS.find((s) => s.slug === sector);
  return pagina ? metadatosPagina({ ...pagina.metadatos, ruta: pagina.ruta }) : {};
}

/** Página de sector (docs/recomendaciones-sitio.md §1.4 y §1.6). La plantilla es la misma para los cuatro. */
export default async function SectorPage({ params }: Parametros) {
  const { sector } = await params;
  const pagina = SECTORES_PAGINAS.find((s) => s.slug === sector);
  if (!pagina) notFound();
  const { hero, dolor, empieza, loQueHacemos, casos, cierre } = pagina;

  return (
    <LayoutPagina ruta={pagina.ruta} aRasDelFooter>
      <Hero variante="full" {...hero} />
      {dolor ? <TextoConImagen id="el-problema" variante="full" {...dolor} /> : null}
      <EscaleraContextual etiqueta={COMUN_SECTOR.etiquetaEscalera} escalones={ESCALONES} actual={empieza} />
      <TextoConImagen
        id="lo-que-hacemos"
        variante="full"
        encabezado={COMUN_SECTOR.encabezadoLoQueHacemos}
        bloques={loQueHacemos}
      />
      <FranjaPrueba id="casos" variante="full" items={casos} />
      <Timeline id="metodo" variante="compact" {...COMUN_SECTOR.metodo} />
      <BandaCTA variante="full" {...cierre} cta={COMUN_SECTOR.cta} nota={COMUN_SECTOR.nota} />
    </LayoutPagina>
  );
}
