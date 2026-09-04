import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from './Card';

/**
 * TODO: one paragraph. What this is for, and the decision it encodes.
 *
 * Scaffolded from packages/spec/components/card.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    // TODO: a minimal, realistic example. Not lorem ipsum — this is what
    // most people will copy.
  },
};

/** TODO: what is this variant for, and when would you reach for it over the others. */
export const Flat: Story = {
  args: { elevation: 'flat' },
};

/** TODO: what is this variant for, and when would you reach for it over the others. */
export const Raised: Story = {
  args: { elevation: 'raised' },
};
