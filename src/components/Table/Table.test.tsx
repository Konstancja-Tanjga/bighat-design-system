import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Table, type Column } from './Table';

type Row = { id: string; name: string };

const rows: Row[] = [
  { id: '1', name: 'Northwind' },
  { id: '2', name: 'Contoso' },
];

const columns: Array<Column<Row>> = [
  { key: 'id', header: 'Id', cell: (row) => row.id, sortable: true },
  { key: 'name', header: 'Name', cell: (row) => row.name },
];

const base = { caption: 'Customers', columns, rows, rowKey: (row: Row) => row.id };

describe('Table', () => {
  it('names the table with its caption', () => {
    render(<Table {...base} />);
    expect(screen.getByRole('table', { name: 'Customers' })).toBeInTheDocument();
  });

  it('marks only the sorted column with aria-sort', () => {
    render(
      <Table {...base} sort={{ key: 'id', direction: 'ascending' }} onSortChange={() => {}} />,
    );

    expect(screen.getByRole('columnheader', { name: /Id/ })).toHaveAttribute(
      'aria-sort',
      'ascending',
    );
    expect(screen.getByRole('columnheader', { name: 'Name' })).not.toHaveAttribute('aria-sort');
  });

  it('toggles direction from the keyboard', async () => {
    const onSortChange = vi.fn();
    render(
      <Table {...base} sort={{ key: 'id', direction: 'ascending' }} onSortChange={onSortChange} />,
    );

    const header = screen.getByRole('button', { name: /Id/ });
    header.focus();
    await userEvent.keyboard('{Enter}');

    expect(onSortChange).toHaveBeenCalledWith({ key: 'id', direction: 'descending' });
  });

  it('renders no sort control when the table is not sortable', () => {
    render(<Table {...base} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('replaces the body with a StateBlock spanning every column', () => {
    render(
      <Table
        {...base}
        rows={[]}
        state={{ state: 'error', title: 'We could not load customers' }}
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('We could not load customers');
    expect(screen.getByRole('cell')).toHaveAttribute('colspan', '2');
  });
});
