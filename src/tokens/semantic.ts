/**
 * Layer 2 — semantic tokens.
 *
 * Every token here names a *role*, never an appearance. `text.muted` survives
 * a rebrand; `text.grey500` does not. This is the only colour API a component
 * is allowed to touch.
 *
 * Adding a token that renders text or a control boundary means adding a line
 * to `contrastPairs` below. That list is not documentation — `contrast.test.ts`
 * iterates it and fails the build, so an undeclared pair is a review comment,
 * not a production bug.
 */

import { color, radius, shadow, space } from './primitives';

export type ThemeName = 'light' | 'dark';

export type SemanticColors = {
  surface: {
    base: string;
    sunken: string;
    raised: string;
    overlay: string;
    inverse: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    onAccent: string;
    link: string;
  };
  border: {
    /** Decorative only — dividers, table rules. Not held to 3:1 by design. */
    subtle: string;
    /** Boundary of an interactive control. Held to 3:1. */
    strong: string;
    focus: string;
  };
  action: {
    primary: { bg: string; bgHover: string; bgActive: string; fg: string };
    secondary: { bg: string; bgHover: string; fg: string; border: string };
    critical: { bg: string; bgHover: string; fg: string };
  };
  status: {
    info: { bg: string; fg: string; border: string };
    success: { bg: string; fg: string; border: string };
    warning: { bg: string; fg: string; border: string };
    critical: { bg: string; fg: string; border: string };
  };
};

const light: SemanticColors = {
  surface: {
    base: color.neutral[0],
    sunken: color.neutral[50],
    raised: color.neutral[0],
    overlay: color.neutral[0],
    inverse: color.neutral[900],
  },
  text: {
    primary: color.neutral[900],
    secondary: color.neutral[700],
    muted: color.neutral[600],
    inverse: color.neutral[0],
    onAccent: color.neutral[0],
    link: color.blue[600],
  },
  border: {
    subtle: color.neutral[200],
    strong: color.neutral[500],
    focus: color.blue[500],
  },
  action: {
    primary: {
      bg: color.blue[500],
      bgHover: color.blue[600],
      bgActive: color.blue[700],
      fg: color.neutral[0],
    },
    secondary: {
      bg: color.neutral[0],
      bgHover: color.neutral[100],
      fg: color.neutral[800],
      border: color.neutral[500],
    },
    critical: {
      bg: color.red[600],
      bgHover: color.red[700],
      fg: color.neutral[0],
    },
  },
  status: {
    info: { bg: color.blue[50], fg: color.blue[700], border: color.blue[200] },
    success: { bg: color.green[50], fg: color.green[700], border: color.green[200] },
    warning: { bg: color.amber[50], fg: color.amber[700], border: color.amber[200] },
    critical: { bg: color.red[50], fg: color.red[700], border: color.red[200] },
  },
};

const dark: SemanticColors = {
  surface: {
    base: color.neutral[900],
    sunken: color.neutral[900],
    raised: color.neutral[800],
    overlay: color.neutral[800],
    inverse: color.neutral[0],
  },
  text: {
    primary: color.neutral[50],
    secondary: color.neutral[300],
    muted: color.neutral[400],
    inverse: color.neutral[900],
    onAccent: color.neutral[900],
    link: color.blue[300],
  },
  border: {
    subtle: color.neutral[700],
    strong: color.neutral[500],
    focus: color.blue[400],
  },
  action: {
    primary: {
      bg: color.blue[400],
      bgHover: color.blue[300],
      bgActive: color.blue[200],
      fg: color.neutral[900],
    },
    secondary: {
      bg: color.neutral[800],
      bgHover: color.neutral[700],
      fg: color.neutral[50],
      border: color.neutral[500],
    },
    critical: {
      bg: color.red[400],
      bgHover: color.red[300],
      fg: color.neutral[900],
    },
  },
  status: {
    info: { bg: color.neutral[800], fg: color.blue[300], border: color.blue[700] },
    success: { bg: color.neutral[800], fg: color.green[300], border: color.green[700] },
    warning: { bg: color.neutral[800], fg: color.amber[300], border: color.amber[700] },
    critical: { bg: color.neutral[800], fg: color.red[300], border: color.red[700] },
  },
};

export const themes: Record<ThemeName, SemanticColors> = { light, dark };

/** Non-colour semantics. Same idea: a role, not a measurement. */
export const size = {
  control: { sm: '28px', md: '36px', lg: '44px' },
  gap: { tight: space[1], snug: space[2], normal: space[3], loose: space[4] },
  padding: { inline: space[3], block: space[2], section: space[6] },
  radius: { control: radius.md, surface: radius.lg, pill: radius.full },
  elevation: { raised: shadow.sm, overlay: shadow.md, modal: shadow.lg },
} as const;

/**
 * Every foreground/background relationship the system promises to keep legible.
 *
 * `requirement` maps to the WCAG rule that actually applies, which is not
 * always 4.5:1 — a focus ring is non-text (3:1), a heading may be large text.
 * Getting this distinction wrong in either direction is a real failure: too
 * lax ships unreadable UI, too strict forces a washed-out palette nobody wants.
 */
