import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Table, type Column, type SortDirection, type TableProps } from './Table';

type Invoice = {
  id: string;
  customer: string;
  status: 'paid' | 'pending' | 'overdue';
  amount: number;
};

const invoices: Invoice[] = [
  { id: 'INV-2041', customer: 'Northwind Trading', status: 'paid', amount: 12400 },
  { id: 'INV-2042', customer: 'Contoso Logistics', status: 'pending', amount: 3120 },
  { id: 'INV-2043', customer: 'Fabrikam Energy', status: 'overdue', amount: 28950 },
  { id: 'INV-2044', customer: 'Tailspin Aviation', status: 'paid', amount: 640 },
];

const currency = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' });

const statusTone = { paid: 'success', pending: 'warning', overdue: 'critical' } as const;

const columns: Array<Column<Invoice>> = [
  { key: 'id', header: 'Invoice', cell: (row) => row.id, sortable: true, width: '140px' },
  { key: 'customer', header: 'Customer', cell: (row) => row.customer, sortable: true },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => <Badge tone={statusTone[row.status]}>{row.status}</Badge>,
    width: '140px',
  },
  {
    key: 'amount',
    header: 'Amount',
    cell: (row) => currency.format(row.amount),
    sortable: true,
    align: 'end',
    width: '140px',
  },
];

// Typed against the props rather than `typeof Table`: the component is generic,
// and `typeof Table` collapses `Row` to `unknown` before the stories see it.
const meta: Meta<TableProps<Invoice>> = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<TableProps<Invoice>>;

export const Sortable: Story = {
  args: { caption: 'Invoices', columns, rows: invoices, rowKey: (row) => row.id },
  render: function Render(args) {
    const [sort, setSort] = useState<{ key: string; direction: SortDirection }>({
      key: 'id',
      direction: 'ascending',
    });

    const sorted = [...invoices].sort((a, b) => {
      const key = sort.key as keyof Invoice;
      const factor = sort.direction === 'ascending' ? 1 : -1;
      return a[key] > b[key] ? factor : a[key] < b[key] ? -factor : 0;
    });

    return <Table {...args} rows={sorted} sort={sort} onSortChange={setSort} />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sort is a controlled prop. The day this table has 200 rows the sort moves to the server, and nothing about the component changes — which is the whole reason it was never internal state.',
      },
    },
  },
};

export const EmptyState: Story = {
  name: 'Empty',
  args: {
    caption: 'Invoices',
    columns,
    rows: [],
    rowKey: (row) => row.id,
    state: {
      state: 'empty',
      icon: '📄',
      title: 'No invoices match these filters',
      description: 'Try widening the date range.',
      action: (
        <Button size="sm" variant="secondary">
          Clear filters
        </Button>
      ),
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'The table does not own an empty state. It renders a `StateBlock` across every column, so the same words and the same layout appear whether the thing that is empty is a table, a panel or a route.',
      },
    },
  },
};

export const LoadingState: Story = {
  name: 'Loading',
  args: {
    caption: 'Invoices',
    columns,
    rows: [],
    rowKey: (row) => row.id,
    state: { state: 'loading', title: 'Loading invoices' },
  },
};

export const ErrorState: Story = {
  name: 'Error',
  args: {
    caption: 'Invoices',
    columns,
    rows: [],
    rowKey: (row) => row.id,
    state: {
      state: 'error',
      icon: '⚠',
      title: 'We could not load your invoices',
      description: 'The billing service did not respond. Your data has not changed.',
      action: <Button size="sm">Try again</Button>,
      diagnostics: 'correlation-id: 8f2c1a94 · HTTP 503',
    },
  },
};
