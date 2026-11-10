/**
 * Consentimiento de cookies (paso 8a, docs/consulta-legal.md §(c) 16 y 20).
 * Modo básico de Consent Mode: Google Analytics no se carga hasta que el visitante acepta.
 * El banner escribe la elección; GoogleAnalytics la escucha; el footer reabre las preferencias.
 */

export type EleccionCookies = { essential: true; analytics: boolean };

const CLAVE = "latcon-cookie-consent";
/** Se emite al guardar una elección. `detail` es la EleccionCookies. */
export const EVENTO_ELECCION = "latcon:cookies-eleccion";
/** Se emite para reabrir el panel de preferencias (enlace del footer). */
export const EVENTO_ABRIR = "latcon:cookies-abrir";

export function leerEleccion(): EleccionCookies | null {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return null;
    const p = JSON.parse(crudo) as Partial<EleccionCookies>;
    return typeof p.analytics === "boolean" ? { essential: true, analytics: p.analytics } : null;
  } catch {
    /* Safari privado u otro storage bloqueado: se trata como "sin elección". */
    return null;
  }
}

export function guardarEleccion(eleccion: EleccionCookies) {
  const anterior = leerEleccion();
  try {
    localStorage.setItem(CLAVE, JSON.stringify(eleccion));
  } catch {
    /* la preferencia solo dura la página actual */
  }
  window.dispatchEvent(new CustomEvent(EVENTO_ELECCION, { detail: eleccion }));
  // Revocar: GA ya cargado no se descarga; se borran sus cookies y se recarga sin él.
  if (anterior?.analytics && !eleccion.analytics) {
    borrarCookiesAnalitica();
    window.location.reload();
  }
}

/** Borra las cookies de Google Analytics (_ga, _ga_<ID>) del dominio actual y del dominio padre. */
function borrarCookiesAnalitica() {
  const host = window.location.hostname;
  const dominios = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const par of document.cookie.split(";")) {
    const nombre = par.split("=")[0].trim();
    if (!nombre.startsWith("_ga")) continue;
    for (const d of dominios) {
      document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
    }
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

export function abrirPreferenciasCookies() {
  window.dispatchEvent(new Event(EVENTO_ABRIR));
}
