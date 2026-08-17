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
};

export function AppShell({ header, rail, sidebar, aside, children, height = 'fill' }: AppShellProps) {
  return (
    <div className={`bh-shell bh-shell--${height}`} data-has-rail={rail ? '' : undefined}>
      {header && <header className="bh-shell__header">{header}</header>}
      {rail && <div className="bh-shell__rail">{rail}</div>}
      {sidebar && <div className="bh-shell__sidebar">{sidebar}</div>}

      {/* The only <main> on the page, so "skip to content" has somewhere to go. */}
      <main className="bh-shell__main" id="main-content" tabIndex={-1}>
        {children}
      </main>

      {aside && <div className="bh-shell__aside">{aside}</div>}
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
