"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCookieConsentContent, getSiteContent } from "@/config/landing";
import type { LocaleCode } from "@/lib/locales";

const STORAGE_KEY = "latcon-cookie-consent";

type ConsentChoice = { essential: true; analytics: boolean };

function parseStoredConsent(raw: string | null): ConsentChoice | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentChoice>;
    if (typeof parsed.analytics === "boolean") {
      return { essential: true, analytics: parsed.analytics };
    }
    return null;
  } catch {
    return null;
  }
}

function applyConsent(choice: ConsentChoice) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", {
    analytics_storage: choice.analytics ? "granted" : "denied",
  });
}

/** Safari en modo privado (u otros navegadores con storage restringido) puede lanzar
 * una excepción al acceder a localStorage; sin este resguardo, tumba toda la página. */
function readStoredConsent(): ConsentChoice | null {
  try {
    return parseStoredConsent(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function writeStoredConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  } catch {
    /* ignore: la preferencia solo dura la sesión actual */
  }
}

export function CookieConsentBanner({ locale }: { locale: LocaleCode }) {
  const t = getCookieConsentContent(locale);
  const site = getSiteContent(locale);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      applyConsent(stored);
      return;
    }
    setVisible(true);
  }, []);

  // Bloquea el scroll de fondo mientras no se elija una opción.
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  const save = (choice: ConsentChoice) => {
    writeStoredConsent(choice);
    applyConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={t.dialogLabel}>
      {/* Fondo que bloquea la interacción con el resto del sitio hasta elegir */}
      <div className="absolute inset-0 bg-black/28 backdrop-blur-[2px]" />

      <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 sm:mx-auto sm:max-w-3xl">
        <div className="rounded-2xl border border-white/20 bg-[rgba(255,253,250,0.96)] p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.92),0_1px_2px_rgba(255,255,255,0.22),0_20px_50px_-16px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-[110%]">
          {!expanded ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <p className="text-xs leading-relaxed text-text-muted sm:flex-1">
                {t.message}{" "}
                <Link href={site.privacyUrl} className="font-medium text-blue-mid-2 underline-offset-4 hover:underline">
                  {t.privacyLink}
                </Link>
              </p>
              <div className="grid grid-cols-2 gap-2 sm:shrink-0">
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="rounded-lg border border-border-subtle bg-bg-panel px-4 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-blue-mid-1/35 hover:bg-bg-elevated"
                >
                  {t.customize}
                </button>
                <button
                  type="button"
                  onClick={() => save({ essential: true, analytics: true })}
                  className="rounded-lg border border-accent bg-accent px-4 py-2 text-xs font-semibold text-bg-deep shadow-sm transition-[transform,filter] hover:scale-[1.03] hover:brightness-95"
                >
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
                  <p className="mt-0.5 text-[11px] leading-relaxed text-text-muted">{t.essentialDescription}</p>
                </div>
                <span className="shrink-0 rounded-full bg-bg-elevated px-2 py-1 text-[10px] font-medium text-text-muted">
                  {t.essentialBadge}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 rounded-xl border border-border-subtle bg-bg-panel/60 p-3">
                <div>
                  <p className="text-xs font-semibold text-text-primary">{t.analyticsLabel}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-text-muted">{t.analyticsDescription}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analyticsChecked}
                  onClick={() => setAnalyticsChecked((v) => !v)}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                    analyticsChecked ? "bg-accent" : "bg-border-subtle"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                      analyticsChecked ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="rounded-lg border border-border-subtle bg-bg-panel px-4 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-blue-mid-1/35 hover:bg-bg-elevated"
                >
                  {t.back}
                </button>
                <button
                  type="button"
                  onClick={() => save({ essential: true, analytics: analyticsChecked })}
                  className="rounded-lg border border-accent bg-accent px-4 py-2 text-xs font-semibold text-bg-deep shadow-sm transition-[transform,filter] hover:scale-[1.03] hover:brightness-95"
                >
                  {t.savePreferences}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
