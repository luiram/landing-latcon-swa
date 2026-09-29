import type { MetadataRoute } from "next";
import { PAGINAS, PAGINAS_SIN_PUBLICAR } from "@/config/sitio/mapa";
import { urlAbsoluta } from "@/lib/metadatos";

export const dynamic = "force-static";

/**
 * Sale del mapa del sitio: toda página registrada en PAGINAS entra, salvo las que aún no existen.
 * /catalogo no está en el mapa (noindex, ADR 0003). Sin prioridad ni frecuencia: Google las ignora.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(PAGINAS)
    .filter((ruta) => !PAGINAS_SIN_PUBLICAR.includes(ruta))
    .map((ruta) => ({ url: urlAbsoluta(ruta) }));
}
