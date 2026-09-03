import { type ReactNode } from 'react';
import './Dialog.css';
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
    size?: 'sm' | 'md' | 'lg';
};
export declare function Dialog({ open, onClose, title, description, children, footer, dismissible, size, }: DialogProps): import("react").JSX.Element;
//# sourceMappingURL=Dialog.d.ts.map