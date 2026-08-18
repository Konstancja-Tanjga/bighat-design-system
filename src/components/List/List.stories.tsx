import type { Meta, StoryObj } from '@storybook/react-vite';

import { List, ListItem } from './List';
import { Avatar } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <List ariaLabel="Recent invoices">
      <ListItem
        title="INV-2043"
        description="Nordwind sp. z o.o. · 12 400 zł"
        trailing={<Badge tone="warning">Pending</Badge>}
      />
      <ListItem
        title="INV-2042"
        description="Kolej Mazowiecka · 3 100 zł"
        trailing={<Badge tone="success">Paid</Badge>}
      />
      <ListItem
        title="INV-2041"
        description="Bakalie Nowak · 890 zł"
        trailing={<Badge tone="critical">Overdue</Badge>}
      />
    </List>
  ),
};

export const WithAvatarsAndActions: Story = {
  name: 'With avatars and actions',
  render: () => (
    <List ariaLabel="Team">
      <ListItem
        leading={<Avatar name="Ada Lovelace" size="sm" decorative />}
        title="Ada Lovelace"
        description="ada@example.com"
        trailing={
          <Button size="sm" variant="ghost">
            Manage
          </Button>
        }
      />
      <ListItem
        leading={<Avatar name="Grace Hopper" size="sm" decorative />}
        title="Grace Hopper"
        description="grace@example.com"
        trailing={
          <Button size="sm" variant="ghost">
            Manage
          </Button>
        }
      />
    </List>
  ),
};

export const Links: Story = {
  render: () => (
    <List ariaLabel="Documentation">
      <ListItem href="#" title="Getting started" description="Install and theme the package" />
      <ListItem href="#" title="Tokens" description="The two layers and what they promise" />
      <ListItem href="#" title="Accessibility" description="What CI enforces, and what it cannot" />
    </List>
  ),
};
