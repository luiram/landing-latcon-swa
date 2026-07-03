"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleProvider";
import { getCookieConsentContent } from "@/config/landing";
import type { LocaleCode } from "@/lib/locales";

const STORAGE_KEY = "latcon-cookie-consent";

function applyConsent(granted: boolean) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}

export function CookieConsentBanner() {
  const { locale } = useLocale();
  const t = getCookieConsentContent(locale as LocaleCode);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted" || stored === "denied") {
      applyConsent(stored === "granted");
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

  const choose = (granted: boolean) => {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    applyConsent(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      {/* Fondo que bloquea la interacción con el resto del sitio hasta elegir */}
      <div className="absolute inset-0 bg-black/28 backdrop-blur-[2px]" />

      <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 sm:mx-auto sm:max-w-3xl">
        <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-[rgba(255,253,250,0.96)] p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.92),0_1px_2px_rgba(255,255,255,0.22),0_20px_50px_-16px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-[110%] sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-xs leading-relaxed text-text-muted sm:flex-1">
            {t.message}{" "}
            <Link href="/privacidad" className="font-medium text-blue-mid-2 underline-offset-4 hover:underline">
              {t.privacyLink}
            </Link>
          </p>
          <div className="grid grid-cols-2 gap-2 sm:shrink-0">
            <button
              type="button"
              onClick={() => choose(false)}
              className="rounded-lg border border-border-subtle bg-bg-panel px-4 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-blue-mid-1/35 hover:bg-bg-elevated"
            >
              {t.reject}
            </button>
            <button
              type="button"
              onClick={() => choose(true)}
              className="rounded-lg border border-accent bg-accent px-4 py-2 text-xs font-semibold text-white shadow-sm transition-[transform,filter] hover:scale-[1.03] hover:brightness-95"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
