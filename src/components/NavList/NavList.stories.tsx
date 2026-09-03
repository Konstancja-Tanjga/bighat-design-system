import type { Meta, StoryObj } from '@storybook/react-vite';

import { NavList } from './NavList';

/**
 * TODO: one paragraph. What this is for, and the decision it encodes.
 *
 * Scaffolded from packages/spec/components/nav-list.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof NavList> = {
  title: 'Components/NavList',
  component: NavList,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavList>;

export const Default: Story = {
  args: {
    // TODO: a minimal, realistic example. Not lorem ipsum — this is what
    // most people will copy.
  },
};

