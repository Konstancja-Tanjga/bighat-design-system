import type { Meta, StoryObj } from '@storybook/react-vite';

import { NavRail } from './NavRail';

/**
 * TODO: one paragraph. What this is for, and the decision it encodes.
 *
 * Scaffolded from packages/spec/components/nav-rail.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof NavRail> = {
  title: 'Components/NavRail',
  component: NavRail,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavRail>;

export const Default: Story = {
  args: {
    // TODO: a minimal, realistic example. Not lorem ipsum — this is what
    // most people will copy.
  },
};

