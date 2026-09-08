import type { Meta, StoryObj } from '@storybook/react-vite';

import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: { label: 'Reason for rejection' },
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'What has to change before this can be approved?' },
};

export const WithDescription: Story = {
  args: {
    description: 'The uploader sees this, so write it to them rather than about them.',
    placeholder: 'What has to change before this can be approved?',
  },
};

export const Invalid: Story = {
  args: {
    description: 'The uploader sees this, so write it to them rather than about them.',
    error: 'Say what has to change — a rejection with no reason cannot be acted on.',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The description stays when the error arrives. Both are in `aria-describedby`, error first, because that is the order a screen reader reads them and the error is the more urgent.',
      },
    },
  },
};

export const Rows: Story = {
  args: {
    rows: 8,
    label: 'Handover note',
    defaultValue: 'The retention clock starts on approval.',
  },
  parameters: {
    docs: {
      description: {
        story:
          '`rows` is the height API. Size it to the answer you expect: a two-line box asked for a sentence, and an eight-line box asked for a paragraph. Guessing low is the more expensive mistake — the reader writes less than they meant to.',
      },
    },
  },
};

export const NotResizable: Story = {
  args: { resize: 'none', rows: 3 },
  parameters: {
    docs: {
      description: {
        story:
          'Only when the layout genuinely cannot take the growth. `resize` is an affordance the platform gives away for free, and taking it back means the reader with a long answer has to scroll a three-line window to proof-read it.',
      },
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Locked while the approval is in flight.' },
};
