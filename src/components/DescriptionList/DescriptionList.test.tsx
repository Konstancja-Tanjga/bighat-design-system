import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DescriptionList } from './DescriptionList';

const items = [
  { term: 'Customer', value: 'Northwind Trading' },
  { term: 'Status', value: 'Paid' },
];

describe('DescriptionList', () => {
  it('pairs every term with its value in the accessibility tree', () => {
    render(<DescriptionList items={items} />);

    expect(screen.getByText('Customer').tagName).toBe('DT');
    expect(screen.getByText('Northwind Trading').tagName).toBe('DD');
  });

  it('is a labelled group when it is given a name', () => {
    render(<DescriptionList items={items} ariaLabel="Invoice detail" />);
    expect(screen.getByRole('group', { name: 'Invoice detail' })).toBeInTheDocument();
  });

  it('announces no group when it has no name, because a nameless group is noise', () => {
    render(<DescriptionList items={items} />);
    expect(screen.queryByRole('group')).not.toBeInTheDocument();
  });

  it('renders a value that is a node, not only a string', () => {
    render(<DescriptionList items={[{ term: 'Tags', value: <span>#orders</span> }]} />);
    expect(screen.getByText('#orders')).toBeInTheDocument();
  });
});
