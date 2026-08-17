import type { ReactNode } from 'react';

import { StateBlock, type StateBlockProps } from '../StateBlock/StateBlock';
import './Table.css';

/**
 * Dense enterprise data.
 *
 * Two decisions worth defending:
 *
 * 1. Sorting is a *controlled* prop, not internal state. The moment a table
 *    holds 200 rows the sort moves to the server, and a component that owns
 *    the sort locally has to be rewritten. Owning it from the start means the
 *    same component serves both.
 * 2. Empty, loading and error are not booleans on the table — they are
 *    delegated to `StateBlock`. One vocabulary for "nothing here", used by the
 *    table, the panel and the whole page.
 */
export type SortDirection = 'ascending' | 'descending';

export type Column<Row> = {
  key: string;
  header: ReactNode;
  /** Cell renderer. Return a string for text, a node for anything richer. */
  cell: (row: Row) => ReactNode;
  sortable?: boolean;
  align?: 'start' | 'end';
  /** Any CSS grid track value — `1fr`, `160px`, `minmax(120px, 1fr)`. */
  width?: string;
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
}: TableProps<Row>) {
  const toggle = (key: string) => {
    if (!onSortChange) return;
    const direction: SortDirection =
      sort?.key === key && sort.direction === 'ascending' ? 'descending' : 'ascending';
    onSortChange({ key, direction });
  };

  return (
    <div className="bh-table-wrapper">
      <table className="bh-table">
        <caption className={hideCaption ? 'bh-visually-hidden' : 'bh-table__caption'}>
          {caption}
        </caption>
        <thead>
          <tr>
            {columns.map((column) => {
              const isSorted = sort?.key === column.key;
              return (
                <th
                  key={column.key}
                  scope="col"
                  style={column.width ? { width: column.width } : undefined}
                  data-align={column.align ?? 'start'}
                  // `aria-sort` goes on the header cell, not the button, and
                  // only the currently sorted column may carry a value.
                  aria-sort={isSorted ? sort.direction : undefined}
                >
                  {column.sortable && onSortChange ? (
                    <button
                      type="button"
                      className="bh-table__sort bh-focusable"
                      onClick={() => toggle(column.key)}
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
          </tr>
        </thead>
        <tbody>
          {state ? (
            <tr>
              <td colSpan={columns.length} className="bh-table__state">
                <StateBlock density="inline" {...state} />
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={rowKey(row)}>
                {columns.map((column) => (
                  <td key={column.key} data-align={column.align ?? 'start'}>
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
