/**
 * Generates a story file and an MDX file for a component that has neither,
 * from its contract.
 *
 * Nine components ship with no story and no doc: AppBar, AppShell, Board,
 * Card, Composer, NavList, NavRail, SidePanel, Skeleton — the frame layer.
 * They appear only inside templates, so Storybook shows 32 of 41 and the layer
 * the README describes as half the system is the half nobody can see.
 *
 * What this generates is a *scaffold*, and the distinction matters. Everything
 * it writes is derived from the contract: the anatomy table, the props table,
 * the states list, the keyboard map, the tokens consumed, one story per
 * variant value. What it cannot write is the prose — when to use it, what to
 * use instead, and the do/don't with reasons — because that is a judgement and
 * the contract records only that someone has not made it yet.
 *
 * Each generated file therefore carries explicit TODO markers, and
 * `scripts/check-docs.mjs` fails the build while any remain. A scaffold that
 * quietly passes for documentation is worse than an empty page: the empty page
 * at least does not claim to have answered the question.
 *
 *   node scripts/scaffold-docs.mjs src ../spec/components
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const SRC = resolve(process.argv[2] ?? 'src');
const SPECS = resolve(process.argv[3] ?? '../spec/components');
const DRY = process.argv.includes('--dry');

const specs = readdirSync(SPECS)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(resolve(SPECS, f), 'utf8')));

/**
 * Wraps a bare element name in backticks. MDX 3 parses `<main>` in prose as
 * JSX and then fails the whole index looking for a closing tag, so a contract
 * that names the element it renders would otherwise take Storybook down with
 * it. Already-quoted names are left alone.
 */
const elements = (text) =>
  String(text).replace(/(?<!`)(<[a-z][a-z0-9]*(?:\[[^\]]*\])?>)(?!`)/g, '`$1`');

const variantProp = (spec) =>
  Object.entries(spec.props ?? {}).find(
    ([, prop]) => ['variant', 'enum', 'tone', 'size'].includes(prop.kind) && prop.values?.length,
  );

function stories(spec) {
  const [name, prop] = variantProp(spec) ?? [];
  const required = Object.entries(spec.props ?? {})
    .filter(([, p]) => p.required)
    .map(([n, p]) => `    ${n}: ${p.kind === 'string' ? `'TODO'` : `undefined /* TODO */`},`)
    .join('\n');

  const variants = prop
    ? prop.values
        .map(
          (value) => `
/** TODO: what is this variant for, and when would you reach for it over the others. */
export const ${value[0].toUpperCase()}${value.slice(1).replace(/-(.)/g, (_, c) => c.toUpperCase())}: Story = {
  args: { ${name}: '${value}' },
};`,
        )
        .join('\n')
    : '';

  return `import type { Meta, StoryObj } from '@storybook/react-vite';

import { ${spec.name} } from './${spec.name}';

/**
 * TODO: one paragraph. What this is for, and the decision it encodes.
 *
 * Scaffolded from packages/spec/components/${spec.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof ${spec.name}> = {
  title: 'Components/${spec.name}',
  component: ${spec.name},
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ${spec.name}>;

export const Default: Story = {
  args: {
${required || '    // TODO: a minimal, realistic example. Not lorem ipsum — this is what\n    // most people will copy.'}
  },
};
${variants}
`;
}

function mdx(spec) {
  const table = (rows) => rows.filter(Boolean).join('\n');

  const anatomy = table(
    (spec.anatomy ?? []).map(
      (part) =>
        `| \`${part.part}\` | \`<${part.element}>\` | ${part.required === false ? 'conditional' : 'always'} | ${part.note ?? ''} |`,
    ),
  );

  const props = table(
    Object.entries(spec.props ?? {}).map(
      ([name, prop]) =>
        `| \`${name}\` | ${prop.values ? prop.values.map((v) => `\`${v}\``).join(' · ') : prop.kind} | ${prop.default !== undefined ? `\`${prop.default}\`` : '—'} | ${elements(prop.meaning ?? prop.note ?? 'TODO')} |`,
    ),
  );

  const keyboard = table(
    Object.entries(spec.keyboard ?? {}).map(([key, action]) => `| <kbd>${key}</kbd> | ${action} |`),
  );

  return `import { Canvas, Controls, Meta } from '@storybook/addon-docs/blocks';

import { Do, Dont, Guidance, Heuristic } from '../../docs/Guidance';
import * as ${spec.name}Stories from './${spec.name}.stories';

<Meta of={${spec.name}Stories} />

# ${spec.name}

${spec.purpose}

<Canvas of={${spec.name}Stories.Default} />

## When to use it

| Use \`${spec.name}\` for | Use something else for |
| --- | --- |
| TODO | ${(spec.notFor ?? ['TODO'])[0]} |
${(spec.notFor ?? []).slice(1).map((n) => `| TODO | ${n} |`).join('\n')}

TODO: one paragraph on why the boundary sits where it does. The \`notFor\`
entries above came from the contract; the reason they are the boundary did not.

## Anatomy

| part | element | rendered | note |
| --- | --- | --- | --- |
${anatomy}

## Props

| prop | values | default | meaning |
| --- | --- | --- | --- |
${props}

<Controls />

## States

${(spec.states ?? []).map((s) => `\`${s}\``).join(' · ')}

${keyboard ? `## Keyboard\n\n| key | action |\n| --- | --- |\n${keyboard}\n` : ''}
## Accessibility

- **Role** — ${elements(spec.aria?.role ?? 'TODO')}
- **Labelling** — ${spec.aria?.labelling ?? 'TODO: is a label required, or merely supported?'}
- **Focus** — ${spec.aria?.focus ?? 'TODO: where does focus go, and what is wrong with the obvious answer?'}
- **Announcements** — ${spec.aria?.announcements ?? 'TODO: the live-region policy, not the role it produced.'}
${spec.aria?.wcag?.length ? `- **WCAG** — ${spec.aria.wcag.join(', ')}` : ''}

## Do and don't

<Guidance>
  <Do reason="TODO">TODO</Do>
  <Dont reason="TODO">TODO</Dont>
</Guidance>

## Tokens consumed

${(spec.tokensUsed ?? []).map((t) => `\`${t}\``).join(' · ') || 'TODO'}
`;
}

const generated = [];

for (const spec of specs) {
  const dir = resolve(SRC, `components/${spec.name}`);
  if (!existsSync(dir)) continue;

  const storyPath = resolve(dir, `${spec.name}.stories.tsx`);
  const mdxPath = resolve(dir, `${spec.name}.mdx`);
  const missing = [];

  if (!existsSync(storyPath)) {
    if (!DRY) writeFileSync(storyPath, stories(spec));
    missing.push('stories');
  }
  if (!existsSync(mdxPath)) {
    if (!DRY) writeFileSync(mdxPath, mdx(spec));
    missing.push('mdx');
  }
  if (missing.length) generated.push([spec.name, missing.join(' + ')]);
}

console.log(`${DRY ? 'Would generate' : 'Generated'} for ${generated.length} components:\n`);
for (const [name, what] of generated) console.log(`  ${name.padEnd(12)} ${what}`);
console.log(
  `\nEvery file carries TODO markers. scripts/check-docs.mjs fails the build\n` +
    `while any remain — a scaffold that passes for documentation is worse than\n` +
    `an empty page, because the empty page does not claim to have answered.`,
);
