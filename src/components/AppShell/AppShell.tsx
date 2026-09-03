import type { ReactNode } from 'react';

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

export function AppShell({
  header,
  rail,
  sidebar,
  aside,
  children,
  height = 'fill',
  navOpen = false,
  onNavToggle,
  asideOpen = false,
  onAsideToggle,
}: AppShellProps) {
  // A region is only collapsible if the consumer gave it somewhere to go.
  const navCollapsible = Boolean(onNavToggle && (rail || sidebar));
  const asideCollapsible = Boolean(onAsideToggle && aside);

  const showNavScrim = navCollapsible && navOpen;
  const showAsideScrim = asideCollapsible && asideOpen;

  return (
    <div
      className={`bh-shell bh-shell--${height}`}
      data-has-rail={rail ? '' : undefined}
      data-nav-collapsible={navCollapsible ? '' : undefined}
      data-nav-open={showNavScrim ? '' : undefined}
      data-aside-collapsible={asideCollapsible ? '' : undefined}
      data-aside-open={showAsideScrim ? '' : undefined}
    >
      {header && <header className="bh-shell__header">{header}</header>}
      {rail && <div className="bh-shell__rail">{rail}</div>}
      {sidebar && <div className="bh-shell__sidebar">{sidebar}</div>}

      {/* The only <main> on the page, so "skip to content" has somewhere to go. */}
      <main className="bh-shell__main" id="main-content" tabIndex={-1}>
        {children}
      </main>

      {aside && <div className="bh-shell__aside">{aside}</div>}

      {/* A real button, not a div: dismissing an overlay is an action, and a
          keyboard user needs to reach it. Only rendered while open, so it is
          never a phantom tab stop. */}
      {showNavScrim && (
        <button
          type="button"
          className="bh-shell__scrim"
          onClick={onNavToggle}
          aria-label="Close navigation"
        />
      )}
      {showAsideScrim && (
        <button
          type="button"
          className="bh-shell__scrim"
          onClick={onAsideToggle}
          aria-label="Close panel"
        />
      )}
    </div>
  );
}

/**
 * First focusable element on the page, visible only once focused.
 *
 * Three side panels and a rail is a lot of tab stops between the top of the
 * document and the thing the user came for. This is the fix, and it costs
 * nothing to anyone who does not need it.
 */
export function SkipLink({ children = 'Skip to main content' }: { children?: ReactNode }) {
  return (
    <a className="bh-skip-link bh-focusable" href="#main-content">
      {children}
    </a>
  );
}
