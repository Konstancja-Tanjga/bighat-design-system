import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ListView } from './ListView';

const items = [
  { id: 'a', title: 'Alpha' },
  { id: 'b', title: 'Beta', disabled: true },
  { id: 'c', title: 'Gamma' },
];

describe('ListView', () => {
  it('is a single tab stop with an active descendant', async () => {
    render(<ListView ariaLabel="Records" items={items} />);
    const listbox = screen.getByRole('listbox', { name: 'Records' });

    await userEvent.tab();
    expect(listbox).toHaveFocus();
    expect(listbox.getAttribute('aria-activedescendant')).toBe(
      screen.getByRole('option', { name: 'Alpha' }).id,
    );
  });

  it('moves with the arrows and skips disabled rows', async () => {
    const onChange = vi.fn();
    render(<ListView ariaLabel="Records" items={items} onChange={onChange} />);

    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    expect(onChange).toHaveBeenLastCalledWith('c');
    expect(screen.getByRole('option', { name: 'Gamma' })).toHaveAttribute('aria-selected', 'true');
  });

  it('finds a row by type-ahead', async () => {
    render(<ListView ariaLabel="Records" items={items} />);

    await userEvent.tab();
    await userEvent.keyboard('ga');
    expect(screen.getByRole('option', { name: 'Gamma' })).toHaveAttribute('aria-selected', 'true');
  });

  it('renders the empty slot instead of an empty listbox', () => {
    render(<ListView ariaLabel="Records" items={[]} empty="Nothing here" />);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });
});
