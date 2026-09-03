import type { ReactNode } from 'react';
import './NavList.css';
/**
 * The grouped list inside a side panel — pinned and recent conversations,
 * saved views, a folder tree one level deep.
 *
 * Two things it does that a stack of `<div>`s does not: it is a real list, so
 * a screen reader announces "list, 12 items" and the user knows how much is
 * there before committing to reading it; and the group label is wired to the
 * list with `aria-labelledby`, so "PINNED" is heard as the name of the group
 * rather than as a stray word above it.
 */
export type NavListItem = {
    id: string;
    label: string;
    /** Second line — a timestamp, a snippet, a source count. */
    subline?: string;
    icon?: ReactNode;
    /** Trailing slot for a `Badge` or a count. Kept out of the accessible name. */
    meta?: ReactNode;
};
export declare function NavGroup({ label, children }: {
    label: string;
    children: ReactNode;
}): import("react").JSX.Element;
export declare function NavList({ children, ariaLabel }: {
    children: ReactNode;
    ariaLabel?: string;
}): import("react").JSX.Element;
export declare function NavItem({ item, active, onSelect, }: {
    item: NavListItem;
    active?: boolean;
    onSelect?: (id: string) => void;
}): import("react").JSX.Element;
//# sourceMappingURL=NavList.d.ts.map