import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { StatusBar } from './StatusBar';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

const meta: Meta<typeof StatusBar> = {
  title: 'Components/Status Bar',
  component: StatusBar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Rows', value: '1 248' },
      { label: 'Selected', value: '3' },
      { label: 'Filter', value: 'Overdue' },
    ],
    message: 'Saved 2 minutes ago',
    end: <Badge tone="info">Staging</Badge>,
  },
};

export const LiveMessage: Story = {
  name: 'The message is a polite live region',
  render: function Render() {
    const [saved, setSaved] = useState(0);
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <Button size="sm" variant="secondary" onClick={() => setSaved((n) => n + 1)}>
          Save
        </Button>
        <StatusBar
          items={[{ label: 'Rows', value: '42' }]}
          message={saved === 0 ? 'No changes' : `Saved (${saved})`}
        />
      </div>
    );
  },
};
