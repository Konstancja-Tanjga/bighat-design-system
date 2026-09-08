import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { FileDropzone } from './FileDropzone';

const file = (name: string) => new File(['x'], name, { type: 'text/plain' });

describe('FileDropzone', () => {
  it('is a real file input, named by a visible label', () => {
    render(<FileDropzone label="Attachments" onFiles={() => {}} />);

    const input = screen.getByLabelText('Attachments');
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect(input).toHaveAttribute('type', 'file');
    // The whole point: it is in the tab order because it is a control, not
    // because someone added tabIndex to a div.
    expect(input).not.toHaveAttribute('tabindex');
  });

  it('is reachable by keyboard alone', async () => {
    render(<FileDropzone label="Attachments" onFiles={() => {}} />);

    await userEvent.tab();
    expect(screen.getByLabelText('Attachments')).toHaveFocus();
  });

  it('hands over the files that were chosen', async () => {
    const onFiles = vi.fn();
    render(<FileDropzone label="Attachments" multiple onFiles={onFiles} />);

    await userEvent.upload(screen.getByLabelText('Attachments'), [
      file('invoice.pdf'),
      file('order.pdf'),
    ]);

    expect(onFiles).toHaveBeenCalledOnce();
    expect(onFiles.mock.calls[0][0].map((f: File) => f.name)).toEqual(['invoice.pdf', 'order.pdf']);
  });

  it('accepts the same file twice', async () => {
    const onFiles = vi.fn();
    render(<FileDropzone label="Attachments" onFiles={onFiles} />);

    const input = screen.getByLabelText('Attachments');
    await userEvent.upload(input, file('invoice.pdf'));
    await userEvent.upload(input, file('invoice.pdf'));

    // The input's value is cleared after every change. Without that, the second
    // pick fires nothing and the control looks broken.
    expect(onFiles).toHaveBeenCalledTimes(2);
  });

  it('keeps the prompt out of the accessible name', () => {
    render(<FileDropzone label="Attachments" prompt="Drop files here" onFiles={() => {}} />);

    expect(screen.getByLabelText('Attachments')).toHaveAccessibleName('Attachments');
    expect(screen.getByText('Drop files here')).toHaveAttribute('aria-hidden', 'true');
  });

  it('exposes description and error together, error first', () => {
    render(
      <FileDropzone
        label="Attachments"
        description="PDF or PNG, up to 10 MB."
        error="Choose at least one file."
        onFiles={() => {}}
      />,
    );

    const input = screen.getByLabelText('Attachments');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Choose at least one file. PDF or PNG, up to 10 MB.');
  });

  it('does not fire when disabled', async () => {
    const onFiles = vi.fn();
    render(<FileDropzone label="Attachments" disabled onFiles={onFiles} />);

    await userEvent.upload(screen.getByLabelText('Attachments'), file('invoice.pdf'));
    expect(onFiles).not.toHaveBeenCalled();
  });
});
