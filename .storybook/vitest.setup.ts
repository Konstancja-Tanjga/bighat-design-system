import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react-vite';

import * as projectAnnotations from './preview';

/**
 * The Vitest addon renders every story as a test, in a real browser. The a11y
 * addon's annotations are composed in so that `a11y: { test: 'error' }` in
 * preview.tsx means what it says: an axe violation fails the story in
 * `npm test`, not only in the Storybook UI.
 */
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
