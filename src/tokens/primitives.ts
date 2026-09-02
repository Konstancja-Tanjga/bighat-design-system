/**
 * Layer 1 — primitives.
 *
 * Raw values with no meaning attached. A primitive says "this is the colour
 * #3563e9", never "this is what a primary button looks like".
 *
 * Components must not import from this file. The lint rule in
 * `eslint.config.js` enforces that; the reason is in `docs/architecture.mdx`.
 */

export const color = {
  neutral: {
    0: '#ffffff',
    50: '#f7f8f9',
    100: '#eef0f2',
    200: '#dfe3e7',
    300: '#c5ccd3',
    400: '#9aa4af',
    500: '#6b7683',
    600: '#59636f',
    700: '#39414a',
    800: '#252b32',
    900: '#14181c',
  },
  blue: {
    50: '#eef4ff',
    100: '#dbe6ff',
    200: '#bcd0ff',
    300: '#8fb0ff',
    400: '#5b87fb',
    500: '#3563e9',
    600: '#2148c9',
    700: '#1a39a1',
    800: '#17307f',
    900: '#152a66',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#d93a3f',
    600: '#c02a2f',
    700: '#a31f24',
    800: '#851d21',
    900: '#6f1c1f',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#b26a02',
    600: '#95580a',
    700: '#7c4a10',
    800: '#653d10',
    900: '#523211',
  },
  green: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#0a7f55',
    600: '#0a6b48',
    700: '#0a573b',
    800: '#0b4732',
    900: '#0a3a29',
  },
} as const;

/** 4px base. Components may only use steps from this scale. */
export const space = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const;

export const radius = {
  none: '0',
  sm: '3px',
  md: '6px',
  lg: '10px',
  /** A sheet or a viewer, where the corner is part of the form. */
  xl: '20px',
  full: '9999px',
} as const;

export const fontSize = {
  xs: '11px',
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '20px',
  '2xl': '26px',
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
} as const;

export const lineHeight = {
  tight: '1.25',
  normal: '1.5',
} as const;

export const shadow = {
  sm: '0 1px 2px rgba(20, 24, 28, 0.08)',
  md: '0 4px 12px rgba(20, 24, 28, 0.12)',
  lg: '0 12px 32px rgba(20, 24, 28, 0.18)',
} as const;

/**
 * Container widths, not viewport widths.
 *
 * A component responds to the space it was given: the same table sits in
 * `main` at 1200px, in a `SidePanel` at 432px and inside a `Card` at 280px,
 * on one screen. A viewport query gets two of those three wrong, so these
 * feed `@container` queries.
 *
 * CSS cannot read a custom property inside a container or media query, so
 * these values appear twice — here, and as literals in component CSS.
 * `breakpoints.test.ts` reads the stylesheets and fails the build if the
 * two ever disagree.
 */
export const breakpoint = {
  /** Below this a table stops being a grid. */
  sm: '480px',
  /** Below this a shell hides its rail and panels. */
  md: '900px',
  lg: '1200px',
} as const;

export const duration = {
  instant: '80ms',
  fast: '140ms',
  normal: '220ms',
} as const;
