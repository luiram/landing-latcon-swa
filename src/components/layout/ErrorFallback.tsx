"use client";

import Link from "next/link";

/**
 * JSX compartido entre app/(en)/error.tsx y app/[locale]/error.tsx. El link de inicio
 * queda fijo en "/" a propósito (path del grupo (en)) — un error boundary es un camino
 * raro donde no vale la pena resolver el locale exacto solo para este link.
 */
export function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-warm px-6 text-center">
      <p className="text-2xl font-semibold tracking-tight text-accent-ink">Latcon</p>
      <h1 className="mt-4 text-xl font-semibold text-text-primary">Something didn&apos;t load correctly</h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-muted">
        This may be a temporary connection issue. Please try again.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg-deep shadow-sm transition-[transform,filter] hover:scale-[1.03] hover:brightness-95"
        >
          Retry
        </button>
        <Link
          href="/"
          className="rounded-lg border border-border-subtle bg-bg-panel px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-blue-mid-1/35 hover:bg-bg-elevated"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
