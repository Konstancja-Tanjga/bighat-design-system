import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react-vite';

import * as projectAnnotations from './preview';

/**
 * The Vitest addon renders every story as a test, in a real browser. The a11y
 * addon's annotations are composed in so that `a11y: { test: 'error' }` in
 * preview.tsx means what it says: an axe violation fails the story in
 * `npm test`, not only in the Storybook UI.
 *
 * Because this file calls setProjectAnnotations, the addon skips its own
 * automatic provisioning: any future addon preview entry must be composed
 * here by hand or it will not run in tests.
 */
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
