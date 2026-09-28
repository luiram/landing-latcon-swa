"use client";

import { useEffect } from "react";
import { useLocale } from "@/context/LocaleProvider";

/**
 * Sincroniza el atributo lang del documento con el idioma activo.
 * No toca el título ni la descripción: esos los define cada página con metadatosPagina().
 */
export function LocaleDocument() {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
