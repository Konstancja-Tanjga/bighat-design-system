import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RemovableChip } from './RemovableChip';

describe('RemovableChip', () => {
  it('names the remove button after what it removes', () => {
    render(<RemovableChip label="Finance" onRemove={() => {}} />);
    expect(screen.getByRole('button', { name: 'Remove Finance' })).toBeInTheDocument();
  });

  it('lets the caller say the noun', () => {
    render(<RemovableChip label="Finance" removeLabel="Remove tag Finance" onRemove={() => {}} />);
    expect(screen.getByRole('button', { name: 'Remove tag Finance' })).toBeInTheDocument();
  });

  it('is not itself a button — the chip is a label, the button is beside it', () => {
    render(<RemovableChip label="Finance" onRemove={() => {}} />);
    // One control, not two. A chip that is both a button and contains a button
    // has no keyboard story anyone can follow.
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.getByText('Finance').tagName).toBe('SPAN');
  });

  it('hides the glyph from the accessible name', () => {
    render(<RemovableChip label="Finance" onRemove={() => {}} />);
    expect(screen.getByText('×')).toHaveAttribute('aria-hidden', 'true');
  });

  it('removes on click', async () => {
    const onRemove = vi.fn();
    render(<RemovableChip label="Finance" onRemove={onRemove} />);

    await userEvent.click(screen.getByRole('button', { name: 'Remove Finance' }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('does not fire when disabled', async () => {
    const onRemove = vi.fn();
    render(<RemovableChip label="Finance" onRemove={onRemove} disabled />);

    await userEvent.click(screen.getByRole('button', { name: 'Remove Finance' }));
    expect(onRemove).not.toHaveBeenCalled();
  });
});
