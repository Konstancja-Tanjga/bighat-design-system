import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Board, BoardCard, BoardColumn } from './Board';

describe('Board', () => {
  it('names the region and each column list', () => {
    render(
      <Board ariaLabel="Documents by stage">
        <BoardColumn title="Inbox" count={1}>
          <BoardCard title="Invoice INV-2041">Invoice INV-2041</BoardCard>
        </BoardColumn>
      </Board>,
    );

    expect(screen.getByRole('region', { name: 'Documents by stage' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Inbox, 1 items' })).toBeInTheDocument();
  });

  it('offers a pointer-free way to move a card', async () => {
    // WCAG 2.5.1: a path-based gesture must have a simple alternative. This is
    // the whole reason Board is a component rather than a layout.
    const onMove = vi.fn();
    render(
      <Board ariaLabel="Board">
        <BoardColumn title="Inbox" count={1}>
          <BoardCard
            title="Invoice INV-2041"
            moveTargets={[{ id: 'review', label: 'In review' }]}
            onMove={onMove}
          >
            Invoice INV-2041
          </BoardCard>
        </BoardColumn>
      </Board>,
    );

    const move = screen.getByLabelText('Move “Invoice INV-2041” to');
    await userEvent.selectOptions(move, 'review');

    expect(onMove).toHaveBeenCalledWith('review');
  });

  it('announces a move through a live region', () => {
    render(
      <Board ariaLabel="Board" announcement="Invoice INV-2041 moved to In review.">
        <BoardColumn title="Inbox" count={0} />
      </Board>,
    );

    expect(screen.getByRole('status')).toHaveTextContent('Invoice INV-2041 moved to In review.');
  });

  it('states the over-limit condition in words, not only in colour', () => {
    render(
      <Board ariaLabel="Board">
        <BoardColumn title="Classifying" count={5} limit={3}>
          <span />
        </BoardColumn>
      </Board>,
    );

    expect(screen.getByText(/Over the 3-card limit/)).toBeInTheDocument();
  });

  it('renders the empty slot instead of an empty list', () => {
    render(
      <Board ariaLabel="Board">
        <BoardColumn title="Approved" count={0} empty={<p>Nothing approved yet</p>}>
          <span />
        </BoardColumn>
      </Board>,
    );

    expect(screen.getByText('Nothing approved yet')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
