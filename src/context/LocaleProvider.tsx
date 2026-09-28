"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  LOCALE_STORAGE_KEY,
  type LocaleCode,
  isLocaleCode,
} from "@/lib/locales";

type LocaleContextValue = {
  locale: LocaleCode;
  setLocale: (code: LocaleCode) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const defaultLocale: LocaleCode = "es";

/**
 * Idioma fijo mientras se construye el sitio: el contenido nuevo existe solo en español
 * y se traduce al final (docs/decisiones/0004-idiomas.md). Con `null` vuelve a leerse
 * el idioma guardado en localStorage.
 */
const IDIOMA_FIJO: LocaleCode | null = "es";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(defaultLocale);

  useEffect(() => {
    if (IDIOMA_FIJO) return;
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored && isLocaleCode(stored)) {
        setLocaleState(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((code: LocaleCode) => {
    if (IDIOMA_FIJO) return;
    setLocaleState(code);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
