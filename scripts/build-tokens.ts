/**
 * Emits `src/styles/tokens.css` from the TypeScript token source.
 *
 * The CSS is generated, never hand-edited, so there is exactly one place a
 * colour can be defined. `npm run tokens:check` re-runs this in CI and fails
 * if the committed file has drifted from the source.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { renderStylesheet } from '../src/tokens/css';

const target = resolve(import.meta.dirname, '../src/styles/tokens.css');
const next = renderStylesheet();

if (process.argv.includes('--check')) {
  const current = (() => {
    try {
      return readFileSync(target, 'utf8');
    } catch {
      return '';
    }
  })();

  if (current !== next) {
    console.error(
      'tokens.css is out of date with src/tokens/*.ts — run `npm run tokens` and commit the result.',
    );
    process.exit(1);
  }
  console.log('tokens.css is in sync.');
} else {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, next);
  console.log(`Wrote ${target}`);
}
