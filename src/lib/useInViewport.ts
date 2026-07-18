"use client";

import { useEffect, useRef, useState } from "react";

/**
 * true mientras el elemento está (parcialmente) en viewport. Usado para pausar animaciones
 * costosas (gráficos SVG, canvas de partículas) fuera de pantalla — reutilizable por ambos.
 */
export function useInViewport<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInViewport(true); // fallback: si no hay soporte, no pausar nunca
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting), {
      threshold,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inViewport } as const;
}
