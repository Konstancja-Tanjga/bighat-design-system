/**
 * Makes every Storybook title equal its export name.
 *
 * 3.2.0 disagreed in twelve places, and two components sat under a `Data/`
 * category that nothing else used. Every one of those is a place where someone
 * searching Storybook for `SegmentedControl` finds nothing, and where a Figma
 * layer called "Segmented Button" maps to a component called something else.
 * That is the FOX mapping problem, reproduced here, and it doubles the moment
 * there are two framework libraries to keep in step.
 *
 * The direction of the fix is deliberate: the *code* name wins. A designer-
 * facing label can live in the MDX heading, where prose belongs; the story
 * title is an identifier, and identifiers should match the thing they name.
 * Where the display name is genuinely the better word, `aliases` in the spec
 * carries it, so search still finds the component under both.
 *
 *   node scripts/rename-stories.mjs --dry
 *   node scripts/rename-stories.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SRC = resolve(process.argv[2] ?? 'src');
const DRY = process.argv.includes('--dry');

/**
 * old title → [new title, alias kept for search]
 *
 * Categories: everything the consumer imports is `Components/`. Templates stay
 * `Templates/`. The `Data/` bucket held two components for no reason a consumer
 * could infer, so it goes.
 */
const renames = new Map([
  ['Components/Function Bar', ['Components/Toolbar', 'Function Bar']],
  ['Components/Scroll Bar', ['Components/ScrollArea', 'Scroll Bar']],
  ['Components/Segmented Button', ['Components/SegmentedControl', 'Segmented Button']],
  ['Components/Toggle switch', ['Components/Switch', 'Toggle switch']],
  ['Components/Radio', ['Components/RadioGroup', 'Radio']],
  ['Components/Tab', ['Components/Tabs', 'Tab']],
  ['Components/Combobox (Autocomplete)', ['Components/Combobox', 'Autocomplete']],
  ['Components/Datepicker', ['Components/DatePicker', null]],
  ['Components/Icon picker', ['Components/IconPicker', null]],
  ['Components/List View', ['Components/ListView', null]],
  ['Components/Status Bar', ['Components/StatusBar', null]],
  ['Components/User Profile', ['Components/UserProfile', null]],
  ['Data/DescriptionList', ['Components/DescriptionList', null]],
  ['Data/Pagination', ['Components/Pagination', null]],
]);

function storyFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return storyFiles(path);
    return entry.name.endsWith('.stories.tsx') || entry.name.endsWith('.stories.ts') ? [path] : [];
  });
}

const files = storyFiles(SRC);
const seen = new Set();
let changed = 0;

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  let next = source;

  for (const [from, [to]] of renames) {
    const pattern = new RegExp(`title:\\s*'${from.replace(/[()]/g, '\\$&')}'`, 'g');
    if (pattern.test(next)) {
      next = next.replace(pattern, `title: '${to}'`);
      console.log(`${file.slice(SRC.length + 1)}\n  '${from}'  →  '${to}'`);
      seen.add(from);
    }
  }

  if (next === source) continue;
  changed += 1;
  if (!DRY) writeFileSync(file, next);
}

const unmatched = [...renames.keys()].filter((from) => !seen.has(from));
if (unmatched.length) {
  console.log(`\nNot found (already renamed, or the title moved):\n  ${unmatched.join('\n  ')}`);
}

/* Anything left under a category that is not one of these is a new drift. */
const categories = new Set(
  files.flatMap((file) => {
    const match = (DRY ? readFileSync(file, 'utf8') : readFileSync(file, 'utf8')).match(
      /title:\s*'([^/']+)\//,
    );
    return match ? [match[1]] : [];
  }),
);
const allowed = new Set(['Components', 'Templates', 'Foundations', 'Patterns', 'Contributing']);
const stray = [...categories].filter((c) => !allowed.has(c));

console.log(
  `\n${DRY ? 'Would update' : 'Updated'} ${changed} file${changed === 1 ? '' : 's'}. ` +
    `Categories in use: ${[...categories].sort().join(', ')}.`,
);
if (stray.length) {
  console.error(`\nUnexpected category: ${stray.join(', ')}. Add it to the IA or fold it in.`);
  process.exit(1);
}
