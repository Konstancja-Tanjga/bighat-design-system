import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import { addons } from 'storybook/preview-api';

import '../src/styles/index.css';
import './docs-theme.css';

/**
 * The theme attribute, set for the document rather than for a story.
 *
 * `withThemeByDataAttribute` is a decorator, and a decorator only runs when a
 * story renders. Foundations → Tokens renders none: it is prose and a table
 * built from the token file, so `data-theme` was never written and the page
 * stayed light while the toolbar said dark. That is true of every docs page
 * with no `<Canvas>` in it, which is most of the foundations.
 *
 * So the attribute is also driven straight from the global, at the level of
 * the preview document: from the URL on load, because a docs page can paint
 * before any channel event arrives, and from the channel afterwards. The
 * decorator stays for stories rendered in isolation, where both agree.
 */
const applyTheme = (theme: unknown) => {
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
};

if (typeof document !== 'undefined') {
  const fromUrl = /(?:^|;)theme:(light|dark)(?:;|$)/.exec(
    new URLSearchParams(window.location.search).get('globals') ?? '',
  );
  applyTheme(fromUrl?.[1]);

  const channel = addons.getChannel();
  const onGlobals = ({ globals }: { globals?: Record<string, unknown> }) =>
    applyTheme(globals?.theme);
  channel.on('setGlobals', onGlobals);
  channel.on('globalsUpdated', onGlobals);
}

const preview: Preview = {
  tags: ['autodocs'],

  parameters: {
    /**
     * `test: 'error'` rather than the default 'todo'. Every story runs axe and
     * a violation fails the story — which is the difference between an a11y
     * addon that reports and one that gates. The published Storybook therefore
     * cannot contain a story with a known axe violation.
     */
    a11y: { test: 'error' },

    options: {
      storySort: {
        /**
         * Introduction, then Foundations: the first thing in the sidebar should
         * be the argument the system is making, not an alphabetical list of
         * controls. Storybook pins root-level pages above groups, which is why
         * the front door is a root page rather than a Foundations child. The
         * nested array orders that group's own children — everything unnamed
         * keeps its file order behind them.
         */
        order: [
          'Introduction',
          'Foundations',
          [
            'Tokens',
            'Colour & tone',
            'Typography',
            'Iconography',
            'Layout & container queries',
            'Layering',
            'Motion',
            'Content & UX copy',
            'Accessibility',
          ],
          'Accessibility',
          'Patterns',
          'Components',
          'Templates',
          'Contributing',
        ],
      },
    },

    docs: { toc: true },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
