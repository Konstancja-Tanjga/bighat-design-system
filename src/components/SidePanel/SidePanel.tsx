import type { ReactNode } from 'react';

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
  /** Which edge it sits against. Sets the collapse arrow; AppShell's slot draws the border. */
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
  // One root and one toggle in both states. Swapping the root element, as
  // this used to, made React remount the panel on every toggle, so the button
  // the reader had just pressed was destroyed and focus fell to the page.
  // The title slot stays in place when collapsed so the toggle keeps its
  // position in the tree, and with it its DOM node.
  const pointsRight = side === 'start' ? collapsed : !collapsed;

  return (
    <aside
      className={`bh-panel bh-panel--${side}${collapsed ? ' bh-panel--collapsed' : ''}`}
      aria-label={ariaLabel}
      style={collapsed ? undefined : { width, minWidth: width }}
    >
      {(onToggle || (title && !collapsed)) && (
        <div className="bh-panel__titlebar">
          {title && !collapsed ? <h2 className="bh-panel__title">{title}</h2> : null}
          {/* Without onToggle there is nothing to wire a button to: a collapsed
              panel the product controls elsewhere renders no dead toggle. */}
          {onToggle && (
            <button
              type="button"
              className="bh-panel__toggle bh-focusable"
              onClick={onToggle}
              aria-expanded={!collapsed}
              aria-label={`${collapsed ? 'Expand' : 'Collapse'} ${ariaLabel}`}
            >
              <span aria-hidden="true">{pointsRight ? '›' : '‹'}</span>
            </button>
          )}
        </div>
      )}

      {!collapsed && (
        <>
          {header && <div className="bh-panel__header">{header}</div>}
          <div className="bh-panel__body">{children}</div>
          {footer && <div className="bh-panel__footer">{footer}</div>}
        </>
      )}
    </aside>
  );
}
