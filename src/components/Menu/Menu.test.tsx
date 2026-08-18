import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Menu } from './Menu';

describe('Menu', () => {
  const items = [
    { label: 'Rename', onSelect: vi.fn() },
    { label: 'Duplicate', disabled: true },
    { label: 'Delete', tone: 'critical' as const, onSelect: vi.fn() },
  ];

  it('describes the trigger as a menu button', () => {
    render(<Menu label="Actions" items={items} />);
    const trigger = screen.getByRole('button', { name: /Actions/ });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens on ArrowDown with focus on the first item', async () => {
    render(<Menu label="Actions" items={items} />);

    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus();
  });

  it('opens upwards on ArrowUp and skips disabled items', async () => {
    render(<Menu label="Actions" items={items} />);

    await userEvent.tab();
    await userEvent.keyboard('{ArrowUp}');
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus();
  });

  it('returns focus to the trigger on Escape', async () => {
    render(<Menu label="Actions" items={items} />);
    const trigger = screen.getByRole('button', { name: /Actions/ });

    await userEvent.click(trigger);
    await userEvent.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('runs the action and closes', async () => {
    const onSelect = vi.fn();
    render(<Menu label="Actions" items={[{ label: 'Rename', onSelect }]} />);

    await userEvent.click(screen.getByRole('button', { name: /Actions/ }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Rename' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
  });
});
