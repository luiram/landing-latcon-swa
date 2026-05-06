import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { LocaleProvider } from "@/context/LocaleProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-bg-warm antialiased text-text-primary">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
