import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Tab, TabList, TabPanel, Tabs } from './Tabs';

function Example({ manual = false }: { manual?: boolean }) {
  return (
    <Tabs manual={manual}>
      <TabList ariaLabel="Reports">
        <Tab id="revenue">Revenue</Tab>
        <Tab id="costs">Costs</Tab>
        <Tab id="forecast">Forecast</Tab>
      </TabList>
      <TabPanel id="revenue">Revenue panel</TabPanel>
      <TabPanel id="costs">Costs panel</TabPanel>
      <TabPanel id="forecast">Forecast panel</TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('selects the first tab when no default is given', () => {
    render(<Example />);
    expect(screen.getByRole('tab', { name: 'Revenue' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Revenue panel')).toBeVisible();
  });

  it('is one tab stop, not one per tab', async () => {
    render(<Example />);

    await userEvent.tab();
    expect(screen.getByRole('tab', { name: 'Revenue' })).toHaveFocus();

    await userEvent.tab();
    expect(screen.getByRole('tabpanel')).toHaveFocus();
  });

  it('moves and activates with the arrow keys, and wraps', async () => {
    render(<Example />);

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Costs' })).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Revenue' })).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Forecast' })).toHaveAttribute('aria-selected', 'true');
  });

  it('moves focus without activating when manual', async () => {
    render(<Example manual />);

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Costs' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Revenue' })).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('tab', { name: 'Costs' })).toHaveAttribute('aria-selected', 'true');
  });

  it('links every panel to its tab', () => {
    render(<Example />);
    const tab = screen.getByRole('tab', { name: 'Revenue' });
    const panel = screen.getByRole('tabpanel');
    expect(tab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  });
});
