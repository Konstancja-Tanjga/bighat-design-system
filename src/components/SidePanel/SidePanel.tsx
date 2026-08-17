import type { ReactNode } from 'react';

import './SidePanel.css';

/**
 * A persistent panel beside the main content — chat history on the leading
 * edge, an inspector on the trailing one.
 *
 * Not a drawer and not a `Dialog`. This panel never traps focus and never
 * makes the page inert, because it is not blocking anything: the user is meant
 * to work in the main area *and* see the panel at the same time. Wiring focus
 * management into it would break exactly the workflow it exists for.
 */
export type SidePanelProps = {
  /** Which edge it sits against. Only affects the border and collapse arrow. */
  side?: 'start' | 'end';
  /** Names the landmark. Required — a page with three unnamed regions is one
   *  region as far as a screen reader user is concerned. */
  ariaLabel: string;
  /** Visible heading. Omit for a panel whose content is self-evident. */
  title?: ReactNode;
  /** Pinned above the scroll area — a search field, a "new" button. */
  header?: ReactNode;
  /** Pinned below it — account, storage meter, disclaimer. */
  footer?: ReactNode;
  children: ReactNode;
  width?: number;
  collapsed?: boolean;
  onToggle?: () => void;
};

export function SidePanel({
  side = 'start',
  ariaLabel,
  title,
  header,
  footer,
  children,
  width = 260,
  collapsed = false,
  onToggle,
}: SidePanelProps) {
  if (collapsed) {
    return (
      <div className={`bh-panel bh-panel--${side} bh-panel--collapsed`}>
        <button
          type="button"
          className="bh-panel__toggle bh-focusable"
          onClick={onToggle}
          aria-expanded={false}
          aria-label={`Expand ${ariaLabel}`}
        >
          <span aria-hidden="true">{side === 'start' ? '›' : '‹'}</span>
        </button>
      </div>
    );
  }

  return (
    <aside
      className={`bh-panel bh-panel--${side}`}
      aria-label={ariaLabel}
      style={{ width, minWidth: width }}
    >
      {(title || onToggle) && (
        <div className="bh-panel__titlebar">
          {title && <h2 className="bh-panel__title">{title}</h2>}
          {onToggle && (
            <button
              type="button"
              className="bh-panel__toggle bh-focusable"
              onClick={onToggle}
              aria-expanded
              aria-label={`Collapse ${ariaLabel}`}
            >
              <span aria-hidden="true">{side === 'start' ? '‹' : '›'}</span>
            </button>
          )}
        </div>
      )}

      {header && <div className="bh-panel__header">{header}</div>}

      <div className="bh-panel__body">{children}</div>

      {footer && <div className="bh-panel__footer">{footer}</div>}
    </aside>
  );
}
