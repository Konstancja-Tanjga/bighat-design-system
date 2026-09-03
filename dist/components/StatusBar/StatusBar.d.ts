import type { ReactNode } from 'react';
import './StatusBar.css';
/**
 * The thin bar at the bottom of an application: what is selected, whether the
 * document is saved, which environment this is.
 *
 * The message slot is a polite live region, so a change is spoken without
 * stealing focus. That is the whole reason a status bar is worth having as a
 * component rather than a `<div>` — and the reason it must never hold anything
 * urgent: "polite" waits for the user to pause, so a failure that needs action
 * belongs in a Toast or inline next to the control that caused it.
 */
export type StatusBarItem = {
    /** Short label. Read out with the value, so it must make sense spoken. */
    label: string;
    value: ReactNode;
};
export type StatusBarProps = {
    /** Items on the leading edge — counts, selection, position. */
    items?: StatusBarItem[];
    /** Live-updating text, announced politely. Keep it non-urgent. */
    message?: ReactNode;
    /** Trailing slot: environment tag, connection state, a small action. */
    end?: ReactNode;
    /** Names the landmark. */
    ariaLabel?: string;
};
export declare function StatusBar({ items, message, end, ariaLabel }: StatusBarProps): import("react").JSX.Element;
//# sourceMappingURL=StatusBar.d.ts.map