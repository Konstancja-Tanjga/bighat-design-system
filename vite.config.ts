import { resolve } from 'node:path';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'BigHatUI',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // Consumers bring their own React. Bundling it here would give a second
      // copy of the reconciler and break hooks in every host app.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    sourcemap: true,
    // `npm run tokens` writes dist/tokens.{css,scss,ts,flat.json} before this
    // step, and package.json exports all four. Vite empties the output
    // directory by default, which deleted them again — so the published
    // package advertised ./tokens and shipped without it.
    emptyOutDir: false,
  },
  test: {
    /**
     * Two projects under one `npm test`. `unit` is the suite that was always
     * here: the contrast gate across both themes and the contract-driven
     * keyboard and anatomy suites, in jsdom. (Token drift is `audit:drift`,
     * its own step.) `storybook` renders every story in headless Chromium
     * through the Vitest addon, with the a11y addon composed in, so an axe
     * violation in any story fails the same command the contrast gate does.
     */
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./src/test/setup.ts'],
          css: true,
          include: ['src/**/*.test.{ts,tsx}'],
        },
      },
      {
        extends: true,
        plugins: [storybookTest({ configDir: resolve(import.meta.dirname, '.storybook') })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['./.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
