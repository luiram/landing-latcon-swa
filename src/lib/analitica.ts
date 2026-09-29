/**
 * Instrumentación del sitio (paso 7b, ADR 0006): eventos de GA4 y origen de la visita.
 * Los eventos pasan por gtag, que respeta el Consent Mode del banner de cookies.
 * El origen se guarda en sessionStorage (primera parte, no sale del navegador) y solo se envía
 * con una reserva de /agenda, cubierta por la política de tratamiento de datos.
 * Convención de UTM: docs/utm.md.
 */

type ValorEvento = string | number | boolean | undefined;

/** Envía un evento a GA4. Sin GA configurado (dev local) no hace nada. */
export function evento(nombre: string, parametros: Record<string, ValorEvento> = {}) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", nombre, parametros);
}

export type Origen = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  /** Primera página vista en la sesión. */
  landingPath: string;
  /** Sitio externo desde el que llegó la visita, sin parámetros. */
  referrer: string | null;
};

const CLAVE_ORIGEN = "latcon-origen";

/** Largo máximo por campo, igual al de las columnas de dbo.meeting_requests (migración 002). */
const LARGOS = { utm: 100, campana: 150, ruta: 500 } as const;

const recortar = (v: string | null, max: number) => (v ? v.trim().slice(0, max) || null : null);

function referenteExterno(): string | null {
  if (!document.referrer) return null;
  try {
    const url = new URL(document.referrer);
    if (url.host === window.location.host) return null;
    return recortar(`${url.origin}${url.pathname}`, LARGOS.ruta);
  } catch {
    return null;
  }
}

/**
 * Registra el origen al entrar al sitio. Se queda con el primero de la sesión, salvo que llegue
 * una URL con UTM nuevas (otro QR u otro enlace de campaña): esas mandan.
 */
export function registrarOrigen() {
  try {
    const params = new URLSearchParams(window.location.search);
    const conUtm = params.has("utm_source") || params.has("utm_campaign");
    if (sessionStorage.getItem(CLAVE_ORIGEN) && !conUtm) return;
    const origen: Origen = {
      utmSource: recortar(params.get("utm_source"), LARGOS.utm),
      utmMedium: recortar(params.get("utm_medium"), LARGOS.utm),
      utmCampaign: recortar(params.get("utm_campaign"), LARGOS.campana),
      utmContent: recortar(params.get("utm_content"), LARGOS.campana),
      utmTerm: recortar(params.get("utm_term"), LARGOS.campana),
      landingPath: window.location.pathname.slice(0, LARGOS.ruta),
      referrer: referenteExterno(),
    };
    sessionStorage.setItem(CLAVE_ORIGEN, JSON.stringify(origen));
  } catch {
    /* sessionStorage bloqueado: la reserva sale sin origen */
  }
}

/** Origen de la sesión, o null si no se pudo registrar. */
export function leerOrigen(): Origen | null {
  try {
    const crudo = sessionStorage.getItem(CLAVE_ORIGEN);
    return crudo ? (JSON.parse(crudo) as Origen) : null;
  } catch {
    return null;
  }
}
