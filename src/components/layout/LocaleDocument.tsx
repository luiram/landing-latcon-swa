"use client";

import { useEffect } from "react";
import { getSiteContent } from "@/config/landing";
import { useLocale } from "@/context/LocaleProvider";
import type { LocaleCode } from "@/lib/locales";

export function LocaleDocument() {
  const { locale } = useLocale();
  const site = getSiteContent(locale as LocaleCode);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `${site.brand} — ${site.descriptor}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", site.metadataDescription);
  }, [locale, site]);

  return null;
}
