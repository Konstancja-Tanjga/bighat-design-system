import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button/Button';
import { ToastProvider, useToast } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  parameters: {
    docs: {
      description: {
        component:
          'Two live regions, not one. Confirmations go into the polite region; failures go into the assertive one, because a user who navigates away before hearing that their save failed has been failed twice.',
      },
    },
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  const { notify } = useToast();
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button
        variant="secondary"
        onClick={() =>
          notify({ tone: 'success', title: 'Invoice sent', description: 'INV-2041 is on its way.' })
        }
      >
        Success (polite, 5s)
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          notify({
            tone: 'info',
            title: 'Export queued',
            description: 'We will email you when it is ready.',
          })
        }
      >
        Info
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          notify({
            tone: 'warning',
            title: 'Two invoices skipped',
            description: 'They are missing a billing address.',
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="secondary"
        tone="critical"
        onClick={() =>
          notify({
            tone: 'critical',
            title: 'Could not send invoice',
            description: 'The billing service is unavailable. Nothing was charged.',
          })
        }
      >
        Error (assertive, stays)
      </Button>
    </div>
  );
}

export const Playground: Story = {
  args: { children: null },
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};

export const StackIsCapped: Story = {
  name: 'The stack is capped',
  args: { children: null },
  render: () => (
    <ToastProvider max={3}>
      <ToastSpammer />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Past three, older toasts are dropped. An uncapped stack turns a retry loop into a wall of notifications that covers the thing the user was trying to fix.',
      },
    },
  },
};

function ToastSpammer() {
  const { notify } = useToast();
  return (
    <Button
      variant="secondary"
      onClick={() => {
        for (let i = 1; i <= 6; i += 1) {
          notify({ tone: 'info', title: `Notification ${i}`, duration: null });
        }
      }}
    >
      Fire six at once
    </Button>
  );
}
