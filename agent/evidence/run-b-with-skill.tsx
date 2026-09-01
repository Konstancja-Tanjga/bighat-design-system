import { useMemo, useState } from 'react';

import { AppBar } from './components/AppBar/AppBar';
import { AppShell, SkipLink } from './components/AppShell/AppShell';
import { Badge, type BadgeTone } from './components/Badge/Badge';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Select } from './components/Select/Select';
import { SidePanel } from './components/SidePanel/SidePanel';
import { Skeleton, SkeletonGroup } from './components/Skeleton/Skeleton';
import { StateBlock } from './components/StateBlock/StateBlock';
import { StatusBar } from './components/StatusBar/StatusBar';
import { Table, type Column, type SortDirection } from './components/Table/Table';
import { cssVar } from './tokens';

/**
 * Invoices — the billing list screen.
 *
 * Four surfaces, not one: the list itself, the wait, the failure and the two
 * different kinds of empty. The last pair is the part that is easy to get
 * wrong — "you have not created an invoice yet" and "nothing matches this
 * filter" are different problems with different exits, so they are written
 * separately here.
 *
 * Everything visual comes from semantic tokens via `cssVar`, so the screen
 * flips with the theme and survives a rebrand without an edit.
 */

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

export type Invoice = {
  id: string;
  /** Human-facing document number, e.g. `INV-2041`. */
  number: string;
  customer: string;
  status: InvoiceStatus;
  /** Gross total in major units of `currency`. */
  amount: number;
  /** ISO 4217, e.g. `PLN`, `EUR`. */
  currency: string;
};

/** What the billing service told us when the request failed. */
export type InvoicesError = {
  /** Passed to support verbatim; rendered inside the collapsed diagnostics. */
  correlationId?: string;
  httpStatus?: number;
};

export type InvoicesScreenProps = {
  invoices: Invoice[];
  loading?: boolean;
  error?: InvoicesError | null;
  /** Retries the failed request. */
  onRetry: () => void;
  /** Starts the create-invoice flow — the exit from the first-use empty state. */
  onCreateInvoice: () => void;
  /** Omit to hide the export action rather than render one that does nothing. */
  onExport?: () => void;
  /** Where an invoice number links to. Opening a record is navigation, not an action. */
  invoiceHref?: (invoice: Invoice) => string;
  /** Drives number and currency formatting. */
  locale?: string;
};

/**
 * Status carries its meaning in the label; the tone is the redundant cue.
 * A dot with no text would fail WCAG 1.4.1, which is why `Badge` has a label
 * and no colour prop.
 */
const STATUS: Record<InvoiceStatus, { label: string; tone: BadgeTone }> = {
  draft: { label: 'Draft', tone: 'neutral' },
  sent: { label: 'Sent', tone: 'info' },
  overdue: { label: 'Overdue', tone: 'critical' },
  paid: { label: 'Paid', tone: 'success' },
  cancelled: { label: 'Cancelled', tone: 'neutral' },
};

/** Sorting by status sorts by lifecycle, not alphabetically. */
const STATUS_ORDER: InvoiceStatus[] = ['draft', 'sent', 'overdue', 'paid', 'cancelled'];

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  ...STATUS_ORDER.map((status) => ({ value: status, label: STATUS[status].label })),
];

/** Money that is still owed. Drafts and cancellations are not receivables. */
const OUTSTANDING: InvoiceStatus[] = ['sent', 'overdue'];

/** Shared by the table columns and the loading skeleton so the layout does not shift. */
const TRACKS = ['150px', 'minmax(200px, 1fr)', '140px', '160px'];

type StatusFilter = 'all' | InvoiceStatus;

function useMoneyFormatter(locale: string) {
  return useMemo(() => {
    const cache = new Map<string, Intl.NumberFormat>();
    return (amount: number, currency: string) => {
      let formatter = cache.get(currency);
      if (!formatter) {
        formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });
        cache.set(currency, formatter);
      }
      return formatter.format(amount);
    };
  }, [locale]);
}

