import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton } from './Skeleton';

/**
 * TODO: one paragraph. What this is for, and the decision it encodes.
 *
 * Scaffolded from packages/spec/components/skeleton.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    // TODO: a minimal, realistic example. Not lorem ipsum — this is what
    // most people will copy.
  },
};

/** TODO: what is this variant for, and when would you reach for it over the others. */
export const Control: Story = {
  args: { radius: 'control' },
};

/** TODO: what is this variant for, and when would you reach for it over the others. */
export const Surface: Story = {
  args: { radius: 'surface' },
};

/** TODO: what is this variant for, and when would you reach for it over the others. */
export const Pill: Story = {
  args: { radius: 'pill' },
};
