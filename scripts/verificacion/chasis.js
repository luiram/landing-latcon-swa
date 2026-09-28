// Uso: node chasis.js <carpeta out>
// Pruebas del chasis (paso 2): desplegables con mouse y teclado, breadcrumb, títulos, footer y menú móvil.
// Deja capturas en capturas/chasis/ y termina con código 1 si alguna comprobación falla.
const path = require("path");
const fs = require("fs");
const { servir, abrirNavegador, contextoAislado, SIN_ANIMACIONES } = require("./comun");

const outDir = process.argv[2];
if (!outDir) {
  console.error("Uso: node chasis.js <carpeta out>");
  process.exit(1);
}

const PORT = 4174;
const URL = `http://localhost:${PORT}`;
const destino = path.join(__dirname, "capturas", "chasis");
let fallas = 0;

function comprobar(descripcion, ok, detalle = "") {
  console.log(`${ok ? "OK   " : "FALLA"} ${descripcion}${detalle ? ` (${detalle})` : ""}`);
  if (!ok) fallas++;
}

(async () => {
  fs.mkdirSync(destino, { recursive: true });
  const server = await servir(path.resolve(outDir), PORT);
  const browser = await abrirNavegador();
  const captura = (page, nombre, opciones = {}) => page.screenshot({ path: path.join(destino, `${nombre}.png`), ...opciones });
  const sinBanner = () => localStorage.setItem("latcon-cookie-consent", JSON.stringify({ analytics: false }));
  const foco = (page) => page.evaluate(() => document.activeElement?.textContent?.trim());

  // ── Escritorio ──
  const ctx = await contextoAislado(browser, PORT, { viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(sinBanner);
  const page = await ctx.newPage();
  await page.goto(`${URL}/`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: SIN_ANIMACIONES });
  await captura(page, "01-header-1440", { clip: { x: 0, y: 0, width: 1440, height: 160 } });

  await page.hover("header button:has-text('Soluciones')");
  await page.waitForTimeout(100);
  comprobar("hover abre Soluciones", (await page.getAttribute("header button:has-text('Soluciones')", "aria-expanded")) === "true");
  await captura(page, "02-soluciones-1440", { clip: { x: 0, y: 0, width: 1440, height: 520 } });
  await page.hover("#menu-soluciones a:has-text('Drones')");
  await page.waitForTimeout(300);
  comprobar("sigue abierto al cruzar al panel", (await page.$("#menu-soluciones")) !== null);
  await page.mouse.move(700, 800);
  await page.waitForTimeout(300);
  comprobar("se cierra al salir con el mouse", (await page.$("#menu-soluciones")) === null);

  await page.hover("header button:has-text('Sectores')");
  await page.waitForTimeout(100);
  await captura(page, "03-sectores-1440", { clip: { x: 0, y: 0, width: 1440, height: 420 } });
  await page.mouse.move(700, 800);
  await page.waitForTimeout(300);

  await page.goto(`${URL}/`, { waitUntil: "networkidle" });
  for (let i = 0; i < 12 && (await foco(page)) !== "Soluciones"; i++) await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  comprobar("Enter abre el desplegable", (await page.evaluate(() => document.activeElement?.getAttribute("aria-expanded"))) === "true");
  await page.keyboard.press("Tab");
  const dentro = await foco(page);
  comprobar("Tab entra al panel", dentro === "Definir qué medir", dentro);
  await page.keyboard.press("Escape");
  comprobar("Esc cierra y devuelve el foco", (await page.$("#menu-soluciones")) === null && (await foco(page)) === "Soluciones");
  await page.click("header button:has-text('Sectores')");
  await page.mouse.click(700, 700);
  comprobar("clic afuera cierra", (await page.$("#menu-sectores")) === null);

  await page.goto(`${URL}/privacidad`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: SIN_ANIMACIONES });
  await captura(page, "04-privacidad-1440", { clip: { x: 0, y: 0, width: 1440, height: 360 } });
  comprobar("título de /privacidad", (await page.title()) === "Política de Privacidad — Latcon", await page.title());
  const altoFooter = await page.evaluate(() => document.querySelector("footer").getBoundingClientRect().height);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(200);
  await captura(page, "05-footer-1440", { clip: { x: 0, y: 900 - Math.ceil(altoFooter), width: 1440, height: Math.ceil(altoFooter) } });

  await page.goto(`${URL}/agenda`, { waitUntil: "networkidle" });
  comprobar("título de /agenda", (await page.title()) === "Agendar conversación — Latcon", await page.title());
  comprobar("lang = es", (await page.evaluate(() => document.documentElement.lang)) === "es");
  const migas = await page.$$eval("nav[aria-label='Ruta de navegación'] li", (l) => l.map((x) => x.textContent.trim()).join(" > "));
  comprobar("breadcrumb de /agenda", migas === "Inicio > Agenda", migas);
  await ctx.close();

  // ── Móvil ──
  const m = await contextoAislado(browser, PORT, { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await m.addInitScript(sinBanner);
  const mp = await m.newPage();
  await mp.goto(`${URL}/`, { waitUntil: "networkidle" });
  await mp.addStyleTag({ content: SIN_ANIMACIONES });
  await mp.tap("header button[aria-controls='menu-movil']");
  await captura(mp, "06-menu-movil-390");
  await mp.tap("#menu-movil button:has-text('Soluciones')");
  await captura(mp, "07-menu-movil-soluciones-390");
  await mp.goto(`${URL}/privacidad`, { waitUntil: "networkidle" });
  comprobar("sin scroll horizontal a 390 px", !(await mp.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)));
  await m.close();

  await browser.close();
  server.close();
  console.log(fallas ? `\n${fallas} comprobaciones fallaron` : "\nTodas las comprobaciones pasaron");
  process.exit(fallas ? 1 : 0);
})();
