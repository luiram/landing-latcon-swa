"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleProvider";
import { getCookieConsentContent } from "@/config/landing";
import { EVENTO_ABRIR, guardarEleccion, leerEleccion, type EleccionCookies } from "@/lib/consentimiento";
import type { LocaleCode } from "@/lib/locales";

const botonSecundario =
  "min-h-10 rounded-lg border border-border-subtle bg-bg-panel px-4 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-blue-mid-1/35 hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70";
const botonPrincipal =
  "min-h-10 rounded-lg border border-accent bg-accent px-4 py-2 text-xs font-semibold text-on-accent shadow-sm transition-[transform,filter] hover:scale-[1.03] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2";

/**
 * Aviso de cookies (paso 8a): no bloquea el sitio, ofrece "Rechazar" en la primera capa
 * y se puede reabrir desde el footer (EVENTO_ABRIR). La elección la aplica GoogleAnalytics.
 */
export function CookieConsentBanner() {
  const { locale } = useLocale();
  const t = getCookieConsentContent(locale as LocaleCode);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);

  useEffect(() => {
    if (!leerEleccion()) setVisible(true);
    const abrir = () => {
      setAnalyticsChecked(leerEleccion()?.analytics === true);
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener(EVENTO_ABRIR, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR, abrir);
  }, []);

  const save = (choice: EleccionCookies) => {
    setVisible(false);
    setExpanded(false);
    guardarEleccion(choice);
  };

  if (!visible) return null;

  return (
    <section
      aria-label={t.regionLabel}
      className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-6 sm:bottom-6 sm:mx-auto sm:max-w-3xl"
    >
      <div className="rounded-card border border-glass-edge/20 bg-bg-glass/96 p-4 shadow-dialog backdrop-blur-2xl backdrop-saturate-[110%]">
        {!expanded ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-xs leading-relaxed text-text-muted sm:flex-1">
              {t.message}{" "}
              <Link href="/privacidad" className="font-medium text-blue-mid-2 underline underline-offset-4">
                {t.privacyLink}
              </Link>
            </p>
            <div className="grid grid-cols-3 gap-2 sm:shrink-0">
              <button type="button" onClick={() => save({ essential: true, analytics: false })} className={botonSecundario}>
                {t.reject}
              </button>
              <button type="button" onClick={() => setExpanded(true)} className={botonSecundario}>
                {t.customize}
              </button>
              <button type="button" onClick={() => save({ essential: true, analytics: true })} className={botonPrincipal}>
                {t.acceptAll}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-text-primary">{t.expandedTitle}</p>

            <div className="flex items-start justify-between gap-3 rounded-xl border border-border-subtle bg-bg-panel/60 p-3">
              <div>
                <p className="text-xs font-semibold text-text-primary">{t.essentialLabel}</p>
                <p className="mt-0.5 text-label leading-relaxed text-text-muted">{t.essentialDescription}</p>
              </div>
              <span className="shrink-0 rounded-full bg-bg-elevated px-2 py-1 text-label font-medium text-text-muted">
                {t.essentialBadge}
              </span>
            </div>

            <div className="flex items-start justify-between gap-3 rounded-xl border border-border-subtle bg-bg-panel/60 p-3">
              <div>
                <p id="cookies-analitica" className="text-xs font-semibold text-text-primary">
                  {t.analyticsLabel}
                </p>
                <p className="mt-0.5 text-label leading-relaxed text-text-muted">{t.analyticsDescription}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={analyticsChecked}
                aria-labelledby="cookies-analitica"
                onClick={() => setAnalyticsChecked((v) => !v)}
                className={`relative h-6 w-10 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 ${
                  analyticsChecked ? "bg-accent" : "bg-border-subtle"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-bg-panel shadow-sm transition-transform ${
                    analyticsChecked ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button type="button" onClick={() => setExpanded(false)} className={botonSecundario}>
                {t.back}
              </button>
              <button
                type="button"
                onClick={() => save({ essential: true, analytics: analyticsChecked })}
                className={botonPrincipal}
              >
                {t.savePreferences}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
