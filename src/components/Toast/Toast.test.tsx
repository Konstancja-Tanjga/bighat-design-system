import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Button } from '../Button/Button';
import { ToastProvider, useToast, type ToastTone } from './Toast';

function Trigger({ count = 1, tone = 'success' }: { count?: number; tone?: ToastTone }) {
  const { notify } = useToast();
  return (
    <Button
      onClick={() => {
        for (let i = 1; i <= count; i += 1) {
          notify({ tone, title: `Message ${i}`, duration: null });
        }
      }}
    >
      Notify
    </Button>
  );
}

describe('ToastProvider', () => {
  it('renders both live regions before any toast exists', () => {
    // The regions must pre-exist. A live region created at the same moment as
    // its content is not announced by most screen readers.
    const { container } = render(
      <ToastProvider>
        <span />
      </ToastProvider>,
    );

    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
    expect(container.querySelector('[aria-live="assertive"]')).toBeInTheDocument();
  });

  it('routes non-critical toasts to the polite region', async () => {
    const { container } = render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Notify' }));
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('Message 1');
    expect(container.querySelector('[aria-live="assertive"]')).not.toHaveTextContent('Message 1');
  });

  it('routes critical toasts to the assertive region', async () => {
    const { container } = render(
      <ToastProvider>
        <Trigger tone="critical" />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Notify' }));
    expect(container.querySelector('[aria-live="assertive"]')).toHaveTextContent('Message 1');
  });

  it('caps the stack and keeps the newest', async () => {
    render(
      <ToastProvider max={3}>
        <Trigger count={6} />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Notify' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('Message 6')).toBeInTheDocument();
    expect(screen.queryByText('Message 1')).not.toBeInTheDocument();
  });

  it('gives each dismiss button a name that says what it dismisses', async () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Notify' }));
    const dismiss = screen.getByRole('button', { name: 'Dismiss: Message 1' });

    await userEvent.click(dismiss);
    expect(screen.queryByText('Message 1')).not.toBeInTheDocument();
  });

  it('refuses to be used outside its provider', () => {
    expect(() => render(<Trigger />)).toThrow(/inside a <ToastProvider>/);
  });
});
