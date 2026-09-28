import type { Metadata } from "next";

const SITIO = "https://latconservices.com";
const MARCA = "Latcon";

type MetadatosPagina = {
  titulo: string;
  descripcion: string;
  ruta: string;
};

/** Título, descripción, URL canónica y Open Graph de una página interior. */
export function metadatosPagina({ titulo, descripcion, ruta }: MetadatosPagina): Metadata {
  const tituloCompleto = `${titulo} — ${MARCA}`;
  return {
    title: tituloCompleto,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      title: tituloCompleto,
      description: descripcion,
      url: `${SITIO}${ruta === "/" ? "" : ruta}`,
      siteName: MARCA,
      locale: "es_CO",
      type: "website",
    },
  };
}
