import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './Card';

describe('Card', () => {
  it('renders a plain surface by default', () => {
    render(<Card>INV-2043</Card>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('INV-2043')).toHaveClass('bh-card');
  });

  it('is one button when it has one action', () => {
    render(
      <Card onClick={() => {}} ariaLabel="Open INV-2043">
        INV-2043
      </Card>,
    );
    expect(screen.getByRole('button', { name: 'Open INV-2043' })).toBeInTheDocument();
  });

  it('puts its actions in a row after the content, inside the card', () => {
    render(
      <Card
        actions={
          <>
            <button type="button">Download PDF</button>
            <button type="button">Send reminder</button>
          </>
        }
      >
        INV-2043
      </Card>,
    );
    const row = screen.getByRole('button', { name: 'Send reminder' }).parentElement!;
    const card = row.parentElement!;
    expect(row).toHaveClass('bh-card__actions');
    expect(card).toHaveClass('bh-card', 'bh-card--with-actions');
    expect(card.lastElementChild).toBe(row);
    expect(card.firstElementChild).toHaveTextContent('INV-2043');
  });

  it('refuses actions on a card that is a button', () => {
    render(
      // @ts-expect-error - a card that is a button cannot hold buttons.
      <Card onClick={() => {}} actions={<button type="button">Download</button>}>
        x
      </Card>,
    );
  });
});
