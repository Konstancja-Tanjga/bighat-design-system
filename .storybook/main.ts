import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

/**
 * The deployed Storybook is this system's primary artefact, which changes two
 * things about this config.
 *
 * `docs/` is globbed before `src/`, so Introduction and the Foundations pages
 * come first in the sidebar rather than after 45 components — a reviewer's first
 * screen should be the argument, not an alphabetical list of controls.
 *
 * `docs/generated/` holds the ARIA conformance and token drift pages, written
 * by scripts/generate-doc-pages.mjs from the same audits that gate CI. They are
 * regenerated before every build, so the numbers on the site cannot drift from
 * the numbers in the build.
 */
const config: StorybookConfig = {
  framework: { name: '@storybook/react-vite', options: {} },

  // The logo, served for the manager's brand image and favicon, which load
  // files rather than components.
  staticDirs: [{ from: '../docs/assets', to: '/brand' }],

  stories: [
    '../docs/00-Introduction.mdx',
    '../docs/*.mdx',
    '../docs/generated/*.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.tsx',
  ],

  // remark-gfm, because MDX on its own does not parse GitHub-flavoured tables:
  // every "When to use it" and props table in the docs rendered as a paragraph
  // of pipes and dashes until this was added.
  addons: [
    {
      name: '@storybook/addon-docs',
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    // The Design tab: each component's Figma set, from parameters.design in its
    // stories file. The Figma side links back through documentation links.
    '@storybook/addon-designs',
  ],

  docs: { defaultName: 'Docs' },

  // Served from a project page, not a domain root.
  managerHead: (head) => `${head}<title>Big Hat — React design system</title>`,
};

export default config;
