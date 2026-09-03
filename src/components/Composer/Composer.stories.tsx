import type { Meta, StoryObj } from '@storybook/react-vite';

import { Composer } from './Composer';

/**
 * TODO: one paragraph. What this is for, and the decision it encodes.
 *
 * Scaffolded from packages/spec/components/composer.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof Composer> = {
  title: 'Components/Composer',
  component: Composer,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Composer>;

export const Default: Story = {
  args: {
    // TODO: a minimal, realistic example. Not lorem ipsum — this is what
    // most people will copy.
  },
};

