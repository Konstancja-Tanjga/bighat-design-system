import type { ReactNode } from 'react';
import './Breadcrumbs.css';
/**
 * Where the user is in a hierarchy — never the path they clicked to get here.
 * A history trail that changes shape per visit is a worse map than no map.
 *
 * The last crumb is the current page: it carries `aria-current="page"` and is
 * deliberately not a link, because a link to the page you are on is a dead
 * control that still takes a tab stop.
 */
export type BreadcrumbItem = {
    label: ReactNode;
    href?: string;
    onClick?: () => void;
};
export type BreadcrumbsProps = {
    items: BreadcrumbItem[];
    /** Names the landmark when a page has more than one nav. */
    ariaLabel?: string;
    /** Crumbs beyond this collapse into an ellipsis. Root and leaf always show. */
    maxItems?: number;
};
export declare function Breadcrumbs({ items, ariaLabel, maxItems }: BreadcrumbsProps): import("react").JSX.Element;
//# sourceMappingURL=Breadcrumbs.d.ts.map