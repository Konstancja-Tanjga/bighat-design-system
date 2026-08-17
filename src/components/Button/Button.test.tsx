import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('is reachable and activatable by keyboard', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire while loading, but stays focusable', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).not.toBeDisabled();

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('announces the loading state without hiding the label', () => {
    render(
      <Button loading loadingLabel="Saving your changes">
        Save
      </Button>,
    );

    expect(screen.getByText('Saving your changes')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAccessibleName(/Save/);
  });

  it('hides decorative icons from assistive technology', () => {
    render(<Button iconStart={<span data-testid="icon">→</span>}>Continue</Button>);

    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('button')).toHaveAccessibleName('Continue');
  });

  it('maps the deprecated danger variant onto the critical tone', () => {
    // The deprecation warning is a dev-time nudge, not a behaviour change: the
    // rendered result must stay identical for the whole deprecation window.
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { container: legacy } = render(<Button variant="danger">Delete</Button>);
    const { container: current } = render(
      <Button variant="primary" tone="critical">
        Delete
      </Button>,
    );

    expect(legacy.firstElementChild?.className).toBe(current.firstElementChild?.className);
    warn.mockRestore();
  });
});
