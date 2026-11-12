// Uso: node capturar-pagina.js <carpeta out> <ruta> <nombre>
// Captura una página completa a 1440 y 390 px en capturas/<nombre>/. Para páginas nuevas sin
// línea base, que se revisan a ojo y no contra landing-v1.
const fs = require("fs");
const path = require("path");
const { servir, abrirNavegador, contextoAislado, SIN_ANIMACIONES, recorrer } = require("./comun");

const [dir, ruta, nombre] = process.argv.slice(2);
if (!dir || !ruta || !nombre) {
  console.error("Uso: node capturar-pagina.js <carpeta out> <ruta> <nombre>");
  process.exit(1);
}

(async () => {
  const salida = path.join(__dirname, "capturas", nombre);
  fs.mkdirSync(salida, { recursive: true });
  const port = 4184;
  const server = await servir(path.resolve(dir), port);
  const browser = await abrirNavegador();
  let fallas = 0;
  for (const width of [1440, 390]) {
    const ctx = await contextoAislado(browser, port, { viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    const errores = [];
    page.on("pageerror", (e) => errores.push(e.message));
    page.on("console", (m) => m.type() === "error" && !/Failed to load resource/.test(m.text()) && errores.push(m.text()));
    const res = await page.goto(`http://localhost:${port}${ruta}`, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: SIN_ANIMACIONES });
    await recorrer(page);
    const desborde = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    const archivo = path.join(salida, `${width}.png`);
    await page.screenshot({ path: archivo, fullPage: true });
    console.log(`${width}: HTTP ${res.status()} · desborde horizontal: ${desborde ? "SÍ" : "no"} · errores: ${errores.length}`);
    errores.forEach((e) => console.log(`   ${e}`));
    if (res.status() !== 200 || desborde || errores.length) fallas++;
    await ctx.close();
  }
  await browser.close();
  server.close();
  console.log(`Capturas en ${salida}`);
  process.exit(fallas ? 1 : 0);
})();
