import { useId, useRef, useState, type ReactNode } from 'react';

/**
 * The selectable half of a list: a master pane whose current row drives a
 * detail pane next to it.
 *
 * `List` renders records. `ListView` renders a *choice*, so it is a listbox —
 * one tab stop, arrows to move, Home and End to jump, type-ahead to find. The
 * common wrong build is a `<ul>` of buttons: it works with a mouse, and it
 * makes a keyboard user press Tab forty times to reach the fortieth row.
 *
 * Multi-select is deliberately absent. A list where rows are both activated and
 * ticked is a table with a checkbox column, and Table already does that.
 */
export type ListViewItem = {
  id: string;
  title: string;
  description?: ReactNode;
  /** Trailing metadata. Kept out of the accessible name. */
  meta?: ReactNode;
  disabled?: boolean;
};

export type ListViewProps = {
  /** Names the list. Required — "list" alone tells the user nothing. */
  ariaLabel: string;
  items: ListViewItem[];
  value?: string | null;
  onChange?: (id: string) => void;
  /** Rendered when `items` is empty. Use StateBlock for anything richer. */
  empty?: ReactNode;
};

export function ListView({ ariaLabel, items, value, onChange, empty }: ListViewProps) {
  const baseId = useId();
  const [internal, setInternal] = useState<string | null>(value ?? items[0]?.id ?? null);
  const selectedId = value !== undefined ? value : internal;
  const ref = useRef<HTMLDivElement>(null);
  const typeahead = useRef({ query: '', at: 0 });

  const selectable = items.filter((item) => !item.disabled);

  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
    const row = ref.current?.querySelector<HTMLElement>(`#${CSS.escape(`${baseId}-${id}`)}`);
    // Feature-detected: keyboard selection must work in environments without
    // a layout engine, and scrolling into view is the optional half.
    row?.scrollIntoView?.({ block: 'nearest' });
  };

  const moveBy = (delta: number) => {
    if (selectable.length === 0) return;
    const index = selectable.findIndex((item) => item.id === selectedId);
    const next = selectable[(index + delta + selectable.length) % selectable.length];
    if (next) select(next.id);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveBy(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveBy(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      if (selectable[0]) select(selectable[0].id);
    } else if (event.key === 'End') {
      event.preventDefault();
      const last = selectable[selectable.length - 1];
      if (last) select(last.id);
    } else if (event.key.length === 1 && !event.metaKey && !event.ctrlKey) {
      // Type-ahead: the reason a long list is usable at all without a mouse.
      const now = event.timeStamp;
      const state = typeahead.current;
      state.query = now - state.at < 800 ? state.query + event.key : event.key;
      state.at = now;
      const match = selectable.find((item) =>
        item.title.toLowerCase().startsWith(state.query.toLowerCase()),
      );
      if (match) {
        event.preventDefault();
        select(match.id);
      }
    }
  };

  if (items.length === 0 && empty) {
    return <div className="bh-list-view bh-list-view--empty">{empty}</div>;
  }

  return (
    <div
      ref={ref}
      role="listbox"
      aria-label={ariaLabel}
      aria-activedescendant={selectedId ? `${baseId}-${selectedId}` : undefined}
      tabIndex={0}
      className="bh-list-view bh-focusable"
      onKeyDown={onKeyDown}
    >
      {items.map((item) => (
        <div
          key={item.id}
          id={`${baseId}-${item.id}`}
          role="option"
          aria-selected={item.id === selectedId}
          aria-disabled={item.disabled || undefined}
          className="bh-list-view__row"
          onClick={() => !item.disabled && select(item.id)}
        >
          <span className="bh-list-view__body">
            <span className="bh-list-view__title">{item.title}</span>
            {item.description && (
              <span className="bh-list-view__description">{item.description}</span>
            )}
          </span>
          {item.meta && <span className="bh-list-view__meta">{item.meta}</span>}
        </div>
      ))}
    </div>
  );
}
