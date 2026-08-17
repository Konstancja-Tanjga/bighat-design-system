import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    label: 'Invoice status',
    options: [
      { value: 'draft', label: 'Draft' },
      { value: 'sent', label: 'Sent' },
      { value: 'paid', label: 'Paid' },
      { value: 'void', label: 'Void', disabled: true },
    ],
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The deliberate omission in this system. Native `<select>` gives us the platform picker on touch, form autofill, typeahead and correct assistive-technology behaviour — none of which a custom listbox gets for free, and all of which product teams would have to pay for in bugs.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: 'sent' } };

export const WithPlaceholder: Story = {
  args: { placeholder: 'Choose a status', defaultValue: '' },
};

export const Invalid: Story = {
  args: {
    placeholder: 'Choose a status',
    defaultValue: '',
    required: true,
    error: 'Pick a status before saving.',
  },
};
