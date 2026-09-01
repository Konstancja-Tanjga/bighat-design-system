import type { ReactNode } from 'react';

import './DescriptionList.css';

/**
 * Term and value pairs — a record read rather than a form filled.
 *
 * Two reasons this is a component and not a `div` in every product:
 *
 * 1. It is a real `<dl>`. A detail panel built from divs tells a screen
 *    reader nothing about which label owns which value, and that is the only
 *    information a detail panel contains.
 * 2. It is the narrow form of a table row. `Table` with `responsive="stack"`
 *    renders each row through this component, so a value keeps its label when
 *    the column header it belonged to is gone. One component, so the two can
 *    never drift.
 */
export type DescriptionItem = {
  /** The label. Short, sentence case, no trailing colon — CSS owns that. */
  term: ReactNode;
  value: ReactNode;
  /** Spans both columns in `layout="columns"`. For long prose or a table. */
  wide?: boolean;
};

export type DescriptionListProps = {
  items: DescriptionItem[];
  /**
   * `rows` stacks term above value — right in a narrow panel.
   * `columns` puts the term in a fixed gutter beside its value — right when
   * there is room, because the values then line up and can be compared.
   */
  layout?: 'rows' | 'columns';
  density?: 'comfortable' | 'compact';
  /** Names the list when it is not already inside a labelled region. */
  ariaLabel?: string;
};

export function DescriptionList({
  items,
  layout = 'columns',
  density = 'comfortable',
  ariaLabel,
}: DescriptionListProps) {
  return (
    <dl
      className={`bh-dl bh-dl--${layout} bh-dl--${density}`}
      aria-label={ariaLabel}
      // A `dl` with an accessible name is a labelled group; without one it is
      // just a list, and announcing a nameless group is noise.
      role={ariaLabel ? 'group' : undefined}
    >
      {items.map((item, index) => (
        // The wrapper is what makes a term and its value one unit at every
        // width. `display: contents` in `columns` keeps the grid two-track.
        <div
          className={item.wide ? 'bh-dl__pair bh-dl__pair--wide' : 'bh-dl__pair'}
          key={index}
        >
          <dt className="bh-dl__term">{item.term}</dt>
          <dd className="bh-dl__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
