"use client";

import { ErrorFallback } from "@/components/layout/ErrorFallback";

export default function Error({}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorFallback onRetry={() => window.location.reload()} />;
}
