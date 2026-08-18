import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tab, TabList, TabPanel, Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tab',
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultTab="open">
      <TabList ariaLabel="Invoice status">
        <Tab id="open" badge={12}>
          Open
        </Tab>
        <Tab id="paid" badge={140}>
          Paid
        </Tab>
        <Tab id="overdue" badge={3}>
          Overdue
        </Tab>
      </TabList>
      <TabPanel id="open">Twelve invoices are waiting for payment.</TabPanel>
      <TabPanel id="paid">Everything settled in the last twelve months.</TabPanel>
      <TabPanel id="overdue">Three invoices are past their due date.</TabPanel>
    </Tabs>
  ),
};

export const Manual: Story = {
  name: 'Manual activation',
  render: () => (
    <Tabs defaultTab="one" manual>
      <TabList ariaLabel="Reports">
        <Tab id="one">Revenue</Tab>
        <Tab id="two">Costs</Tab>
        <Tab id="three" disabled>
          Forecast
        </Tab>
      </TabList>
      <TabPanel id="one">
        Arrows move focus, Enter or Space switches the panel — use this when a panel is expensive to
        load.
      </TabPanel>
      <TabPanel id="two">Costs for the current quarter.</TabPanel>
      <TabPanel id="three">Not available on this plan.</TabPanel>
    </Tabs>
  ),
};
