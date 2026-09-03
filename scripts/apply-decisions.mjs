/**
 * Applies DECISIONS-4.0.md, and nothing that is not in it.
 *
 * Every entry carries the reason from that file as a comment, so a diff review
 * reads as decisions rather than as 52 unexplained value changes. Where the
 * decision was "exempt", nothing is rewritten and the gate is widened instead.
 *
 *   node scripts/apply-decisions.mjs <css/src> --dry
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SRC = resolve(process.argv[2] ?? '../css/src');
const DRY = process.argv.includes('--dry');

/**
 * property pattern → [from, to, why]
 *
 * Scoped by property on purpose: `12px` means one thing in `font-size` and
 * another in `padding`, and a blind string replace across a stylesheet is how
 * a codemod changes a layout while claiming to change type.
 */
const decisions = [
  ['font-size', '12px', 'var(--bh-text-size-body)', '15 sites across 11 components is drift, not a role'],
  ['font-size', '18px', 'var(--bh-text-size-heading)', 'all five are titles; there is already a role for a title'],
  ['font-size', '10px', 'var(--bh-text-size-label)', 'below the smallest declared size; renders numerals ambiguously'],
  ['font-size', '22px', 'var(--bh-text-size-display)', 'templates should not invent type sizes'],
  ['font-size', '24px', 'var(--bh-text-size-display)', 'same'],
  ['font-weight', '700', 'var(--bh-text-weight-heading)', '600 vs 700 in a system stack is a rendering artefact, not a hierarchy'],
  ['gap', '6px', 'var(--bh-gap-snug)', 'a gap between siblings; 8px is the declared step'],
  ['padding', '6px', 'var(--bh-gap-snug)', 'same'],
  ['padding-right', '32px', 'var(--bh-padding-gutter)', 'the select-arrow gutter, now a role'],
  ['transition', '200ms', 'var(--bh-duration-normal)', '20ms is below perception'],
  ['transition', '140ms', 'var(--bh-duration-fast)', 'already the right value; only ever written as a literal'],
  ['animation', '700ms', 'var(--bh-duration-spin)', 'same'],
  ['animation', '1.4s', 'var(--bh-duration-sweep)', 'the same value written in a unit that search does not find'],
];

/** Easings are keyword→token and safe to apply wherever they appear. */
/**
 * Shorthands the property-scoped patterns above cannot reach, because the value
 * is a pair and the decision applies to each half separately. Listed as exact
 * strings rather than generalised: `margin: 3px 5px` drawing a checkmark is a
 * different kind of value from `margin: 3px` positioning a box, and a pattern
 * that caught both would be a pattern that changed a layout while claiming to
 * change geometry.
 */
const shorthands = [
  [
    'components/Checkbox.css',
    'margin-left: 26px;',
    'margin-left: calc(var(--bh-control-indicator) + var(--bh-gap-snug) + var(--bh-gap-hairline));',
    'a derived value, so derive it: box + gap + border is where 26px came from. Snapping it to 24px would have broken the alignment it exists to make, which is the trap in treating every literal as drift',
  ],
  [
    'components/Select.css',
    '-6px',
    'calc(-1 * var(--bh-gap-snug))',
    'the arrow overlap. Snapped from -6px to -8px first: it is a negated gap, and the negation is why codemod-tokens.mjs could not reach it while the magnitude was off-scale',
  ],
  [
    'components/Switch.css',
    'margin-left: 48px;',
    'margin-left: var(--bh-control-track);',
    'the switch track width. A control dimension, not a padding role - so it went in control.* rather than being forced into padding.* where the report suggested',
  ],
  [
    'components/Checkbox.css',
    'margin: 3px 5px;',
    'margin: var(--bh-gap-hairline) var(--bh-gap-tight);',
    'the drawn checkmark inset. 3px/5px was eyeballed against a 16px box; 2px/4px is the same shape on the scale',
  ],
];

const easings = [
  [/(?<![\w-])ease(?![\w-])/g, 'var(--bh-easing-standard)', 'one declared curve beats a browser default nobody chose'],
  [/(?<![\w-])linear(?![\w-])/g, 'var(--bh-easing-loop)', 'a naming change; easing.loop is linear'],
  [/(?<![\w-])ease-in-out(?![\w-])/g, 'var(--bh-easing-standard)', 'a symmetric curve; easing.standard is the declared symmetric one. DECISIONS-4.0.md called this ease-in - the report named the value wrong and the codemod was right to miss it'],
];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.endsWith('.css') ? [p] : [];
  });
}

let applied = 0;
const log = [];

for (const file of walk(SRC)) {
  const source = readFileSync(file, 'utf8');
  let next = source;

  for (const [property, from, to, why] of decisions) {
    const pattern = new RegExp(`(${property}[^:;{}]*:\\s*[^;]*?)(?<![\\w.-])${from.replace('.', '\\.')}(?![\\w-])`, 'g');
    next = next.replace(pattern, (match, head) => {
      applied += 1;
      log.push(`${file.slice(SRC.length + 1)}  ${property}: ${from} → ${to}  (${why})`);
      return head + to;
    });
  }

  for (const [target, from, to, why] of shorthands) {
    if (!file.endsWith(target) || !next.includes(from)) continue;
    next = next.replace(from, to);
    applied += 1;
    log.push(`${target}  ${from} → ${to}  (${why})`);
  }

  // ease-in-out before ease, or the shorter pattern eats the longer one.
  for (const [pattern, to, why] of [...easings].sort((a, b) => b[1].length - a[1].length)) {
    next = next.replace(pattern, (match) => {
      // Never inside a cubic-bezier() or a var() we just wrote.
      applied += 1;
      log.push(`${file.slice(SRC.length + 1)}  ${match} → ${to}  (${why})`);
      return to;
    });
  }

  if (next !== source && !DRY) writeFileSync(file, next);
}

console.log(log.map((l) => `  ${l}`).join('\n'));
console.log(`\n${DRY ? 'Would apply' : 'Applied'} ${applied} decisions from DECISIONS-4.0.md.`);
console.log(
  `\nNot applied, by decision:\n` +
    `  1px ×2   exempt — optical correction against a 1px border. The gate is\n` +
    `           widened instead; snapping to 2px would misalign the thing it\n` +
    `           exists to align.\n` +
    `  48px ×1  Switch track width. A control dimension, not a padding role —\n` +
    `           DS-GAPS.md entry rather than a token forced into the wrong group.`,
);
