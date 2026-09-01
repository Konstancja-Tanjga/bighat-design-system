import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AppShell } from './AppShell';
import { NavRail } from '../NavRail/NavRail';
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
