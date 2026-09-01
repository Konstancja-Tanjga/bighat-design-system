import type { ReactNode } from 'react';

import { Checkbox } from '../Checkbox/Checkbox';
import { DescriptionList } from '../DescriptionList/DescriptionList';
import { Menu, type MenuItem } from '../Menu/Menu';
import { StateBlock, type StateBlockProps } from '../StateBlock/StateBlock';
import './Table.css';

/**
 * Dense enterprise data.
 *
 * Decisions worth defending:
 *
 * 1. Sorting is a *controlled* prop, not internal state. The moment a table
 *    holds 200 rows the sort moves to the server, and a component that owns
 *    the sort locally has to be rewritten. Owning it from the start means the
 *    same component serves both. `Pagination` is controlled for this reason
 *    too.
 * 2. Empty, loading and error are not booleans on the table — they are
 *    delegated to `StateBlock`. One vocabulary for "nothing here", used by the
 *    table, the panel and the whole page.
 * 3. The narrow form is *declared*, never guessed. Which form is right depends
 *    on whether the reader is scanning for one row or comparing across many,
 *    and that is a fact about the screen rather than about the data. A
 *    component choosing for itself would be choosing blind.
 * 4. It responds to its own width, not the window's. The same table sits in
 *    `main` at 1200px, in a `SidePanel` at 432px and inside a `Card` at 280px
 *    on one screen, so the queries are `@container`.
 */
export type SortDirection = 'ascending' | 'descending';

/**
 * `scroll`   — the grid is kept and the container scrolls. Right for a wide
 *              table where the reader is comparing across columns and any
 *              collapse destroys the comparison.
 * `stack`    — each row becomes term-and-value pairs, so a value keeps its
 *              label. Right at six columns or fewer, where every value counts.
 * `priority` — low-priority columns leave the grid and move into a per-row
 *              disclosure. Right for a wide table with one column that
 *              identifies the row.
 */
export type TableResponsive = 'scroll' | 'stack' | 'priority';

export type Column<Row> = {
  key: string;
  header: ReactNode;
  /** Cell renderer. Return a string for text, a node for anything richer. */
  cell: (row: Row) => ReactNode;
  sortable?: boolean;
  align?: 'start' | 'end';
  /** Any CSS grid track value — `1fr`, `160px`, `minmax(120px, 1fr)`. */
  width?: string;
  /**
   * Aligns to the end *and* sets `tabular-nums`, because a column of figures
   * wants both and has so far had to ask for one.
   */
  numeric?: boolean;
  /**
   * What survives when the container narrows, under `responsive="priority"`.
   * 1 always shows. 2 and 3 move into the row's disclosure. Declared by
   * whoever knows the domain rather than inferred from column order.
   */
  priority?: 1 | 2 | 3;
  /** Kept out of the stacked form — an actions column has no value to label. */
  hideWhenStacked?: boolean;
};

export type TableSelection = {
  /** Row keys. A Set so the table never scans an array per row. */
  selected: Set<string>;
  onChange: (selected: Set<string>) => void;
  /** Labels the select-all control. Defaults to the caption. */
  label?: string;
};

export type TableProps<Row> = {
  caption: string;
  /** Visually hides the caption. It still names the table for screen readers. */
  hideCaption?: boolean;
  columns: Array<Column<Row>>;
  rows: Row[];
  rowKey: (row: Row) => string;
  sort?: { key: string; direction: SortDirection };
  onSortChange?: (sort: { key: string; direction: SortDirection }) => void;
  /** When set, the body is replaced by a StateBlock spanning every column. */
  state?: StateBlockProps;
  /** Checkbox column plus a tri-state select-all in the header. */
  selection?: TableSelection;
  /** Per-row overflow menu, in a column of its own at the end. */
  rowActions?: (row: Row) => MenuItem[];
  /** Keeps the header in view while the body scrolls. */
  stickyHeader?: boolean;
  density?: 'comfortable' | 'compact';
  /** A `tfoot` row. In `tfoot` rather than `tbody` so a sort cannot move it. */
  totals?: (rows: Row[]) => ReactNode[];
  /** Defaults to `scroll`, which is what the table did before this existed. */
  responsive?: TableResponsive;
};

