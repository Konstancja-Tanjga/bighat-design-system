import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { List, ListItem } from './List';

describe('List', () => {
  it('is a named list of items', () => {
    render(
      <List ariaLabel="Recent invoices">
        <ListItem title="INV-2043" />
        <ListItem title="INV-2042" />
      </List>,
    );
    const list = screen.getByRole('list', { name: 'Recent invoices' });
    expect(list.querySelectorAll('li')).toHaveLength(2);
  });

  it('makes a linked row one link, with the chevron out of its name', () => {
    render(
      <List>
        <ListItem href="/tokens" title="Tokens" description="The two layers" />
      </List>,
    );
    const link = screen.getByRole('link', { name: 'Tokens The two layers' });
    expect(link).toHaveAttribute('href', '/tokens');
    expect(link.querySelector('.bh-list__chevron')).toHaveAttribute('aria-hidden', 'true');
  });

  it('keeps the trailing control outside the row control', async () => {
    const onSelect = vi.fn();
    render(
      <List>
        <ListItem onSelect={onSelect} title="Ada Lovelace" trailing={<button>Manage</button>} />
      </List>,
    );
    const row = screen.getByRole('button', { name: 'Ada Lovelace' });
    expect(row).not.toContainElement(screen.getByRole('button', { name: 'Manage' }));
    await userEvent.click(row);
    expect(onSelect).toHaveBeenCalledOnce();
  });
});
