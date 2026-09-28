// Uso: node comparar.js <etiqueta A> <etiqueta B>
// Compara píxel a píxel (umbral 0) y estilo por estilo dos juegos de capturas de capturar.js.
// Si hay diferencias, deja un <nombre>.diff.png en la carpeta de B y termina con código 1.
const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch");

const [a, b] = process.argv.slice(2);
if (!a || !b) {
  console.error("Uso: node comparar.js <etiqueta A> <etiqueta B>");
  process.exit(1);
}
const dirA = path.join(__dirname, "capturas", a);
const dirB = path.join(__dirname, "capturas", b);
let hayDiferencias = false;

for (const archivo of fs.readdirSync(dirA).filter((x) => x.endsWith(".png") && !x.endsWith(".diff.png"))) {
  const ia = PNG.sync.read(fs.readFileSync(path.join(dirA, archivo)));
  const ib = PNG.sync.read(fs.readFileSync(path.join(dirB, archivo)));
  if (ia.width !== ib.width || ia.height !== ib.height) {
    console.log(`${archivo}: tamaño distinto ${ia.width}x${ia.height} vs ${ib.width}x${ib.height}`);
    hayDiferencias = true;
    continue;
  }
  const diff = new PNG({ width: ia.width, height: ia.height });
  const pixeles = pixelmatch(ia.data, ib.data, diff.data, ia.width, ia.height, { threshold: 0 });
  if (pixeles) fs.writeFileSync(path.join(dirB, archivo.replace(".png", ".diff.png")), PNG.sync.write(diff));

  const estilosA = fs.readFileSync(path.join(dirA, archivo.replace(".png", ".styles.txt")), "utf8").split("\n");
  const estilosB = fs.readFileSync(path.join(dirB, archivo.replace(".png", ".styles.txt")), "utf8").split("\n");
  const distintos = [];
  for (let i = 0; i < Math.max(estilosA.length, estilosB.length); i++) if (estilosA[i] !== estilosB[i]) distintos.push(i);

  console.log(`${archivo}: ${pixeles} px distintos · ${distintos.length} elementos con estilo distinto`);
  for (const i of distintos.slice(0, 3)) {
    const pa = (estilosA[i] || "").split("|");
    const pb = (estilosB[i] || "").split("|");
    const cambios = pa.map((x, k) => (x !== pb[k] ? `${x} → ${pb[k]}` : null)).filter(Boolean);
    console.log("   ", (estilosA[i] || "").split(" ")[0], cambios.join(" ; "));
  }
  if (pixeles || distintos.length) hayDiferencias = true;
}

console.log(hayDiferencias ? "RESULTADO: HAY DIFERENCIAS" : "RESULTADO: IDÉNTICO");
process.exit(hayDiferencias ? 1 : 0);
