import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'Work email' },
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { placeholder: 'name@company.com' } };

export const WithDescription: Story = {
  args: {
    description: 'We use this for billing receipts only.',
    placeholder: 'name@company.com',
  },
};

export const Invalid: Story = {
  args: {
    description: 'We use this for billing receipts only.',
    error: 'Enter an email address with an @ in it.',
    defaultValue: 'konstancja.company.com',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The description does not disappear when the error appears — losing the rule you were meant to follow at the exact moment you broke it is a classic. Both are wired into `aria-describedby`, error first, because that is the order a screen reader reads them.',
      },
    },
  },
};

export const Disabled: Story = { args: { disabled: true, defaultValue: 'name@company.com' } };

export const HiddenLabel: Story = {
  args: { hideLabel: true, label: 'Search invoices', placeholder: 'Search invoices' },
  parameters: {
    docs: {
      description: {
        story:
          'The label is hidden, never removed. A placeholder is not a label: it vanishes the moment someone types, and it is the first thing lost to autofill.',
      },
    },
  },
};
