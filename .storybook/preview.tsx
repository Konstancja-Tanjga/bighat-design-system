import type { Decorator, Preview } from '@storybook/react-vite';
import { useEffect, type ReactNode } from 'react';

import '../src/styles/tokens.css';
import '../src/styles/base.css';

/**
 * Theme switching writes `data-theme` on the document root — the same hook a
 * consuming application uses. Storybook is not given a private mechanism,
 * because then Storybook would be the only place the themes are proven to work.
 */
function ThemeFrame({ theme, children }: { theme: 'light' | 'dark'; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="bh-root" style={{ padding: 24, minHeight: '100%' }}>
      {children}
    </div>
  );
}

const withTheme: Decorator = (Story, context) => (
  <ThemeFrame theme={context.globals.theme as 'light' | 'dark'}>
    <Story />
  </ThemeFrame>
);

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Colour theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: { expanded: true },
    a11y: {
      // Fail the story rather than annotate it. An accessibility panel that
      // shows warnings nobody has to act on trains people to ignore it.
      test: 'error',
    },
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Introduction', 'Tokens', 'Accessibility'],
          'Templates',
          ['Introduction'],
          'Components',
        ],
      },
    },
  },
};

export default preview;
