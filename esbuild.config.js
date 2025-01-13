import fs from "fs";
import path from "path";
import esbuild from "esbuild";

// Ensure `dist` folder exists
const DIST_DIR = path.resolve("dist");
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

// Read, modify, and copy `index.html`
const htmlFile = "index.html";
let htmlContent = fs.readFileSync(htmlFile, "utf8");

// Update paths for styles.css and index.js
htmlContent = htmlContent
  .replace("./dist/styles.css", "./styles.css")
  .replace("./dist/index.js", "./index.js");

// Write the updated `index.html` to `dist`
fs.writeFileSync(path.join(DIST_DIR, htmlFile), htmlContent, "utf8");

// Run esbuild to bundle JavaScript
esbuild
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outdir: "dist",
    platform: "node",
    target: "esnext",
    format: "esm",
    loader: { ".css": "text" },
  })
  .catch(() => process.exit(1));
