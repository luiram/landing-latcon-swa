"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { evento, registrarOrigen } from "@/lib/analitica";
import { RUTAS } from "@/config/sitio/mapa";

/** Profundidades de scroll que se registran, una vez por página vista. */
const UMBRALES_SCROLL = [25, 50, 75, 90] as const;

/** Dónde está el enlace: header, footer, id de la sección o el contenido en general. */
function ubicacionDe(el: Element): string {
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  return el.closest("section[id]")?.id || "contenido";
}

/**
 * Instrumentación de todo el sitio (paso 7b): origen de la visita, clics al CTA y scroll.
 * No dibuja nada. El embudo de /agenda se mide en BookingWizard.
 */
export function Instrumentacion() {
  const ruta = usePathname();

  useEffect(() => {
    registrarOrigen();
  }, []);

  // Cualquier enlace a /agenda cuenta como clic al CTA, sin marcar cada botón.
  useEffect(() => {
    const alHacerClic = (e: MouseEvent) => {
      const enlace = (e.target as Element | null)?.closest?.("a[href]");
      if (!(enlace instanceof HTMLAnchorElement)) return;
      let destino: URL;
      try {
        destino = new URL(enlace.href);
      } catch {
        return;
      }
      if (destino.host !== window.location.host || destino.pathname.replace(/\/$/, "") !== RUTAS.agenda) return;
      evento("cta_click", {
        pagina: window.location.pathname,
        ubicacion: ubicacionDe(enlace),
        texto: enlace.textContent?.trim().slice(0, 100),
      });
    };
    document.addEventListener("click", alHacerClic, { capture: true });
    return () => document.removeEventListener("click", alHacerClic, { capture: true });
  }, []);

  useEffect(() => {
    const alcanzados = new Set<number>();
    let pendiente = false;
    const medir = () => {
      pendiente = false;
      const alto = document.documentElement.scrollHeight;
      const visto = ((window.scrollY + window.innerHeight) / alto) * 100;
      for (const umbral of UMBRALES_SCROLL) {
        if (visto >= umbral && !alcanzados.has(umbral)) {
          alcanzados.add(umbral);
          evento("scroll_depth", { pagina: ruta, porcentaje: umbral });
        }
      }
    };
    const alDesplazar = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(medir);
    };
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, [ruta]);

  return null;
}
