"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { EVENTO_ELECCION, leerEleccion, type EleccionCookies } from "@/lib/consentimiento";

/**
 * Google Analytics en modo básico de Consent Mode (paso 8a, docs/consulta-legal.md tema 4):
 * no se carga ningún script de Google hasta que el visitante acepta la analítica en el banner.
 * Sin aceptación no existe `window.gtag`, y `evento()` (src/lib/analitica.ts) no envía nada.
 * Se omite por completo si no hay ID configurado (dev local).
 */
export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [aceptada, setAceptada] = useState(false);

  useEffect(() => {
    setAceptada(leerEleccion()?.analytics === true);
    const alElegir = (e: Event) => setAceptada((e as CustomEvent<EleccionCookies>).detail.analytics);
    window.addEventListener(EVENTO_ELECCION, alElegir);
    return () => window.removeEventListener(EVENTO_ELECCION, alElegir);
  }, []);

  if (!id || !aceptada) return null;

  return (
    <>
      <Script id="ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
    </>
  );
}
