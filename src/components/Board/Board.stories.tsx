import type { Meta, StoryObj } from '@storybook/react-vite';

import { Board } from './Board';

/**
 * TODO: one paragraph. What this is for, and the decision it encodes.
 *
 * Scaffolded from packages/spec/components/board.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof Board> = {
  title: 'Components/Board',
  component: Board,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Board>;

export const Default: Story = {
  args: {
    // TODO: a minimal, realistic example. Not lorem ipsum — this is what
    // most people will copy.
  },
};

