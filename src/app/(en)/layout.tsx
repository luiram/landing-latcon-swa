import type { Metadata } from "next";
import "../globals.css";
import { RootShell } from "@/components/layout/RootShell";
import { buildBaseMetadata } from "@/lib/seo";
import { nunito } from "@/lib/fonts";

export const metadata: Metadata = buildBaseMetadata("en");

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} min-h-screen bg-bg-warm text-text-primary`}>
        <RootShell locale="en">{children}</RootShell>
      </body>
    </html>
  );
}
