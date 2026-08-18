import { useMemo, useState } from 'react';

import { Badge, type BadgeTone } from './components/Badge/Badge';
import { Button } from './components/Button/Button';
import { Divider } from './components/Divider/Divider';
import { Input } from './components/Input/Input';
import { Select } from './components/Select/Select';
import { StateBlock, type StateBlockProps } from './components/StateBlock/StateBlock';
import { Table, type Column, type SortDirection } from './components/Table/Table';
import { Toolbar } from './components/Toolbar/Toolbar';

/**
 * Invoices — list screen.
 *
 * Fetching is deliberately not done here. The screen takes the request outcome
 * as props (`requestState`), which is what lets the empty, loading and error
 * cases be rendered on demand in a story or a test instead of being reachable
 * only by breaking the network.
 *
 * Two states are kept apart that products usually collapse into one:
 * *you have no invoices yet* wants an onboarding action, *nothing matches your
 * filters* wants a way back out of the filters. Both are `StateBlock`, because
 * the system has exactly one vocabulary for "nothing here".
 */

export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue';

export type Invoice = {
  id: string;
  /** Human-facing document number, e.g. `INV-2041`. */
  number: string;
  customer: string;
  status: InvoiceStatus;
  /** Minor units are not used here — the API returns a decimal amount. */
  amount: number;
  /** ISO 4217. Defaults to the screen's `currency` when omitted. */
  currency?: string;
};

/** What the last request did, not what the data looks like. */
export type InvoicesRequestState = 'loading' | 'error' | 'ready';

export type InvoicesScreenProps = {
  invoices?: Invoice[];
  requestState?: InvoicesRequestState;
  /**
   * Shown inside the error state's `<details>`. A correlation id and a status
   * code, never a stack trace — the user may well be reading it out to support.
   */
  errorDiagnostics?: string;
  /** Omit to hide the retry affordance rather than render a dead button. */
  onRetry?: () => void;
  onCreateInvoice?: () => void;
  onSelectInvoice?: (invoice: Invoice) => void;
  locale?: string;
  /** Fallback currency for rows that do not carry their own. */
  currency?: string;
};

/**
 * Tone reinforces the label, it never replaces it — a status that only exists
 * as a colour fails WCAG 1.4.1.
 */
const STATUS: Record<InvoiceStatus, { label: string; tone: BadgeTone }> = {
  draft: { label: 'Draft', tone: 'neutral' },
  pending: { label: 'Pending', tone: 'warning' },
  paid: { label: 'Paid', tone: 'success' },
  overdue: { label: 'Overdue', tone: 'critical' },
};

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  ...(Object.keys(STATUS) as InvoiceStatus[]).map((value) => ({
    value,
    label: STATUS[value].label,
  })),
];

type SortKey = 'number' | 'customer' | 'status' | 'amount';

const SORT_VALUE: Record<SortKey, (invoice: Invoice) => string | number> = {
  number: (invoice) => invoice.number,
  customer: (invoice) => invoice.customer.toLocaleLowerCase(),
  status: (invoice) => STATUS[invoice.status].label,
  amount: (invoice) => invoice.amount,
};

