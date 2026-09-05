import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';

import '../src/styles/index.css';
import './docs-theme.css';

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
         * Foundations first, and Introduction first inside it: the first thing
         * in the sidebar should be the argument the system is making, not an
         * alphabetical list of controls. The nested array orders that group's
         * own children — everything unnamed keeps its file order behind them.
         */
        order: [
          'Foundations',
          [
            'Introduction',
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
          'About this system',
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
