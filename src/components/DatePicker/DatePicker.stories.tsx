import type { Meta, StoryObj } from '@storybook/react-vite';

import { DatePicker, DateRangePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: { label: 'Issue date' },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRangeHint: Story = {
  args: {
    label: 'Due date',
    min: '2026-08-18',
    max: '2026-12-31',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Due date',
    defaultValue: '2026-01-04',
    error: 'The due date cannot be before the issue date.',
  },
};

export const Range: Story = {
  render: () => (
    <DateRangePicker
      legend="Reporting period"
      start={{ label: 'From', defaultValue: '2026-01-01' }}
      end={{ label: 'To', defaultValue: '2026-03-31' }}
    />
  ),
};

export const Month: Story = {
  args: { label: 'Accounting month', granularity: 'month' },
};
