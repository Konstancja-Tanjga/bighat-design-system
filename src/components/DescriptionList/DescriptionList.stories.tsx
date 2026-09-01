import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '../Badge/Badge';
import { DescriptionList } from './DescriptionList';

const meta = {
  title: 'Data/DescriptionList',
  component: DescriptionList,
  parameters: {
    docs: {
      description: {
        component:
          'Term and value pairs — a record read rather than a form filled. It is a real `<dl>`, because a detail panel built from divs tells a screen reader nothing about which label owns which value, and that is the only information a detail panel contains. It is also the narrow form of a table row: `Table` with `responsive="stack"` renders through this component, so the two cannot drift.',
      },
    },
  },
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { term: 'Invoice', value: 'INV-2043' },
  { term: 'Customer', value: 'Fabrikam Energy' },
  { term: 'Status', value: <Badge tone="critical">overdue</Badge> },
  { term: 'Issued', value: '11 June 2026' },
  { term: 'Amount', value: '€28,950.00' },
  { term: 'Lineage', value: 'DWH.orders → f_auftrag → INV-series', wide: true },
];

export const Columns: Story = {
  args: { items, layout: 'columns' },
  parameters: {
    docs: {
      description: {
        story:
          'Terms in a fixed gutter, so the values line up and can be read down as a set. Right when there is room. Below 480px of container width the gutter stops paying for itself and the pairs stack on their own.',
      },
    },
  },
};

export const Rows: Story = {
  args: { items, layout: 'rows' },
  parameters: {
    docs: {
      description: {
        story:
          'Term above value, the term set as a label. Right in a narrow panel, and the form `Table` uses when it stacks.',
      },
    },
  },
};

export const Compact: Story = {
  args: { items, layout: 'rows', density: 'compact' },
};
