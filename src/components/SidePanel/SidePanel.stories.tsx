import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../Button/Button';
import { DescriptionList } from '../DescriptionList/DescriptionList';
import { NavGroup, NavItem } from '../NavList/NavList';
import { SidePanel } from './SidePanel';

/**
 * A panel that stays open beside the main content while the reader works in
 * both: a folder tree on the leading edge, an invoice inspector on the
 * trailing one. It is an `<aside>` named by `ariaLabel`, and it deliberately
 * never traps focus or makes the page inert — that is what `Dialog` is for.
 */
const meta: Meta<typeof SidePanel> = {
  title: 'Components/SidePanel',
  component: SidePanel,
  tags: ['autodocs'],
  args: { ariaLabel: 'Folders', children: null },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=49-94',
    },
    layout: 'padded',
  },
  decorators: [
    // The panel fills the height of whatever holds it — in a product that is
    // an `AppShell` region. A fixed-height box stands in for one here.
    (Story) => (
      <div style={{ height: 440, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SidePanel>;

const folders = [
  { id: 'contracts', label: 'Contracts', subline: '48 documents' },
  { id: 'invoices', label: 'Invoices 2026', subline: '312 documents' },
  { id: 'hr', label: 'HR policies', subline: '17 documents' },
  { id: 'board', label: 'Board minutes', subline: '9 documents' },
];

const invoice = [
  { term: 'Invoice', value: 'INV-2043' },
  { term: 'Customer', value: 'Fabrikam Energy' },
  { term: 'Issued', value: '11 June 2026' },
  { term: 'Due', value: '11 July 2026' },
  { term: 'Amount', value: '€28,950.00' },
];

/** The common case: a named panel with a heading, one pinned action, a list and a footer. */
export const Default: Story = {
  args: {
    ariaLabel: 'Folders',
    title: 'Folders',
    header: (
      <Button size="sm" fullWidth>
        New folder
      </Button>
    ),
    footer: '4.2 GB of 10 GB used',
    children: (
      <NavGroup label="Shared with me">
        {folders.map((item) => (
          <NavItem key={item.id} item={item} active={item.id === 'invoices'} />
        ))}
      </NavGroup>
    ),
  },
};

/** Leading edge, for what the reader navigates by — folders, conversations, saved views. */
export const Start: Story = {
  args: {
    side: 'start',
    ariaLabel: 'Folders',
    title: 'Folders',
    children: (
      <NavGroup label="Shared with me">
        {folders.map((item) => (
          <NavItem key={item.id} item={item} active={item.id === 'contracts'} />
        ))}
      </NavGroup>
    ),
  },
};

/** Trailing edge, for detail about what is selected in the main area — an inspector. */
export const End: Story = {
  args: {
    side: 'end',
    ariaLabel: 'Invoice details',
    title: 'Invoice details',
    width: 300,
    children: <DescriptionList items={invoice} layout="rows" />,
  },
};

/** When the reader needs the width back for the main area but must keep a route to the panel. */
export const Collapsible: Story = {
  args: {
    ariaLabel: 'Folders',
    title: 'Folders',
    children: (
      <NavGroup label="Shared with me">
        {folders.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </NavGroup>
    ),
  },
  render: function Render(args) {
    const [collapsed, setCollapsed] = useState(false);
    return <SidePanel {...args} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />;
  },
  parameters: {
    docs: {
      description: {
        story:
          '`collapsed` is controlled: the panel calls `onToggle` and waits for you to flip the prop. Collapsed, it renders only a 36px strip with an "Expand Folders" button — the heading, header, list and footer are unmounted, so anything typed into them is gone when it reopens.',
      },
    },
  },
};
