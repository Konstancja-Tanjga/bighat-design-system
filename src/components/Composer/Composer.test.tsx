import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Composer } from './Composer';

const MODES = [
  { id: 'ask', label: 'Ask' },
  { id: 'plan', label: 'Plan first' },
];

describe('Composer', () => {
  it('labels the field even though the label is not visible', () => {
    render(<Composer label="Ask anything about the business" />);
    expect(screen.getByLabelText('Ask anything about the business')).toBeInstanceOf(
      HTMLTextAreaElement,
    );
  });

  it('submits on Enter and clears the draft', async () => {
    const onSubmit = vi.fn();
    render(<Composer label="Ask" onSubmit={onSubmit} />);

    const field = screen.getByLabelText('Ask');
    await userEvent.type(field, 'why did EMEA spike{Enter}');

    expect(onSubmit).toHaveBeenCalledWith('why did EMEA spike');
    expect(field).toHaveValue('');
  });

  it('inserts a newline on Shift+Enter instead of submitting', async () => {
    const onSubmit = vi.fn();
    render(<Composer label="Ask" onSubmit={onSubmit} />);

    const field = screen.getByLabelText('Ask');
    await userEvent.type(field, 'first{Shift>}{Enter}{/Shift}second');

    expect(onSubmit).not.toHaveBeenCalled();
    expect(field).toHaveValue('first\nsecond');
  });

  it('refuses to submit whitespace', async () => {
    const onSubmit = vi.fn();
    render(<Composer label="Ask" onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText('Ask'), '   {Enter}');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('exposes modes as a radio group, not as buttons', async () => {
    // A single choice with a current value is a radio group. Rendered as
    // buttons, the current value is invisible to assistive technology.
    const onModeChange = vi.fn();
    render(<Composer label="Ask" modes={MODES} activeMode="ask" onModeChange={onModeChange} />);

    expect(screen.getByRole('radio', { name: 'Ask' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Plan first' })).not.toBeChecked();

    await userEvent.click(screen.getByRole('radio', { name: 'Plan first' }));
    expect(onModeChange).toHaveBeenCalledWith('plan');
  });

  it('describes the field with the hint', () => {
    render(<Composer label="Ask" hint="Read-only — AI Chat cannot change your data." />);
    expect(screen.getByLabelText('Ask')).toHaveAccessibleDescription(
      'Read-only — AI Chat cannot change your data.',
    );
  });

  it('keeps submit unavailable while the draft is empty', () => {
    render(<Composer label="Ask" submitLabel="Ask" />);
    expect(screen.getByRole('button', { name: 'Ask' })).toBeDisabled();
  });
});
