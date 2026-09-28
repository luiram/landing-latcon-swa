// Uso: node comparar-secciones.js <carpeta out A> <carpeta out B> [ruta]
// Mide cada <section> del <main> en dos exports (alto y posición) y guarda la captura del <main>
// de cada uno en capturas/secciones/. Sirve cuando un paso cambia el sistema pero no el contenido
// (paso 3): muestra dónde y cuánto cambia la página, sección por sección.
const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch");
const { servir, abrirNavegador, contextoAislado, SIN_ANIMACIONES, recorrer } = require("./comun");

const [a, b, ruta = "/"] = process.argv.slice(2);
if (!a || !b) {
  console.error("Uso: node comparar-secciones.js <carpeta out A> <carpeta out B> [ruta]");
  process.exit(1);
}

const SALIDA = path.join(__dirname, "capturas", "secciones");
fs.mkdirSync(SALIDA, { recursive: true });

async function medir(browser, dir, port, width, nombre) {
  const server = await servir(path.resolve(dir), port);
  const ctx = await contextoAislado(browser, port, { viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:${port}${ruta}`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: `${SIN_ANIMACIONES} .fixed{visibility:hidden!important}` });
  await recorrer(page);
  const secciones = await page.evaluate(() =>
    [...document.querySelectorAll("main section")].map((s) => {
      const r = s.getBoundingClientRect();
      const titulo = s.querySelector("h1,h2")?.textContent?.trim().slice(0, 40) ?? "(sin título)";
      return { id: s.id || "", titulo, alto: Math.round(r.height) };
    }),
  );
  const archivo = path.join(SALIDA, `${nombre}-${width}.png`);
  await page.locator("main").screenshot({ path: archivo });
  const palabras = await page.evaluate(() => document.querySelector("main").innerText.split(/\s+/).filter(Boolean).length);
  await ctx.close();
  server.close();
  return { secciones, archivo, palabras };
}

(async () => {
  const browser = await abrirNavegador();
  for (const width of [1440, 390]) {
    const ma = await medir(browser, a, 4182, width, "A");
    const mb = await medir(browser, b, 4183, width, "B");
    console.log(`\n── ${width} px ─────────────────────────────`);
    const n = Math.max(ma.secciones.length, mb.secciones.length);
    let totalA = 0;
    let totalB = 0;
    for (let i = 0; i < n; i++) {
      const sa = ma.secciones[i];
      const sb = mb.secciones[i];
      totalA += sa?.alto ?? 0;
      totalB += sb?.alto ?? 0;
      const delta = (sb?.alto ?? 0) - (sa?.alto ?? 0);
      const signo = delta > 0 ? `+${delta}` : `${delta}`;
      console.log(
        `  ${String(sa?.alto ?? "—").padStart(5)} → ${String(sb?.alto ?? "—").padStart(5)}  (${signo.padStart(5)})  ${(sb ?? sa).titulo}`,
      );
    }
    console.log(`  ${String(totalA).padStart(5)} → ${String(totalB).padStart(5)}  (${String(totalB - totalA).padStart(5)})  TOTAL secciones`);
    console.log(`  Palabras en <main>: ${ma.palabras} → ${mb.palabras}`);

    const ia = PNG.sync.read(fs.readFileSync(ma.archivo));
    const ib = PNG.sync.read(fs.readFileSync(mb.archivo));
    if (ia.width === ib.width && ia.height === ib.height) {
      const diff = new PNG({ width: ia.width, height: ia.height });
      const px = pixelmatch(ia.data, ib.data, diff.data, ia.width, ia.height, { threshold: 0 });
      fs.writeFileSync(path.join(SALIDA, `diff-${width}.png`), PNG.sync.write(diff));
      console.log(`  Píxeles distintos: ${px}`);
    } else {
      console.log(`  Tamaño del <main>: ${ia.width}x${ia.height} → ${ib.width}x${ib.height} (sin diff píxel a píxel)`);
    }
  }
  console.log(`\nCapturas en ${SALIDA}`);
  await browser.close();
})();
