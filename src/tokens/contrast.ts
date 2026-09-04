/**
 * WCAG 2.1 relative luminance and contrast ratio.
 *
 * 4.0 moved the token *source* to DTCG JSON and the resolved values to
 * `dist/tokens.ts`, but the arithmetic that turns two colours into a ratio is
 * not a token — it is a rule, and it has to run somewhere both the build and
 * the documentation can reach. It lives in `src/` rather than in a test helper
 * for the same reason it always did: the function that guards the build is the
 * one a product team gets when it composes a one-off colour and wants to check
 * it against the rule we hold ourselves to.
 */

export type Rgb = { r: number; g: number; b: number };

export function hexToRgb(hex: string): Rgb {
  const normalised = hex.replace('#', '').trim();
  const full =
    normalised.length === 3
      ? normalised
          .split('')
          .map((c) => c + c)
          .join('')
      : normalised;

  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    throw new Error(`Not a hex colour: ${hex}`);
  }

  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

/** WCAG relative luminance. Channels are sRGB-linearised, then weighted. */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const channel = (value: number) => {
    const s = value / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Contrast ratio between two opaque colours. Ranges from 1 to 21. */
export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}
