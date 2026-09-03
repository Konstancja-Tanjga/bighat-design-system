import type { ReactNode } from 'react';
import './List.css';
/**
 * A vertical list of records: leading media, a title, a supporting line, a
 * trailing control.
 *
 * `<ul>` and `<li>`, so a screen reader announces "list, 12 items" and the
 * user can jump from list to list. A pile of divs announces nothing and is
 * indistinguishable from prose.
 *
 * Rows are static by default. `href` makes a row a link, `onSelect` makes it a
 * button, and passing both is a type-level mistake, not a runtime guess — a
 * row that both navigates and acts is two controls wearing one coat.
 */
export type ListProps = {
    /** Names the list. Required when a screen has more than one. */
    ariaLabel?: string;
    /** Rules between rows. Off for cards or when the rows already have borders. */
    dividers?: boolean;
    children: ReactNode;
};
export declare function List({ ariaLabel, dividers, children }: ListProps): import("react").JSX.Element;
type ListItemBase = {
    /** Icon or avatar. Decorative — the title carries the meaning. */
    leading?: ReactNode;
    title: ReactNode;
    /** One supporting line. Two is a card, not a list row. */
    description?: ReactNode;
    /** Metadata or a control on the trailing edge. */
    trailing?: ReactNode;
};
export type ListItemProps = ListItemBase & ({
    href: string;
    onSelect?: never;
} | {
    onSelect: () => void;
    href?: never;
} | {
    href?: never;
    onSelect?: never;
});
export declare function ListItem({ leading, title, description, trailing, href, onSelect }: ListItemProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=List.d.ts.map