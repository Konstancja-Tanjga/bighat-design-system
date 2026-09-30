import { render, screen, waitFor } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { StateBlock } from './StateBlock';

describe('StateBlock', () => {
  it('announces loading politely, once the region has painted empty', async () => {
    render(<StateBlock state="loading" title="Loading invoices" />);

    const region = screen.getByRole('status');
    // No aria-busy: it tells assistive tech to hold announcements back, and
    // nothing ever cleared it.
    expect(region).not.toHaveAttribute('aria-busy');
    expect(region).toBeEmptyDOMElement();
    await waitFor(() => expect(region).toHaveTextContent('Loading invoices'));
  });

  it('draws its content at once, so there is no empty box and the server render has text', () => {
    const html = renderToStaticMarkup(<StateBlock state="loading" title="Loading invoices" />);
    expect(html).toContain('Loading invoices');
    expect(html).toContain('role="status"');
    // The visible copy is hidden from assistive tech: the region carries it.
    expect(html).toMatch(/class="bh-stateblock__title" aria-hidden="true"/);
  });

  it('announces errors assertively, inserted with their words', () => {
    render(<StateBlock state="error" title="We could not load your invoices" />);
    expect(screen.getByRole('alert')).toHaveTextContent('We could not load your invoices');
  });

  // The regression the review found: Table keeps one StateBlock and changes
  // its state. The region must be a fresh element for each state, not the old
  // one with new words and a new role.
  it('mounts a fresh region for each state on the same instance', async () => {
    const { rerender } = render(<StateBlock state="empty" title="No invoices yet" />);

    rerender(<StateBlock state="loading" title="Loading invoices" />);
    const loading = screen.getByRole('status');
    expect(loading).toBeEmptyDOMElement();
    await waitFor(() => expect(loading).toHaveTextContent('Loading invoices'));

    rerender(<StateBlock state="error" title="We could not load your invoices" />);
    const error = screen.getByRole('alert');
    expect(error).not.toBe(loading);
    expect(error).toHaveTextContent('We could not load your invoices');

    rerender(<StateBlock state="loading" title="Loading invoices" />);
    const again = screen.getByRole('status');
    expect(again).not.toBe(loading);
    expect(again).toBeEmptyDOMElement();
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
