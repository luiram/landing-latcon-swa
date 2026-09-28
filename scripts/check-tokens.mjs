#!/usr/bin/env node
/**
 * Cuenta los valores de diseño que no pasan por los tokens de src/app/globals.css.
 * Decisión: docs/decisiones/0002-tokens-extraidos-del-css.md
 *
 *   npm run check:tokens            → informe (no falla)
 *   npm run check:tokens -- --strict → falla si queda alguno (meta del paso 3)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "src");

/** Único archivo donde pueden vivir valores literales. */
const TOKENS_FILE = join("src", "app", "globals.css");

/** Excepciones con razón. Cualquier otra debe pasar por un ADR. */
const EXCEPTIONS = {
  [join("src", "app", "global-error.tsx")]:
    "Reemplaza <html> completo y no puede depender del CSS global; usa estilos inline.",
  [join("src", "components", "layout", "LocaleFlag.tsx")]:
    "Colores de banderas nacionales: son dato, no marca.",
};

const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const COLOR_PREFIX = "bg|text|border|border-[trblxy]|from|via|to|ring|ring-offset|fill|stroke|outline|decoration|divide|caret|accent|shadow";

const RULES = [
  { id: "hex", label: "Hex literal", re: /#[0-9a-fA-F]{3,8}\b/g },
  { id: "rgb", label: "rgb()/rgba()/hsl() literal", re: /\b(?:rgba?|hsla?)\(/g },
  {
    id: "palette",
    label: "Color de la paleta por defecto de Tailwind",
    re: new RegExp(`(?<![\\w-])(?:${COLOR_PREFIX})-(?:white|black|(?:${PALETTE})-\\d{2,3})(?:\\/[\\w.\\[\\]]+)?(?![\\w-])`, "g"),
  },
  { id: "text", label: "Tamaño de texto arbitrario text-[…]", re: /(?<![\w-])text-\[(?:\d|calc|min|max|clamp)[^\]]*\]/g },
  { id: "leading", label: "Interlineado arbitrario leading-[…]", re: /(?<![\w-])leading-\[[^\]]+\]/g },
  { id: "tracking", label: "Tracking arbitrario tracking-[…]", re: /(?<![\w-])tracking-\[[^\]]+\]/g },
  { id: "shadow", label: "Sombra arbitraria shadow-[…]", re: /(?<![\w-])shadow-\[[^\]]+\]/g },
  { id: "radius", label: "Radio arbitrario rounded-[…]", re: /(?<![\w-])rounded(?:-[a-z]+)?-\[[^\]]+\]/g },
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : /\.(tsx?|css)$/.test(name) ? [full] : [];
  });
}

const strict = process.argv.includes("--strict");
const totals = Object.fromEntries(RULES.map((r) => [r.id, 0]));
const byFile = [];

for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  if (rel === TOKENS_FILE || EXCEPTIONS[rel]) continue;
  const text = readFileSync(file, "utf8");
  const counts = {};
  for (const rule of RULES) {
    const n = (text.match(rule.re) ?? []).length;
    if (n) {
      counts[rule.id] = n;
      totals[rule.id] += n;
    }
  }
  if (Object.keys(counts).length) byFile.push([rel.split(sep).join("/"), counts]);
}

const total = Object.values(totals).reduce((a, b) => a + b, 0);

console.log("Valores fuera de tokens\n");
for (const rule of RULES) console.log(`  ${String(totals[rule.id]).padStart(4)}  ${rule.label}`);
console.log(`  ${"----".padStart(4)}\n  ${String(total).padStart(4)}  TOTAL\n`);

byFile.sort((a, b) => sumOf(b[1]) - sumOf(a[1]));
for (const [file, counts] of byFile) {
  const detail = Object.entries(counts).map(([k, v]) => `${k}:${v}`).join(" ");
  console.log(`  ${String(sumOf(counts)).padStart(4)}  ${file}  (${detail})`);
}

console.log("\nExcepciones:");
for (const [file, why] of Object.entries(EXCEPTIONS)) console.log(`  - ${file.split(sep).join("/")}: ${why}`);

if (strict && total > 0) {
  console.error(`\n--strict: quedan ${total} valores fuera de tokens.`);
  process.exit(1);
}

function sumOf(counts) {
  return Object.values(counts).reduce((a, b) => a + b, 0);
}
