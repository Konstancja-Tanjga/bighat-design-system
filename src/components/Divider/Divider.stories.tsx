import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div>
      <p style={{ margin: 0 }}>Billing address</p>
      <Divider />
      <p style={{ margin: 0 }}>Delivery address</p>
    </div>
  ),
};

export const Labelled: Story = {
  render: () => (
    <div>
      <p style={{ margin: 0 }}>Sign in with your work account</p>
      <Divider>or</Divider>
      <p style={{ margin: 0 }}>Continue with e-mail</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: 24 }}>
      <span>Draft</span>
      <Divider orientation="vertical" />
      <span>Edited 4 minutes ago</span>
    </div>
  ),
};
