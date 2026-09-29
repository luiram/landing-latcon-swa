import type { Metadata } from "next";
import type { Miga } from "@/lib/navegacion";

export const SITIO = "https://latconservices.com";
const MARCA = "Latcon";

/** Imagen al compartir: la misma del home, 1200 × 630. */
const IMAGEN_OG = { url: "/og-image.jpg", width: 1200, height: 630 };

type MetadatosPagina = {
  titulo: string;
  descripcion: string;
  ruta: string;
};

/** URL absoluta de una ruta del sitio. */
export const urlAbsoluta = (ruta: string) => `${SITIO}${ruta === "/" ? "" : ruta}`;

/**
 * Título, descripción, URL canónica, Open Graph y tarjeta de X de una página interior.
 * Next reemplaza el `openGraph` del layout completo, así que la imagen se repite aquí.
 */
export function metadatosPagina({ titulo, descripcion, ruta }: MetadatosPagina): Metadata {
  const tituloCompleto = `${titulo} — ${MARCA}`;
  return {
    title: tituloCompleto,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      title: tituloCompleto,
      description: descripcion,
      url: urlAbsoluta(ruta),
      siteName: MARCA,
      locale: "es_CO",
      type: "website",
      images: [IMAGEN_OG],
    },
    twitter: {
      card: "summary_large_image",
      title: tituloCompleto,
      description: descripcion,
      images: [IMAGEN_OG.url],
    },
  };
}

/** Datos estructurados del breadcrumb (schema.org BreadcrumbList). */
export function jsonLdMigas(migas: readonly Miga[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: migas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.etiqueta,
      item: urlAbsoluta(m.ruta),
    })),
  };
}
