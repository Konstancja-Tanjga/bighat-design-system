import { type ReactNode } from 'react';
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
export declare function Toolbar({ ariaLabel, children, end, orientation, flush, }: ToolbarProps): import("react").JSX.Element;
//# sourceMappingURL=Toolbar.d.ts.map