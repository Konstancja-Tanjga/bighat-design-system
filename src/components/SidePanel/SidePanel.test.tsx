import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { SidePanel } from './SidePanel';

function Controlled() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SidePanel
      ariaLabel="Folders"
      title="Folders"
      collapsed={collapsed}
      onToggle={() => setCollapsed((c) => !c)}
    >
      <p>Invoices</p>
    </SidePanel>
  );
}

describe('SidePanel', () => {
  it('is the same named landmark in both states', async () => {
    render(<Controlled />);
    expect(screen.getByRole('complementary', { name: 'Folders' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Collapse Folders' }));
    expect(screen.getByRole('complementary', { name: 'Folders' })).toBeInTheDocument();
    expect(screen.queryByText('Invoices')).not.toBeInTheDocument();
  });

  // The regression: toggling used to swap <aside> for <div>, remounting the
  // panel and destroying the focused button.
  it('keeps focus on the toggle through collapse and expand', async () => {
    render(<Controlled />);
    const toggle = screen.getByRole('button', { name: 'Collapse Folders' });
    toggle.focus();

    await userEvent.keyboard('{Enter}');
    expect(document.activeElement).toBe(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAccessibleName('Expand Folders');

    await userEvent.keyboard('{Enter}');
    expect(document.activeElement).toBe(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders no toggle when there is no onToggle to call', () => {
    render(
      <SidePanel ariaLabel="Folders" collapsed>
        <p>Invoices</p>
      </SidePanel>,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
