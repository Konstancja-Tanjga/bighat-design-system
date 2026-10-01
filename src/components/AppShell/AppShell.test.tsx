import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { AppShell } from './AppShell';
import { NavRail } from '../NavRail/NavRail';
import { Combobox } from '../Combobox/Combobox';
import { Dialog } from '../Dialog/Dialog';
import { SidePanel } from '../SidePanel/SidePanel';

describe('AppShell', () => {
  it('exposes distinct, named landmarks for every region', () => {
    // The reason the shell is a component: four regions with the same generic
    // role are one region as far as landmark navigation is concerned.
    render(
      <AppShell
        header={<span>bar</span>}
        rail={<NavRail items={[]} ariaLabel="Product areas" />}
        sidebar={
          <SidePanel ariaLabel="Conversations">
            <span />
          </SidePanel>
        }
        aside={
          <SidePanel ariaLabel="Working memory" side="end">
            <span />
          </SidePanel>
        }
      >
        <p>content</p>
      </AppShell>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveTextContent('content');
    expect(screen.getByRole('navigation', { name: 'Product areas' })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Conversations' })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Working memory' })).toBeInTheDocument();
  });

  it('omits regions that were not given', () => {
    render(
      <AppShell>
        <p>content</p>
      </AppShell>,
    );

    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('gives the skip link somewhere to land', () => {
    render(
      <AppShell>
        <p>content</p>
      </AppShell>,
    );
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
  });
});

describe('AppShell overlay', () => {
  // jsdom has no layout, so the viewport width is whatever matchMedia says.
  // Keeps its listeners, so a test can cross the breakpoint with a panel open.
  let listeners: Array<(event: { matches: boolean }) => void> = [];
  function setNarrow(narrow: boolean) {
    listeners = [];
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: narrow,
      media: query,
      addEventListener: (_: string, fn: (event: { matches: boolean }) => void) =>
        listeners.push(fn),
      removeEventListener: () => {},
    }));
  }
  function crossTo(narrow: boolean) {
    act(() => listeners.forEach((fn) => fn({ matches: narrow })));
  }
  afterEach(() => vi.unstubAllGlobals());

  function Shell({
    sidebar = <a href="#q3">Q3 invoices</a>,
    initialAside = false,
  }: {
    sidebar?: React.ReactNode;
    initialAside?: boolean;
  }) {
    const [open, setOpen] = useState(false);
    const [asideOpen, setAsideOpen] = useState(initialAside);
    return (
      <AppShell
        header={
          <>
            <button type="button" onClick={() => setOpen(true)}>
              Menu
            </button>
            <button type="button" onClick={() => setAsideOpen(true)}>
              Details
            </button>
          </>
        }
        sidebar={<SidePanel ariaLabel="Conversations">{sidebar}</SidePanel>}
        aside={
          <SidePanel ariaLabel="Details" side="end">
            <button type="button">Pin</button>
          </SidePanel>
        }
        navOpen={open}
        onNavToggle={() => setOpen((value) => !value)}
        asideOpen={asideOpen}
        onAsideToggle={() => setAsideOpen((value) => !value)}
      >
        <button type="button">In main</button>
      </AppShell>
    );
  }

  it('moves focus into the panel and makes the rest inert', async () => {
    setNarrow(true);
    render(<Shell />);
    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

    expect(screen.getByRole('link', { name: 'Q3 invoices' })).toHaveFocus();
    expect(document.querySelector('main')).toHaveAttribute('inert');
    expect(document.querySelector('header')).toHaveAttribute('inert');
    expect(screen.getByRole('button', { name: 'Close navigation' })).not.toHaveAttribute('inert');
  });

  it('closes on Escape and returns focus to the opener', async () => {
    setNarrow(true);
    render(<Shell />);
    const opener = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(opener);
    await userEvent.keyboard('{Escape}');

    expect(screen.queryByRole('button', { name: 'Close navigation' })).not.toBeInTheDocument();
    expect(document.querySelector('main')).not.toHaveAttribute('inert');
    expect(opener).toHaveFocus();
  });

  it('returns focus to the opener when the scrim closes it', async () => {
    setNarrow(true);
    render(<Shell />);
    const opener = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(opener);
    await userEvent.click(screen.getByRole('button', { name: 'Close navigation' }));

    expect(opener).toHaveFocus();
  });

  it('leaves focus and the page alone when the panel sits in the grid', async () => {
    setNarrow(false);
    render(<Shell />);
    const opener = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(opener);

    expect(opener).toHaveFocus();
    expect(document.querySelector('main')).not.toHaveAttribute('inert');
    await userEvent.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Close navigation' })).toBeInTheDocument();
  });

  it('does the same for the trailing panel', async () => {
    setNarrow(true);
    render(<Shell />);
    const opener = screen.getByRole('button', { name: 'Details' });
    await userEvent.click(opener);

    expect(screen.getByRole('button', { name: 'Pin' })).toHaveFocus();
    expect(document.querySelector('.bh-shell__sidebar')).toHaveAttribute('inert');
    await userEvent.keyboard('{Escape}');
    expect(opener).toHaveFocus();
  });

  it('focuses a panel with nothing to focus, and gives its tabindex back', async () => {
    setNarrow(true);
    render(<Shell sidebar={<p>No conversations yet</p>} />);
    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

    const panel = document.querySelector('.bh-shell__sidebar');
    expect(panel).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    expect(panel).not.toHaveAttribute('tabindex');
  });

  it('shows one overlay when both are open: the navigation, with one scrim', async () => {
    setNarrow(true);
    render(<Shell initialAside />);
    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));

    expect(screen.getAllByRole('button', { name: /^Close/ })).toHaveLength(1);
    await userEvent.click(screen.getByRole('button', { name: 'Close navigation' }));
    expect(screen.getByRole('button', { name: 'Close panel' })).toBeInTheDocument();
  });

  it('leaves Escape to a combobox inside the panel', async () => {
    setNarrow(true);
    render(
      <Shell
        sidebar={
          <Combobox
            label="Owner"
            options={[{ value: 'ada', label: 'Ada Lovelace' }]}
            value={null}
            onChange={() => {}}
          />
        }
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    await userEvent.type(screen.getByRole('combobox', { name: 'Owner' }), 'a');
    await userEvent.keyboard('{Escape}');

    expect(screen.getByRole('button', { name: 'Close navigation' })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}{Escape}');
    expect(screen.queryByRole('button', { name: 'Close navigation' })).not.toBeInTheDocument();
  });

  it('leaves Escape to a dialog opened over the panel', async () => {
    setNarrow(true);
    render(
      <Shell
        sidebar={
          <Dialog open onClose={() => {}} title="Delete conversation">
            <p>This cannot be undone.</p>
          </Dialog>
        }
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    await userEvent.keyboard('{Escape}');

    expect(screen.getByRole('button', { name: 'Close navigation' })).toBeInTheDocument();
  });

  it('lets go when the viewport widens with the panel open', async () => {
    setNarrow(true);
    render(<Shell />);
    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(document.querySelector('main')).toHaveAttribute('inert');

    crossTo(false);
    expect(document.querySelector('main')).not.toHaveAttribute('inert');
    await userEvent.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Close navigation' })).toBeInTheDocument();
  });
});

