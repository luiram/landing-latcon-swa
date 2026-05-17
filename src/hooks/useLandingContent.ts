"use client";

import { useMemo } from "react";
import { getLandingContent, getSiteContent } from "@/config/landing";
import { useLocale } from "@/context/LocaleProvider";
import type { LocaleCode } from "@/lib/locales";

export function useLandingContent() {
  const { locale } = useLocale();
  const code = locale as LocaleCode;

  return useMemo(
    () => ({
      content: getLandingContent(code),
      site: getSiteContent(code),
    }),
    [code],
  );
}
