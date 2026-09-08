import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { FilterChip } from './FilterChip';

describe('FilterChip', () => {
  it('is a toggle button whose name is the text on it', () => {
    render(<FilterChip label="Finance" pressed={false} />);
    expect(screen.getByRole('button', { name: 'Finance' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('reports the pressed state to assistive technology', () => {
    render(<FilterChip label="Finance" pressed />);
    expect(screen.getByRole('button', { name: 'Finance' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('carries the pressed state in a mark as well as a colour', () => {
    const { container } = render(<FilterChip label="Finance" pressed />);
    // WCAG 1.4.1: the tint is not allowed to be the only cue. The mark is
    // hidden from the accessible name because aria-pressed already says it.
    const mark = container.querySelector('.bh-chip__mark');
    expect(mark).toHaveTextContent('✓');
    expect(mark).toHaveAttribute('aria-hidden', 'true');
  });

  it('leaves the mark box in place when off, so a row of chips does not reflow', () => {
    const { container } = render(<FilterChip label="Finance" pressed={false} />);
    expect(container.querySelector('.bh-chip__mark')).toBeEmptyDOMElement();
  });

  it('does not submit the form it sits in', () => {
    // A filter next to a form is the common case, and a chip defaulting to
    // type="submit" would send it.
    render(<FilterChip label="Finance" pressed={false} />);
    expect(screen.getByRole('button', { name: 'Finance' })).toHaveAttribute('type', 'button');
  });

  it('toggles on click', async () => {
    const onClick = vi.fn();
    render(<FilterChip label="Finance" pressed={false} onClick={onClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'Finance' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
