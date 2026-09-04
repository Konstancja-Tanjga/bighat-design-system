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
export type CardProps = {
  children: ReactNode;
  /** Turns the card into a single button. `ariaLabel` becomes its name. */
  onClick?: () => void;
  ariaLabel?: string;
  elevation?: 'flat' | 'raised';
  /** Left accent stripe. Decorative — never the only carrier of a status. */
  accent?: 'none' | 'info' | 'success' | 'warning' | 'critical';
  padding?: 'snug' | 'normal';
  /** Marks a card that is being dragged, for the board patterns. */
  dragging?: boolean;
};

export function Card({
  children,
  onClick,
  ariaLabel,
  elevation = 'flat',
  accent = 'none',
  padding = 'normal',
  dragging = false,
}: CardProps) {
  const className = [
    'bh-card',
    `bh-card--${elevation}`,
    `bh-card--pad-${padding}`,
    accent !== 'none' && `bh-card--accent-${accent}`,
    dragging && 'bh-card--dragging',
    onClick && 'bh-card--interactive bh-focusable',
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

  return <div className={className}>{children}</div>;
}
