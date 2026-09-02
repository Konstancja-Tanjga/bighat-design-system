/**
 * WCAG 2.1 relative luminance and contrast ratio.
 *
 * This lives in `src/` rather than in a test helper on purpose: the same
 * function that guards the build is exported to consumers, so a product team
 * composing a one-off colour can check it against the same rule we do.
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

/** `rgba(20, 24, 28, 0.62)` → its parts. Throws on anything else. */
export function parseRgba(value: string): Rgb & { a: number } {
  const match = value
    .trim()
    .match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+))?\s*\)$/);
  if (!match) throw new Error(`Not an rgb/rgba colour: ${value}`);
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: match[4] === undefined ? 1 : Number(match[4]),
  };
}

/**
 * Flatten a translucent layer onto an opaque base, returning the hex the
 * viewer actually sees.
 *
 * This exists for one reason: chrome that floats over media has no known
 * background, so `contrastRatio` — which only speaks opaque — cannot be
 * pointed at it. Compositing the control's own translucent background over
 * the two extremes an image can present, pure white and pure black, turns an
 * untestable colour into two testable ones. See `onMedia` in `semantic.ts`.
 */
export function composite(layer: string, base: string): string {
  const { r, g, b, a } = parseRgba(layer);
  const under = hexToRgb(base);
  const mix = (top: number, bottom: number) => Math.round(top * a + bottom * (1 - a));
  return (
    '#' +
    [mix(r, under.r), mix(g, under.g), mix(b, under.b)]
      .map((channel) => channel.toString(16).padStart(2, '0'))
      .join('')
  );
}

/**
 * The worst two backgrounds an image can put behind a translucent control:
 * the layer over white, and the layer over black. A pair that clears both
 * clears every photograph.
 */
export function extremes(layer: string): { overWhite: string; overBlack: string } {
  return {
    overWhite: composite(layer, '#ffffff'),
    overBlack: composite(layer, '#000000'),
  };
}

/**
 * The thresholds this system treats as non-negotiable.
 *
 * `largeText` covers 18.66px bold or 24px regular and up. `nonText` covers
 * borders, icons and focus rings — WCAG 1.4.11.
 */
export const WCAG_AA = {
  bodyText: 4.5,
  largeText: 3,
  nonText: 3,
} as const;

export type ContrastRequirement = keyof typeof WCAG_AA;

export function meetsAA(
  foreground: string,
  background: string,
  requirement: ContrastRequirement = 'bodyText',
): boolean {
  return contrastRatio(foreground, background) >= WCAG_AA[requirement];
}
