import { type ReactNode } from 'react';
import './Menu.css';
/**
 * A list of actions behind a trigger.
 *
 * A menu is for *doing*: rename, duplicate, delete. A list of destinations is
 * navigation and wants links; a list of values is a Select. Using `role="menu"`
 * for either tells a screen reader user to expect commands they will not find.
 *
 * The parts the platform does not give us and that get skipped most often:
 * focus moves into the menu on open and back to the trigger on close, arrows
 * wrap, Escape closes, and a click outside closes without swallowing that
 * click's own target.
 */
export type MenuItem = {
    label: ReactNode;
    onSelect?: () => void;
    /** Renders the item in the critical tone. Still needs a clear label. */
    tone?: 'default' | 'critical';
    disabled?: boolean;
    /** Keyboard shortcut shown on the trailing edge. Display only. */
    shortcut?: string;
};
export type MenuProps = {
    /** The trigger's visible label. */
    label: ReactNode;
    items: MenuItem[];
    /** Which edge the menu aligns to. */
    align?: 'start' | 'end';
    /** Replaces the default trigger button, e.g. an icon button or an avatar. */
    renderTrigger?: (props: {
        ref: React.Ref<HTMLButtonElement>;
        'aria-haspopup': 'menu';
        'aria-expanded': boolean;
        'aria-controls': string;
        onClick: () => void;
        onKeyDown: (event: React.KeyboardEvent) => void;
        className: string;
    }) => ReactNode;
};
export declare function Menu({ label, items, align, renderTrigger }: MenuProps): import("react").JSX.Element;
//# sourceMappingURL=Menu.d.ts.map