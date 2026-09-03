/**
 * Replaces each component's local prop union with the shared type.
 *
 * Only rewrites a union that is *identical* to a declared narrowing in
 * `vocabulary.ts` — so `tone?: 'neutral' | 'critical'` becomes
 * `tone?: ButtonTone` in Button and Menu, and a union that does not match any
 * narrowing is reported and left alone.
 *
 * That restriction is the whole safety property: a mismatch means either the
 * component is varying on an axis the system has not declared, or the system
 * is missing a narrowing. Both need a decision, and neither should be resolved
 * by a script picking the closest fit.
 *
 * Local enumerations — `orientation`, `placement`, `granularity`, `axis` — are
 * left inline on purpose. They are not system axes, and hoisting them into the
 * shared vocabulary would make that file the union of every closed set in the
 * library rather than a statement about what the system varies on.
 *
 *   node scripts/apply-vocabulary.mjs src --dry
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SRC = resolve(process.argv[2] ?? 'src');
const DRY = process.argv.includes('--dry');

/** union (normalised, sorted) → shared type name. From vocabulary.ts. */
const NARROWINGS = new Map([
  ["'critical'|'neutral'", 'ButtonTone'],
  ["'critical'|'info'|'neutral'|'success'|'warning'", 'Tone'],
  ["'critical'|'info'|'success'|'warning'", 'ToastTone'],
  ["'critical'|'neutral'|'success'", 'ProgressTone'],
  ["'lg'|'md'|'sm'", 'Size'],
  ["'md'|'sm'", "Extract<Size, 'sm' | 'md'>"],
  ["'ghost'|'primary'|'secondary'", 'Variant'],
  ["'comfortable'|'compact'", 'Density'],
  ["'inline'|'page'|'section'", 'Scope'],
]);

/** Which axis names are allowed to be hoisted at all. */
const AXES = new Set(['tone', 'variant', 'size', 'density', 'scope']);

const normalise = (union) =>
  union
    .split('|')
    .map((s) => s.trim())
    .sort()
    .join('|');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : /^[A-Z]\w+\.tsx$/.test(e.name) ? [p] : [];
  });
}

const rewritten = [];
const unmatched = [];
const localEnums = [];

for (const file of walk(SRC)) {
  const source = readFileSync(file, 'utf8');
  const name = file.split('/').pop().replace('.tsx', '');
  let next = source;
  const used = new Set();

  // Inline unions on a prop: `  tone?: 'a' | 'b';`
  for (const match of source.matchAll(/^(\s{2,})(\w+)(\??):\s*((?:'[a-z-]+'\s*\|\s*)+'[a-z-]+');$/gm)) {
    const [line, indent, prop, optional, union] = match;
    if (!AXES.has(prop)) {
      localEnums.push(`${name}.${prop}`);
      continue;
    }
    const shared = NARROWINGS.get(normalise(union));
    if (!shared) {
      unmatched.push(`${name}.${prop}: ${union}`);
      continue;
    }
    next = next.replace(line, `${indent}${prop}${optional}: ${shared};`);
    used.add(shared.replace(/Extract<(\w+),.*/, '$1'));
  }

  // Standalone type aliases: `export type BadgeTone = 'a' | 'b';`
  for (const match of source.matchAll(
    /^export type (\w+) =\s*((?:'[a-z-]+'\s*\|\s*)+'[a-z-]+');$/gm,
  )) {
    const [line, alias, union] = match;
    const shared = NARROWINGS.get(normalise(union));
    if (!shared || shared === alias) continue;
    // Keep the name the component exports — consumers import it — and point it
    // at the shared type instead of redeclaring the values.
    next = next.replace(line, `export type ${alias} = ${shared};`);
    used.add(shared.replace(/Extract<(\w+),.*/, '$1'));
  }

  if (next === source) continue;

  const imports = [...used].sort().join(', ');
  const depth = file.slice(SRC.length + 1).split('/').length - 1;
  const path = `${'../'.repeat(depth)}tokens/vocabulary`;
  next = `import type { ${imports} } from '${path}';\n\n${next}`;

  rewritten.push(`${name}  →  ${imports}`);
  if (!DRY) writeFileSync(file, next);
}

console.log(`${DRY ? 'Would rewrite' : 'Rewrote'} ${rewritten.length} components:\n`);
console.log(rewritten.map((r) => `  ${r}`).join('\n'));

if (unmatched.length) {
  console.log(
    `\n${unmatched.length} axis prop${unmatched.length === 1 ? '' : 's'} matching no declared narrowing.\n` +
      `Each is either a component varying on an undeclared axis, or a missing\n` +
      `narrowing in vocabulary.ts. Left alone deliberately:\n`,
  );
  console.log(unmatched.map((u) => `  ${u}`).join('\n'));
}

console.log(
  `\n${localEnums.length} local enumeration${localEnums.length === 1 ? '' : 's'} left inline ` +
    `(not system axes): ${localEnums.slice(0, 12).join(', ')}${localEnums.length > 12 ? ` +${localEnums.length - 12}` : ''}`,
);
