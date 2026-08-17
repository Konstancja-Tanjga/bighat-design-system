import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

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
