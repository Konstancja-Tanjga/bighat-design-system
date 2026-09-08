import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('associates the visible label with the control', () => {
    render(<Textarea label="Handover note" />);
    expect(screen.getByLabelText('Handover note')).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('exposes description and error together, error first', () => {
    render(<Textarea label="Reason" description="The uploader sees this." error="Say why." />);

    const field = screen.getByLabelText(/Reason/);
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveAccessibleDescription('Say why. The uploader sees this.');
  });

  it('is not marked invalid without an error message', () => {
    render(<Textarea label="Reason" />);
    expect(screen.getByLabelText('Reason')).not.toHaveAttribute('aria-invalid');
  });

  it('generates unique ids so two fields on one page do not collide', () => {
    render(
      <>
        <Textarea label="First note" />
        <Textarea label="Second note" />
      </>,
    );

    const [first, second] = screen.getAllByRole('textbox');
    expect(first.id).not.toBe(second.id);
  });

  it('always renders the label visibly — there is no hideLabel here', () => {
    // The API omission is deliberate; see the component's doc comment. This
    // asserts the consequence: the label is on screen, not merely in the tree.
    render(<Textarea label="Handover note" />);
    expect(screen.getByText('Handover note')).not.toHaveClass('bh-visually-hidden');
  });

  it('marks a required field for sighted readers without saying "star" out loud', () => {
    render(<Textarea label="Reason" required />);
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByLabelText(/Reason/)).toBeRequired();
  });
});
