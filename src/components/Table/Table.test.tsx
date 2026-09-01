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

  it('spans every column with the state cell, utility columns included', () => {
    render(
      <Table
        {...base}
        rows={[]}
        selection={{ selected: new Set(), onChange: () => {} }}
        rowActions={() => [{ label: 'Archive' }]}
        state={{ state: 'empty', title: 'No customers yet' }}
      />,
    );

    // 2 data columns + select + actions.
    expect(screen.getByRole('cell')).toHaveAttribute('colspan', '4');
  });
});

describe('Table selection', () => {
  it('goes indeterminate when some but not all rows are selected', () => {
    render(<Table {...base} selection={{ selected: new Set(['1']), onChange: () => {} }} />);

    const all = screen.getByRole('checkbox', { name: 'Select all customers' });
    expect(all).toBePartiallyChecked();
  });

  it('is checked only when every row is selected', () => {
    render(
      <Table {...base} selection={{ selected: new Set(['1', '2']), onChange: () => {} }} />,
    );
    expect(screen.getByRole('checkbox', { name: 'Select all customers' })).toBeChecked();
  });

  it('selects the rest from a partial selection rather than clearing it', async () => {
    const onChange = vi.fn();
    render(<Table {...base} selection={{ selected: new Set(['1']), onChange }} />);

    await userEvent.click(screen.getByRole('checkbox', { name: 'Select all customers' }));

    expect(onChange).toHaveBeenCalledWith(new Set(['1', '2']));
  });

  it('clears every row when all were selected', async () => {
    const onChange = vi.fn();
    render(<Table {...base} selection={{ selected: new Set(['1', '2']), onChange }} />);

    await userEvent.click(screen.getByRole('checkbox', { name: 'Select all customers' }));

    expect(onChange).toHaveBeenCalledWith(new Set());
  });

  it('toggles one row without touching the others', async () => {
    const onChange = vi.fn();
    render(<Table {...base} selection={{ selected: new Set(['2']), onChange }} />);

    const [, firstRow] = screen.getAllByRole('checkbox');
    await userEvent.click(firstRow);

    expect(onChange).toHaveBeenCalledWith(new Set(['2', '1']));
  });

  it('disables select-all when there is nothing to select', () => {
    render(<Table {...base} rows={[]} selection={{ selected: new Set(), onChange: () => {} }} />);
    expect(screen.getByRole('checkbox', { name: 'Select all customers' })).toBeDisabled();
  });

  it('names a row checkbox after one thing, not the table', () => {
    render(<Table {...base} selection={{ selected: new Set(), onChange: () => {} }} />);
    expect(screen.getAllByRole('checkbox', { name: 'Select this customer' })).toHaveLength(2);
  });
});

describe('Table row actions', () => {
  it('gives every row its own menu', () => {
    render(<Table {...base} rowActions={() => [{ label: 'Archive' }]} />);
    expect(screen.getAllByRole('button', { name: 'Row actions' })).toHaveLength(2);
  });

  it('builds the items from the row it belongs to', async () => {
    const onSelect = vi.fn();
    render(
      <Table
        {...base}
        rowActions={(row) => [{ label: `Archive ${row.name}`, onSelect }]}
      />,
    );

    await userEvent.click(screen.getAllByRole('button', { name: 'Row actions' })[0]);
    await userEvent.click(screen.getByRole('menuitem', { name: 'Archive Northwind' }));

    expect(onSelect).toHaveBeenCalled();
  });
});

describe('Table totals', () => {
  it('puts them in tfoot so a sort cannot move them', () => {
    render(<Table {...base} totals={() => ['Total', '2']} />);

    const foot = screen.getByRole('table').querySelector('tfoot');
    expect(foot).not.toBeNull();
    expect(foot).toHaveTextContent('Total');
  });

  it('renders no totals row when there is nothing to total', () => {
    render(<Table {...base} rows={[]} totals={() => ['Total', '0']} />);
    expect(screen.getByRole('table').querySelector('tfoot')).toBeNull();
  });
});

describe('Table responsive forms', () => {
  it('scrolls by default, which is what it did before the prop existed', () => {
    const { container } = render(<Table {...base} />);
    expect(container.querySelector('.bh-table-wrapper--scroll')).not.toBeNull();
  });

  it('keeps the header in the accessibility tree when stacked', () => {
    render(<Table {...base} responsive="stack" />);
    // Hidden visually by the container query, never removed from the tree —
    // the cells still reference these headers.
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
  });

  it('labels stacked cells from their header', () => {
    const { container } = render(<Table {...base} responsive="stack" />);
    expect(container.querySelector('td[data-label="Name"]')).not.toBeNull();
  });

  it('offers a disclosure only when a column is actually secondary', () => {
    const { container: without } = render(<Table {...base} responsive="priority" />);
    expect(without.querySelector('.bh-table__disclose')).toBeNull();

    const columnsWithPriority: Array<Column<Row>> = [
      { key: 'id', header: 'Id', cell: (row) => row.id, priority: 1 },
      { key: 'name', header: 'Name', cell: (row) => row.name, priority: 2 },
    ];
    const { container: with_ } = render(
      <Table {...base} columns={columnsWithPriority} responsive="priority" />,
    );
    expect(with_.querySelector('.bh-table__disclose')).not.toBeNull();
  });

  it('puts the secondary columns in the disclosure, with their labels', () => {
    const columns: Array<Column<Row>> = [
      { key: 'id', header: 'Id', cell: (row) => row.id, priority: 1 },
      { key: 'name', header: 'Name', cell: (row) => row.name, priority: 2 },
    ];
    render(<Table {...base} columns={columns} responsive="priority" />);

    // The header text appears twice per row: once in thead, once as the term
    // inside that row's disclosure.
    expect(screen.getAllByText('Name').length).toBeGreaterThan(1);
  });
});

describe('Table numeric columns', () => {
  it('aligns end and sets tabular figures without being asked twice', () => {
    const columns: Array<Column<Row>> = [
      { key: 'id', header: 'Id', cell: (row) => row.id, numeric: true },
      { key: 'name', header: 'Name', cell: (row) => row.name },
    ];
    const { container } = render(<Table {...base} columns={columns} />);

    const cell = container.querySelector('td[data-numeric]');
    expect(cell).toHaveAttribute('data-align', 'end');
  });
});
