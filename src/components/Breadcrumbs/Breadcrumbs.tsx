import { useEffect, useRef, useState, type ReactNode } from 'react';

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
  // Expansion belongs to one trail. A shell that keeps Breadcrumbs mounted
  // across routes would otherwise carry "expanded" to the next deep page and
  // maxItems would stop working for the rest of the session. The trail is
  // compared by its hrefs, not by array identity, because callers pass a new
  // array literal on every render.
  const trail = `${items.length}|${items.map((item) => item.href ?? '').join('\u0000')}`;
  const [expandedFor, setExpandedFor] = useState<string | null>(null);
  const expanded = expandedFor === trail;
  // The ellipsis button is removed when it is pressed, so focus is moved on to
  // the first level it revealed rather than falling to the page.
  const firstRevealed = useRef<HTMLAnchorElement>(null);
  const [moveFocus, setMoveFocus] = useState(false);
  useEffect(() => {
    if (moveFocus) {
      firstRevealed.current?.focus();
      setMoveFocus(false);
    }
  }, [moveFocus]);

  const hidden = items.length > maxItems && !expanded ? items.slice(1, -2) : [];
  const shown: Array<BreadcrumbItem | { ellipsis: number }> = hidden.length
    ? [items[0]!, { ellipsis: hidden.length }, ...items.slice(-2)]
    : items;

  return (
    <nav className="bh-breadcrumbs" aria-label={ariaLabel}>
      <ol className="bh-breadcrumbs__list">
        {shown.map((item, index) => {
          const isLast = index === shown.length - 1;

          return (
            <li key={index} className="bh-breadcrumbs__item">
              {index > 0 && <span className="bh-breadcrumbs__separator" aria-hidden="true" />}

              {'ellipsis' in item ? (
                // A real control, not a decorative "…": the levels it stands for
                // are part of where the reader is, and hiding them from every
                // input method made them unreachable.
                <button
                  type="button"
                  className="bh-breadcrumbs__link bh-breadcrumbs__ellipsis bh-focusable"
                  aria-label={`Show ${item.ellipsis} more ${item.ellipsis === 1 ? 'level' : 'levels'}`}
                  onClick={() => {
                    setExpandedFor(trail);
                    setMoveFocus(true);
                  }}
                >
                  <span aria-hidden="true">…</span>
                </button>
              ) : isLast ? (
                <span className="bh-breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a
                  ref={expanded && index === 1 ? firstRevealed : undefined}
                  className="bh-breadcrumbs__link bh-focusable"
                  href={item.href ?? '#'}
                  onClick={item.onClick}
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