export type ContrastPair = {
  name: string;
  fg: (t: SemanticColors) => string;
  bg: (t: SemanticColors) => string;
  requirement: 'bodyText' | 'largeText' | 'nonText';
};

export const contrastPairs: ContrastPair[] = [
  // Body copy on each surface it can legally sit on.
  {
    name: 'text.primary on surface.base',
    fg: (t) => t.text.primary,
    bg: (t) => t.surface.base,
    requirement: 'bodyText',
  },
  {
    name: 'text.primary on surface.sunken',
    fg: (t) => t.text.primary,
    bg: (t) => t.surface.sunken,
    requirement: 'bodyText',
  },
  {
    name: 'text.primary on surface.raised',
    fg: (t) => t.text.primary,
    bg: (t) => t.surface.raised,
    requirement: 'bodyText',
  },
  {
    name: 'text.secondary on surface.base',
    fg: (t) => t.text.secondary,
    bg: (t) => t.surface.base,
    requirement: 'bodyText',
  },
  {
    name: 'text.secondary on surface.raised',
    fg: (t) => t.text.secondary,
    bg: (t) => t.surface.raised,
    requirement: 'bodyText',
  },
  {
    name: 'text.muted on surface.base',
    fg: (t) => t.text.muted,
    bg: (t) => t.surface.base,
    requirement: 'bodyText',
  },
  {
    name: 'text.muted on surface.sunken',
    fg: (t) => t.text.muted,
    bg: (t) => t.surface.sunken,
    requirement: 'bodyText',
  },
  {
    name: 'text.muted on surface.raised',
    fg: (t) => t.text.muted,
    bg: (t) => t.surface.raised,
    requirement: 'bodyText',
  },
  {
    name: 'text.inverse on surface.inverse',
    fg: (t) => t.text.inverse,
    bg: (t) => t.surface.inverse,
    requirement: 'bodyText',
  },
  {
    name: 'text.link on surface.base',
    fg: (t) => t.text.link,
    bg: (t) => t.surface.base,
    requirement: 'bodyText',
  },

  // Actions, in every state that changes the background under the label.
  {
    name: 'action.primary.fg on bg',
    fg: (t) => t.action.primary.fg,
    bg: (t) => t.action.primary.bg,
    requirement: 'bodyText',
  },
  {
    name: 'action.primary.fg on bgHover',
    fg: (t) => t.action.primary.fg,
    bg: (t) => t.action.primary.bgHover,
    requirement: 'bodyText',
  },
  {
    name: 'action.primary.fg on bgActive',
    fg: (t) => t.action.primary.fg,
    bg: (t) => t.action.primary.bgActive,
    requirement: 'bodyText',
  },
  {
    name: 'action.secondary.fg on bg',
    fg: (t) => t.action.secondary.fg,
    bg: (t) => t.action.secondary.bg,
    requirement: 'bodyText',
  },
  {
    name: 'action.secondary.fg on bgHover',
    fg: (t) => t.action.secondary.fg,
    bg: (t) => t.action.secondary.bgHover,
    requirement: 'bodyText',
  },
  {
    name: 'action.critical.fg on bg',
    fg: (t) => t.action.critical.fg,
    bg: (t) => t.action.critical.bg,
    requirement: 'bodyText',
  },
  {
    name: 'action.critical.fg on bgHover',
    fg: (t) => t.action.critical.fg,
    bg: (t) => t.action.critical.bgHover,
    requirement: 'bodyText',
  },

  // Status messages carry meaning, so they are body text, not decoration.
  {
    name: 'status.info',
    fg: (t) => t.status.info.fg,
    bg: (t) => t.status.info.bg,
    requirement: 'bodyText',
  },
  {
    name: 'status.success',
    fg: (t) => t.status.success.fg,
    bg: (t) => t.status.success.bg,
    requirement: 'bodyText',
  },
  {
    name: 'status.warning',
    fg: (t) => t.status.warning.fg,
    bg: (t) => t.status.warning.bg,
    requirement: 'bodyText',
  },
  {
    name: 'status.critical',
    fg: (t) => t.status.critical.fg,
    bg: (t) => t.status.critical.bg,
    requirement: 'bodyText',
  },

  // Non-text: control boundaries and the focus ring. WCAG 1.4.11, so 3:1.
  {
    name: 'border.strong on surface.base',
    fg: (t) => t.border.strong,
    bg: (t) => t.surface.base,
    requirement: 'nonText',
  },
  {
    name: 'border.strong on surface.raised',
    fg: (t) => t.border.strong,
    bg: (t) => t.surface.raised,
    requirement: 'nonText',
  },
  {
    name: 'border.focus on surface.base',
    fg: (t) => t.border.focus,
    bg: (t) => t.surface.base,
    requirement: 'nonText',
  },
  {
    name: 'border.focus on surface.raised',
    fg: (t) => t.border.focus,
    bg: (t) => t.surface.raised,
    requirement: 'nonText',
  },
  {
    name: 'action.secondary.border on bg',
    fg: (t) => t.action.secondary.border,
    bg: (t) => t.action.secondary.bg,
    requirement: 'nonText',
  },
];
