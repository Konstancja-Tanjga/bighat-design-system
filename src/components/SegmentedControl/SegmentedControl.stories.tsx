import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState('month');
    return (
      <SegmentedControl
        legend="Period"
        value={value}
        onChange={setValue}
        options={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
        ]}
      />
    );
  },
};

export const WithVisibleLegend: Story = {
  render: function Render() {
    const [value, setValue] = useState('comfortable');
    return (
      <SegmentedControl
        legend="Row density"
        showLegend
        size="sm"
        value={value}
        onChange={setValue}
        options={[
          { value: 'compact', label: 'Compact' },
          { value: 'comfortable', label: 'Comfortable' },
        ]}
      />
    );
  },
};
