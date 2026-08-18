import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  args: { label: 'Uploading invoices' },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Determinate: Story = {
  args: { value: 62 },
};

export const WithCount: Story = {
  args: { value: 12, max: 40, valueText: '12 of 40 files' },
};

export const Indeterminate: Story = {
  args: { label: 'Contacting the payment provider' },
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
      <Progress label="Import" value={100} tone="success" valueText="Done" />
      <Progress label="Storage used" value={94} tone="critical" valueText="94% of 20 GB" />
      <Progress label="Sync" value={40} size="sm" />
    </div>
  ),
};
