import { notFound } from "next/navigation";
import { LayoutPagina } from "@/components/layout/LayoutPagina";
import { BandaCTA } from "@/components/sections/BandaCTA";
import { EscaleraContextual } from "@/components/sections/EscaleraContextual";
import { FranjaPrueba } from "@/components/sections/FranjaPrueba";
import { GridDeTarjetas } from "@/components/sections/GridDeTarjetas";
import { Hero } from "@/components/sections/Hero";
import { TextoConImagen } from "@/components/sections/TextoConImagen";
import { CTA_PRINCIPAL, ESCALONES } from "@/config/sitio/mapa";
import { COMUN_ESCALON, ESCALONES_PAGINAS, tarjetaPaso } from "@/config/sitio/soluciones";
import { metadatosPagina } from "@/lib/metadatos";

type Parametros = { params: Promise<{ escalon: string }> };

/** Solo las seis páginas de escalón. Drones tiene su propia página. */
export const dynamicParams = false;

export function generateStaticParams() {
  return ESCALONES_PAGINAS.map((p) => ({ escalon: p.slug }));
}

export async function generateMetadata({ params }: Parametros) {
  const { escalon } = await params;
  const pagina = ESCALONES_PAGINAS.find((p) => p.slug === escalon);
  if (!pagina) return {};
  return metadatosPagina({ ...pagina.metadatos, ruta: ESCALONES[pagina.numero - 1].ruta });
}

/**
 * Página de escalón con el esqueleto fijo de docs/contenido-sitio.md §4, idéntico en las seis:
 * titular "de X a Y" · escalera · dónde estás · qué construimos · lo que cambia · antes · después · caso + CTA.
 */
export default async function EscalonPage({ params }: Parametros) {
  const { escalon } = await params;
  const pagina = ESCALONES_PAGINAS.find((p) => p.slug === escalon);
  if (!pagina) notFound();
  const { numero, titulo, dondeEstas, queConstruimos, loQueCambia, antes, despues, extra, casos } = pagina;
  const { nombre, ruta } = ESCALONES[numero - 1];
  const t = COMUN_ESCALON;

  return (
    <LayoutPagina ruta={ruta} aRasDelFooter>
      <Hero variante="full" antetitulo={`Escalón ${numero} · ${nombre}`} titulo={titulo} cta={CTA_PRINCIPAL} />
      <EscaleraContextual etiqueta={t.etiquetaEscalera} escalones={ESCALONES} actual={numero} />
      <TextoConImagen
        id="que-construimos"
        variante="full"
        etiquetaResultado={t.loQueCambia}
        bloques={[
          { titulo: t.dondeEstas, texto: dondeEstas },
          {
            titulo: t.queConstruimos,
            texto: queConstruimos.intro,
            lista: queConstruimos.items,
            imagen: queConstruimos.imagen,
            resultado: loQueCambia,
            enlace: queConstruimos.enlace,
          },
          ...(extra ? [extra] : []),
        ]}
      />
      <GridDeTarjetas
        id="antes-y-despues"
        variante="full"
        columnas={2}
        tarjetas={[tarjetaPaso(t.antes, antes), tarjetaPaso(t.despues, despues)]}
      />
      <FranjaPrueba id="casos" variante="full" items={casos} />
      <BandaCTA variante="full" {...t.cierre} />
    </LayoutPagina>
  );
}
