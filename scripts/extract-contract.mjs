/**
 * Fills `anatomy`, `states`, `aria`, `keyboard` and `tokensUsed` by reading the
 * implementation, rather than by asking someone to write down what the code
 * already says.
 *
 * The reason this is a script and not a writing task: all five fields are
 * *already recorded* in 3.2.0 — just in a form only a React developer can
 * read. The class names are in the JSX, the elements are in the JSX, the ARIA
 * attributes are in the JSX, the states are the `:hover` / `--disabled` /
 * `[aria-invalid]` selectors in the stylesheet, the tokens are the `var()`
 * calls. Retyping them by hand would introduce errors the code does not have.
 *
 * What it cannot extract, and does not pretend to:
 *
 *   aria.announcements   live-region *policy* — why loading is polite and
 *                        error is assertive. The code shows which role is
 *                        used, never why, and the why is the part a second
 *                        implementer needs.
 *   aria.labelling       whether a label is required or merely supported.
 *   aria.focus           where focus goes on close, and what was wrong with
 *                        the obvious answer.
 *   content              copy rules.
 *   notFor               already present from components.json.
 *
 * Those stay `null` and the validator keeps counting them down. An extracted
 * contract is a first draft that is correct about facts and silent about
 * intent — which is the right split, because intent is the thing worth a
 * human's time.
 *
 *   node scripts/extract-contract.mjs <ui-react/src> <css/src> [Name…]
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const [reactSrc, cssSrc, ...only] = process.argv.slice(2);
const REACT = resolve(reactSrc);
const CSS = resolve(cssSrc);
const SPECS = resolve(import.meta.dirname, '../spec/components');

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/* ── anatomy: every bh-* class in the JSX, with the element it sits on ─────── */

/**
 * Matches `<tag ... className="bh-x__y ...">`, including multi-line and
 * template-literal class expressions. Order of appearance is the DOM order,
 * which is what `anatomy` is for.
 */
