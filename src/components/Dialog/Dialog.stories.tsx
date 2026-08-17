import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Dialog } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'Native `<dialog>`. Focus trapping, focus restoration, page inertness, Escape handling and the top layer all come from the platform. The only thing added here is backdrop-click dismissal, because the backdrop is a pseudo-element with no click target of its own.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { open: false, onClose: () => {}, title: 'Rename workspace' },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Rename workspace</Button>
        <Dialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          description="Everyone in this workspace will see the new name immediately."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </>
          }
        >
          <Input label="Workspace name" defaultValue="Billing operations" />
        </Dialog>
      </>
    );
  },
};

export const DestructiveConfirmation: Story = {
  name: 'Destructive, non-dismissible',
  args: { open: false, onClose: () => {}, title: 'Delete this workspace?' },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" tone="critical" onClick={() => setOpen(true)}>
          Delete workspace
        </Button>
        <Dialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          dismissible={false}
          size="sm"
          description="This removes 1,284 invoices and cannot be undone."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Keep workspace
              </Button>
              <Button tone="critical" onClick={() => setOpen(false)}>
                Delete permanently
              </Button>
            </>
          }
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '`dismissible={false}` blocks Escape and backdrop clicks and removes the close button, so there is exactly one way out and it is a labelled choice. This is the only situation that justifies it — used on an ordinary form dialog it is just a trap.',
      },
    },
  },
};
