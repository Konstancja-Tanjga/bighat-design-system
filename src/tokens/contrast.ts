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
