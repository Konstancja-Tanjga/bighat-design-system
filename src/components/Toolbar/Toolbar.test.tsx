import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Toolbar } from './Toolbar';
import { Button } from '../Button/Button';

describe('Toolbar', () => {
  const example = (
    <Toolbar ariaLabel="Invoice list">
      <Button size="sm">New</Button>
      <Button size="sm">Import</Button>
      <Button size="sm">Export</Button>
    </Toolbar>
  );

  it('keeps the promise role="toolbar" makes: arrows move between controls', async () => {
    render(example);

    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'New' })).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: 'Import' })).toHaveFocus();

    await userEvent.keyboard('{End}');
    expect(screen.getByRole('button', { name: 'Export' })).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: 'New' })).toHaveFocus();
  });

  it('names the region it acts on', () => {
    render(example);
    expect(screen.getByRole('toolbar', { name: 'Invoice list' })).toBeInTheDocument();
  });
});
