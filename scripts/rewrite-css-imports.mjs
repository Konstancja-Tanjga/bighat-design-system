/**
 * `import './Button.css'` no longer resolves: the stylesheets live in
 * @bighat/css now, and each component's CSS is no longer its own concern.
 *
 * Deliberately not rewritten to a per-component path
 * (`@bighat/css/components/Button.css`). That would keep the one-to-one
 * coupling and make it possible for the two libraries to import different
 * subsets of the same stylesheet — which is exactly the drift the shared
 * package exists to prevent. One import, at the entry point, in both libraries.
 *
 *   node scripts/rewrite-css-imports.mjs src --dry
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SRC = resolve(process.argv[2] ?? 'src');
const DRY = process.argv.includes('--dry');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.endsWith('.tsx') || e.name.endsWith('.ts') ? [p] : [];
  });
}

let removed = 0;
const files = [];

for (const file of walk(SRC)) {
  const source = readFileSync(file, 'utf8');
  // Drop the local stylesheet import and the blank line it left behind.
  const next = source.replace(/^import '\.\/[A-Za-z]+\.css';\n\n?/gm, '');
  if (next === source) continue;
  removed += 1;
  files.push(file.slice(SRC.length + 1));
  if (!DRY) writeFileSync(file, next);
}

console.log(`${DRY ? 'Would remove' : 'Removed'} ${removed} local stylesheet imports.`);
console.log(files.map((f) => `  ${f}`).join('\n'));
console.log(
  `\nsrc/index.ts now carries the single import for the whole library:\n` +
    `  import '@bighat/css';`,
);
