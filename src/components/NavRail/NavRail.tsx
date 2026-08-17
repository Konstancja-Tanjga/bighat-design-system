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

function RailButton({
  item,
  active,
  onSelect,
  showLabels,
}: {
  item: NavRailItem;
  active: boolean;
  onSelect?: (id: string) => void;
  showLabels: boolean;
}) {
  return (
    <li>
      <button
        type="button"
        className={`bh-rail__item bh-focusable${active ? ' bh-rail__item--active' : ''}`}
        // `aria-current="page"` rather than a class alone: the active state has
        // to be perceivable without seeing the highlight.
        aria-current={active ? 'page' : undefined}
        aria-label={showLabels ? undefined : item.label}
        title={item.label}
        onClick={() => onSelect?.(item.id)}
      >
        <span className="bh-rail__icon" aria-hidden="true">
          {item.icon}
          {item.badge && <span className="bh-rail__dot" />}
        </span>
        {showLabels && <span className="bh-rail__label">{item.label}</span>}
      </button>
    </li>
  );
}

export function NavRail({
  items,
  activeId,
  onSelect,
  footerItems,
  showLabels = false,
  ariaLabel = 'Primary',
}: NavRailProps) {
  return (
    <nav className={`bh-rail${showLabels ? ' bh-rail--labelled' : ''}`} aria-label={ariaLabel}>
      <ul className="bh-rail__list">
        {items.map((item) => (
          <RailButton
            key={item.id}
            item={item}
            active={item.id === activeId}
            onSelect={onSelect}
            showLabels={showLabels}
          />
        ))}
      </ul>

      {footerItems && footerItems.length > 0 && (
        <ul className="bh-rail__list bh-rail__list--footer">
          {footerItems.map((item) => (
            <RailButton
              key={item.id}
              item={item}
              active={item.id === activeId}
              onSelect={onSelect}
              showLabels={showLabels}
            />
          ))}
        </ul>
      )}
    </nav>
  );
}
