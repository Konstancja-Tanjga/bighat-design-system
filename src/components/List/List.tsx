import type { ReactNode } from 'react';

/**
 * A vertical list of records: leading media, a title, a supporting line, a
 * trailing control.
 *
 * `<ul>` and `<li>`, so a screen reader announces "list, 12 items" and the
 * user can jump from list to list. A pile of divs announces nothing and is
 * indistinguishable from prose.
 *
 * Rows are static by default. `href` makes a row a link, `onSelect` makes it a
 * button, and passing both is a type-level mistake, not a runtime guess — a
 * row that both navigates and acts is two controls wearing one coat.
 */
export type ListProps = {
  /** Names the list. Required when a screen has more than one. */
  ariaLabel?: string;
  /** Rules between rows. Off for cards or when the rows already have borders. */
  dividers?: boolean;
  children: ReactNode;
};

export function List({ ariaLabel, dividers = true, children }: ListProps) {
  return (
    <ul className={`bh-list${dividers ? ' bh-list--dividers' : ''}`} aria-label={ariaLabel}>
      {children}
    </ul>
  );
}

type ListItemBase = {
  /** Icon or avatar. Decorative — the title carries the meaning. */
  leading?: ReactNode;
  title: ReactNode;
  /** One supporting line. Two is a card, not a list row. */
  description?: ReactNode;
  /** Metadata or a control on the trailing edge. */
  trailing?: ReactNode;
};

export type ListItemProps = ListItemBase &
  (
    | { href: string; onSelect?: never }
    | { onSelect: () => void; href?: never }
    | { href?: never; onSelect?: never }
  );

export function ListItem({ leading, title, description, trailing, href, onSelect }: ListItemProps) {
  const body = (
    <>
      {leading && (
        <span className="bh-list__leading" aria-hidden="true">
          {leading}
        </span>
      )}
      <span className="bh-list__body">
        <span className="bh-list__title">{title}</span>
        {description && <span className="bh-list__description">{description}</span>}
      </span>
      {/* Outside the link or button: a control inside a control is not
          reachable, and metadata inside one is read as part of its name. */}
    </>
  );

  return (
    <li className="bh-list__item">
      {href ? (
        <a className="bh-list__row bh-list__row--interactive bh-focusable" href={href}>
          {body}
        </a>
      ) : onSelect ? (
        <button
          type="button"
          className="bh-list__row bh-list__row--interactive bh-focusable"
          onClick={onSelect}
        >
          {body}
        </button>
      ) : (
        <div className="bh-list__row">{body}</div>
      )}
      {trailing && <span className="bh-list__trailing">{trailing}</span>}
    </li>
  );
}
