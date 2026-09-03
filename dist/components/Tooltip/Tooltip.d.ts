import { type ReactElement, type ReactNode } from 'react';
import './Tooltip.css';
/**
 * A short label for a control that has none — an icon button, a truncated cell.
 *
 * Deliberately narrow, because WCAG 1.4.13 puts three obligations on
 * hover-triggered content and each one rules something out:
 *
 * - dismissible: Escape closes it without moving the pointer
 * - hoverable: the pointer can travel into it, so it does not vanish mid-read
 * - persistent: it stays until focus or hover leaves, never on a timer
 *
 * It follows that a tooltip cannot hold a link, a button, or anything the user
 * has to reach. If it does, it is a popover, and that is a different component.
 */
export type TooltipProps = {
    /** Plain text. Interactive content belongs in a popover. */
    content: ReactNode;
    /** A single focusable element — a button, a link, an input. */
    children: ReactElement<{
        'aria-describedby'?: string;
        onFocus?: (event: React.FocusEvent) => void;
        onBlur?: (event: React.FocusEvent) => void;
    }>;
    placement?: 'top' | 'bottom';
    /** Delay before showing on hover. Focus always shows immediately. */
    delay?: number;
};
export declare function Tooltip({ content, children, placement, delay }: TooltipProps): import("react").JSX.Element;
//# sourceMappingURL=Tooltip.d.ts.map