import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatusBar } from './StatusBar';

describe('StatusBar', () => {
  it('is a labelled region, not a contentinfo landmark', () => {
    // A status bar sits inside main or an AppShell. contentinfo is only valid
    // at the top level of a page, which is why axe failed every template that
    // mounted one; region is the landmark that may be nested.
    render(<StatusBar items={[{ label: 'Selected', value: 3 }]} />);
    expect(screen.getByRole('region', { name: 'Status' })).toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).toBeNull();
  });

  it('takes its landmark name from ariaLabel', () => {
    render(<StatusBar ariaLabel="Board status" />);
    expect(screen.getByRole('region', { name: 'Board status' })).toBeInTheDocument();
  });

  it('keeps the polite live region in the DOM even with no message', () => {
    const { rerender } = render(<StatusBar />);
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toBeEmptyDOMElement();

    rerender(<StatusBar message="Saved" />);
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
  });
});
