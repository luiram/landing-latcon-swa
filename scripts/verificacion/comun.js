// Utilidades compartidas: servir un export estático y abrir Chromium.
const http = require("http");
const handler = require("serve-handler");
const { chromium } = require("playwright");

/** Sirve la carpeta `dir` (un `out/` de Next) en `port`, con URLs limpias como Azure SWA. */
async function servir(dir, port) {
  const server = http.createServer((req, res) => handler(req, res, { public: dir, cleanUrls: true }));
  await new Promise((r) => server.listen(port, r));
  return server;
}

/**
 * Abre Chromium. Usa CHROMIUM_PATH si está definido (por ejemplo, un Chromium ya instalado
 * de otra versión de Playwright); si no, el que instala `npx playwright install chromium`.
 */
function abrirNavegador() {
  const executablePath = process.env.CHROMIUM_PATH || undefined;
  return chromium.launch({ executablePath });
}

/** Contexto que bloquea toda la red externa (API de agenda, analítica): resultados deterministas. */
async function contextoAislado(browser, port, opciones) {
  const ctx = await browser.newContext(opciones);
  await ctx.route(new RegExp(`^(?!http://localhost:${port}).*`), (r) => r.abort());
  return ctx;
}

const SIN_ANIMACIONES =
  "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}";

/** Recorre la página para disparar las animaciones de aparición (Reveal) y vuelve arriba. */
async function recorrer(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 400) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  return h;
}

module.exports = { servir, abrirNavegador, contextoAislado, SIN_ANIMACIONES, recorrer };
