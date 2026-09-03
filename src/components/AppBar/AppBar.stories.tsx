import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppBar } from './AppBar';

/**
 * TODO: one paragraph. What this is for, and the decision it encodes.
 *
 * Scaffolded from packages/spec/components/app-bar.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof AppBar> = {
  title: 'Components/AppBar',
  component: AppBar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
  args: {
    // TODO: a minimal, realistic example. Not lorem ipsum — this is what
    // most people will copy.
  },
};

