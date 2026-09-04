import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
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
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
});
