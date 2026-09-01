import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { breakpoint } from './primitives';

/**
 * The second gate, built like the first.
 *
 * CSS cannot read a custom property inside a container or media query, so a
 * breakpoint has to exist twice: once in `primitives.ts`, once as a literal
 * in a stylesheet. That duplication is unavoidable — silent drift between the
 * two is not.
 *
 * This walks every stylesheet the library ships, pulls out every width
 * threshold in every `@container` and `@media` query, and asserts each one is
 * a value the token layer actually declares. A component that invents its own
 * 720px turns the build red, which is the only way a token stays the source of
 * truth for something CSS refuses to interpolate.
 */
const SRC = resolve(import.meta.dirname, '..');

function stylesheets(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return stylesheets(path);
    // tokens.css is generated and declares the values rather than querying them.
    if (entry.name === 'tokens.css') return [];
    return entry.name.endsWith('.css') ? [path] : [];
  });
}

/** Every `(min-width: 480px)` / `(width < 900px)` threshold in a file. */
function thresholds(css: string): string[] {
  const queries = css.match(/@(?:container|media)[^{]+/g) ?? [];
  return queries.flatMap((query) => query.match(/\d+(?:\.\d+)?px/g) ?? []);
}

const allowed = new Set<string>(Object.values(breakpoint));
const files = stylesheets(SRC);

describe('breakpoints come from the token layer', () => {
  it('finds stylesheets to check', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files.map((file) => [file.slice(SRC.length + 1), file]))(
    '%s uses only declared breakpoints',
    (_name, file) => {
      const found = thresholds(readFileSync(file, 'utf8'));
      const undeclared = found.filter((value) => !allowed.has(value));

      expect(
        undeclared,
        `${undeclared.join(', ')} is not in \`breakpoint\` — add it to primitives.ts or use ${[
          ...allowed,
        ].join(' / ')}`,
      ).toEqual([]);
    },
  );
});

describe('breakpoint scale', () => {
  it('is ordered', () => {
    const px = Object.values(breakpoint).map((v) => Number.parseInt(v, 10));
    expect(px).toEqual([...px].sort((a, b) => a - b));
  });

  it('is expressed in px, because container queries cannot use rem reliably', () => {
    for (const value of Object.values(breakpoint)) {
      expect(value).toMatch(/^\d+px$/);
    }
  });
});
