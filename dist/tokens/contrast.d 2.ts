/**
 * WCAG 2.1 relative luminance and contrast ratio.
 *
 * This lives in `src/` rather than in a test helper on purpose: the same
 * function that guards the build is exported to consumers, so a product team
 * composing a one-off colour can check it against the same rule we do.
 */
export type Rgb = {
    r: number;
    g: number;
    b: number;
};
export declare function hexToRgb(hex: string): Rgb;
/** WCAG relative luminance. Channels are sRGB-linearised, then weighted. */
export declare function relativeLuminance(hex: string): number;
/** Contrast ratio between two opaque colours. Ranges from 1 to 21. */
export declare function contrastRatio(foreground: string, background: string): number;
/** `rgba(20, 24, 28, 0.62)` → its parts. Throws on anything else. */
export declare function parseRgba(value: string): Rgb & {
    a: number;
};
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
export declare function composite(layer: string, base: string): string;
/**
 * The worst two backgrounds an image can put behind a translucent control:
 * the layer over white, and the layer over black. A pair that clears both
 * clears every photograph.
 */
export declare function extremes(layer: string): {
    overWhite: string;
    overBlack: string;
};
/**
 * The thresholds this system treats as non-negotiable.
 *
 * `largeText` covers 18.66px bold or 24px regular and up. `nonText` covers
 * borders, icons and focus rings — WCAG 1.4.11.
 */
export declare const WCAG_AA: {
    readonly bodyText: 4.5;
    readonly largeText: 3;
    readonly nonText: 3;
};
export type ContrastRequirement = keyof typeof WCAG_AA;
export declare function meetsAA(foreground: string, background: string, requirement?: ContrastRequirement): boolean;
//# sourceMappingURL=contrast.d.ts.map