import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Save changes' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] },
    tone: { control: 'inline-radio', options: ['default', 'critical'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Weights: Story = {
  name: 'Three weights, one hierarchy',
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
};

export const CriticalTone: Story = {
  name: 'Critical tone across all weights',
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} variant="primary" tone="critical">
        Delete workspace
      </Button>
      <Button {...args} variant="secondary" tone="critical">
        Delete
      </Button>
      <Button {...args} variant="ghost" tone="critical">
        Delete
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tone is a separate axis from weight. A destructive action is not always the loudest thing on screen — inside a row of table actions it is a ghost button that happens to be critical.',
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  name: 'Loading keeps its label',
  args: { loading: true, loadingLabel: 'Saving changes' },
  parameters: {
    docs: {
      description: {
        story:
          'The label stays put so the button does not change width mid-click, and the button stays focusable so keyboard focus is not thrown back to the document body. `aria-disabled` plus a click guard stop a second submit.',
      },
    },
  },
};

export const Disabled: Story = { args: { disabled: true } };

export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: 'padded' },
};
