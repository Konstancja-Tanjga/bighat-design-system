/**
 * Every component has a story, an MDX file, and no unfinished scaffolding.
 *
 * Three separate assertions, and the third is why this exists. Scaffolded docs
 * are useful — they carry the anatomy, props, states and keyboard map straight
 * off the contract, so nobody retypes them and nobody gets them wrong. But a
 * scaffold reads as documentation, and the moment it ships the prose that only
 * a person can write stops being anybody's job.
 *
 * So the TODO markers are load-bearing: the build stays red until they are
 * gone. That is a deliberate choice to have a visibly incomplete library rather
 * than an invisibly incomplete one.
 *
 *   node scripts/check-docs.mjs src
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const SRC = resolve(process.argv[2] ?? 'src');
const COMPONENTS = resolve(SRC, 'components');

const problems = [];
const scaffolded = [];

for (const name of readdirSync(COMPONENTS).sort()) {
  const dir = resolve(COMPONENTS, name);
  const story = resolve(dir, `${name}.stories.tsx`);
  const doc = resolve(dir, `${name}.mdx`);

  if (!existsSync(story)) problems.push(`${name} has no stories`);
  if (!existsSync(doc)) problems.push(`${name} has no .mdx`);

  for (const [label, path] of [
    ['stories', story],
    ['mdx', doc],
  ]) {
    if (!existsSync(path)) continue;
    const source = readFileSync(path, 'utf8');
    const todos = (source.match(/TODO/g) ?? []).length;
    if (todos) scaffolded.push(`${name} ${label}: ${todos} TODO${todos === 1 ? '' : 's'}`);
  }
}

const total = readdirSync(COMPONENTS).length;
console.log(`${total} components. ${total - new Set(scaffolded.map((s) => s.split(' ')[0])).size} documented.\n`);

if (scaffolded.length) {
  console.log('Scaffolded, awaiting prose:\n');
  for (const entry of scaffolded) console.log(`  ${entry}`);
  console.log(
    `\nWhat is missing in each is the same three things, and none of them are\n` +
      `derivable from the source:\n` +
      `  - when to use it, and what to use instead\n` +
      `  - why the boundary sits where it does\n` +
      `  - one do and one don't, each with its reason\n`,
  );
}

if (problems.length) {
  console.error(`${problems.length} missing:\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

if (scaffolded.length) {
  console.error(
    `Build is red on ${scaffolded.length} scaffolded file${scaffolded.length === 1 ? '' : 's'}. ` +
      `That is intentional:\nan invisibly incomplete library is worse than a visibly incomplete one.`,
  );
  process.exit(1);
}

console.log('Every component has a story and a finished doc.');
