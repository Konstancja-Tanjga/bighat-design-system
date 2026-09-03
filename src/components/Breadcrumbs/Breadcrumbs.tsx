import type { ReactNode } from 'react';

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

export function Breadcrumbs({ items, ariaLabel = 'Breadcrumb', maxItems = 5 }: BreadcrumbsProps) {
  const collapsed =
    items.length > maxItems
      ? [items[0]!, { label: '…', collapsed: true } as const, ...items.slice(-2)]
      : items;

  return (
    <nav className="bh-breadcrumbs" aria-label={ariaLabel}>
      <ol className="bh-breadcrumbs__list">
        {collapsed.map((item, index) => {
          const isLast = index === collapsed.length - 1;
          const isEllipsis = 'collapsed' in item;

          return (
            <li key={index} className="bh-breadcrumbs__item">
              {index > 0 && (
                <span className="bh-breadcrumbs__separator" aria-hidden="true">
                  /
                </span>
              )}

              {isEllipsis ? (
                <span className="bh-breadcrumbs__ellipsis" aria-hidden="true">
                  …
                </span>
              ) : isLast ? (
                <span className="bh-breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a
                  className="bh-breadcrumbs__link bh-focusable"
                  href={(item as BreadcrumbItem).href ?? '#'}
                  onClick={(item as BreadcrumbItem).onClick}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
