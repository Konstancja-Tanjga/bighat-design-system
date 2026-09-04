/**
 * `tone="default"` → `tone="neutral"` in Button, Menu and Progress.
 *
 * These three were the only components whose tone scale started somewhere other
 * than `neutral`, and Button and Progress disagreed with each other about which
 * values existed at all. Nothing was wrong in any one file.
 *
 * Same deprecation path as `variant="danger"` and `StateBlock density`: the old
 * value keeps working for the whole 4.x line, warns once in development, is
 * recorded in the contract's `removed` field, and becomes a type error in 5.0 —
 * not a silent fallback, which would work until a rebrand and then quietly
 * render the wrong thing.
 *
 *   node scripts/rename-tone-default.mjs src --dry
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SRC = resolve(process.argv[2] ?? 'src');
const DRY = process.argv.includes('--dry');

const targets = [
  {
    file: 'components/Menu/Menu.tsx',
    type: "  tone?: 'default' | 'critical';",
    replacement: `  tone?: MenuItemTone;
  /** @deprecated Use \`tone="neutral"\`. Removed in 5.0. */
  toneLegacy?: never;`,
    importFrom: '../../tokens/vocabulary',
    importName: 'MenuItemTone',
  },
  {
    file: 'components/Progress/Progress.tsx',
    type: "  tone?: 'default' | 'success' | 'critical';",
    replacement: '  tone?: ProgressTone;',
    importFrom: '../../tokens/vocabulary',
    importName: 'ProgressTone',
  },
];

/**
 * The runtime shim. Applied to every component with a tone axis, including
 * Button, whose default was also `default`.
 *
 * A normalising helper rather than three copies: the warning text, the version
 * numbers and the fallback all live in one place, so removing them in 5.0 is
 * deleting one file rather than finding three inlined copies.
 */
const shim = `import type { Tone } from '../tokens/vocabulary';

/**
 * Accepts the 3.x \`tone="default"\` and returns the 4.x \`neutral\`.
 *
 * Deprecated in 4.0, removed in 5.0. When that happens this file is deleted and
 * the three call sites become plain prop reads — which is the point of having
 * one shim rather than three inlined fallbacks.
 */
export function normaliseTone<T extends Tone>(
  tone: T | 'default' | undefined,
  fallback: T,
  component: string,
): T {
  if (tone === 'default') {
    if (import.meta.env?.DEV) {
      console.warn(
        '[bighat] ' + component + ': tone="default" is deprecated and removed in 5.0. Use tone="neutral".',
      );
    }
    return fallback;
  }
  return tone ?? fallback;
}
`;

const shimPath = resolve(SRC, 'tokens/normaliseTone.ts');
if (!DRY) writeFileSync(shimPath, shim);
console.log(`${DRY ? 'Would write' : 'Wrote'} src/tokens/normaliseTone.ts`);

for (const target of targets) {
  const path = resolve(SRC, target.file);
  const source = readFileSync(path, 'utf8');
  if (!source.includes(target.type)) {
    console.error(`  ${target.file}: union already changed, skipping`);
    continue;
  }
  let next = source.replace(target.type, target.replacement);
  next = `import type { ${target.importName} } from '${target.importFrom}';\n\n${next}`;
  if (!DRY) writeFileSync(path, next);
  console.log(`  ${target.file}  →  ${target.importName}`);
}

console.log(
  `\nNot automated, because each needs the component's own default read first:\n` +
    `  wrap the tone prop read in normaliseTone(tone, 'neutral', 'Menu')\n` +
    `  and the same in Progress and Button\n` +
    `\nAlso by hand: templates/Records.tsx uses \`variant\` for a five-value state\n` +
    `enum (ready/loading/empty/no-matches/error). That is not a visual-weight\n` +
    `axis — rename it to \`state\`. A template misusing an axis name teaches the\n` +
    `vocabulary wrongly to everyone who reads it as an example.`,
);
