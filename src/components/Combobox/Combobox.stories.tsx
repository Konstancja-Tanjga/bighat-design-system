import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Combobox } from './Combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox (Autocomplete)',
  component: Combobox,
};

export default meta;
type Story = StoryObj<typeof meta>;

const countries = [
  { value: 'pl', label: 'Poland', hint: 'PLN · +48' },
  { value: 'de', label: 'Germany', hint: 'EUR · +49' },
  { value: 'cz', label: 'Czechia', hint: 'CZK · +420' },
  { value: 'sk', label: 'Slovakia', hint: 'EUR · +421' },
  { value: 'lt', label: 'Lithuania', hint: 'EUR · +370' },
  { value: 'ua', label: 'Ukraine', hint: 'UAH · +380' },
];

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ maxWidth: 320, paddingBottom: 260 }}>
        <Combobox
          label="Billing country"
          placeholder="Start typing"
          options={countries}
          value={value}
          onChange={setValue}
          description="Filters as you type. Escape closes the list, Escape again clears it."
        />
      </div>
    );
  },
};

export const Invalid: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ maxWidth: 320, paddingBottom: 260 }}>
        <Combobox
          label="Billing country"
          options={countries}
          value={value}
          onChange={setValue}
          error="Pick a country from the list."
        />
      </div>
    );
  },
};
