import type { ReactNode } from 'react';
import { type MenuItem } from '../Menu/Menu';
import { type StateBlockProps } from '../StateBlock/StateBlock';
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
    sort?: {
        key: string;
        direction: SortDirection;
    };
    onSortChange?: (sort: {
        key: string;
        direction: SortDirection;
    }) => void;
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
export declare function Table<Row>({ caption, hideCaption, columns, rows, rowKey, sort, onSortChange, state, selection, rowActions, stickyHeader, density, totals, responsive, }: TableProps<Row>): import("react").JSX.Element;
//# sourceMappingURL=Table.d.ts.map