import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('is labelled and operable by keyboard', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Send me the summary" onChange={onChange} />);

    const box = screen.getByRole('checkbox', { name: /Send me the summary/ });
    await userEvent.tab();
    expect(box).toHaveFocus();

    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenCalled();
  });

  it('sets indeterminate as a property, so it is announced as mixed', () => {
    render(<Checkbox label="All regions" indeterminate />);
    const box = screen.getByRole('checkbox') as HTMLInputElement;
    expect(box.indeterminate).toBe(true);
  });

  it('wires the error to the input', () => {
    render(<Checkbox label="I accept" error="You have to accept the terms." />);
    const box = screen.getByRole('checkbox');
    expect(box).toBeInvalid();
    expect(box).toHaveAccessibleDescription('You have to accept the terms.');
  });
});
