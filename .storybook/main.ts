import type { StorybookConfig } from '@storybook/react-vite';

/**
 * The deployed Storybook is this system's primary artefact, which changes two
 * things about this config.
 *
 * `docs/` is globbed before `src/`, so About and the Foundations pages come
 * first in the sidebar rather than after 41 components — a reviewer's first
 * screen should be the argument, not an alphabetical list of controls.
 *
 * `docs/generated/` holds the ARIA conformance and token drift pages, written
 * by scripts/generate-doc-pages.mjs from the same audits that gate CI. They are
 * regenerated before every build, so the numbers on the site cannot drift from
 * the numbers in the build.
 */
const config: StorybookConfig = {
  framework: { name: '@storybook/react-vite', options: {} },

  stories: [
    '../docs/00-About.mdx',
    '../docs/*.mdx',
    '../docs/generated/*.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.tsx',
  ],

  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-themes'],

  docs: { defaultName: 'Docs' },

  // Served from a project page, not a domain root.
  managerHead: (head) => `${head}<title>Big Hat — React design system</title>`,
};

export default config;
