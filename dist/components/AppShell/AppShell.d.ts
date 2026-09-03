import type { ReactNode } from 'react';
import './AppShell.css';
/**
 * The frame every application screen sits in.
 *
 * A shell is worth systematising for one reason that has nothing to do with
 * looks: it is where the landmark structure lives. Header, navigation, main
 * and complementary are the regions a screen-reader user jumps between, and
 * when each product invents its own shell, half of them ship a page whose only
 * landmark is `<div>`.
 *
 * Slots are optional. A screen with no rail and no side panel is the same
 * component with two props left out — not a second layout.
 */
export type AppShellProps = {
    /** Full-width top bar. Rendered as `<header>`. */
    header?: ReactNode;
    /** Narrow icon rail against the leading edge. */
    rail?: ReactNode;
    /** Leading panel — navigation, chat history, a file tree. */
    sidebar?: ReactNode;
    /** Trailing panel — inspector, context, working memory. */
    aside?: ReactNode;
    children: ReactNode;
    /**
     * `fill` pins the shell to the viewport and scrolls each region
     * independently — the right choice for an application. `flow` lets the page
     * scroll as one document, which suits documentation and marketing pages.
     */
    height?: 'fill' | 'flow';
    /**
     * Narrow-width behaviour for the leading regions — the rail and the sidebar.
     *
     * Below `breakpoint.md` there is no room for a 240px panel beside the
     * content, so the panels leave the grid. Passing `onNavToggle` makes them
     * an overlay the reader can summon instead: the shell renders a scrim, and
     * `navOpen` says whether it is showing.
     *
     * Controlled, like everything else in this library that a product will
     * eventually want to drive from a route.
     *
     * Omit both and the behaviour is what it has always been — hidden below the
     * breakpoint, which is honest but leaves the reader no way back to them.
     */
    navOpen?: boolean;
    onNavToggle?: () => void;
    /** The same, for the trailing region. */
    asideOpen?: boolean;
    onAsideToggle?: () => void;
};
export declare function AppShell({ header, rail, sidebar, aside, children, height, navOpen, onNavToggle, asideOpen, onAsideToggle, }: AppShellProps): import("react").JSX.Element;
/**
 * First focusable element on the page, visible only once focused.
 *
 * Three side panels and a rail is a lot of tab stops between the top of the
 * document and the thing the user came for. This is the fix, and it costs
 * nothing to anyone who does not need it.
 */
export declare function SkipLink({ children }: {
    children?: ReactNode;
}): import("react").JSX.Element;
//# sourceMappingURL=AppShell.d.ts.map