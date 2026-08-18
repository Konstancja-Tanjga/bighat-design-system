import type { Meta, StoryObj } from '@storybook/react-vite';

import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [{ label: 'Home', href: '#' }, { label: 'Invoices', href: '#' }, { label: 'INV-2043' }],
  },
};

export const Collapsed: Story = {
  args: {
    maxItems: 4,
    items: [
      { label: 'Home', href: '#' },
      { label: 'Workspace', href: '#' },
      { label: 'Finance', href: '#' },
      { label: 'Invoices', href: '#' },
      { label: '2026', href: '#' },
      { label: 'INV-2043' },
    ],
  },
};
