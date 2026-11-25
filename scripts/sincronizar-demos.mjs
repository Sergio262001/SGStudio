// Copia las demos desde el repositorio del portafolio (carpeta portfolio-proyectos, junto a SGStudio)
// hacia public/demos, que es lo que la web muestra.
// Uso: npm run demos
// Después de cambiar algo: git add . && git commit -m "..." && git push && npm run deploy
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const aqui = dirname(fileURLToPath(import.meta.url));
const origen = resolve(aqui, "../../portfolio-proyectos");
const destino = resolve(aqui, "../public/demos");

const demos = [
  { carpeta: "ux-01-constructor-formularios/app", salida: "ux-01" }, // Formix
  { carpeta: "ux-02-panel-escenarios/app", salida: "ux-02" }, // Escenaria
  { carpeta: "devops-01-plataforma-entrega/simulador", salida: "devops-01" }, // Canary Lab
];

// Se compara sin los saltos de línea de Windows: solo cuenta si cambió el contenido.
const contenido = (buf) => buf.toString("utf8").split("\r").join("");

if (!existsSync(origen)) {
  throw new Error(`No encuentro la carpeta ${origen}. Debe estar junto a SGStudio (C:\\Users\\chech\\portfolio-proyectos).`);
}

let copiados = 0;
for (const { carpeta, salida } of demos) {
  const src = join(origen, carpeta);
  if (!existsSync(src)) throw new Error(`No encuentro ${src}`);
  const dst = join(destino, salida);

  const archivos = [
    ...["index.html", "styles.css", "site.css"].filter((f) => existsSync(join(src, f))),
    ...readdirSync(join(src, "src"))
      .filter((f) => f.endsWith(".js"))
      .map((f) => join("src", f)),
  ];

  for (const rel of archivos) {
    const nuevo = readFileSync(join(src, rel));
    const ruta = join(dst, rel);
    if (existsSync(ruta) && contenido(readFileSync(ruta)) === contenido(nuevo)) continue;
    mkdirSync(dirname(ruta), { recursive: true });
    writeFileSync(ruta, nuevo);
    copiados++;
    console.log(`  actualizado: public/demos/${salida}/${rel.split("\\").join("/")}`);
  }
}

console.log(copiados ? `${copiados} archivo(s) copiados desde el portafolio.` : "Las demos ya estaban al día.");
