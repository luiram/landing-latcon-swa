import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/config/site";
import { LocaleProvider } from "@/context/LocaleProvider";

export const metadata: Metadata = {
  title: `${site.brand} — ${site.descriptor}`,
  description:
    "Arquitectura tecnológica, automatización e IA aplicada para transformar operaciones complejas en sistemas más visibles, medibles y escalables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-bg-warm text-text-primary">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
