import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('shows on focus and describes the trigger', async () => {
    render(
      <Tooltip content="Archives the invoice">
        <button type="button">Archive</button>
      </Tooltip>,
    );

    await userEvent.tab();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Archives the invoice');
    expect(screen.getByRole('button')).toHaveAccessibleDescription('Archives the invoice');
  });

  it('is dismissible with Escape while the pointer stays put', async () => {
    render(
      <Tooltip content="Archives the invoice">
        <button type="button">Archive</button>
      </Tooltip>,
    );

    await userEvent.tab();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('never becomes the trigger name', async () => {
    render(
      <Tooltip content="Download as PDF">
        <button type="button" aria-label="Download as PDF">
          ↓
        </button>
      </Tooltip>,
    );

    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Download as PDF' })).toBeInTheDocument();
  });
});
