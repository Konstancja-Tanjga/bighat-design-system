import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState('standard');
    return (
      <RadioGroup
        legend="Delivery"
        value={value}
        onChange={setValue}
        options={[
          { value: 'standard', label: 'Standard', description: '3–5 working days. Free.' },
          { value: 'express', label: 'Express', description: 'Next working day. 19 zł.' },
          { value: 'pickup', label: 'Pick-up point', description: 'Ready in 48 hours.' },
        ]}
      />
    );
  },
};

export const Horizontal: Story = {
  args: {
    legend: 'Invoice format',
    orientation: 'horizontal',
    defaultValue: 'pdf',
    options: [
      { value: 'pdf', label: 'PDF' },
      { value: 'xml', label: 'XML' },
      { value: 'both', label: 'Both' },
    ],
  },
};

export const Invalid: Story = {
  args: {
    legend: 'Account type',
    required: true,
    error: 'Choose an account type to continue.',
    options: [
      { value: 'personal', label: 'Personal' },
      { value: 'business', label: 'Business' },
    ],
  },
};
