import type { Meta, StoryObj } from '@storybook/react-vite';

import { Menu } from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ paddingBottom: 220 }}>
      <Menu
        label="Actions"
        items={[
          { label: 'Rename', shortcut: 'F2' },
          { label: 'Duplicate', shortcut: '⌘D' },
          { label: 'Export as PDF' },
          { label: 'Archived elsewhere', disabled: true },
          { label: 'Delete invoice', tone: 'critical' },
        ]}
      />
    </div>
  ),
};

export const AlignedToTheEnd: Story = {
  name: 'Aligned to the end',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 200 }}>
      <Menu
        label="More"
        align="end"
        items={[{ label: 'Settings' }, { label: 'Keyboard shortcuts' }, { label: 'Sign out' }]}
      />
    </div>
  ),
};
