import { useMemo, useState } from 'react';

import { AppBar } from '../components/AppBar/AppBar';
import { AppShell, SkipLink } from '../components/AppShell/AppShell';
import { Badge, type BadgeTone } from '../components/Badge/Badge';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { Button } from '../components/Button/Button';
import { DescriptionList } from '../components/DescriptionList/DescriptionList';
import { Divider } from '../components/Divider/Divider';
import { Input } from '../components/Input/Input';
import { NavRail } from '../components/NavRail/NavRail';
import { Pagination } from '../components/Pagination/Pagination';
import { Select } from '../components/Select/Select';
import { SidePanel } from '../components/SidePanel/SidePanel';
import { StateBlock } from '../components/StateBlock/StateBlock';
import { Table, type Column, type SortDirection } from '../components/Table/Table';
import { Toolbar } from '../components/Toolbar/Toolbar';
import { UserProfile } from '../components/UserProfile/UserProfile';
import { IconDoc, IconFlow, IconGrid, IconHome, IconInbox, IconStar } from './icons';
import './Records.css';

/**
 * Template — records list and detail.
 *
 * The most common enterprise screen there is, and the one the library had no
 * template for: a filtered, sorted, paged table with a detail panel beside it.
 *
 * It exists as much to test the system as to demonstrate it. Table, selection,
 * row actions, Pagination, SidePanel and DescriptionList all meet here, and a
 * seam between any two of them shows up on this screen before it shows up in a
 * product.
 *
 * The decision it carries: reading one record never costs the reader their
 * place among the others.
 */

type Status = 'paid' | 'pending' | 'overdue';

type Invoice = {
  id: string;
  customer: string;
  status: Status;
  issued: string;
  due: string;
  amount: number;
  owner: string;
};

const TONE: Record<Status, BadgeTone> = {
  paid: 'success',
  pending: 'warning',
  overdue: 'critical',
};

const currency = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' });

const NONE: Invoice[] = [];

const INVOICES: Invoice[] = [
  { id: 'INV-2041', customer: 'Northwind Trading', status: 'paid', issued: '2026-07-02', due: '2026-08-01', amount: 12400, owner: 'Ada Lovelace' },
  { id: 'INV-2042', customer: 'Contoso Logistics', status: 'pending', issued: '2026-07-04', due: '2026-08-03', amount: 3120, owner: 'Grace Hopper' },
  { id: 'INV-2043', customer: 'Fabrikam Energy', status: 'overdue', issued: '2026-06-11', due: '2026-07-11', amount: 28950, owner: 'Ada Lovelace' },
  { id: 'INV-2044', customer: 'Tailspin Aviation', status: 'paid', issued: '2026-07-09', due: '2026-08-08', amount: 640, owner: 'Katherine Johnson' },
  { id: 'INV-2045', customer: 'Proseware Media', status: 'pending', issued: '2026-07-12', due: '2026-08-11', amount: 8410, owner: 'Grace Hopper' },
  { id: 'INV-2046', customer: 'Wingtip Toys', status: 'overdue', issued: '2026-05-30', due: '2026-06-29', amount: 1975, owner: 'Katherine Johnson' },
  { id: 'INV-2047', customer: 'Adventure Works', status: 'paid', issued: '2026-07-15', due: '2026-08-14', amount: 22300, owner: 'Ada Lovelace' },
];

export type RecordsProps = {
  /** Which of the four states to render. Every template ships all four. */
  variant?: 'ready' | 'loading' | 'empty' | 'no-matches' | 'error';
};

