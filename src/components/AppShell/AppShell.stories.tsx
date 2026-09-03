import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppShell } from './AppShell';

/**
 * TODO: one paragraph. What this is for, and the decision it encodes.
 *
 * Scaffolded from packages/spec/components/app-shell.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof AppShell> = {
  title: 'Components/AppShell',
  component: AppShell,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AppShell>;

export const Default: Story = {
  args: {
    // TODO: a minimal, realistic example. Not lorem ipsum — this is what
    // most people will copy.
  },
};

/** TODO: what is this variant for, and when would you reach for it over the others. */
export const Fill: Story = {
  args: { height: 'fill' },
};

/** TODO: what is this variant for, and when would you reach for it over the others. */
export const Flow: Story = {
  args: { height: 'flow' },
};
