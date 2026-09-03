import type { ReactNode } from 'react';

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

export function NavGroup({ label, children }: { label: string; children: ReactNode }) {
  const id = `bh-navgroup-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="bh-navgroup">
      <p className="bh-navgroup__label" id={id}>
        {label}
      </p>
      <ul className="bh-navlist" aria-labelledby={id}>
        {children}
      </ul>
    </div>
  );
}

export function NavList({ children, ariaLabel }: { children: ReactNode; ariaLabel?: string }) {
  return (
    <ul className="bh-navlist" aria-label={ariaLabel}>
      {children}
    </ul>
  );
}

export function NavItem({
  item,
  active = false,
  onSelect,
}: {
  item: NavListItem;
  active?: boolean;
  onSelect?: (id: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        className={`bh-navitem bh-focusable${active ? ' bh-navitem--active' : ''}`}
        aria-current={active ? 'true' : undefined}
        onClick={() => onSelect?.(item.id)}
      >
        {item.icon && (
          <span className="bh-navitem__icon" aria-hidden="true">
            {item.icon}
          </span>
        )}
        <span className="bh-navitem__text">
          <span className="bh-navitem__label">{item.label}</span>
          {item.subline && <span className="bh-navitem__subline">{item.subline}</span>}
        </span>
        {item.meta && <span className="bh-navitem__meta">{item.meta}</span>}
      </button>
    </li>
  );
}
