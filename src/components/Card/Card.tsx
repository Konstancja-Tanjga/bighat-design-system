import type { ReactNode } from 'react';

/**
 * A bounded surface.
 *
 * The rule that keeps cards from becoming wallpaper: a card is for content the
 * user might act on **as a unit** — a document, a task, a record. A card around
 * a paragraph is a border with extra steps.
 *
 * `onClick` makes the whole surface a button. Use it only when the card has
 * exactly one action; a card with a primary action *and* a menu inside it must
 * stay a plain surface, because nesting interactive elements leaves the user
 * unable to predict what a click does.
 */
type CardBase = {
  children: ReactNode;
  ariaLabel?: string;
  /**
   * `raised` is the default since 4.2 - a card sits one step off the page and
   * elevation, not a border, draws its edge. `flat` has no shadow, only a
   * hairline ring (in 4.1 it had a `border.subtle` border).
   */
  elevation?: 'flat' | 'raised';
  /** Accent bar in the leading padding; an accented card takes section padding on that side. Decorative — never the only carrier of a status. */
  accent?: 'none' | 'info' | 'success' | 'warning' | 'critical';
  padding?: 'snug' | 'normal';
  /** Marks a card that is being dragged, for the board patterns. */
  dragging?: boolean;
};

/**
 * A union, because `actions` and `onClick` exclude each other. `Omit` on a
 * union flattens it; to drop a key when wrapping Card, use
 * `DistributiveOmit<CardProps, 'children'>`.
 */
export type CardProps = CardBase &
  (
    | {
        /** Turns the card into a single button. `ariaLabel` becomes its name. */
        onClick: () => void;
        actions?: never;
      }
    | {
        onClick?: never;
        /**
         * The card's own actions, rendered as a row at the bottom, aligned to
         * the trailing edge, primary last. The card becomes a column so the
         * row sits at the foot of the card, and cards in a grid row line their
         * actions up. Not with `onClick`: a card that is a button cannot hold
         * buttons.
         */
        actions?: ReactNode;
      }
  );

export function Card({
  children,
  onClick,
  ariaLabel,
  elevation = 'raised',
  accent = 'none',
  padding = 'normal',
  dragging = false,
  actions,
}: CardProps) {
  // Not `actions &&`: a falsy node such as 0 would render as text.
  const hasActions = actions != null && actions !== false;
  const className = [
    'bh-card',
    `bh-card--${elevation}`,
    `bh-card--pad-${padding}`,
    accent !== 'none' && `bh-card--accent-${accent}`,
    dragging && 'bh-card--dragging',
    onClick && 'bh-card--interactive bh-focusable',
    hasActions && 'bh-card--with-actions',
  ]
    .filter(Boolean)
    .join(' ');

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </button>
    );
  }

  return (
    <div className={className}>
      {hasActions ? <div className="bh-card__body">{children}</div> : children}
      {hasActions && <div className="bh-card__actions">{actions}</div>}
    </div>
  );
}

/** `Omit` that keeps a union a union, for wrapping components with exclusive props. */
export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