function anatomy(source) {
  const parts = [];
  const seen = new Set();
  const elements = [...source.matchAll(/<([a-z][a-zA-Z0-9]*)\s([^>]*?)\/?>/gs)];

  for (const [, tag, attributes] of elements) {
    const classes = [
      ...(attributes.match(/bh-[a-z-]+(?:__[a-z-]+)?(?:--[a-z-]+)?/g) ?? []),
    ].filter((c) => !c.includes('--')); // modifiers are states, not parts

    for (const part of classes) {
      if (part === 'bh-focusable' || part === 'bh-visually-hidden') continue;
      if (seen.has(part)) continue;
      seen.add(part);

      const type = attributes.match(/type="([a-z-]+)"/)?.[1];
      const conditional = /\{[a-zA-Z]+ &&|\?/.test(attributes) || false;
      parts.push({
        part,
        element: type ? `${tag}[type=${type}]` : tag,
        ...(conditional ? { required: false } : {}),
      });
    }
  }
  return parts.length ? parts : null;
}

/* ── aria: role and every aria-* the component sets ────────────────────────── */

/**
 * The implicit ARIA role of a native element. A component that renders a
 * <table> has role="table" whether or not anyone typed it — and recording
 * `null` there would tell an Angular implementer to invent one, which is how a
 * div-with-role reimplementation of a working table gets written.
 */
const IMPLICIT_ROLE = {
  table: 'table',
  thead: 'rowgroup',
  ul: 'list',
  ol: 'list',
  li: 'listitem',
  nav: 'navigation',
  header: 'banner (in a landmark context)',
  footer: 'contentinfo (in a landmark context)',
  main: 'main',
  aside: 'complementary',
  dialog: 'dialog',
  dl: 'none — a description list has no role, its dt/dd pairs carry the structure',
  hr: 'separator',
  progress: 'progressbar',
  select: 'combobox',
  textarea: 'textbox',
  a: 'link',
  button: 'button',
  'input[type=checkbox]': 'checkbox',
  'input[type=radio]': 'radio',
  'input[type=text]': 'textbox',
  'input[type=search]': 'searchbox',
  'input[type=range]': 'slider',
  'input[type=date]': 'none — native date inputs expose no stable role',
  details: 'group',
  summary: 'button',
  img: 'img',
  hgroup: 'group',
};

function aria(source, parts) {
  const implicit = (() => {
    for (const { element } of parts ?? []) {
      const role = IMPLICIT_ROLE[element] ?? IMPLICIT_ROLE[element.split('[')[0]];
      if (role) return `${role} (implicit, from <${element}>)`;
    }
    return null;
  })();

  const role =
    source.match(/\brole="([a-z]+)"/)?.[1] ??
    // A bound role means the component varies it; report the map, not a value.
    (source.match(/role=\{([^}]+)\}/) ? 'varies — see announcements' : implicit);

  const attributes = {};
  for (const [, name, value] of source.matchAll(/(aria-[a-z]+)=\{?([^\s}>]+)\}?/g)) {
    if (attributes[name]) continue;
    attributes[name] = value.replace(/["']/g, '').replace(/\s*\|\|\s*undefined/, '');
  }

  // Every WCAG criterion cited in a comment in the source. These were written
  // deliberately and are worth more than a guess from the role.
  const wcag = [...new Set([...source.matchAll(/WCAG\s+(\d\.\d\.\d+)/g)].map((m) => m[1]))];

  return { role, attributes, wcag };
}

/* ── keyboard: every key the component handles explicitly ──────────────────── */

const NATIVE = {
  button: { Enter: 'Activates. Native.', Space: 'Activates on keyup. Native.' },
  'input[type=checkbox]': { Space: 'Toggles. Native.' },
  'input[type=radio]': {
    'Arrow keys': 'Moves between options in the group. Native.',
    Space: 'Selects. Native.',
  },
  select: { 'Arrow keys': 'Moves between options. Native.', Enter: 'Commits. Native.' },
  dialog: { Escape: 'Closes. Native to <dialog>, cancellable.' },
  a: { Enter: 'Follows the link. Native.' },
};

function keyboard(source, parts) {
  const found = {};

  // Explicit handlers.
  for (const [, key] of source.matchAll(/key === '([A-Za-z]+)'/g)) found[key] = 'TODO';
  for (const [, key] of source.matchAll(/case '([A-Za-z]+)':/g)) found[key] = 'TODO';
  if (/ArrowDown|ArrowUp/.test(source) && !found.ArrowDown) {
    found['Arrow keys'] = 'TODO';
  }

  // What the platform gives for free, from the elements the component renders.
  for (const { element } of parts ?? []) {
    for (const [key, description] of Object.entries(NATIVE[element] ?? {})) {
      found[key] ??= description;
    }
  }

  return Object.keys(found).length ? found : null;
}

/* ── states: the modifiers and pseudo-classes the stylesheet actually has ──── */

const STATE_PATTERNS = [
  [/:hover/, 'hover'],
  [/:focus-visible/, 'focus-visible'],
  [/:active(?!\w)/, 'active'],
  [/--selected|\[aria-selected|\[aria-current/, 'selected'],
  [/:disabled|--disabled|\[aria-disabled/, 'disabled'],
  [/\[readonly\]|--readonly/, 'readonly'],
  [/--loading|\[aria-busy/, 'loading'],
  [/\[aria-invalid|--invalid|--error/, 'invalid'],
  [/--empty/, 'empty'],
  [/:indeterminate|--indeterminate/, 'indeterminate'],
];

function states(css) {
  const found = ['default'];
  for (const [pattern, state] of STATE_PATTERNS) if (pattern.test(css)) found.push(state);
  return found;
}

/* ── tokensUsed: every var(--bh-…) in the stylesheet, as a token path ──────── */

function tokensUsed(css) {
  const paths = new Set();
  for (const [, name] of css.matchAll(/var\(--bh-([a-z0-9-]+)/g)) {
    // --bh-action-primary-bg-hover → action.primary.bgHover
    const segments = name.split('-');
    const head = segments[0];
    const rest = segments.slice(1);
    const path =
      rest.length > 1 && ['action', 'status'].includes(head)
        ? `${head}.${rest[0]}.${rest.slice(1).reduce((a, s, i) => (i ? a + s[0].toUpperCase() + s.slice(1) : s), '')}`
        : `${head}.${rest.reduce((a, s, i) => (i ? a + s[0].toUpperCase() + s.slice(1) : s), '')}`;
    paths.add(path);
  }
  return [...paths].sort();
}

/* ── run ──────────────────────────────────────────────────────────────────── */

const specs = readdirSync(SPECS).filter((f) => f.endsWith('.json'));
const summary = [];

for (const file of specs) {
  const path = resolve(SPECS, file);
  const spec = JSON.parse(readFileSync(path, 'utf8'));
  if (only.length && !only.includes(spec.name)) continue;

  const tsx = resolve(REACT, `components/${spec.name}/${spec.name}.tsx`);
  const css = resolve(CSS, `components/${spec.name}.css`);
  if (!existsSync(tsx)) {
    summary.push([spec.name, 'no source found']);
    continue;
  }

  const source = readFileSync(tsx, 'utf8');
  const stylesheet = existsSync(css) ? readFileSync(css, 'utf8') : '';

  const filled = [];
  const extractedAnatomy = anatomy(source);
  if (extractedAnatomy && spec.anatomy?.[0]?.element === 'TODO') {
    spec.anatomy = extractedAnatomy;
    filled.push(`anatomy (${extractedAnatomy.length} parts)`);
  }

  const extractedAria = aria(source, extractedAnatomy ?? spec.anatomy);
  if (extractedAria.role && spec.aria?.role === 'TODO') {
    spec.aria = {
      role: extractedAria.role,
      ...(Object.keys(extractedAria.attributes).length
        ? { attributes: extractedAria.attributes }
        : {}),
      labelling: null,
      focus: null,
      announcements: null,
      ...(extractedAria.wcag.length ? { wcag: extractedAria.wcag } : {}),
    };
    filled.push('aria.role + attributes');
  }

  const extractedKeyboard = keyboard(source, spec.anatomy);
  if (extractedKeyboard && !Object.keys(spec.keyboard ?? {}).length) {
    spec.keyboard = extractedKeyboard;
    const todo = Object.values(extractedKeyboard).filter((v) => v === 'TODO').length;
    filled.push(`keyboard (${Object.keys(extractedKeyboard).length} keys${todo ? `, ${todo} need describing` : ''})`);
  }

  /**
   * Whether the component can be focused or acted on at all. Badge, Divider,
   * Skeleton and Avatar cannot, and a one-state contract is correct for them —
   * so the completeness gate has to be able to tell "nobody wrote the states
   * down" apart from "there is one state". Inferred from the stylesheet and
   * the elements, not asserted.
   */
  if (spec.interactive === undefined) {
    const focusable = /:hover|:focus|:active|tabIndex|onClick|onChange|onKeyDown/.test(source);
    const control = (extractedAnatomy ?? []).some(({ element }) =>
      /^(button|a|input|select|textarea|summary|dialog)/.test(element),
    );
    spec.interactive = Boolean(focusable || control);
    filled.push(`interactive: ${spec.interactive}`);
  }

  if (stylesheet && (spec.states ?? []).length < 2) {
    spec.states = states(stylesheet);
    filled.push(`states (${spec.states.length})`);
  }

  if (stylesheet && !spec.tokensUsed?.length) {
    spec.tokensUsed = tokensUsed(stylesheet);
    filled.push(`tokensUsed (${spec.tokensUsed.length})`);
  }

  if (filled.length) {
    writeFileSync(path, JSON.stringify(spec, null, 2) + '\n');
    summary.push([spec.name, filled.join(', ')]);
  }
}

console.log(`Extracted from ${summary.length} component${summary.length === 1 ? '' : 's'}:\n`);
for (const [name, what] of summary) console.log(`  ${name.padEnd(18)} ${what}`);
console.log(
  `\nStill null in every one of them, because the source does not contain it:\n` +
    `  aria.labelling     is a label required, or merely supported\n` +
    `  aria.focus         where focus goes, and why the obvious answer is wrong\n` +
    `  aria.announcements the live-region policy, not the role it produced\n` +
    `  content            copy rules\n` +
    `and any keyboard entry marked TODO — the key is handled, the intent is not\n` +
    `in the code. Those are the parts worth a human's time; the rest was\n` +
    `already written down, just not anywhere a second implementer could read.`,
);
