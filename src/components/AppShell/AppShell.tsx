import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';

/** The literal in AppShell.css. Below it the panels leave the grid. */
const OVERLAY_QUERY = '(max-width: 900px)';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useMediaQuery(query: string): boolean {
  // False on the server and on the first client render, so hydration matches;
  // the overlay behaviour starts once the effect has read the real width.
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const list = window.matchMedia(query);
    setMatches(list.matches);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/**
 * What a modal needs, for a panel shown over the content: focus moves in, the
 * rest of the page goes inert, Escape closes, and focus goes back to whatever
 * opened it. Applied only while the panel is actually overlaid.
 */
function useOverlay(
  active: boolean,
  panels: Array<RefObject<HTMLDivElement | null>>,
  background: Array<RefObject<HTMLElement | null>>,
  onClose: (() => void) | undefined,
) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!active) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const elements = panels.map((ref) => ref.current).filter((el): el is HTMLDivElement => !!el);

    // The first control in the panel, or the panel itself if it has none.
    const first = elements
      .flatMap((el) => Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)))
      .find((el) => !el.closest('[hidden]') && (el as HTMLInputElement).type !== 'hidden');
    const target = first ?? elements[0];
    const addedTabIndex = !!target && !first && !target.hasAttribute('tabindex');
    if (addedTabIndex) target.tabIndex = -1;
    target?.focus();

    // Set as an attribute so it works on React 18, which does not know the prop.
    const hidden = background.map((ref) => ref.current).filter((el): el is HTMLElement => !!el);
    hidden.forEach((el) => el.setAttribute('inert', ''));

    // Escape is the panel's only when nothing inside has used it: a component
    // that handles it calls preventDefault, and a modal <dialog> handles it
    // through its own cancel event, which preventDefault here would suppress.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented || event.isComposing) return;
      if (document.querySelector('dialog[open]')) return;
      closeRef.current?.();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      hidden.forEach((el) => el.removeAttribute('inert'));
      if (addedTabIndex) target.removeAttribute('tabindex');
      // Back to the opener only if focus is still in the panel or was dropped
      // with the scrim; a reader who has moved on is left where they are.
      const current = document.activeElement;
      const lost = !current || current === document.body;
      const inside = elements.some((el) => el.contains(current));
      if ((lost || inside) && opener?.isConnected) opener.focus();
    };
    // Refs are stable; the effect is keyed on whether the overlay is showing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}

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
   * While a panel is overlaid, the shell treats it as a modal: focus moves
   * into it, the header, `main` and the other panels are inert, Escape calls
   * the toggle, and on close focus returns to the control that opened it.
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
  const narrow = useMediaQuery(OVERLAY_QUERY);
  // One overlay at a time. If both are open on a narrow screen the navigation
  // is shown and the trailing panel waits behind it, undrawn, so there is one
  // scrim and it closes the panel the reader can see.
  const showAsideScrim = asideCollapsible && asideOpen && !(narrow && showNavScrim);

  const headerRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);

  const navOverlay = narrow && showNavScrim;
  const asideOverlay = narrow && showAsideScrim;
  useOverlay(navOverlay, [railRef, sidebarRef], [headerRef, mainRef, asideRef], onNavToggle);
  useOverlay(asideOverlay, [asideRef], [headerRef, railRef, sidebarRef, mainRef], onAsideToggle);

  return (
    <div
      className={`bh-shell bh-shell--${height}`}
      data-has-rail={rail ? '' : undefined}
      data-nav-collapsible={navCollapsible ? '' : undefined}
      data-nav-open={showNavScrim ? '' : undefined}
      data-aside-collapsible={asideCollapsible ? '' : undefined}
      data-aside-open={showAsideScrim ? '' : undefined}
    >
      {header && (
        <header ref={headerRef} className="bh-shell__header">
          {header}
        </header>
      )}
      {rail && (
        <div ref={railRef} className="bh-shell__rail">
          {rail}
        </div>
      )}
      {sidebar && (
        <div ref={sidebarRef} className="bh-shell__sidebar">
          {sidebar}
        </div>
      )}

      {/* The only <main> on the page, so "skip to content" has somewhere to go. */}
      <main ref={mainRef} className="bh-shell__main" id="main-content" tabIndex={-1}>
        {children}
      </main>

      {aside && (
        <div ref={asideRef} className="bh-shell__aside">
          {aside}
        </div>
      )}

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
