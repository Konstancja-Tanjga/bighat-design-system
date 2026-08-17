import type { ReactNode } from 'react';

import './StateBlock.css';

/**
 * The screens nobody designs.
 *
 * Every list, table and panel in an enterprise app spends real time in one of
 * three states that are not the happy path: it has nothing to show, it is
 * fetching, or it broke. Left to individual teams these get invented three
 * times per product, each with a different tone of voice and none of them
 * announced to a screen reader.
 *
 * Making this a component rather than a guideline is the whole point: the
 * pattern is enforced by import, not by whether someone read the wiki.
 */
export type StateBlockState = 'empty' | 'loading' | 'error';

export type StateBlockProps = {
  state: StateBlockState;
  /** One line, sentence case, no trailing period. Describes the situation. */
  title: string;
  /** Optional second line. Say what the user can do, not what the server did. */
  description?: ReactNode;
  /** The single most useful next step. Omit it rather than inventing one. */
  action?: ReactNode;
  /** An escape hatch — "contact support", "go back". Never the primary path. */
  secondaryAction?: ReactNode;
  /** Decorative. Hidden from assistive tech; the title carries the meaning. */
  icon?: ReactNode;
  /**
   * `section` fills a panel, `page` fills a route, `inline` sits inside a
   * table body or a card without imposing its own vertical rhythm.
   */
  density?: 'inline' | 'section' | 'page';
  /**
   * Technical detail for an error — a correlation id, a status code. Rendered
   * in a `<details>` so it is available to whoever needs it and invisible to
   * everyone who does not.
   */
  diagnostics?: ReactNode;
};

/**
 * Announcement strategy, which is the part that is easy to get wrong:
 *
 * - `loading` is polite. It must not interrupt whatever the user is reading,
 *   and it is transient, so `role="status"` (aria-live="polite").
 * - `error` is assertive. The user's action did not happen and they need to
 *   know now, so `role="alert"`.
 * - `empty` is neither. It is the rendered result of a successful request, so
 *   it gets no live region at all — announcing it would be noise.
 */
const liveRegionRole: Record<StateBlockState, 'status' | 'alert' | undefined> = {
  loading: 'status',
  error: 'alert',
  empty: undefined,
};

export function StateBlock({
  state,
  title,
  description,
  action,
  secondaryAction,
  icon,
  density = 'section',
  diagnostics,
}: StateBlockProps) {
  const role = liveRegionRole[state];

  return (
    <div
      className={`bh-stateblock bh-stateblock--${state} bh-stateblock--${density}`}
      role={role}
      aria-busy={state === 'loading' || undefined}
      data-state={state}
    >
      {state === 'loading' ? (
        <span className="bh-stateblock__spinner" aria-hidden="true" />
      ) : (
        icon && (
          <span className="bh-stateblock__icon" aria-hidden="true">
            {icon}
          </span>
        )
      )}

      <p className="bh-stateblock__title">{title}</p>

      {description && <p className="bh-stateblock__description">{description}</p>}

      {(action || secondaryAction) && (
        <div className="bh-stateblock__actions">
          {action}
          {secondaryAction}
        </div>
      )}

      {diagnostics && state === 'error' && (
        <details className="bh-stateblock__diagnostics">
          <summary className="bh-focusable">Technical details</summary>
          <div className="bh-stateblock__diagnostics-body">{diagnostics}</div>
        </details>
      )}
    </div>
  );
}
