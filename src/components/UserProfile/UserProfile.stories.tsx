import type { Meta, StoryObj } from '@storybook/react-vite';

import { UserProfile } from './UserProfile';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof UserProfile> = {
  title: 'Components/User Profile',
  component: UserProfile,
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { label: 'Profile' },
  { label: 'Preferences' },
  { label: 'Switch workspace' },
  { label: 'Sign out', tone: 'critical' as const },
];

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 200 }}>
      <UserProfile name="Ada Lovelace" secondary="ada@nordwind.pl" items={items} />
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 200 }}>
      <UserProfile
        name="Ada Lovelace"
        secondary="Nordwind sp. z o.o."
        badge={<Badge tone="info">Admin</Badge>}
        items={items}
      />
    </div>
  ),
};

export const Static: Story = {
  name: 'Without a menu',
  render: () => <UserProfile name="Grace Hopper" secondary="grace@example.com" />,
};

export const Compact: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 200 }}>
      <UserProfile name="Ada Lovelace" compact items={items} />
    </div>
  ),
};
