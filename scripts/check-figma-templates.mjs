/**
 * Runs every Code Connect template in figma/ against a stub of the `figma`
 * runtime, once with the first and once with the second option of every
 * property, and fails if any template throws or returns no example.
 *
 * `figma connect parse` only parses the files. A template that references an
 * undefined variable parses fine and then renders an empty snippet in Dev Mode,
 * which is how Card shipped broken in #102. This runs the code instead.
 *
 * It does not check property names against the Figma file: the stub answers
 * any name. Inspect a changed component in Dev Mode after publishing.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';

const DIR = 'figma';
const files = [
  ...readdirSync(DIR)
    .filter((f) => f.endsWith('.figma.ts'))
    .map((f) => join(DIR, f)),
  ...readdirSync(join(DIR, 'icons'))
    .filter((f) => f.endsWith('.figma.ts'))
    .map((f) => join(DIR, 'icons', f)),
];

const code = (strings, ...values) => ({ strings: [...strings], values });
const failures = [];

for (const file of files) {
  const source = readFileSync(file, 'utf8')
    .replace(/^import figma from 'figma';?/m, '')
    .replace(/export default/, 'module.exports =');
  for (const pick of [0, 1]) {
    const instance = {
      getString: (name) => `${name} text`,
      getBoolean: (_name, map) => (map ? map[pick ? 'true' : 'false'] : Boolean(pick)),
      getEnum: (_name, map) => {
        const keys = Object.keys(map);
        return map[keys[pick % keys.length]];
      },
      getInstanceSwap: () => ({
        type: 'INSTANCE',
        executeTemplate: () => ({ example: code`<Icon />`, metadata: {} }),
      }),
      findConnectedInstances: () => [],
      findInstance: () => ({ type: 'ERROR' }),
      findText: () => ({ type: 'ERROR', textContent: '' }),
    };
    const context = { figma: { selectedInstance: instance, code }, module: {} };
    try {
      runInNewContext(source, context, { filename: file });
      if (!context.module.exports?.example) throw new Error('no example exported');
    } catch (error) {
      failures.push(`${file}: ${error.message}`);
      break;
    }
  }
}

if (failures.length) {
  console.error(`${failures.length} Code Connect template(s) fail:\n${failures.join('\n')}`);
  process.exit(1);
}
console.log(`${files.length} Code Connect templates run without errors.`);
