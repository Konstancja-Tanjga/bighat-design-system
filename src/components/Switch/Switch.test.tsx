import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './Switch';

describe('Switch', () => {
  it('announces as a switch, not a checkbox', () => {
    render(<Switch label="Two-factor authentication" checked onChange={() => {}} />);
    const control = screen.getByRole('switch', { name: 'Two-factor authentication' });
    expect(control).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles from the keyboard', async () => {
    const onChange = vi.fn();
    render(<Switch label="Weekly digest" checked={false} onChange={onChange} />);

    await userEvent.tab();
    expect(screen.getByRole('switch')).toHaveFocus();

    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('links its description to the control', () => {
    render(
      <Switch
        label="Weekly digest"
        description="Takes effect straight away."
        checked
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole('switch')).toHaveAccessibleDescription('Takes effect straight away.');
  });
});
