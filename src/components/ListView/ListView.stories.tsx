import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { ListView } from './ListView';

const meta: Meta<typeof ListView> = {
  title: 'Components/List View',
  component: ListView,
};

export default meta;
type Story = StoryObj<typeof meta>;

const threads = [
  { id: 'a', title: 'Nordwind sp. z o.o.', description: 'Re: invoice INV-2043', meta: '09:14' },
  { id: 'b', title: 'Kolej Mazowiecka', description: 'Payment confirmation', meta: 'Yesterday' },
  { id: 'c', title: 'Bakalie Nowak', description: 'Overdue reminder sent', meta: 'Mon' },
  { id: 'd', title: 'Studio Kropka', description: 'New contract draft', meta: '12 Aug' },
];

export const MasterDetail: Story = {
  name: 'Master and detail',
  render: function Render() {
    const [selected, setSelected] = useState('a');
    const current = threads.find((thread) => thread.id === selected);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16 }}>
        <ListView
          ariaLabel="Conversations"
          items={threads}
          value={selected}
          onChange={setSelected}
        />
        <div>
          <h3 style={{ marginTop: 0 }}>{current?.title}</h3>
          <p style={{ color: 'var(--bh-text-muted)' }}>{current?.description}</p>
          <p style={{ fontSize: 13 }}>
            Arrow keys move the selection, Home and End jump to the ends, and typing the first
            letters of a name finds it.
          </p>
        </div>
      </div>
    );
  },
};

export const Empty: Story = {
  args: {
    ariaLabel: 'Conversations',
    items: [],
    empty: 'No conversations yet.',
  },
};
