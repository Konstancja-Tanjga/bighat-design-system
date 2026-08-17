import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('associates the visible label with the control', () => {
    render(<Input label="Work email" />);
    expect(screen.getByLabelText('Work email')).toBeInstanceOf(HTMLInputElement);
  });

  it('keeps the label available when it is visually hidden', () => {
    render(<Input label="Search invoices" hideLabel />);
    expect(screen.getByLabelText('Search invoices')).toBeInTheDocument();
  });

  it('exposes description and error together, error first', () => {
    render(<Input label="Work email" description="Billing receipts only." error="Missing an @." />);

    const input = screen.getByLabelText(/Work email/);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Missing an @. Billing receipts only.');
  });

  it('is not marked invalid without an error message', () => {
    render(<Input label="Work email" />);
    expect(screen.getByLabelText('Work email')).not.toHaveAttribute('aria-invalid');
  });

  it('generates unique ids so two fields on one page do not collide', () => {
    render(
      <>
        <Input label="First name" />
        <Input label="Last name" />
      </>,
    );

    const [first, last] = screen.getAllByRole('textbox');
    expect(first.id).not.toBe(last.id);
  });
});
