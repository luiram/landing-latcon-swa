"use client";

import { abrirPreferenciasCookies } from "@/lib/consentimiento";

/** Reabre el aviso de cookies para cambiar la elección (enlace permanente del footer). */
export function BotonPreferenciasCookies({ etiqueta, className }: { etiqueta: string; className?: string }) {
  return (
    <button type="button" onClick={abrirPreferenciasCookies} className={className}>
      {etiqueta}
    </button>
  );
}
