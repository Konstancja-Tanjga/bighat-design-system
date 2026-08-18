import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState(40);
    return (
      <Slider label="Opacity" value={value} onChange={setValue} formatValue={(v) => `${v}%`} />
    );
  },
};

export const WithUnits: Story = {
  render: function Render() {
    const [value, setValue] = useState(24);
    return (
      <Slider
        label="Reminder"
        description="How long before the due date we nudge you."
        min={1}
        max={72}
        step={1}
        value={value}
        onChange={setValue}
        formatValue={(v) => `${v} hours before`}
      />
    );
  },
};
