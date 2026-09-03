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
export declare function SidePanel({ side, ariaLabel, title, header, footer, children, width, collapsed, onToggle, }: SidePanelProps): import("react").JSX.Element;
//# sourceMappingURL=SidePanel.d.ts.map