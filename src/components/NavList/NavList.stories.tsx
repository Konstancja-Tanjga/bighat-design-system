import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Badge } from '../Badge/Badge';

import { NavGroup, NavItem, NavList } from './NavList';

/**
 * The list a side panel is made of. It exists because the alternative — a stack
 * of buttons in a `<div>` — tells a screen reader nothing: no count, no group
 * name, and no relationship between the label above and the items below it.
 */
const meta: Meta<typeof NavList> = {
  title: 'Components/NavList',
  component: NavList,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavList>;

const pinned = [
  { id: 'nordwind', label: 'Nordwind sp. z o.o.', subline: 'Invoice INV-2043' },
  { id: 'kolej', label: 'Kolej Mazowiecka', subline: 'Payment confirmation' },
];

const recent = [
  { id: 'bakalie', label: 'Bakalie Nowak', subline: 'Overdue reminder sent' },
  { id: 'kropka', label: 'Studio Kropka', subline: 'New contract draft' },
  { id: 'ratusz', label: 'Ratusz Bydgoszcz', subline: 'Tender documents' },
];

const panel = { width: 260 };

export const Default: Story = {
  render: function Render() {
    const [current, setCurrent] = useState('nordwind');

    return (
      <div style={panel}>
        <NavList ariaLabel="Conversations">
          {[...pinned, ...recent].map((item) => (
            <NavItem key={item.id} item={item} active={item.id === current} onSelect={setCurrent} />
          ))}
        </NavList>
      </div>
    );
  },
};

export const Grouped: Story = {
  name: 'Two groups, two names',
  render: function Render() {
    const [current, setCurrent] = useState('kolej');

    return (
      <div style={{ ...panel, display: 'grid', gap: 16 }}>
        <NavGroup label="Pinned">
          {pinned.map((item) => (
            <NavItem key={item.id} item={item} active={item.id === current} onSelect={setCurrent} />
          ))}
        </NavGroup>
        <NavGroup label="Recent">
          {recent.map((item) => (
            <NavItem key={item.id} item={item} active={item.id === current} onSelect={setCurrent} />
          ))}
        </NavGroup>
      </div>
    );
  },
};

export const WithMeta: Story = {
  name: 'Counts in the trailing slot',
  render: () => (
    <div style={panel}>
      <NavGroup label="Saved views">
        <NavItem item={{ id: 'due', label: 'Due this week', meta: <Badge>12</Badge> }} />
        <NavItem
          item={{ id: 'overdue', label: 'Overdue', meta: <Badge tone="critical">3</Badge> }}
        />
        <NavItem item={{ id: 'draft', label: 'Drafts' }} />
      </NavGroup>
    </div>
  ),
};

export const LongContent: Story = {
  name: 'Long content',
  render: () => (
    <div style={panel}>
      <NavGroup label="Recent">
        <NavItem
          item={{
            id: 'long',
            label: 'Zakład Gospodarki Komunalnej i Mieszkaniowej w Nowym Dworze',
            subline: 'Re: annexe 4 to the maintenance contract, signed copy attached',
          }}
        />
        <NavItem item={{ id: 'short', label: 'PZU', subline: 'Policy renewal' }} />
      </NavGroup>
    </div>
  ),
};
