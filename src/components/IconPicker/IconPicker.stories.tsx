import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { IconPicker } from './IconPicker';

const meta: Meta<typeof IconPicker> = {
  title: 'Components/Icon picker',
  component: IconPicker,
};

export default meta;
type Story = StoryObj<typeof meta>;

const icons = [
  { name: 'invoice', icon: '🧾', keywords: ['bill', 'receipt'] },
  { name: 'wallet', icon: '👛', keywords: ['money', 'payment'] },
  { name: 'chart', icon: '📈', keywords: ['report', 'analytics'] },
  { name: 'folder', icon: '📁', keywords: ['directory'] },
  { name: 'calendar', icon: '📅', keywords: ['date', 'schedule'] },
  { name: 'mail', icon: '✉️', keywords: ['email', 'message'] },
  { name: 'lock', icon: '🔒', keywords: ['secure', 'private'] },
  { name: 'star', icon: '⭐', keywords: ['favourite'] },
  { name: 'flag', icon: '🚩', keywords: ['report', 'mark'] },
  { name: 'bell', icon: '🔔', keywords: ['notification', 'alert'] },
  { name: 'trash', icon: '🗑️', keywords: ['bin', 'remove'] },
  { name: 'pin', icon: '📌', keywords: ['keep'] },
];

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState('invoice');
    return <IconPicker label="Project icon" icons={icons} value={value} onChange={setValue} />;
  },
};

export const WithoutSearch: Story = {
  render: function Render() {
    const [value, setValue] = useState('star');
    return (
      <IconPicker
        label="Marker"
        icons={icons.slice(0, 6)}
        columns={6}
        searchable={false}
        value={value}
        onChange={setValue}
      />
    );
  },
};
