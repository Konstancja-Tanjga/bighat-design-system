import type { Size } from '../../tokens/vocabulary';

import { useEffect, useId, useRef, type ReactNode } from 'react';

/**
 * Built on the native `<dialog>` element rather than a portal plus a hand-
 * rolled focus trap.
 *
 * What the platform gives us for free, and what a custom implementation
 * traditionally gets wrong:
 *
 * - focus is trapped inside the dialog while it is modal
 * - focus returns to the element that opened it on close
 * - the rest of the page is inert, so a screen reader cannot wander out of it
 * - Escape closes it, and the `cancel` event is cancellable
 * - the top layer means no z-index arms race with the host application
 *
 * The one thing it does not do is close on backdrop click, because the backdrop
 * is a pseudo-element. That is handled below by comparing the click target.
 */
export type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  /** Buttons. Primary action last — it sits closest to the reading exit. */
  footer?: ReactNode;
  /**
   * Blocks Escape and backdrop dismissal. Reserve this for destructive
   * confirmations where an accidental dismissal loses the user's work.
   */
  dismissible?: boolean;
  size?: Size;
};

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  dismissible = true,
  size = 'md',
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`bh-dialog bh-dialog--${size}`}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        // Fires on Escape. Preventing default here is what makes a
        // non-dismissible dialog actually non-dismissible.
        if (!dismissible) {
          event.preventDefault();
          return;
        }
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (!dismissible) return;
        // The dialog element's box covers only the panel; clicks on the
        // backdrop land on the dialog itself, not on any child.
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="bh-dialog__panel">
        <header className="bh-dialog__header">
          <h2 className="bh-dialog__title" id={titleId}>
            {title}
          </h2>
          {dismissible && (
            <button
              type="button"
              className="bh-dialog__close bh-focusable"
              onClick={onClose}
              aria-label={`Close ${title}`}
            >
              <span aria-hidden="true">×</span>
            </button>
          )}
        </header>

        {description && (
          <p className="bh-dialog__description" id={descriptionId}>
            {description}
          </p>
        )}

        {children && <div className="bh-dialog__body">{children}</div>}

        {footer && <footer className="bh-dialog__footer">{footer}</footer>}
      </div>
    </dialog>
  );
}
