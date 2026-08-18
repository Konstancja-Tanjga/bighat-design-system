import { useRef, type ReactNode } from 'react';

import './Toolbar.css';

/**
 * A row of controls that act on the thing below it — the function bar above a
 * table, an editor's formatting strip.
 *
 * `role="toolbar"` is a promise about the keyboard: the whole bar is one tab
 * stop and arrow keys move between the controls inside it. Making that promise
 * without implementing it is worse than not making it, because the user tabs
 * once, lands on the first button, and cannot reach the other nine.
 *
 * So the arrow handling lives here, on the container, and works with whatever
 * controls are passed in.
 */
export type ToolbarProps = {
  /** What the toolbar acts on, e.g. "Invoice list". Required. */
  ariaLabel: string;
  /** Leading controls — the actions. */
  children: ReactNode;
  /** Trailing slot, pushed to the far edge: search, view switches, counts. */
  end?: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  /** Sits directly on the surface instead of on a sunken strip. */
  flush?: boolean;
};

const FOCUSABLE =
  'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])';

export function Toolbar({
  ariaLabel,
  children,
  end,
  orientation = 'horizontal',
  flush = false,
}: ToolbarProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const next = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    const previous = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    if (![next, previous, 'Home', 'End'].includes(event.key)) return;

    const items = Array.from(ref.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    if (items.length === 0) return;

    const current = items.indexOf(document.activeElement as HTMLElement);
    if (current === -1) return;

    // A text field inside a toolbar keeps its own arrow keys — moving the
    // caret must not jump the user out of the input.
    const active = items[current]!;
    if (active.tagName === 'INPUT' && (event.key === next || event.key === previous)) return;

    event.preventDefault();
    const target =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? items.length - 1
          : (current + (event.key === next ? 1 : -1) + items.length) % items.length;
    items[target]!.focus();
  };

  return (
    <div
      ref={ref}
      role="toolbar"
      aria-label={ariaLabel}
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
      className={`bh-toolbar bh-toolbar--${orientation}${flush ? ' bh-toolbar--flush' : ''}`}
      onKeyDown={onKeyDown}
    >
      <div className="bh-toolbar__group">{children}</div>
      {end && <div className="bh-toolbar__end">{end}</div>}
    </div>
  );
}
