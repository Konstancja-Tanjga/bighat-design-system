import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Breadcrumbs } from './Breadcrumbs';

const deep = [
  { label: 'Home', href: '/' },
  { label: 'Billing', href: '/billing' },
  { label: 'Invoices', href: '/billing/invoices' },
  { label: '2026', href: '/billing/invoices/2026' },
  { label: 'Q3', href: '/billing/invoices/2026/q3' },
  { label: 'INV-2043' },
];

describe('Breadcrumbs', () => {
  it('marks the current page and does not link to it', () => {
    render(<Breadcrumbs items={deep.slice(0, 3).concat({ label: 'INV-2043' })} />);
    const current = screen.getByText('INV-2043');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current.closest('a')).toBeNull();
    expect(screen.getByRole('link', { name: 'Billing' })).toHaveAttribute('href', '/billing');
  });

  it('keeps separators out of the accessible name', () => {
    render(<Breadcrumbs items={deep.slice(0, 2)} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveTextContent('HomeBilling');
  });

  // The regression: the ellipsis used to be an aria-hidden span, so the
  // collapsed levels were unreachable by pointer, keyboard and screen reader.
  it('collapses the middle into a button that reveals it and moves focus there', async () => {
    render(<Breadcrumbs items={deep} maxItems={4} />);
    expect(screen.queryByRole('link', { name: 'Billing' })).not.toBeInTheDocument();

    const more = screen.getByRole('button', { name: 'Show 3 more levels' });
    await userEvent.click(more);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    const billing = screen.getByRole('link', { name: 'Billing' });
    expect(document.activeElement).toBe(billing);
    expect(screen.getAllByRole('link')).toHaveLength(5);
  });

  it('names a single hidden level in the singular', () => {
    render(<Breadcrumbs items={deep.slice(0, 3).concat({ label: 'INV-2043' })} maxItems={3} />);
    expect(screen.getByRole('button', { name: 'Show 1 more level' })).toBeInTheDocument();
  });

  it('collapses again when the trail changes under a mounted component', async () => {
    const { rerender } = render(<Breadcrumbs items={deep} maxItems={4} />);
    await userEvent.click(screen.getByRole('button', { name: 'Show 3 more levels' }));
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    const other = deep.map((item) =>
      item.href ? { ...item, href: `/archive${item.href}` } : { label: 'INV-1990' },
    );
    rerender(<Breadcrumbs items={other} maxItems={4} />);
    expect(screen.getByRole('button', { name: 'Show 3 more levels' })).toBeInTheDocument();
  });
});
