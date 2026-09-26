import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppBar } from '../AppBar/AppBar';
import { Button } from '../Button/Button';
import { NavItem, NavList } from '../NavList/NavList';
import { NavRail } from '../NavRail/NavRail';
import { SidePanel } from '../SidePanel/SidePanel';
import { Table } from '../Table/Table';
import { AppShell, SkipLink } from './AppShell';

/**
 * The frame an application screen sits in: an optional header, rail, leading
 * panel and trailing panel around the one `<main>` on the page. It exists so
 * that the landmark structure is decided once — a product that builds its own
 * grid out of `<div>`s ships a page a screen-reader user cannot move around by
 * region, and nothing in the build tells it so.
 *
 * Scaffolded from packages/spec/components/app-shell.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof AppShell> = {
  title: 'Components/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // `fill` is `100dvh`. Rendered inline on the docs page, every story would
    // be a full viewport tall and each would add another `#main-content`.
    docs: { story: { inline: false, height: '520px' } },
  },
};
export default meta;

type Story = StoryObj<typeof AppShell>;

type Invoice = {
  id: string;
  customer: string;
  due: string;
  amount: string;
};

const invoices: Invoice[] = [
  { id: 'INV-2291', customer: 'Northwind Freight', due: '3 Oct 2026', amount: '€4,120.00' },
  { id: 'INV-2290', customer: 'Kowalski & Nowak', due: '30 Sep 2026', amount: '€860.50' },
  { id: 'INV-2288', customer: 'Harbour Dental', due: '28 Sep 2026', amount: '€1,245.00' },
  { id: 'INV-2285', customer: 'Tatra Outdoor', due: '21 Sep 2026', amount: '€12,900.00' },
];

const header = (
  <>
    <SkipLink />
    <AppBar brand="Ledgerline" title="Invoices" actions={<Button>New invoice</Button>} />
  </>
);

const rail = (
  <NavRail
    ariaLabel="Product areas"
    activeId="invoices"
    items={[
      { id: 'invoices', label: 'Invoices', icon: '▤' },
      { id: 'customers', label: 'Customers', icon: '◎' },
      { id: 'reports', label: 'Reports', icon: '▥' },
    ]}
    footerItems={[{ id: 'settings', label: 'Settings', icon: '⚙' }]}
  />
);

const sidebar = (
  <SidePanel ariaLabel="Saved views" title="Saved views">
    <NavList>
      <NavItem item={{ id: 'all', label: 'All invoices', subline: '1,284' }} active />
      <NavItem item={{ id: 'overdue', label: 'Overdue', subline: '17' }} />
      <NavItem item={{ id: 'drafts', label: 'Drafts', subline: '4' }} />
    </NavList>
  </SidePanel>
);

const invoiceTable = (
  <div style={{ padding: 'var(--bh-padding-section)' }}>
    <Table<Invoice>
      caption="Invoices"
      hideCaption
      rows={invoices}
      rowKey={(row) => row.id}
      columns={[
        { key: 'id', header: 'Invoice', cell: (row) => row.id },
        { key: 'customer', header: 'Customer', cell: (row) => row.customer },
        { key: 'due', header: 'Due', cell: (row) => row.due },
        { key: 'amount', header: 'Amount', cell: (row) => row.amount, numeric: true },
      ]}
    />
  </div>
);

/** The shape most screens start from: a header with the skip link first, a rail of product areas, a panel of views, and the work in `main`. */
export const Default: Story = {
  args: {
    header,
    rail,
    sidebar,
    children: invoiceTable,
  },
};

/** The default, with a trailing panel: an application screen where the header and panels stay put and only the region under the pointer scrolls. */
export const Fill: Story = {
  args: {
    height: 'fill',
    header,
    rail,
    sidebar,
    aside: (
      <SidePanel ariaLabel="Invoice INV-2291" title="INV-2291" side="end">
        <p>Northwind Freight · due 3 Oct 2026 · €4,120.00</p>
        <p>Reminder sent 26 Sep. No reply yet.</p>
      </SidePanel>
    ),
    children: invoiceTable,
  },
};

/** For a page read top to bottom — release notes, a help article — where the browser's own scroll bar should move the whole document, header included. */
export const Flow: Story = {
  args: {
    height: 'flow',
    header: (
      <>
        <SkipLink />
        <AppBar brand="Ledgerline" title="Release notes" />
      </>
    ),
    children: (
      <article style={{ padding: 'var(--bh-padding-section)', maxWidth: '68ch' }}>
        <h2>September 2026</h2>
        <p>
          Reminders now go out in the customer&rsquo;s own language, taken from the contact record
          rather than the account default. Existing schedules keep their current language until the
          next invoice is issued.
        </p>
        <h2>August 2026</h2>
        <p>
          Credit notes can be issued against part of an invoice. The original stays open for the
          remaining balance, and both documents show the link between them.
        </p>
        <p>
          Exports to CSV include the payment reference column, so a bank reconciliation no longer
          needs a second export from the payments screen.
        </p>
      </article>
    ),
  },
};
