import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { compositeOver, contrastRatio } from './contrast';

/**
 * The contrast gate. Every pair declared in the semantic token file's
 * `$extensions['com.bighat.contrast']` block is resolved from the built
 * artefact in both themes and held to its WCAG threshold, so an illegible
 * pairing fails `npm test` rather than shipping.
 *
 * 4.0 deleted the previous version of this file with the move to DTCG tokens,
 * and nothing replaced it: the pairs were declared, documented as a build
 * gate, and checked by nobody. It reads the same `contrastRatio` a product
 * team imports, so the rule the build enforces is the one it hands out.
 */
const ROOT = resolve(import.meta.dirname, '../..');

type Contrast = {
  thresholds: Record<string, number>;
  /** An optional fourth entry is the opaque surface a translucent background sits on. */
  pairs: Array<[foreground: string, background: string, requirement: string, over?: string]>;
};

const semantic = JSON.parse(readFileSync(resolve(ROOT, 'tokens/semantic.tokens.json'), 'utf8'));
const contrast = semantic.$extensions['com.bighat.contrast'] as Contrast;
const tokens = JSON.parse(readFileSync(resolve(ROOT, 'dist/tokens.flat.json'), 'utf8'))
  .tokens as Record<string, { light: string; dark: string }>;

describe('contrast pairs', () => {
  for (const theme of ['light', 'dark'] as const) {
    describe(theme, () => {
      it.each(contrast.pairs)('%s on %s meets %s (over %s)', (fg, bg, requirement, over) => {
        const min = contrast.thresholds[requirement];
        expect(tokens[fg], `${fg} is not a built token`).toBeDefined();
        expect(tokens[bg], `${bg} is not a built token`).toBeDefined();
        expect(min, `unknown requirement ${requirement}`).toBeDefined();
        if (over) expect(tokens[over], `${over} is not a built token`).toBeDefined();

        const background = over
          ? compositeOver(tokens[bg][theme], tokens[over][theme])
          : tokens[bg][theme];
        const measured = contrastRatio(tokens[fg][theme], background);
        expect(
          measured,
          `${fg} on ${bg}${over ? ` over ${over}` : ''} (${theme}) is ${measured.toFixed(2)}:1, needs ${min}:1`,
        ).toBeGreaterThanOrEqual(min);
      });
    });
  }
});
