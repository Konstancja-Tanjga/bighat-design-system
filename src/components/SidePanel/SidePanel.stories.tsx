import type { Meta, StoryObj } from '@storybook/react-vite';

import { SidePanel } from './SidePanel';

/**
 * TODO: one paragraph. What this is for, and the decision it encodes.
 *
 * Scaffolded from packages/spec/components/side-panel.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof SidePanel> = {
  title: 'Components/SidePanel',
  component: SidePanel,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidePanel>;

export const Default: Story = {
  args: {
    // TODO: a minimal, realistic example. Not lorem ipsum — this is what
    // most people will copy.
  },
};

/** TODO: what is this variant for, and when would you reach for it over the others. */
export const Start: Story = {
  args: { side: 'start' },
};

/** TODO: what is this variant for, and when would you reach for it over the others. */
export const End: Story = {
  args: { side: 'end' },
};
