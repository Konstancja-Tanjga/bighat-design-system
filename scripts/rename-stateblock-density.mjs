/**
 * StateBlock's `density` becomes `scope`. The last parity failure, and a real one.
 *
 * `density` meant `comfortable | compact` in Table and DescriptionList — row
 * spacing — and `inline | section | page` in StateBlock, which is how much of
 * the viewport a block claims. Two unrelated concepts under one name, and the
 * one that had to move is the odd one out.
 *
 * Deprecation rather than a rename: `density` keeps working for the whole 4.x
 * line, warns once per prop in development, and is removed in 5.0. That is the
 * same path `variant="danger"` took, and the reason MIGRATION.md is readable
 * three years later.
 *
 *   node scripts/rename-stateblock-density.mjs --dry
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SRC = resolve(process.argv[2] ?? 'src');
const DRY = process.argv.includes('--dry');

const file = resolve(SRC, 'components/StateBlock/StateBlock.tsx');
const source = readFileSync(file, 'utf8');

const propType = `  /**
   * \`section\` fills a panel, \`page\` fills a route, \`inline\` sits inside a
   * table body or a card without imposing its own vertical rhythm.
   */
  scope?: StateBlockScope;
  /**
   * @deprecated Renamed to \`scope\` in 4.0, removed in 5.0. \`density\` now means
   * row spacing everywhere else in the system (Table, DescriptionList), and one
   * name for two unrelated concepts is how a vocabulary stops being one.
   */
  density?: StateBlockScope;`;

const replacements = [
  [
    `  /**
   * \`section\` fills a panel, \`page\` fills a route, \`inline\` sits inside a
   * table body or a card without imposing its own vertical rhythm.
   */
  density?: 'inline' | 'section' | 'page';`,
    propType,
  ],
  [
    `  density = 'section',
  diagnostics,
}: StateBlockProps) {`,
    `  scope,
  density,
  diagnostics,
}: StateBlockProps) {
  if (import.meta.env?.DEV && density !== undefined) {
    console.warn(
      '[bighat] StateBlock: the density prop is deprecated and removed in 5.0. Use scope.',
    );
  }
  const resolvedScope = scope ?? density ?? 'section';`,
  ],
  [
    'bh-stateblock--${density}',
    'bh-stateblock--${resolvedScope}',
  ],
];

let next = source;
const applied = [];

for (const [from, to] of replacements) {
  if (!next.includes(from)) {
    console.error(`Could not find:\n${from}\n\nThe source has moved; apply this one by hand.`);
    process.exit(1);
  }
  next = next.replace(from, to);
  applied.push(from.split('\n')[0].trim().slice(0, 60));
}

console.log(`components/StateBlock/StateBlock.tsx\n${applied.map((a) => `  ${a}…`).join('\n')}`);
console.log(
  `\nAlso needed, and deliberately not automated:\n` +
    `  - import { StateBlockScope } from '../../tokens/vocabulary'\n` +
    `  - StateBlock.mdx: rename the Densities section to Scope, keep the anchor\n` +
    `  - MIGRATION.md: one row, matching the variant="danger" entry\n`,
);

if (!DRY) writeFileSync(file, next);
console.log(DRY ? 'Dry run.' : 'Applied.');
