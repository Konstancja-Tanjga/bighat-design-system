import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Pagination } from './Pagination';

const meta = {
  title: 'Data/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component:
          'Controlled, for the same reason `Table`’s sort is controlled: the day the data outgrows one response the paging moves to the server, and a component that owned the page number locally has to be rewritten. It reports a range and a total rather than a page count, because “21–40 of 312” is a fact about the data and “page 2 of 16” is a fact about the component.',
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled({ total, unit = 'invoices' }: { total?: number; unit?: string }) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  return (
    <Pagination
      page={page}
      pageSize={pageSize}
      total={total}
      unit={unit}
      onPageChange={setPage}
      pageSizeOptions={[20, 50, 100]}
      onPageSizeChange={setPageSize}
    />
  );
}

export const Default: Story = {
  args: { page: 0, pageSize: 20, total: 312, onPageChange: () => {} },
  render: () => <Controlled total={312} />,
};

export const UnknownTotal: Story = {
  name: 'Unknown total',
  args: { page: 0, pageSize: 20, onPageChange: () => {} },
  render: () => <Controlled total={undefined} />,
  parameters: {
    docs: {
      description: {
        story:
          'A cursor-paged endpoint does not know the total, so the component does not claim one. Next stays available because there may be more.',
      },
    },
  },
};

export const Nothing: Story = {
  args: { page: 0, pageSize: 20, total: 0, onPageChange: () => {} },
  render: () => <Controlled total={0} />,
  parameters: {
    docs: {
      description: { story: 'Says so, rather than showing 0–0 of 0.' },
    },
  },
};
