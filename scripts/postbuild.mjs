/**
 * Post-build script:
 * 1. Rewrites relative imports in dist/esm/**\/*.js to add .js extension
 *    (required for native Node.js ESM resolution).
 * 2. Writes dist/cjs/package.json to mark that directory as CommonJS.
 */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// ---------------------------------------------------------------------------
// 1. Add .js extensions to relative imports in ESM output
// ---------------------------------------------------------------------------

const ESM_DIR = join(root, "dist", "esm");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.name.endsWith(".js") || entry.name.endsWith(".d.ts")) {
      files.push(full);
    }
  }
  return files;
}

// Match relative imports/exports without an extension
const RELATIVE_IMPORT_RE = /((?:import|export)\s[^'"]*['"])(\.[^'"]+)(?=['"])/g;

function addJsExtension(content) {
  return content.replace(
    /((?:from|import|export\s*\{[^}]*\}\s*from)\s*['"])(\.[^'"]+)(['"])/g,
    (match, prefix, path, suffix) => {
      // Already has an extension — skip
      if (/\.[cm]?js$/.test(path)) return match;
      return `${prefix}${path}.js${suffix}`;
    }
  );
}

const esmFiles = await walk(ESM_DIR);
let rewritten = 0;
for (const file of esmFiles) {
  const original = await readFile(file, "utf8");
  const updated = addJsExtension(original);
  if (updated !== original) {
    await writeFile(file, updated, "utf8");
    rewritten++;
  }
}
console.log(`ESM: rewrote extensions in ${rewritten} files`);

// ---------------------------------------------------------------------------
// 2. Write dist/cjs/package.json to mark as CommonJS
// ---------------------------------------------------------------------------

const cjsPkgPath = join(root, "dist", "cjs", "package.json");
await writeFile(cjsPkgPath, JSON.stringify({ type: "commonjs" }, null, 2) + "\n", "utf8");
console.log("CJS: wrote dist/cjs/package.json");
