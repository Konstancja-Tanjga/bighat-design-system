import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { NavRail } from './NavRail';

/**
 * The narrow icon rail down the left edge of an application.
 *
 * Icons are Material Symbols, loaded from Google Fonts — see Foundations →
 * Iconography. The glyph is a ligature, so the element's text content is the
 * icon's name, which is why the icon and its label cannot drift apart here.
 */
const meta: Meta<typeof NavRail> = {
  title: 'Components/NavRail',
  component: NavRail,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavRail>;

const Icon = ({ name }: { name: string }) => (
  <span className="material-symbols-outlined" style={{ fontSize: 22, lineHeight: 1 }}>
    {name}
  </span>
);

const items = [
  { id: 'inbox', label: 'Inbox', icon: <Icon name="inbox" />, badge: true },
  { id: 'invoices', label: 'Invoices', icon: <Icon name="receipt_long" /> },
  { id: 'customers', label: 'Customers', icon: <Icon name="apartment" /> },
  { id: 'reports', label: 'Reports', icon: <Icon name="monitoring" /> },
];

const footerItems = [
  { id: 'help', label: 'Help', icon: <Icon name="help" /> },
  { id: 'settings', label: 'Settings', icon: <Icon name="settings" /> },
];

const frame = { height: 340, display: 'flex' };

export const Default: Story = {
  render: function Render() {
    const [current, setCurrent] = useState('invoices');

    return (
      <div style={frame}>
        <NavRail
          items={items}
          footerItems={footerItems}
          activeId={current}
          onSelect={setCurrent}
          ariaLabel="Primary"
        />
      </div>
    );
  },
};

export const WithLabels: Story = {
  name: 'Captions on',
  render: function Render() {
    const [current, setCurrent] = useState('reports');

    return (
      <div style={frame}>
        <NavRail
          items={[
            ...items,
            { id: 'ledger', label: 'Ledger', icon: <Icon name="account_balance" /> },
            { id: 'exports', label: 'Exports', icon: <Icon name="download" /> },
          ]}
          footerItems={footerItems}
          activeId={current}
          onSelect={setCurrent}
          showLabels
          ariaLabel="Primary"
        />
      </div>
    );
  },
};

export const TwoRails: Story = {
  name: 'Two rails, two names',
  render: () => (
    <div style={{ ...frame, gap: 24 }}>
      <NavRail items={items} activeId="inbox" ariaLabel="Primary" />
      <NavRail
        items={[
          { id: 'filters', label: 'Filters', icon: <Icon name="filter_alt" /> },
          { id: 'history', label: 'History', icon: <Icon name="history" /> },
          { id: 'notes', label: 'Notes', icon: <Icon name="sticky_note_2" /> },
        ]}
        activeId="filters"
        ariaLabel="Invoice tools"
      />
    </div>
  ),
};