export function Table<Row>({
  caption,
  hideCaption = false,
  columns,
  rows,
  rowKey,
  sort,
  onSortChange,
  state,
  selection,
  rowActions,
  stickyHeader = false,
  density = 'comfortable',
  totals,
  responsive = 'scroll',
}: TableProps<Row>) {
  const toggleSort = (key: string) => {
    if (!onSortChange) return;
    const direction: SortDirection =
      sort?.key === key && sort.direction === 'ascending' ? 'descending' : 'ascending';
    onSortChange({ key, direction });
  };

  const keys = rows.map(rowKey);
  const selectedHere = selection ? keys.filter((key) => selection.selected.has(key)) : [];
  const allSelected = selection ? keys.length > 0 && selectedHere.length === keys.length : false;
  const someSelected = selectedHere.length > 0 && !allSelected;

  const toggleAll = () => {
    if (!selection) return;
    const next = new Set(selection.selected);
    // Partially selected resolves to "select the rest", never to "clear" —
    // the reader's last action was to add, so adding is the expectation.
    if (allSelected) {
      for (const key of keys) next.delete(key);
    } else {
      for (const key of keys) next.add(key);
    }
    selection.onChange(next);
  };

  const toggleRow = (key: string) => {
    if (!selection) return;
    const next = new Set(selection.selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    selection.onChange(next);
  };

  /** Columns that leave the grid when the container is narrow. */
  const secondary = responsive === 'priority' ? columns.filter((c) => (c.priority ?? 1) > 1) : [];
  const hasDisclosure = secondary.length > 0;

  const columnCount = columns.length + (selection ? 1 : 0) + (rowActions ? 1 : 0) + (hasDisclosure ? 1 : 0);

  return (
    <div
      className={[
        'bh-table-wrapper',
        `bh-table-wrapper--${responsive}`,
        stickyHeader && 'bh-table-wrapper--sticky',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <table className={`bh-table bh-table--${density} bh-table--${responsive}`}>
        <caption className={hideCaption ? 'bh-visually-hidden' : 'bh-table__caption'}>
          {caption}
        </caption>
        <thead>
          <tr>
            {hasDisclosure && <th scope="col" className="bh-table__disclose-head" />}
            {selection && (
              <th scope="col" className="bh-table__select">
                <Checkbox
                  label={
                    <span className="bh-visually-hidden">
                      {selection.label ?? `Select all ${caption.toLowerCase()}`}
                    </span>
                  }
                  checked={allSelected}
                  indeterminate={someSelected}
                  disabled={keys.length === 0}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((column) => {
              const isSorted = sort?.key === column.key;
              return (
                <th
                  key={column.key}
                  scope="col"
                  style={column.width ? { width: column.width } : undefined}
                  data-align={column.numeric ? 'end' : (column.align ?? 'start')}
                  data-priority={column.priority ?? 1}
                  // `aria-sort` goes on the header cell, not the button, and
                  // only the currently sorted column may carry a value.
                  aria-sort={isSorted ? sort.direction : undefined}
                >
                  {column.sortable && onSortChange ? (
                    <button
                      type="button"
                      className="bh-table__sort bh-focusable"
                      onClick={() => toggleSort(column.key)}
                    >
                      {column.header}
                      <span className="bh-table__sort-icon" aria-hidden="true">
                        {isSorted ? (sort.direction === 'ascending' ? '▲' : '▼') : '↕'}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
            {rowActions && (
              <th scope="col" className="bh-table__actions-head">
                <span className="bh-visually-hidden">Actions</span>
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {state ? (
            <tr>
              <td colSpan={columnCount} className="bh-table__state">
                <StateBlock density="inline" {...state} />
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              const key = rowKey(row);
              const checked = selection?.selected.has(key) ?? false;
              return (
                <tr key={key} data-selected={checked || undefined}>
                  {hasDisclosure && (
                    <td className="bh-table__disclose">
                      {/* Native disclosure: the platform already owns the
                          expanded state and announces it. */}
                      <details>
                        <summary
                          className="bh-focusable"
                          aria-label="More detail for this row"
                        >
                          <span aria-hidden="true">▸</span>
                        </summary>
                        <div className="bh-table__disclose-body">
                          <DescriptionList
                            layout="rows"
                            density="compact"
                            items={secondary.map((column) => ({
                              term: column.header,
                              value: column.cell(row),
                            }))}
                          />
                        </div>
                      </details>
                    </td>
                  )}
                  {selection && (
                    <td className="bh-table__select">
                      <Checkbox
                        label={
                          <span className="bh-visually-hidden">
                            {`Select this ${singular(caption)}`}
                          </span>
                        }
                        checked={checked}
                        onChange={() => toggleRow(key)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      data-align={column.numeric ? 'end' : (column.align ?? 'start')}
                      data-numeric={column.numeric || undefined}
                      data-priority={column.priority ?? 1}
                      data-stacked-hidden={column.hideWhenStacked || undefined}
                      // Carries its own header, so the stacked form can render
                      // the label from CSS without a second pass in JS.
                      data-label={typeof column.header === 'string' ? column.header : undefined}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="bh-table__actions">
                      <Menu label="Row actions" align="end" items={rowActions(row)} />
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>

        {totals && !state && rows.length > 0 && (
          <tfoot>
            <tr>
              {hasDisclosure && <td />}
              {selection && <td />}
              {totals(rows).map((cell, index) => (
                <td
                  key={columns[index]?.key ?? index}
                  data-align={
                    columns[index]?.numeric ? 'end' : (columns[index]?.align ?? 'start')
                  }
                  data-numeric={columns[index]?.numeric || undefined}
                >
                  {cell}
                </td>
              ))}
              {rowActions && <td />}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

/** "Invoices" → "invoice", so a row checkbox names one thing. */
function singular(caption: string): string {
  const word = caption.toLowerCase().trim();
  return word.endsWith('s') ? word.slice(0, -1) : word;
}
