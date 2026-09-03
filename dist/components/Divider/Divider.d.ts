import type { ReactNode } from 'react';
import './Divider.css';
/**
 * A line between things.
 *
 * With no label it is decoration, so it is `aria-hidden` and a screen reader
 * skips it — a separator announced between every row of a list is noise. With
 * a label it becomes a real `role="separator"` carrying that name, because at
 * that point it is dividing the page into named regions.
 */
export type DividerProps = {
    orientation?: 'horizontal' | 'vertical';
    /** Text in the middle of the rule. Makes the separator meaningful. */
    children?: ReactNode;
    /** Extra breathing room above and below. */
    spacing?: 'none' | 'snug' | 'loose';
};
export declare function Divider({ orientation, children, spacing }: DividerProps): import("react").JSX.Element;
//# sourceMappingURL=Divider.d.ts.map