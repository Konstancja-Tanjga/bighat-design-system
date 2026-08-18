import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'Send me the monthly summary' },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    label: 'Share usage data',
    description: 'Anonymous. Never leaves your region.',
  },
};

export const Invalid: Story = {
  args: {
    label: 'I accept the terms',
    required: true,
    error: 'You have to accept the terms to continue.',
  },
};

export const Indeterminate: Story = {
  render: function Render() {
    const [items, setItems] = useState([true, false, false]);
    const all = items.every(Boolean);
    const some = items.some(Boolean) && !all;

    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <Checkbox
          label="All regions"
          checked={all}
          indeterminate={some}
          onChange={(event) => setItems(items.map(() => event.target.checked))}
        />
        <div style={{ display: 'grid', gap: 8, marginLeft: 26 }}>
          {['Europe', 'Americas', 'Asia'].map((region, index) => (
            <Checkbox
              key={region}
              label={region}
              checked={items[index]}
              onChange={(event) =>
                setItems(items.map((value, i) => (i === index ? event.target.checked : value)))
              }
            />
          ))}
        </div>
      </div>
    );
  },
};
