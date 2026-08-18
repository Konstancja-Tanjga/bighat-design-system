import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Combobox } from './Combobox';

const options = [
  { value: 'pl', label: 'Poland' },
  { value: 'de', label: 'Germany' },
  { value: 'cz', label: 'Czechia' },
];

function Example({ onChange = () => {} }: { onChange?: (value: string | null) => void }) {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Combobox
      label="Country"
      options={options}
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange(next);
      }}
    />
  );
}

describe('Combobox', () => {
  it('exposes the combobox pattern', async () => {
    render(<Example />);
    const input = screen.getByRole('combobox', { name: 'Country' });

    expect(input).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox', { name: 'Country' })).toBeInTheDocument();
  });

  it('filters as the user types and reports the count', async () => {
    render(<Example />);

    await userEvent.type(screen.getByRole('combobox'), 'ger');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('1 results');
  });

  it('keeps focus on the input and tracks the active option', async () => {
    render(<Example />);
    const input = screen.getByRole('combobox');

    await userEvent.click(input);
    await userEvent.keyboard('{ArrowDown}');
    expect(input).toHaveFocus();
    expect(input.getAttribute('aria-activedescendant')).toBe(screen.getAllByRole('option')[1]!.id);
  });

  it('commits with Enter', async () => {
    const onChange = vi.fn();
    render(<Example onChange={onChange} />);

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledWith('de');
    expect(screen.getByRole('combobox')).toHaveValue('Germany');
  });

  it('closes on the first Escape and clears on the second', async () => {
    const onChange = vi.fn();
    render(<Example onChange={onChange} />);
    const input = screen.getByRole('combobox');

    await userEvent.click(input);
    await userEvent.keyboard('{Enter}');
    expect(input).toHaveValue('Poland');

    await userEvent.keyboard('{Escape}');
    expect(input).toHaveValue('');
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('does not leave free text behind on blur', async () => {
    render(<Example />);
    const input = screen.getByRole('combobox');

    await userEvent.type(input, 'Pol');
    await userEvent.tab();
    expect(input).toHaveValue('');
  });
});
