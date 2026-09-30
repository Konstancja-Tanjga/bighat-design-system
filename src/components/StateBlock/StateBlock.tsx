import type { ReactNode } from 'react';

import { Announcement } from '../liveRegion';

import type { StateBlockScope } from '../../tokens/vocabulary';

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
  scope?: StateBlockScope;
  /**
   * @deprecated Renamed to `scope` in 4.0, removed in 5.0. `density` now means
   * row spacing everywhere else in the system (Table, DescriptionList), and one
   * name for two unrelated concepts is how a vocabulary stops being one.
   */
  density?: StateBlockScope;
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
  scope,
  density,
  diagnostics,
}: StateBlockProps) {
  if (import.meta.env?.DEV && density !== undefined) {
    console.warn(
      '[bighat] StateBlock: the density prop is deprecated and removed in 5.0. Use scope.',
    );
  }
  const resolvedScope = scope ?? density ?? 'section';
  const role = liveRegionRole[state];
  // The visible content renders at once - no empty box, no layout jump, text
  // in the server render. The announcement is a separate hidden region keyed
  // by state, so a StateBlock that goes from loading to error mounts a fresh
  // region instead of reusing one that already holds words. The visible title
  // and description are hidden from assistive tech while a region carries
  // them, so they are not read twice. No aria-busy: it held announcements back
  // and nothing ever cleared it. Empty is not a live region.
  const announced = role !== undefined;

  return (
    <div
      className={`bh-stateblock bh-stateblock--${state} bh-stateblock--${resolvedScope}`}
      data-state={state}
    >
      {announced && (
        <Announcement key={state} role={role}>
          {title}
          {description ? <> {description}</> : null}
        </Announcement>
      )}
      <StateBlockContent
        state={state}
        title={title}
        description={description}
        action={action}
        secondaryAction={secondaryAction}
        icon={icon}
        diagnostics={diagnostics}
        hideText={announced}
      />
    </div>
  );
}

function StateBlockContent({
  state,
  title,
  description,
  action,
  secondaryAction,
  icon,
  diagnostics,
  hideText,
}: Pick<
  StateBlockProps,
  'state' | 'title' | 'description' | 'action' | 'secondaryAction' | 'icon' | 'diagnostics'
> & { hideText: boolean }) {
  return (
    <>
      {state === 'loading' ? (
        <span className="bh-stateblock__spinner" aria-hidden="true" />
      ) : (
        icon && (
          <span className="bh-stateblock__icon" aria-hidden="true">
            {icon}
          </span>
        )
      )}

      <p className="bh-stateblock__title" aria-hidden={hideText || undefined}>
        {title}
      </p>

      {description && (
        <p className="bh-stateblock__description" aria-hidden={hideText || undefined}>
          {description}
        </p>
      )}

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
    </>
  );
}
