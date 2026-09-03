import { type ReactNode } from 'react';
import './ScrollArea.css';
/**
 * A scrollable region with a scrollbar this system is willing to own.
 *
 * Two things make it a component rather than `overflow: auto`:
 *
 * A scrollable region must be reachable by keyboard. Firefox does this on its
 * own; Chrome and Safari only do it when the element is focusable, so a
 * mouse-free user simply cannot scroll a `div` that has no `tabindex`. This one
 * adds `tabindex="0"` and a `role="group"` name — but only while the content
 * actually overflows, because a focus stop that scrolls nothing is dead weight
 * in the tab order.
 *
 * And the scrollbar itself is styled with `scrollbar-color`, not replaced by
 * two divs. Overlay scrollbars drawn in JavaScript lose the platform's
 * momentum, its click-in-track paging, and its high-contrast rendering.
 */
export type ScrollAreaProps = {
    /** Names the region for a screen reader once it becomes focusable. */
    ariaLabel: string;
    /** Caps the height; the content scrolls past it. */
    maxHeight?: number | string;
    axis?: 'vertical' | 'horizontal' | 'both';
    /** A subtle fade at the edge the content continues past. */
    fade?: boolean;
    children: ReactNode;
};
export declare function ScrollArea({ ariaLabel, maxHeight, axis, fade, children, }: ScrollAreaProps): import("react").JSX.Element;
//# sourceMappingURL=ScrollArea.d.ts.map