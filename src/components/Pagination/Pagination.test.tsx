import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Pagination } from './Pagination';

const base = { page: 0, pageSize: 20, total: 312, onPageChange: () => {}, unit: 'invoices' };

describe('Pagination', () => {
  it('reports the range and the total, not a page number', () => {
    render(<Pagination {...base} />);
    expect(screen.getByText('1–20 of 312 invoices')).toBeInTheDocument();
  });

  it('clamps the last page to the total', () => {
    render(<Pagination {...base} page={15} />);
    expect(screen.getByText('301–312 of 312 invoices')).toBeInTheDocument();
  });

  it('disables Previous on the first page and Next on the last', () => {
    const { rerender } = render(<Pagination {...base} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();

    rerender(<Pagination {...base} page={15} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('says so when there is nothing rather than showing 0–0 of 0', () => {
    render(<Pagination {...base} total={0} />);
    expect(screen.getByText('No invoices')).toBeInTheDocument();
  });

  it('does not claim a total it was not given', () => {
    render(<Pagination {...base} total={undefined} />);
    expect(screen.getByText('1–20 of many invoices')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  it('returns to the first page when the page size changes', async () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();
    render(
      <Pagination
        {...base}
        page={4}
        onPageChange={onPageChange}
        pageSizeOptions={[20, 50]}
        onPageSizeChange={onPageSizeChange}
      />,
    );

    await userEvent.selectOptions(screen.getByLabelText('Per page'), '50');

    expect(onPageSizeChange).toHaveBeenCalledWith(50);
    expect(onPageChange).toHaveBeenCalledWith(0);
  });

  it('announces the range as it changes', () => {
    render(<Pagination {...base} />);
    expect(screen.getByText('1–20 of 312 invoices')).toHaveAttribute('aria-live', 'polite');
  });

  it('hides the size control unless both the options and the handler are given', () => {
    render(<Pagination {...base} pageSizeOptions={[20, 50]} />);
    expect(screen.queryByLabelText('Per page')).not.toBeInTheDocument();
  });
});
