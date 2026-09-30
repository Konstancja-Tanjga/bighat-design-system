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

    await userEvent.click(screen.getByRole('button', { name: 'Move to… Invoice INV-2041' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'In review' }));

    expect(onMove).toHaveBeenCalledWith('review');
  });

  // The select this replaced committed on the first arrow key on Windows, so a
  // keyboard user moved the card while looking at the options.
  it('moves nothing until a destination is chosen', async () => {
    const onMove = vi.fn();
    render(
      <Board ariaLabel="Board">
        <BoardColumn title="Inbox" count={1}>
          <BoardCard
            title="Scan"
            moveTargets={[
              { id: 'review', label: 'In review' },
              { id: 'done', label: 'Done' },
            ]}
            onMove={onMove}
          >
            Scan
          </BoardCard>
        </BoardColumn>
      </Board>,
    );

    screen.getByRole('button', { name: 'Move to… Scan' }).focus();
    await userEvent.keyboard('{ArrowDown}{ArrowDown}');
    expect(onMove).not.toHaveBeenCalled();
    expect(screen.getByRole('menu', { name: 'Move “Scan” to' })).toBeInTheDocument();

    await userEvent.keyboard('{Enter}');
    expect(onMove).toHaveBeenCalledTimes(1);
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
