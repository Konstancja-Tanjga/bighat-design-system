import { addons } from 'storybook/manager-api';
import { create, type ThemeVars } from 'storybook/theming';

/**
 * The manager — sidebar, toolbar, addon panel — is a separate application from
 * the preview, in its own document. `data-theme` never reaches it and neither
 * does tokens.css, so this is the one place in the repository where a colour is
 * written as a literal: there is no custom property here to reference. Each
 * value below is copied from a semantic token and named after it, so a change
 * to the token layer has exactly one other place to visit.
 *
 * The theme follows the toolbar rather than being chosen once at build time.
 * Storybook does not offer that as configuration, but `setConfig` can be called
 * again after start-up, so the manager listens for the same `theme` global the
 * preview decorator reads and re-themes itself when it changes.
 */
const font = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const code = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

const shared = {
  brandTitle: 'Big Hat',
  brandUrl: 'https://github.com/Konstancja-Tanjga/bighat-design-system',
  fontBase: font,
  fontCode: code,
  appBorderRadius: 10,
  inputBorderRadius: 6,
};

const light: ThemeVars = create({
  ...shared,
  base: 'light',
  colorPrimary: '#0a7f55', // green.700 — the accent needs 4.5:1 on white
  colorSecondary: '#0a7f55',
  appBg: '#f7f8f9', // surface.sunken
  appContentBg: '#ffffff', // surface.base
  appPreviewBg: '#ffffff',
  appBorderColor: '#dfe3e7', // border.subtle
  textColor: '#14181c', // text.primary
  textInverseColor: '#ffffff', // text.inverse
  textMutedColor: '#59636f', // text.muted
  barBg: '#ffffff',
  barTextColor: '#59636f',
  barHoverColor: '#0a7f55',
  barSelectedColor: '#0a7f55',
  inputBg: '#ffffff',
  inputBorder: '#6b7683', // border.strong
  inputTextColor: '#14181c',
});

const dark: ThemeVars = create({
  ...shared,
  base: 'dark',
  colorPrimary: '#34d399', // green.400 — the accent, as the preview uses it
  colorSecondary: '#34d399',
  appBg: '#14181c', // surface.base
  appContentBg: '#252b32', // surface.raised
  appPreviewBg: '#14181c',
  appBorderColor: '#39414a', // border.subtle, dark
  textColor: '#f7f8f9', // text.primary, dark
  textInverseColor: '#14181c',
  textMutedColor: '#9aa4af', // text.muted, dark
  barBg: '#14181c',
  barTextColor: '#9aa4af',
  barHoverColor: '#34d399',
  barSelectedColor: '#34d399',
  inputBg: '#252b32',
  inputBorder: '#6b7683',
  inputTextColor: '#f7f8f9',
});

const systemPrefersDark =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;

let current: 'light' | 'dark' | undefined;

const apply = (theme: unknown) => {
  const next = theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : undefined;
  if (!next || next === current) return;
  current = next;
  addons.setConfig({ theme: next === 'dark' ? dark : light });
};

// Until the preview reports its globals, follow the reader's own setting.
current = systemPrefersDark ? 'dark' : 'light';
addons.setConfig({ theme: systemPrefersDark ? dark : light });

const channel = addons.getChannel();
// Event names rather than the internal constants module: these two are part of
// the addon-facing channel protocol and outlive its file layout.
channel.on('setGlobals', ({ globals }: { globals?: Record<string, unknown> }) =>
  apply(globals?.theme),
);
channel.on('globalsUpdated', ({ globals }: { globals?: Record<string, unknown> }) =>
  apply(globals?.theme),
);
