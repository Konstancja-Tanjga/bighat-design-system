import { Button } from '../Button/Button';
import { Select } from '../Select/Select';
import './Pagination.css';

/**
 * Paging over a set that is too large to render.
 *
 * Controlled, for the same reason `Table`'s sort is controlled: the day the
 * data outgrows one response the paging moves to the server, and a component
 * that owned the page number locally has to be rewritten. Owning it from the
 * start means the same component serves both.
 *
 * It reports a range and a total rather than a page count, because "showing
 * 21–40 of 312" is a fact about the data and "page 2 of 16" is a fact about
 * the component.
 */
export type PaginationProps = {
  /** Zero-based, so it indexes the data without arithmetic at the call site. */
  page: number;
  pageSize: number;
  /** Rows in the whole set, not on this page. `undefined` while unknown. */
  total?: number;
  onPageChange: (page: number) => void;
  /** Omit to hide the page-size control entirely. */
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  /** What is being counted: "invoices", "documents". Used in the summary. */
  unit?: string;
  /** Disables both controls while a request is in flight. */
  busy?: boolean;
};

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  pageSizeOptions,
  onPageSizeChange,
  unit = 'results',
  busy = false,
}: PaginationProps) {
  const first = total === 0 ? 0 : page * pageSize + 1;
  const last = total === undefined ? (page + 1) * pageSize : Math.min(total, (page + 1) * pageSize);
  const lastPage = total === undefined ? undefined : Math.max(0, Math.ceil(total / pageSize) - 1);

  const atStart = page <= 0;
  const atEnd = lastPage !== undefined && page >= lastPage;

  const summary =
    total === undefined
      ? `${first}–${last} of many ${unit}`
      : total === 0
        ? `No ${unit}`
        : `${first}–${last} of ${total} ${unit}`;

  return (
    <nav className="bh-pagination" aria-label="Pagination">
      {/* The summary is the component's output, so it is the live region.
          A screen reader hears the new range after Next, not just "button". */}
      <p className="bh-pagination__summary" aria-live="polite">
        {summary}
      </p>

      {pageSizeOptions && onPageSizeChange ? (
        <div className="bh-pagination__size">
          <Select
            label="Per page"
            value={String(pageSize)}
            disabled={busy}
            options={pageSizeOptions.map((size) => ({
              value: String(size),
              label: `${size} per page`,
            }))}
            onChange={(event) => {
              // Changing the page size while on page 5 would land the reader
              // somewhere they did not ask to be. Go back to the start.
              onPageSizeChange(Number(event.target.value));
              onPageChange(0);
            }}
          />
        </div>
      ) : null}

      <div className="bh-pagination__controls">
        <Button
          variant="secondary"
          size="sm"
          disabled={atStart || busy}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={atEnd || busy}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </nav>
  );
}
