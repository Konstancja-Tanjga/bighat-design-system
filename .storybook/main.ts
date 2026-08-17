import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Deployed under https://<user>.github.io/bighat-design-system/, so every
  // asset needs the repository name as a prefix.
  viteFinal: (config) => ({
    ...config,
    base: process.env.STORYBOOK_BASE ?? '/',
  }),
};

export default config;
