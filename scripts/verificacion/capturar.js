// Uso: node capturar.js <carpeta out> <etiqueta>
// Captura de página completa y volcado de estilos computados de /, /agenda y /privacidad a 1440 y 390 px.
// Resultado en capturas/<etiqueta>/.
const path = require("path");
const fs = require("fs");
const { servir, abrirNavegador, contextoAislado, SIN_ANIMACIONES, recorrer } = require("./comun");

const [outDir, etiqueta] = process.argv.slice(2);
if (!outDir || !etiqueta) {
  console.error("Uso: node capturar.js <carpeta out> <etiqueta>");
  process.exit(1);
}

const PORT = 4173;
const PAGINAS = ["/", "/agenda", "/privacidad"];
const ANCHOS = [1440, 390];
const PROPIEDADES = [
  "color", "background-color", "background-image", "border-top-color", "border-top-width",
  "border-radius", "box-shadow", "font-family", "font-size", "font-weight", "line-height",
  "letter-spacing", "padding-top", "padding-right", "padding-bottom", "padding-left",
  "margin-top", "margin-bottom", "gap", "max-width", "width", "height", "opacity", "text-shadow", "filter",
];

(async () => {
  const destino = path.join(__dirname, "capturas", etiqueta);
  fs.mkdirSync(destino, { recursive: true });
  const server = await servir(path.resolve(outDir), PORT);
  const browser = await abrirNavegador();

  for (const width of ANCHOS) {
    const ctx = await contextoAislado(browser, PORT, { viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    for (const ruta of PAGINAS) {
      await page.goto(`http://localhost:${PORT}${ruta}`, { waitUntil: "networkidle" });
      await page.addStyleTag({ content: SIN_ANIMACIONES });
      const alto = await recorrer(page);
      const nombre = `${ruta === "/" ? "home" : ruta.slice(1)}-${width}`;
      await page.screenshot({ path: path.join(destino, `${nombre}.png`), fullPage: true });
      const estilos = await page.evaluate((props) => {
        const filas = [];
        document.querySelectorAll("body *").forEach((el, i) => {
          const cs = getComputedStyle(el);
          filas.push(`${el.tagName}#${i} ` + props.map((k) => `${k}:${cs.getPropertyValue(k)}`).join("|"));
        });
        return filas.join("\n");
      }, PROPIEDADES);
      fs.writeFileSync(path.join(destino, `${nombre}.styles.txt`), estilos);
      console.log("ok", nombre, `${alto}px`);
    }
    await ctx.close();
  }

  await browser.close();
  server.close();
})();