describe('NavRail', () => {
  const items = [
    { id: 'home', label: 'Home', icon: <span>H</span> },
    { id: 'reports', label: 'Reports', icon: <span>R</span> },
  ];

  it('names icon-only items so they are not a memory test', () => {
    render(<NavRail items={items} activeId="home" />);
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reports' })).toBeInTheDocument();
  });

  it('marks the active item with aria-current, not only a class', () => {
    render(<NavRail items={items} activeId="home" />);
    expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Reports' })).not.toHaveAttribute('aria-current');
  });
});

describe('SidePanel', () => {
  it('keeps a route back when collapsed', () => {
    render(
      <SidePanel ariaLabel="Conversations" collapsed onToggle={() => {}}>
        <span />
      </SidePanel>,
    );

    const toggle = screen.getByRole('button', { name: 'Expand Conversations' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('AppShell narrow-width panels', () => {
  /**
   * The scrim is `display: none` above `breakpoint.md`, which is correct — a
   * wide screen shows the panels in the grid and has nothing to dismiss. That
   * also means it is legitimately absent from the accessibility tree at this
   * width, so these assert the DOM contract rather than the rendered a11y
   * tree; the width-dependent part is a container query and belongs in a
   * visual test, not here.
   */
  const scrim = (container: HTMLElement) =>
    container.querySelector<HTMLButtonElement>('.bh-shell__scrim');

  it('offers no scrim when the consumer wired no toggle', () => {
    const { container } = render(
      <AppShell rail={<nav>Rail</nav>} sidebar={<div>Nav</div>}>
        Content
      </AppShell>,
    );
    expect(scrim(container)).toBeNull();
  });

  it('renders the scrim only while a panel is open', () => {
    const { container, rerender } = render(
      <AppShell rail={<nav>Rail</nav>} onNavToggle={() => {}} navOpen={false}>
        Content
      </AppShell>,
    );
    expect(scrim(container)).toBeNull();

    rerender(
      <AppShell rail={<nav>Rail</nav>} onNavToggle={() => {}} navOpen>
        Content
      </AppShell>,
    );
    expect(scrim(container)).toHaveAttribute('aria-label', 'Close navigation');
  });

  it('is a real button, so dismissing works from the keyboard', async () => {
    const onNavToggle = vi.fn();
    const { container } = render(
      <AppShell rail={<nav>Rail</nav>} onNavToggle={onNavToggle} navOpen>
        Content
      </AppShell>,
    );

    const button = scrim(container);
    expect(button?.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');

    // A button fires click on Enter and Space; asserting the handler is
    // enough, and does not depend on jsdom emulating either.
    button?.click();
    expect(onNavToggle).toHaveBeenCalledTimes(1);
  });

  it('treats the trailing panel independently of the leading ones', () => {
    const { container } = render(
      <AppShell aside={<div>Detail</div>} onAsideToggle={() => {}} asideOpen>
        Content
      </AppShell>,
    );
    expect(scrim(container)).toHaveAttribute('aria-label', 'Close panel');
    expect(container).toHaveTextContent('Detail');
  });

  it('marks the shell so CSS can overlay the region it was told to', () => {
    const { container } = render(
      <AppShell rail={<nav>Rail</nav>} onNavToggle={() => {}} navOpen>
        Content
      </AppShell>,
    );
    const shell = container.querySelector('.bh-shell');
    expect(shell).toHaveAttribute('data-nav-collapsible');
    expect(shell).toHaveAttribute('data-nav-open');
    expect(shell).not.toHaveAttribute('data-aside-open');
  });

  it('is not collapsible when there is no region to collapse', () => {
    const { container } = render(
      <AppShell onNavToggle={() => {}} navOpen>
        Content
      </AppShell>,
    );
    expect(scrim(container)).toBeNull();
    expect(container.querySelector('.bh-shell')).not.toHaveAttribute('data-nav-collapsible');
  });
});
