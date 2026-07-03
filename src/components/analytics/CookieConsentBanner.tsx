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

  const choose = (granted: boolean) => {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    applyConsent(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:left-4 sm:right-auto sm:max-w-sm">
      <div className="rounded-2xl border border-white/20 bg-[rgba(255,253,250,0.85)] p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.92),0_1px_2px_rgba(255,255,255,0.22),0_4px_32px_-6px_rgba(0,0,0,0.13),0_1px_4px_rgba(0,0,0,0.05)] backdrop-blur-2xl backdrop-saturate-[110%]">
        <p className="text-xs leading-relaxed text-text-muted">
          {t.message}{" "}
          <Link href="/privacidad" className="font-medium text-blue-mid-2 underline-offset-4 hover:underline">
            {t.privacyLink}
          </Link>
        </p>
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => choose(false)}
            className="rounded-lg border border-border-subtle bg-bg-panel px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors hover:border-blue-mid-1/35 hover:bg-bg-elevated"
          >
            {t.reject}
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-[transform,filter] hover:scale-[1.03] hover:brightness-95"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
