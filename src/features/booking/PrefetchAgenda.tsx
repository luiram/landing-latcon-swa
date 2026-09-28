"use client";

import { useEffect } from "react";
import { prefetchSlots } from "./bookingApi";

/** Pide los horarios disponibles en segundo plano para que /agenda abra sin espera. No renderiza nada. */
export function PrefetchAgenda() {
  useEffect(() => {
    prefetchSlots();
  }, []);
  return null;
}
