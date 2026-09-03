import type { ReactNode } from 'react';
import './NavRail.css';
/**
 * The narrow icon rail.
 *
 * An icon-only navigation is a memory test: the user has to have learned what
 * each glyph means before it is useful. That is why `label` is **required** and
 * is not decoration — it becomes the accessible name, the tooltip, and the
 * visible caption when `showLabels` is on.
 *
 * If a rail item's meaning cannot survive being written in one or two words,
 * the item does not belong in a rail.
 */
export type NavRailItem = {
    id: string;
    /** Required. Accessible name, tooltip, and optional visible caption. */
    label: string;
    icon: ReactNode;
    /** Renders a dot. Pair it with something countable elsewhere. */
    badge?: boolean;
};
export type NavRailProps = {
    items: NavRailItem[];
    activeId?: string;
    onSelect?: (id: string) => void;
    /** Items pinned to the bottom — settings, account, help. */
    footerItems?: NavRailItem[];
    /**
     * Captions under each icon. Costs vertical space and removes the guessing.
     * Prefer it whenever the rail has more than about five destinations.
     */
    showLabels?: boolean;
    /** Names the landmark, so a screen reader can tell two navs apart. */
    ariaLabel?: string;
};
export declare function NavRail({ items, activeId, onSelect, footerItems, showLabels, ariaLabel, }: NavRailProps): import("react").JSX.Element;
//# sourceMappingURL=NavRail.d.ts.map