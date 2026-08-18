import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion, AccordionItem } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion defaultOpen={['shipping']}>
      <AccordionItem id="shipping" title="Shipping" meta="3 options">
        Delivery is quoted at checkout and depends on the destination country.
      </AccordionItem>
      <AccordionItem id="returns" title="Returns">
        Thirty days from delivery, in the original packaging.
      </AccordionItem>
      <AccordionItem id="invoices" title="Invoices">
        Issued the day the order ships and sent to the billing address.
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion multiple defaultOpen={['a', 'b']}>
      <AccordionItem id="a" title="Both open at once">
        With <code>multiple</code>, opening one panel does not close the other.
      </AccordionItem>
      <AccordionItem id="b" title="Useful for comparison">
        Reserve it for content the user reads side by side.
      </AccordionItem>
    </Accordion>
  ),
};
