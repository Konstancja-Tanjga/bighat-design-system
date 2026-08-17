import { describe, expect, it } from 'vitest';

import { WCAG_AA, contrastRatio } from './contrast';
import { contrastPairs, themes } from './semantic';

/**
 * The gate. Every declared pair, in every theme, at the WCAG level that
 * actually applies to it.
 *
 * This runs in CI before Storybook deploys. A palette tweak that looks nicer
 * but drops a pair below threshold turns the build red — which is the point.
 * Contrast is not a design review item here; it is a build error.
 */
describe.each(Object.entries(themes))('%s theme meets WCAG AA', (_themeName, theme) => {
  it.each(contrastPairs)('$name ($requirement)', ({ fg, bg, requirement }) => {
    const ratio = contrastRatio(fg(theme), bg(theme));
    const threshold = WCAG_AA[requirement];

    expect(
      Number(ratio.toFixed(2)),
      `${fg(theme)} on ${bg(theme)} is ${ratio.toFixed(2)}:1, needs ${threshold}:1`,
    ).toBeGreaterThanOrEqual(threshold);
  });
});

describe('contrastRatio', () => {
  it('returns 21 for black on white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
  });

  it('returns 1 for a colour against itself', () => {
    expect(contrastRatio('#3563e9', '#3563e9')).toBeCloseTo(1, 5);
  });

  it('is symmetric — order of arguments does not change the ratio', () => {
    expect(contrastRatio('#14181c', '#ffffff')).toBeCloseTo(
      contrastRatio('#ffffff', '#14181c'),
      10,
    );
  });

  it('expands three-digit hex', () => {
    expect(contrastRatio('#fff', '#000')).toBeCloseTo(contrastRatio('#ffffff', '#000000'), 10);
  });

  it('rejects a value that is not a colour', () => {
    expect(() => contrastRatio('rebeccapurple', '#ffffff')).toThrow(/Not a hex colour/);
  });
});

describe('token layering', () => {
  it('every theme defines the same set of semantic keys', () => {
    const flatten = (obj: object, prefix = ''): string[] =>
      Object.entries(obj).flatMap(([key, value]) =>
        typeof value === 'object' && value !== null
          ? flatten(value, `${prefix}${key}.`)
          : [`${prefix}${key}`],
      );

    const [first, ...rest] = Object.values(themes).map((t) => flatten(t).sort());
    for (const other of rest) {
      expect(other).toEqual(first);
    }
  });
});