export function InvoicesScreen({
  invoices,
  loading = false,
  error = null,
  onRetry,
  onCreateInvoice,
  onExport,
  invoiceHref = (invoice) => `#/invoices/${invoice.id}`,
  locale = 'en-GB',
}: InvoicesScreenProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [sort, setSort] = useState<{ key: string; direction: SortDirection }>({
    key: 'number',
    direction: 'descending',
  });

  const money = useMoneyFormatter(locale);
  const filtersActive = query.trim() !== '' || status !== 'all';

  const clearFilters = () => {
    setQuery('');
    setStatus('all');
  };

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = invoices.filter((invoice) => {
      if (status !== 'all' && invoice.status !== status) return false;
      if (!needle) return true;
      return (
        invoice.number.toLowerCase().includes(needle) ||
        invoice.customer.toLowerCase().includes(needle)
      );
    });

    const direction = sort.direction === 'ascending' ? 1 : -1;
    const compare = (a: Invoice, b: Invoice) => {
      switch (sort.key) {
        case 'customer':
          return a.customer.localeCompare(b.customer, locale);
        case 'status':
          return STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
        case 'amount':
          return a.amount - b.amount;
        default:
          return a.number.localeCompare(b.number, locale, { numeric: true });
      }
    };

    return [...filtered].sort((a, b) => compare(a, b) * direction);
  }, [invoices, query, status, sort, locale]);

  /**
   * Summed per currency and never across them — one number made of three
   * currencies is a wrong number rendered confidently.
   */
  const outstanding = useMemo(() => {
    const totals = new Map<string, number>();
    for (const invoice of rows) {
      if (!OUTSTANDING.includes(invoice.status)) continue;
      totals.set(invoice.currency, (totals.get(invoice.currency) ?? 0) + invoice.amount);
    }
    if (totals.size === 0) return money(0, rows[0]?.currency ?? 'EUR');
    return [...totals.entries()].map(([currency, total]) => money(total, currency)).join(' · ');
  }, [rows, money]);

  const columns: Array<Column<Invoice>> = [
    {
      key: 'number',
      header: 'Invoice',
      sortable: true,
      width: TRACKS[0],
      cell: (invoice) => (
        <a
          href={invoiceHref(invoice)}
          className="bh-focusable"
          style={{ color: cssVar('text.link'), fontVariantNumeric: 'tabular-nums' }}
        >
          {invoice.number}
        </a>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      sortable: true,
      width: TRACKS[1],
      cell: (invoice) => invoice.customer,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: TRACKS[2],
      cell: (invoice) => (
        <Badge tone={STATUS[invoice.status].tone}>{STATUS[invoice.status].label}</Badge>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      align: 'end',
      width: TRACKS[3],
      cell: (invoice) => (
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>
          {money(invoice.amount, invoice.currency)}
        </span>
      ),
    },
  ];

  /**
   * Empty is two screens. First use needs a way to create the first invoice;
   * filtered-to-nothing needs a way back out of the filter. Using one message
   * for both leaves half the users with no exit.
   */
  const emptyState =
    rows.length > 0
      ? undefined
      : filtersActive
        ? {
            state: 'empty' as const,
            title: 'No invoices match these filters',
            description: 'Try a different status, or clear the filters to see every invoice.',
            action: (
              <Button size="sm" variant="secondary" onClick={clearFilters}>
                Clear filters
              </Button>
            ),
          }
        : {
            state: 'empty' as const,
            icon: '📄',
            title: 'No invoices yet',
            description: 'Invoices you create or import from billing will be listed here.',
            action: (
              <Button size="sm" onClick={onCreateInvoice}>
                New invoice
              </Button>
            ),
          };

  return (
    <AppShell
      header={
        <>
          <SkipLink />
          <AppBar
            brand={
              <>
                <span
                  aria-hidden="true"
                  style={{ fontWeight: 700, color: cssVar('action.primary.bg') }}
                >
                  bh<sup>◆</sup>
                </span>
                <span className="bh-visually-hidden">Big Hat Poland</span>
              </>
            }
            title="Invoices"
            // The screen carries its own <h1> below, with the counts beside it.
            titleAsHeading={false}
            actions={
              <>
                {onExport && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={onExport}
                    disabled={loading || !!error}
                  >
                    Export
                  </Button>
                )}
                <Button size="sm" onClick={onCreateInvoice}>
                  New invoice
                </Button>
              </>
            }
          />
        </>
      }
      sidebar={
        <SidePanel
          ariaLabel="Invoice filters"
          title="Filters"
          width={248}
          header={
            <Input
              label="Search invoices"
              hideLabel
              type="search"
              placeholder="Number or customer"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              disabled={loading || !!error}
            />
          }
          footer={
            filtersActive ? (
              <Button variant="secondary" size="sm" fullWidth onClick={clearFilters}>
                Clear filters
              </Button>
            ) : undefined
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: cssVar('gap.normal') }}>
            <Select
              label="Status"
              options={STATUS_OPTIONS}
              value={status}
              onChange={(event) => setStatus(event.target.value as StatusFilter)}
              disabled={loading || !!error}
            />
          </div>
        </SidePanel>
      }
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: cssVar('padding.section'),
          padding: cssVar('padding.section'),
          minHeight: 0,
        }}
      >
        <header style={{ display: 'flex', flexDirection: 'column', gap: cssVar('gap.tight') }}>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 600 }}>Invoices</h1>
          <p style={{ margin: 0, color: cssVar('text.muted') }}>
            {error
              ? 'Billing data is unavailable.'
              : loading
                ? 'Loading the latest invoices from billing.'
                : `${rows.length} of ${invoices.length} invoices · ${outstanding} outstanding`}
          </p>
        </header>

        {error ? (
          /* The whole view failed, so the failure owns the whole view — an empty
             set of column headers above an error says the list is empty, which
             is a claim we cannot make. */
          <StateBlock
            state="error"
            density="page"
            title="We could not load your invoices"
            description="The billing service did not respond. Nothing has been created, sent or paid."
            action={
              <Button size="sm" onClick={onRetry}>
                Try again
              </Button>
            }
            diagnostics={
              error.correlationId || error.httpStatus
                ? [
                    error.correlationId && `correlation-id: ${error.correlationId}`,
                    error.httpStatus && `HTTP ${error.httpStatus}`,
                  ]
                    .filter(Boolean)
                    .join(' · ')
                : undefined
            }
          />
        ) : loading ? (
          /* The shape is known — a header row and rows on the same tracks the
             real table uses — so the eye settles into a layout that will not
             move when the data lands. */
          <SkeletonGroup label="Loading invoices">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: cssVar('gap.normal'),
                padding: cssVar('gap.normal'),
                border: `1px solid ${cssVar('border.subtle')}`,
                borderRadius: cssVar('radius.surface'),
                background: cssVar('surface.raised'),
              }}
            >
              {Array.from({ length: 9 }, (_, row) => (
                <div
                  key={row}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: TRACKS.join(' '),
                    gap: cssVar('gap.normal'),
                    alignItems: 'center',
                  }}
                >
                  <Skeleton width={row === 0 ? 64 : 96} height={row === 0 ? 10 : 13} />
                  <Skeleton width={row === 0 ? 72 : '70%'} height={row === 0 ? 10 : 13} />
                  <Skeleton
                    width={row === 0 ? 52 : 84}
                    height={row === 0 ? 10 : 20}
                    radius="pill"
                  />
                  <Skeleton width={row === 0 ? 56 : 88} height={row === 0 ? 10 : 13} />
                </div>
              ))}
            </div>
          </SkeletonGroup>
        ) : (
          <Table
            caption="Invoices matching the current filters"
            hideCaption
            columns={columns}
            rows={rows}
            rowKey={(invoice) => invoice.id}
            sort={sort}
            onSortChange={setSort}
            state={emptyState}
          />
        )}

        <StatusBar
          ariaLabel="Invoice summary"
          items={
            error || loading
              ? []
              : [
                  { label: 'Showing', value: `${rows.length} of ${invoices.length}` },
                  { label: 'Outstanding', value: outstanding },
                ]
          }
          // Polite: the count changing under a filter is worth hearing, but not
          // worth interrupting whatever the user is reading.
          message={
            !error && !loading && filtersActive
              ? `${rows.length} ${rows.length === 1 ? 'invoice' : 'invoices'} match the current filters.`
              : ''
          }
        />
      </div>
    </AppShell>
  );
}
