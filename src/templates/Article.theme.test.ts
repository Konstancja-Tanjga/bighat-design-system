import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { compositeOver, contrastRatio, hexToRgb } from '../tokens/contrast';

/**
 * The Article template overrides semantic tokens with World of Raptors'
 * theme. Those values never pass through tokens/semantic.tokens.json, so the
 * contrast gate cannot see them; this test holds the pairs the template
 * actually draws to the same WCAG thresholds, in both of its themes.
 */
const css = readFileSync(resolve(import.meta.dirname, '../styles/templates/Article.css'), 'utf8');

function block(selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  expect(start, `${selector} block`).toBeGreaterThanOrEqual(0);
  const body = css.slice(start, css.indexOf('}', start));
  const values: Record<string, string> = {};
  for (const [, name, value] of body.matchAll(/(--bh-[a-z-]+):\s*(#[0-9a-f]{6})\s*;/gi))
    values[name] = value;
  return values;
}

const light = block('.tpl-article-theme');
const dark = { ...light, ...block(":root[data-theme='dark'] .tpl-article-theme") };

const PAIRS: Array<[string, string, number]> = [
  ['--bh-text-primary', '--bh-surface-base', 4.5],
  ['--bh-text-secondary', '--bh-surface-base', 4.5],
  ['--bh-text-muted', '--bh-surface-base', 4.5],
  ['--bh-text-link', '--bh-surface-base', 4.5],
  // The side note: body text and links on the soft accent tint.
  ['--bh-text-primary', '--bh-selection-bg', 4.5],
  ['--bh-text-link', '--bh-selection-bg', 4.5],
  // The accent is used as small text: the module link, section numbers.
  ['--bh-selection-mark', '--bh-surface-base', 4.5],
  ['--bh-action-primary-fg', '--bh-action-primary-bg', 4.5],
  ['--bh-border-strong', '--bh-surface-base', 3],
  ['--bh-border-focus', '--bh-surface-base', 3],
];

describe('Article template theme', () => {
  for (const [name, theme] of [
    ['light', light],
    ['dark', dark],
  ] as const) {
    it.each(PAIRS)(`${name}: %s on %s meets %s:1`, (fg, bg, min) => {
      expect(theme[fg], `${fg} in ${name}`).toBeDefined();
      expect(theme[bg], `${bg} in ${name}`).toBeDefined();
      expect(contrastRatio(theme[fg], theme[bg])).toBeGreaterThanOrEqual(min);
    });
  }

  it('follows a dark OS with the same values as data-theme="dark"', () => {
    const osDark = block(":root:not([data-theme='light']) .tpl-article-theme");
    expect(css).toMatch(
      /prefers-color-scheme: dark\)\s*\{\s*:root:not\(\[data-theme='light'\]\) \.tpl-article-theme/,
    );
    expect(osDark).toEqual(block(":root[data-theme='dark'] .tpl-article-theme"));
  });

  // The next-lesson card is the same in both themes: the sky under an even
  // veil of ink. Its text is checked against every stop of the sky.
  it.each(['--tpl-scene-text', '--tpl-highlight'])('%s on the shaded sky meets 4.5:1', (fg) => {
    const theme = css.slice(css.indexOf('.tpl-article-theme {'));
    const prop = (name: string) => {
      const match = theme.match(new RegExp(`${name}:\\s*([^;]+);`));
      expect(match, name).not.toBeNull();
      return match![1];
    };
    const stops = prop('--tpl-scene').match(/#[0-9a-f]{6}/gi)!;
    const veil = Number(prop('--tpl-scene-shade').match(/(\d+)%/)![1]) / 100;
    const ink = hexToRgb(prop('--tpl-scene-ink'));
    expect(stops.length).toBeGreaterThan(1);
    const veiled = `rgba(${ink.r}, ${ink.g}, ${ink.b}, ${veil})`;
    for (const stop of stops) {
      const shaded = compositeOver(veiled, stop);
      expect(contrastRatio(prop(fg), shaded), `${fg} over ${stop}`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('the pill: ink on the highlight meets 4.5:1', () => {
    const theme = css.slice(css.indexOf('.tpl-article-theme {'));
    const hex = (name: string) => theme.match(new RegExp(`${name}:\\s*(#[0-9a-f]{6});`, 'i'))![1];
    expect(contrastRatio(hex('--tpl-scene-ink'), hex('--tpl-highlight'))).toBeGreaterThanOrEqual(
      4.5,
    );
  });
});
