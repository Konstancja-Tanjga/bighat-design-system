import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  args: { name: 'Ada Lovelace' },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Ada Lovelace" size="md" />
      <Avatar name="Grace Hopper" size="lg" />
    </div>
  ),
};

export const NextToAName: Story = {
  name: 'Next to a name it is decorative',
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Avatar name="Ada Lovelace" decorative />
      <span>Ada Lovelace</span>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup
      label="Assignees"
      max={3}
      people={[
        { name: 'Ada Lovelace' },
        { name: 'Grace Hopper' },
        { name: 'Katherine Johnson' },
        { name: 'Radia Perlman' },
        { name: 'Barbara Liskov' },
      ]}
    />
  ),
};
