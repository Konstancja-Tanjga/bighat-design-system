import type { ReactNode } from 'react';

import { Menu } from '../Menu/Menu';

/**
 * Columns of cards — a kanban board, a pipeline, a review queue.
 *
 * The reason this is a system component rather than a layout each product
 * rebuilds: **the keyboard equivalent for dragging**. Drag and drop is a
 * pointer gesture with no keyboard analogue, and WCAG 2.1 requires that any
 * single-pointer path-based gesture has a simple alternative (2.5.1 / 2.5.7).
 * Boards built without one are unusable for anyone on a keyboard, a switch, or
 * voice control — and that gap is invisible to every automated check.
 *
 * `BoardCard` therefore takes `onMove`, and the board renders a live region so
 * a move is announced rather than silently happening somewhere off screen.
 */

export type BoardProps = {
  children: ReactNode;
  /** Names the region. A board is a landmark's worth of content. */
  ariaLabel: string;
  /**
   * Announced after a keyboard move. The board owns the live region so a card
   * that has just moved — and lost its old position — is still described.
   */
  announcement?: string;
};

export function Board({ children, ariaLabel, announcement }: BoardProps) {
  return (
    <section className="bh-board" aria-label={ariaLabel}>
      <div className="bh-board__columns">{children}</div>
      <div className="bh-visually-hidden" role="status">
        {announcement}
      </div>
    </section>
  );
}

export type BoardColumnProps = {
  title: string;
  /** Shown next to the title and folded into the accessible name. */
  count: number;
  /** Work-in-progress limit. Exceeding it is surfaced, never enforced. */
  limit?: number;
  /** A column-level action — "add", "filter". */
  action?: ReactNode;
  /** Optional: a column with `count` of zero renders `empty` instead. */
  children?: ReactNode;
  /** Rendered in place of the cards when the column is empty. */
  empty?: ReactNode;
};

export function BoardColumn({ title, count, limit, action, children, empty }: BoardColumnProps) {
  const overLimit = limit !== undefined && count > limit;

  return (
    <div className={`bh-board__column${overLimit ? ' bh-board__column--over' : ''}`}>
      <div className="bh-board__column-head">
        <h3 className="bh-board__column-title">
          {title}
          <span className="bh-board__count">
            {count}
            {limit !== undefined && <span aria-hidden="true"> / {limit}</span>}
          </span>
          {overLimit && <span className="bh-visually-hidden">over the limit of {limit}</span>}
        </h3>
        {action}
      </div>

      {overLimit && (
        <p className="bh-board__warning">
          Over the {limit}-card limit. Finish something before starting more.
        </p>
      )}

      {count === 0 && empty ? (
        empty
      ) : (
        <ul className="bh-board__cards" aria-label={`${title}, ${count} items`}>
          {children}
        </ul>
      )}
    </div>
  );
}

export type BoardCardProps = {
  children: ReactNode;
  /** Where this card can go. Rendered as an explicit, keyboard-usable menu. */
  moveTargets?: Array<{ id: string; label: string }>;
  onMove?: (targetId: string) => void;
  onOpen?: () => void;
  /** Names the card for assistive technology and for the move control. */
  title: string;
};

export function BoardCard({ children, moveTargets, onMove, onOpen, title }: BoardCardProps) {
  return (
    <li className="bh-board__card">
      <div className="bh-board__card-inner">
        {onOpen ? (
          <button type="button" className="bh-board__card-open bh-focusable" onClick={onOpen}>
            {children}
          </button>
        ) : (
          <div className="bh-board__card-open">{children}</div>
        )}

        {moveTargets && moveTargets.length > 0 && onMove && (
          <div className="bh-board__move">
            {/* A menu of destinations, not a drag handle and no longer a
                select. It is operable by pointer, keyboard, voice and switch,
                and it states the destinations instead of requiring the user
                to discover them by dragging. A select moved the card on the
                first arrow key on Windows, where a closed select commits as
                it changes; a menu moves nothing until an item is chosen. */}
            <Menu
              label={`Move “${title}” to`}
              items={moveTargets.map((target) => ({
                label: target.label,
                onSelect: () => onMove(target.id),
              }))}
              renderTrigger={(trigger) => (
                <button
                  type="button"
                  {...trigger}
                  className={`${trigger.className} bh-board__move-trigger`}
                  // Starts with the visible words, so a voice-control user can
                  // say them (WCAG 2.5.3); the title tells two cards apart.
                  aria-label={`Move to… ${title}`}
                >
                  Move to…
                  <span className="bh-menu__caret" aria-hidden="true" />
                </button>
              )}
            />
          </div>
        )}
      </div>
    </li>
  );
}
