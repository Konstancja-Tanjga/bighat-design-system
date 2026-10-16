import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RadioGroup } from './RadioGroup';

const options = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
];

describe('RadioGroup', () => {
  it('is a fieldset named by its legend, with one radio per option', () => {
    render(<RadioGroup legend="Send as" options={options} />);
    expect(screen.getByRole('group', { name: 'Send as' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('puts required on the inputs, never aria-required on the fieldset', () => {
    // aria-required is not a permitted attribute of role=group, and axe
    // failed the Invalid story on it. A required radio input is the native
    // way to say the same thing, and the browser enforces it.
    render(<RadioGroup legend="Send as" options={options} required />);
    for (const radio of screen.getAllByRole('radio')) expect(radio).toBeRequired();
    expect(screen.getByRole('group')).not.toHaveAttribute('aria-required');
  });

  it('leaves required off when the group is optional', () => {
    render(<RadioGroup legend="Send as" options={options} />);
    for (const radio of screen.getAllByRole('radio')) expect(radio).not.toBeRequired();
  });

  it('wires the error to the group', () => {
    render(<RadioGroup legend="Send as" options={options} error="Choose a schedule." />);
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(group).toHaveAccessibleDescription('Choose a schedule.');
  });

  it('reports the chosen value', async () => {
    const onChange = vi.fn();
    render(<RadioGroup legend="Send as" options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Quarterly' }));
    expect(onChange).toHaveBeenCalledWith('quarterly');
  });
});
