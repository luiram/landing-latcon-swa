// Uso: node comparar-main.js <carpeta out A> <carpeta out B> [ruta]
// Compara solo el <main> de una página entre dos exports, con el header fijo y los banners ocultos.
// Sirve para confirmar que un cambio de chasis (header, footer) no alteró el contenido.
const path = require("path");
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch");
const { servir, abrirNavegador, contextoAislado, SIN_ANIMACIONES, recorrer } = require("./comun");

const [a, b, ruta = "/"] = process.argv.slice(2);
if (!a || !b) {
  console.error("Uso: node comparar-main.js <carpeta out A> <carpeta out B> [ruta]");
  process.exit(1);
}

async function capturarMain(browser, dir, port, width) {
  const server = await servir(path.resolve(dir), port);
  const ctx = await contextoAislado(browser, port, { viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:${port}${ruta}`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: `${SIN_ANIMACIONES} header,.fixed{visibility:hidden!important}` });
  await recorrer(page);
  const buffer = await page.locator("main").screenshot();
  await ctx.close();
  server.close();
  return PNG.sync.read(buffer);
}

(async () => {
  const browser = await abrirNavegador();
  let hayDiferencias = false;
  for (const width of [1440, 390]) {
    const ia = await capturarMain(browser, a, 4180, width);
    const ib = await capturarMain(browser, b, 4181, width);
    if (ia.width !== ib.width || ia.height !== ib.height) {
      console.log(`main ${width}: tamaño distinto ${ia.width}x${ia.height} vs ${ib.width}x${ib.height}`);
      hayDiferencias = true;
      continue;
    }
    const pixeles = pixelmatch(ia.data, ib.data, null, ia.width, ia.height, { threshold: 0 });
    console.log(`main ${width}: ${ia.width}x${ia.height}, ${pixeles} px distintos`);
    if (pixeles) hayDiferencias = true;
  }
  await browser.close();
  process.exit(hayDiferencias ? 1 : 0);
})();
