import { type ReactNode } from 'react';
import './ListView.css';
/**
 * The selectable half of a list: a master pane whose current row drives a
 * detail pane next to it.
 *
 * `List` renders records. `ListView` renders a *choice*, so it is a listbox —
 * one tab stop, arrows to move, Home and End to jump, type-ahead to find. The
 * common wrong build is a `<ul>` of buttons: it works with a mouse, and it
 * makes a keyboard user press Tab forty times to reach the fortieth row.
 *
 * Multi-select is deliberately absent. A list where rows are both activated and
 * ticked is a table with a checkbox column, and Table already does that.
 */
export type ListViewItem = {
    id: string;
    title: string;
    description?: ReactNode;
    /** Trailing metadata. Kept out of the accessible name. */
    meta?: ReactNode;
    disabled?: boolean;
};
export type ListViewProps = {
    /** Names the list. Required — "list" alone tells the user nothing. */
    ariaLabel: string;
    items: ListViewItem[];
    value?: string | null;
    onChange?: (id: string) => void;
    /** Rendered when `items` is empty. Use StateBlock for anything richer. */
    empty?: ReactNode;
};
export declare function ListView({ ariaLabel, items, value, onChange, empty }: ListViewProps): import("react").JSX.Element;
//# sourceMappingURL=ListView.d.ts.map