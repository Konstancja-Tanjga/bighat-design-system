import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [on, setOn] = useState(true);
    return <Switch label="Two-factor authentication" checked={on} onChange={setOn} />;
  },
};

export const WithDescription: Story = {
  render: function Render() {
    const [on, setOn] = useState(false);
    return (
      <Switch
        label="Weekly digest"
        description="Takes effect straight away — there is no Save button on this screen."
        checked={on}
        onChange={setOn}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Switch label="Managed by your administrator" checked disabled onChange={() => {}} />
  ),
};
