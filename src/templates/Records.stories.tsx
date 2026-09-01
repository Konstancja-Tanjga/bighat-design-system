import type { Meta, StoryObj } from '@storybook/react-vite';

import { Records } from './Records';

const meta = {
  title: 'Templates/Records',
  component: Records,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A filtered, sorted, paged table with a detail panel beside it — the most common enterprise screen there is. It is as much the system’s integration test as a demonstration: `Table`, selection, row actions, `Pagination`, `SidePanel` and `DescriptionList` all meet here, and a seam between any two of them shows up on this screen before it shows up in a product. The decision it carries: reading one record never costs the reader their place among the others.',
      },
    },
  },
  decorators: [(Story) => <div style={{ margin: -24, height: '100dvh' }}>{Story()}</div>],
} satisfies Meta<typeof Records>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = {
  args: { variant: 'ready' },
  parameters: {
    docs: {
      description: {
        story:
          'Click an invoice number to open it in the panel — the list keeps its scroll, its sort and its filters, which is the whole point. Select rows and the toolbar action names the size of the set before it runs: **Archive 3 invoices**, never **Archive selected**. Narrow the window past 480px and the low-priority columns move into a per-row disclosure rather than disappearing.',
      },
    },
  },
};

export const Loading: Story = {
  args: { variant: 'loading' },
  parameters: {
    docs: {
      description: {
        story:
          'The body is a `StateBlock`, not a spinner over stale rows. Nothing here pretends to know how many rows are coming.',
      },
    },
  },
};

export const Empty: Story = {
  name: 'Empty — nothing exists',
  args: { variant: 'empty' },
  parameters: {
    docs: {
      description: {
        story:
          'A first-day screen. It explains what an invoice *is* and offers the one action that creates one.',
      },
    },
  },
};

export const NoMatches: Story = {
  name: 'Empty — nothing matches',
  args: { variant: 'no-matches' },
  parameters: {
    docs: {
      description: {
        story:
          'The same zero rows, the opposite meaning. Records exist and the filters exclude them, so the action is **Clear filters** — offering **Create invoice** here would be the wrong action, and offering the wrong one is worse than offering neither. This is the distinction a single “No data” state loses.',
      },
    },
  },
};

export const Error: Story = {
  args: { variant: 'error' },
  parameters: {
    docs: {
      description: {
        story:
          'Says what did not happen to the reader’s data, offers a way forward, and puts the correlation id in `diagnostics` — available to whoever needs it, invisible to everyone who does not.',
      },
    },
  },
};
