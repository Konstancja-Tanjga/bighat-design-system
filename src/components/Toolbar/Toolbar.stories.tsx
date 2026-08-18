import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Toolbar } from './Toolbar';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import { SegmentedControl } from '../SegmentedControl/SegmentedControl';

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Function Bar',
  component: Toolbar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [density, setDensity] = useState('comfortable');
    return (
      <Toolbar
        ariaLabel="Invoice list"
        end={
          <SegmentedControl
            legend="Row density"
            size="sm"
            value={density}
            onChange={setDensity}
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'comfortable', label: 'Comfortable' },
            ]}
          />
        }
      >
        <Button size="sm">New invoice</Button>
        <Button size="sm" variant="secondary">
          Import
        </Button>
        <Divider orientation="vertical" spacing="none" />
        <Button size="sm" variant="ghost">
          Export
        </Button>
        <Button size="sm" variant="ghost" tone="critical">
          Delete
        </Button>
      </Toolbar>
    );
  },
};

export const Flush: Story = {
  render: () => (
    <Toolbar ariaLabel="Formatting" flush>
      <Button size="sm" variant="ghost" aria-label="Bold">
        B
      </Button>
      <Button size="sm" variant="ghost" aria-label="Italic">
        I
      </Button>
      <Button size="sm" variant="ghost" aria-label="Underline">
        U
      </Button>
    </Toolbar>
  ),
};
