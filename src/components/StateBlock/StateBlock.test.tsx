import { render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { StateBlock } from './StateBlock';

describe('StateBlock', () => {
  it('announces loading politely', () => {
    render(<StateBlock state="loading" title="Loading invoices" />);

    const region = screen.getByRole('status');
    // No aria-busy: it tells assistive tech to hold announcements back, and
    // nothing ever cleared it.
    expect(region).not.toHaveAttribute('aria-busy');
    expect(region).toHaveTextContent('Loading invoices');
  });

  // A live region is announced for what changes inside it. Mounted with its
  // words already in it, most screen readers say nothing - so it arrives
  // empty and fills one render later. The server render is that first mount.
  it('mounts its live region empty, so the words arrive as a change', () => {
    const first = renderToStaticMarkup(<StateBlock state="loading" title="Loading invoices" />);
    expect(first).toContain('role="status"');
    expect(first).not.toContain('Loading invoices');

    const empty = renderToStaticMarkup(<StateBlock state="empty" title="No invoices yet" />);
    expect(empty).toContain('No invoices yet');
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