export function Records({ variant = 'ready' }: RecordsProps) {
  const [query, setQuery] = useState(variant === 'no-matches' ? 'zzz' : '');
  const [status, setStatus] = useState<'all' | Status>('all');
  const [sort, setSort] = useState<{ key: string; direction: SortDirection }>({
    key: 'due',
    direction: 'ascending',
  });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // Nothing exists at all, versus nothing matches. Two different screens.
  // Both arrays are module constants, so the memo below actually memoises.
  const source = variant === 'empty' ? NONE : INVOICES;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return source.filter(
      (invoice) =>
        (status === 'all' || invoice.status === status) &&
        (needle === '' ||
          invoice.customer.toLowerCase().includes(needle) ||
          invoice.id.toLowerCase().includes(needle)),
    );
  }, [source, query, status]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const key = sort.key as keyof Invoice;
      const order = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      return sort.direction === 'ascending' ? order : -order;
    });
    return copy;
  }, [filtered, sort]);

  const pageRows = sorted.slice(page * pageSize, page * pageSize + pageSize);
  const open = INVOICES.find((invoice) => invoice.id === openId) ?? null;

  const columns: Array<Column<Invoice>> = [
    {
      key: 'id',
      header: 'Invoice',
      cell: (row) => (
        <button
          type="button"
          className="bh-records__link bh-focusable"
          onClick={() => setOpenId(row.id)}
        >
          {row.id}
        </button>
      ),
      sortable: true,
      width: '130px',
      priority: 1,
    },
    { key: 'customer', header: 'Customer', cell: (row) => row.customer, sortable: true, priority: 1 },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => <Badge tone={TONE[row.status]}>{row.status}</Badge>,
      width: '120px',
      priority: 2,
    },
    { key: 'due', header: 'Due', cell: (row) => row.due, sortable: true, width: '120px', priority: 2 },
    { key: 'owner', header: 'Owner', cell: (row) => row.owner, width: '160px', priority: 3 },
    {
      key: 'amount',
      header: 'Amount',
      cell: (row) => currency.format(row.amount),
      sortable: true,
      numeric: true,
      width: '130px',
      priority: 1,
    },
  ];

  /** The four states, chosen once rather than in five places below. */
  const state =
    variant === 'loading'
      ? { state: 'loading' as const, title: 'Loading invoices' }
      : variant === 'error'
        ? {
            state: 'error' as const,
            title: 'We could not load invoices',
            description: 'Nothing you have entered was lost. Try again in a moment.',
            action: <Button variant="secondary">Try again</Button>,
            diagnostics: 'request 8f2c41 · 503 from billing',
          }
        : source.length === 0
          ? {
              // Nothing exists. Explain what a record is, and offer the one
              // action that creates one.
              state: 'empty' as const,
              title: 'No invoices yet',
              description:
                'An invoice appears here once an order is confirmed and billed.',
              action: <Button>Create invoice</Button>,
            }
          : sorted.length === 0
            ? {
                // Records exist; none match. Never offer "create" here — it is
                // the wrong action, and offering the wrong one is worse than
                // offering neither.
                state: 'empty' as const,
                title: 'No invoices match these filters',
                description: 'Two filters are applied.',
                action: (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setQuery('');
                      setStatus('all');
                      setPage(0);
                    }}
                  >
                    Clear filters
                  </Button>
                ),
              }
            : undefined;

  const selectionCount = selected.size;

  return (
    <AppShell
      header={
        <AppBar
          brand={<strong>Billing</strong>}
          title="Invoices"
          center={<Breadcrumbs items={[{ label: 'Billing', href: '#' }, { label: 'Invoices' }]} />}
          actions={
            <>
              <Button variant="secondary">Export</Button>
              <Button>Create invoice</Button>
              <UserProfile name="Ada Lovelace" secondary="Finance" />
            </>
          }
        />
      }
      rail={
        <NavRail
          ariaLabel="Sections"
          activeId="invoices"
          items={[
            { id: 'home', label: 'Home', icon: <IconHome /> },
            { id: 'inbox', label: 'Inbox', icon: <IconInbox /> },
            { id: 'invoices', label: 'Invoices', icon: <IconDoc /> },
            { id: 'reports', label: 'Reports', icon: <IconGrid /> },
            { id: 'flows', label: 'Flows', icon: <IconFlow /> },
            { id: 'saved', label: 'Saved', icon: <IconStar /> },
          ]}
        />
      }
      aside={
        open ? (
          <SidePanel
            side="end"
            ariaLabel={`${open.id} detail`}
            title={open.id}
            header={
              <Button variant="ghost" size="sm" onClick={() => setOpenId(null)}>
                Close
              </Button>
            }
            footer={
              <>
                <Button variant="secondary">Open fully</Button>
                <Button>Mark paid</Button>
              </>
            }
          >
            <DescriptionList
              ariaLabel={`${open.id} detail`}
              items={[
                { term: 'Customer', value: open.customer },
                { term: 'Status', value: <Badge tone={TONE[open.status]}>{open.status}</Badge> },
                { term: 'Issued', value: open.issued },
                { term: 'Due', value: open.due },
                { term: 'Amount', value: currency.format(open.amount) },
                { term: 'Owner', value: open.owner },
                {
                  term: 'Lineage',
                  value: 'orders → f_auftrag → INV-series',
                  wide: true,
                },
              ]}
            />
          </SidePanel>
        ) : undefined
      }
    >
      <SkipLink />

      <div className="bh-records">
        <Toolbar
          ariaLabel="Filter invoices"
          end={
            selectionCount > 0 ? (
              // The action names the size of the set before it runs.
              <>
                <Button variant="secondary" onClick={() => setSelected(new Set())}>
                  Clear selection
                </Button>
                <Button tone="critical">
                  Archive {selectionCount} {selectionCount === 1 ? 'invoice' : 'invoices'}
                </Button>
              </>
            ) : undefined
          }
        >
          <Input
            label="Search"
            placeholder="Customer or invoice number"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(0);
            }}
          />
          <Select
            label="Status"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as 'all' | Status);
              setPage(0);
            }}
            options={[
              { value: 'all', label: 'Any status' },
              { value: 'paid', label: 'Paid' },
              { value: 'pending', label: 'Pending' },
              { value: 'overdue', label: 'Overdue' },
            ]}
          />
        </Toolbar>

        <Divider />

        <Table
          caption="Invoices"
          hideCaption
          columns={columns}
          rows={pageRows}
          rowKey={(row) => row.id}
          sort={sort}
          onSortChange={setSort}
          state={state}
          stickyHeader
          responsive="priority"
          selection={{ selected, onChange: setSelected, label: 'Select all invoices' }}
          rowActions={(row) => [
            { label: 'Open', onSelect: () => setOpenId(row.id) },
            { label: 'Download PDF' },
            { label: 'Send reminder', disabled: row.status === 'paid' },
            { label: 'Archive', tone: 'critical' },
          ]}
          totals={(rows) => [
            'Page total',
            '',
            '',
            '',
            '',
            currency.format(rows.reduce((sum, row) => sum + row.amount, 0)),
          ]}
        />

        {!state && (
          <Pagination
            page={page}
            pageSize={pageSize}
            total={sorted.length}
            unit="invoices"
            onPageChange={setPage}
            pageSizeOptions={[5, 10, 25]}
            onPageSizeChange={setPageSize}
          />
        )}

        {variant === 'loading' && (
          <p className="bh-visually-hidden">
            <StateBlock state="loading" density="inline" title="Loading invoices" />
          </p>
        )}
      </div>
    </AppShell>
  );
}