export function InvoicesScreen({
  invoices = [],
  requestState = 'ready',
  errorDiagnostics,
  onRetry,
  onCreateInvoice,
  onSelectInvoice,
  locale = 'en-GB',
  currency = 'EUR',
}: InvoicesScreenProps) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all');
  // Controlled, so the day this list is paginated on the server the sort moves
  // with it and this component does not change.
  const [sort, setSort] = useState<{ key: string; direction: SortDirection }>({
    key: 'number',
    direction: 'ascending',
  });

  const money = useMemo(
    () => (amount: number, code: string | undefined) =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: code ?? currency,
      }).format(amount),
    [locale, currency],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();

    const matches = invoices.filter((invoice) => {
      if (statusFilter !== 'all' && invoice.status !== statusFilter) return false;
      if (!needle) return true;
      return (
        invoice.number.toLocaleLowerCase().includes(needle) ||
        invoice.customer.toLocaleLowerCase().includes(needle)
      );
    });

    const read = SORT_VALUE[sort.key as SortKey] ?? SORT_VALUE.number;
    const factor = sort.direction === 'ascending' ? 1 : -1;

    return matches.sort((a, b) => {
      const left = read(a);
      const right = read(b);
      if (left === right) return a.number.localeCompare(b.number);
      return left > right ? factor : -factor;
    });
  }, [invoices, query, statusFilter, sort]);

  const isFiltered = query.trim() !== '' || statusFilter !== 'all';

  const clearFilters = () => {
    setQuery('');
    setStatusFilter('all');
  };

  const columns: Array<Column<Invoice>> = [
    {
      key: 'number',
      header: 'Invoice',
      sortable: true,
      width: '150px',
      cell: (invoice) =>
        onSelectInvoice ? (
          <Button variant="ghost" size="sm" onClick={() => onSelectInvoice(invoice)}>
            {invoice.number}
          </Button>
        ) : (
          invoice.number
        ),
    },
    {
      key: 'customer',
      header: 'Customer',
      sortable: true,
      width: 'minmax(200px, 1fr)',
      cell: (invoice) => invoice.customer,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: '140px',
      cell: (invoice) => (
        <Badge tone={STATUS[invoice.status].tone} dot>
          {STATUS[invoice.status].label}
        </Badge>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      align: 'end',
      width: '160px',
      cell: (invoice) => money(invoice.amount, invoice.currency),
    },
  ];

  const tableState = resolveState({
    requestState,
    total: invoices.length,
    visible: filtered.length,
    onRetry,
    onCreateInvoice,
    onClearFilters: clearFilters,
    errorDiagnostics,
  });

  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--bh-gap-loose)',
        padding: 'var(--bh-padding-section)',
      }}
    >
      <header style={{ display: 'grid', gap: 'var(--bh-gap-tight)' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: 'var(--bh-text-primary)' }}>
          Invoices
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--bh-text-muted)' }}>
          {summary({ requestState, total: invoices.length, visible: filtered.length, isFiltered })}
        </p>
      </header>

      <Toolbar
        ariaLabel="Invoice list"
        flush
        end={
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--bh-gap-snug)' }}>
            <Input
              label="Search invoices"
              hideLabel
              type="search"
              placeholder="Invoice number or customer"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              // Filtering is client-side and instant, so the field must not
              // claim to be a form that gets submitted.
              disabled={requestState !== 'ready'}
            />
            <Select
              label="Status"
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as InvoiceStatus | 'all')}
              disabled={requestState !== 'ready'}
            />
          </div>
        }
      >
        <Button size="sm" onClick={onCreateInvoice} disabled={!onCreateInvoice}>
          New invoice
        </Button>
        <Divider orientation="vertical" spacing="none" />
        <Button
          size="sm"
          variant="ghost"
          onClick={clearFilters}
          disabled={!isFiltered || requestState !== 'ready'}
        >
          Clear filters
        </Button>
      </Toolbar>

      {/* Polite, because the count changes as the user types and must not cut
          across what they are reading. The table itself stays silent. */}
      <p className="bh-visually-hidden" role="status">
        {requestState === 'ready'
          ? `${filtered.length} ${filtered.length === 1 ? 'invoice' : 'invoices'} shown`
          : ''}
      </p>

      <Table
        caption="Invoices"
        hideCaption
        columns={columns}
        rows={tableState ? [] : filtered}
        rowKey={(invoice) => invoice.id}
        sort={sort}
        onSortChange={setSort}
        state={tableState}
      />
    </div>
  );
}

function summary({
  requestState,
  total,
  visible,
  isFiltered,
}: {
  requestState: InvoicesRequestState;
  total: number;
  visible: number;
  isFiltered: boolean;
}) {
  if (requestState === 'loading') return 'Loading the latest invoices…';
  if (requestState === 'error') return 'Showing nothing until the billing service responds.';
  if (total === 0) return 'Invoices you issue will be listed here.';
  if (isFiltered) return `${visible} of ${total} invoices match the current filters.`;
  return `${total} ${total === 1 ? 'invoice' : 'invoices'}.`;
}

/**
 * Returns the `StateBlock` the table body should be replaced with, or
 * `undefined` when there are rows to show. Kept out of the component body so
 * the ordering of the three non-happy paths is readable in one place.
 */
function resolveState({
  requestState,
  total,
  visible,
  onRetry,
  onCreateInvoice,
  onClearFilters,
  errorDiagnostics,
}: {
  requestState: InvoicesRequestState;
  total: number;
  visible: number;
  onRetry?: () => void;
  onCreateInvoice?: () => void;
  onClearFilters: () => void;
  errorDiagnostics?: string;
}): StateBlockProps | undefined {
  if (requestState === 'loading') {
    return { state: 'loading', title: 'Loading invoices' };
  }

  if (requestState === 'error') {
    return {
      state: 'error',
      icon: '⚠',
      title: 'We could not load your invoices',
      // What the user can do, and the reassurance they actually want: a failed
      // read did not change anything.
      description: 'The billing service did not respond. Nothing has been changed or sent.',
      action: onRetry ? (
        <Button size="sm" onClick={onRetry}>
          Try again
        </Button>
      ) : undefined,
      diagnostics: errorDiagnostics,
    };
  }

  if (total === 0) {
    return {
      state: 'empty',
      icon: '📄',
      title: 'No invoices yet',
      description: 'Create your first invoice and it will appear here as soon as it is issued.',
      action: onCreateInvoice ? (
        <Button size="sm" onClick={onCreateInvoice}>
          New invoice
        </Button>
      ) : undefined,
    };
  }

  if (visible === 0) {
    return {
      state: 'empty',
      icon: '🔍',
      title: 'No invoices match these filters',
      description: 'Try a different status, or search for another customer.',
      action: (
        <Button size="sm" variant="secondary" onClick={onClearFilters}>
          Clear filters
        </Button>
      ),
    };
  }

  return undefined;
}
