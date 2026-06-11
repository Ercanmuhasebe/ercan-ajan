const fs = require("node:fs");
const path = require("node:path");

const projectDirectory = path.resolve(__dirname, "..");
const outputDirectory = path.join(projectDirectory, "www");
const files = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.webmanifest",
  "sw.js",
];

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });

for (const file of files) {
  fs.copyFileSync(
    path.join(projectDirectory, file),
    path.join(outputDirectory, file)
  );
}

fs.cpSync(
  path.join(projectDirectory, "assets"),
  path.join(outputDirectory, "assets"),
  { recursive: true }
);

console.log("Android web paketi www klasorunde hazirlandi.");
