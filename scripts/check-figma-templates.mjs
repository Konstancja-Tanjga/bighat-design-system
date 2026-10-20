/**
 * Runs every Code Connect template under figma/ against a stub of the `figma`
 * runtime, and fails if any run throws or returns no example.
 *
 * `figma connect parse` only parses the files. A template that references an
 * undefined variable parses fine and then renders an empty snippet in Dev Mode,
 * which is how Card shipped broken in #102. This runs the code instead.
 *
 * Each template runs once with the first option of every property, then once
 * per remaining option of each property with the others left at their first,
 * so every branch a single property opens is taken. Nested connected instances
 * are stubbed with two children, so code that maps over them runs too.
 *
 * It does not check property names against the Figma file: the stub answers
 * any name. Templates must be plain JavaScript; TypeScript syntax fails here.
 * Inspect a changed component in Dev Mode after publishing.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';

const DIR = fileURLToPath(new URL('../figma/', import.meta.url));
const files = readdirSync(DIR, { recursive: true })
  .filter((file) => String(file).endsWith('.figma.ts'))
  .map((file) => join(DIR, String(file)));

const code = (strings, ...values) => ({ strings: [...strings], values });

// Every property read is recorded as name -> number of options it offers.
function run(source, file, choices, seen) {
  const option = (name, count) => {
    seen.set(name, Math.max(seen.get(name) ?? 0, count));
    return Math.min(choices.get(name) ?? 0, count - 1);
  };
  const child = (id) => ({
    type: 'INSTANCE',
    codeConnectId: () => id,
    executeTemplate: () => ({ example: code`<Child />`, metadata: { props: {} } }),
  });
  const instance = {
    getString: (name) => `${name} text`,
    getBoolean: (name, map) => {
      const on = option(name, 2) === 1;
      return map ? map[on ? 'true' : 'false'] : on;
    },
    getEnum: (name, map) => {
      const keys = Object.keys(map);
      return map[keys[option(name, keys.length)]];
    },
    getInstanceSwap: (name) => (option(name, 2) === 1 ? null : child('icon')),
    findConnectedInstances: (predicate) =>
      ['accordion-item', 'list-item', 'tab'].map(child).filter((node) => predicate(node)),
    findInstance: () => child('instance'),
    findText: () => ({ type: 'TEXT', textContent: 'Text' }),
  };
  const context = { figma: { selectedInstance: instance, code }, module: {}, console };
  runInNewContext(source, context, { filename: file });
  if (!context.module.exports?.example) throw new Error('no example exported');
}

const failures = [];
for (const file of files) {
  const source = readFileSync(file, 'utf8')
    .replace(/^import figma from ['"]figma['"];?$/m, '')
    .replace(/^export default\b/m, 'module.exports =');
  const seen = new Map();
  try {
    run(source, file, new Map(), seen);
    for (const [name, count] of [...seen]) {
      for (let index = 1; index < count; index += 1) {
        try {
          run(source, file, new Map([[name, index]]), seen);
        } catch (error) {
          throw new Error(`with ${name} = option ${index + 1}: ${error.message}`);
        }
      }
    }
  } catch (error) {
    failures.push(`${file.slice(DIR.length)}: ${error.message}`);
  }
}

if (failures.length) {
  console.error(`${failures.length} Code Connect template(s) fail:\n${failures.join('\n')}`);
  process.exit(1);
}
console.log(`${files.length} Code Connect templates run without errors.`);
