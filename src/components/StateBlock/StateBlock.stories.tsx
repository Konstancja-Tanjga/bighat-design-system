import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button/Button';
import { StateBlock } from './StateBlock';

const meta = {
  title: 'Components/StateBlock',
  component: StateBlock,
  parameters: {
    docs: {
      description: {
        component:
          'The three states every data surface spends real time in. Shipping them as one component is what stops each team inventing its own tone of voice for "nothing here".',
      },
    },
  },
} satisfies Meta<typeof StateBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    state: 'empty',
    icon: '📄',
    title: 'No invoices yet',
    description: 'Invoices appear here once a customer is billed.',
    action: <Button size="sm">Create invoice</Button>,
  },
  parameters: {
    docs: {
      description: {
        story:
          'No live region. This is the rendered result of a request that succeeded, so announcing it would interrupt the user to tell them nothing went wrong.',
      },
    },
  },
};

export const FirstUseVersusFiltered: Story = {
  name: 'Empty is two different situations',
  args: { state: 'empty', title: 'No invoices yet' },
  render: () => (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(2, 1fr)' }}>
      <StateBlock
        state="empty"
        icon="📄"
        title="No invoices yet"
        description="Invoices appear here once a customer is billed."
        action={<Button size="sm">Create invoice</Button>}
      />
      <StateBlock
        state="empty"
        icon="🔍"
        title="No invoices match these filters"
        description="Try widening the date range or clearing the status filter."
        action={
          <Button size="sm" variant="secondary">
            Clear filters
          </Button>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The most common mistake with empty states: treating "you have nothing" and "your filter matched nothing" as the same screen. The first needs an onboarding action, the second needs an escape from the filter. Same component, different copy — which is exactly why the copy is a prop and not baked in.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    state: 'loading',
    title: 'Loading invoices',
    description: 'This usually takes a couple of seconds.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Polite live region. It must not cut across whatever the user is currently reading.',
      },
    },
  },
};

export const ErrorState: Story = {
  name: 'Error',
  args: {
    state: 'error',
    icon: '⚠',
    title: 'We could not load your invoices',
    description: 'The billing service did not respond. Your data has not changed.',
    action: <Button size="sm">Try again</Button>,
    secondaryAction: (
      <Button size="sm" variant="ghost">
        Contact support
      </Button>
    ),
    diagnostics: 'correlation-id: 8f2c1a94-4b7e-4d31-9a55-0c9d2f6e1b03 · HTTP 503',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Assertive live region — the user asked for something and did not get it. Three things this state does that most do not: it says what did *not* happen to their data, it offers a retry as the primary action, and it puts the correlation id somewhere a support agent can find without showing a stack trace to everyone else.',
      },
    },
  },
};

export const Densities: Story = {
  args: { state: 'empty', title: 'Nothing here' },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['inline', 'section', 'page'] as const).map((density) => (
        <div key={density} style={{ border: '1px dashed var(--bh-border-subtle)' }}>
          <StateBlock
            state="empty"
            density={density}
            title={`density="${density}"`}
            description="Same component, three amounts of breathing room."
          />
        </div>
      ))}
    </div>
  ),
};
