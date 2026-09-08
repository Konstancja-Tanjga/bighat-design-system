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

  it('toggles when the drawn box is clicked, not only the label', async () => {
    /*
     * Regression. The drawn box is decorative and sits over the real input; it
     * used to have `pointer-events: auto` and paint last, so it swallowed the
     * click. A checkbox with a visible label hid the bug — the label still
     * worked — and it only surfaced where the label is visually hidden, which
     * is exactly how `Table` renders its selection column.
     *
     * jsdom applies no CSS, so this asserts the contract the CSS has to keep:
     * a click anywhere in the control toggles it.
     */
    const onChange = vi.fn();
    const { container } = render(
      <Checkbox label={<span className="bh-visually-hidden">Select this row</span>} onChange={onChange} />,
    );

    const box = container.querySelector('.bh-checkbox__box');
    expect(box, 'the drawn box should exist').toBeTruthy();
    expect(box).toHaveAttribute('aria-hidden', 'true');

    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledOnce();
  });
});
