import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StateBlock } from './StateBlock';

describe('StateBlock', () => {
  it('announces loading politely', () => {
    render(<StateBlock state="loading" title="Loading invoices" />);

    const region = screen.getByRole('status');
    expect(region).toHaveAttribute('aria-busy', 'true');
    expect(region).toHaveTextContent('Loading invoices');
  });

  it('announces errors assertively', () => {
    render(<StateBlock state="error" title="We could not load your invoices" />);
    expect(screen.getByRole('alert')).toHaveTextContent('We could not load your invoices');
  });

  it('gives the empty state no live region at all', () => {
    // An empty list is a successful response. Announcing it interrupts the user
    // to report that nothing went wrong.
    render(<StateBlock state="empty" title="No invoices yet" />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('No invoices yet')).toBeInTheDocument();
  });

  it('hides the decorative icon from assistive technology', () => {
    render(
      <StateBlock state="empty" title="No invoices yet" icon={<span data-testid="i">📄</span>} />,
    );
    expect(screen.getByTestId('i').parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('only renders diagnostics on the error state', () => {
    const { rerender } = render(
      <StateBlock state="empty" title="No invoices yet" diagnostics="HTTP 503" />,
    );
    expect(screen.queryByText('HTTP 503')).not.toBeInTheDocument();

    rerender(<StateBlock state="error" title="Something broke" diagnostics="HTTP 503" />);
    expect(screen.getByText('HTTP 503')).toBeInTheDocument();
  });

  it('collapses diagnostics behind a disclosure rather than showing a stack trace', () => {
    render(<StateBlock state="error" title="Something broke" diagnostics="HTTP 503" />);
    expect(screen.getByRole('group')).not.toHaveAttribute('open');
  });
});
