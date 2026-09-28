import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { migasDe, normalizarRuta } from "@/lib/navegacion";
import { COLUMNAS_FOOTER, CTA_PRINCIPAL, ENLACES_LEGALES, MENU, PAGINAS } from "@/config/sitio/mapa";
import { EMPRESA, TEXTOS_CHASIS } from "@/config/sitio/empresa";

type LayoutPaginaProps = {
  /** Ruta de la página. Define el breadcrumb y si es el home. */
  ruta: string;
  children: React.ReactNode;
  /** Fondo de la página. `tinted` es el de las páginas legales. */
  fondo?: "page" | "warm" | "tinted";
};

const FONDOS = {
  page: "bg-bg-page",
  warm: "bg-bg-warm",
  tinted: "bg-bg-tinted",
} as const;

/**
 * Chasis de toda página: header, breadcrumb, contenido y footer.
 * El home no lleva breadcrumb ni espacio superior: su hero va bajo el header.
 * Los metadatos van en cada página con metadatosPagina() (src/lib/metadatos.ts).
 */
export function LayoutPagina({ ruta, children, fondo = "page" }: LayoutPaginaProps) {
  const esInicio = normalizarRuta(ruta) === "/";
  const migas = migasDe(ruta, PAGINAS);

  return (
    <>
      <Header
        menu={MENU}
        cta={CTA_PRINCIPAL}
        logo={{ src: EMPRESA.logo, alt: EMPRESA.logoAlt }}
        textos={TEXTOS_CHASIS}
      />
      <main className={cn("min-h-screen", FONDOS[fondo], !esInicio && "pb-24 pt-24 sm:pt-28")}>
        {!esInicio ? (
          <Container className="mb-8 sm:mb-10">
            <Breadcrumb migas={migas} etiqueta={TEXTOS_CHASIS.migas} />
          </Container>
        ) : null}
        {children}
      </main>
      <Footer
        columnas={COLUMNAS_FOOTER}
        legales={ENLACES_LEGALES}
        empresa={EMPRESA}
        textos={TEXTOS_CHASIS}
        anio={new Date().getFullYear()}
      />
    </>
  );
}
