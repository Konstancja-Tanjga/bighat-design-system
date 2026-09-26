import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton, SkeletonGroup } from './Skeleton';

/**
 * A grey placeholder the size of the content that will replace it. Use it
 * only when you already know the shape of that content: the reader's eye
 * settles on a layout that does not move when the data arrives. When the
 * shape is unknown, use `StateBlock state="loading"` instead. Each skeleton
 * is hidden from assistive technology, so wrap a set of them in
 * `SkeletonGroup`, which announces its `label` once for the whole set.
 *
 * Scaffolded from packages/spec/components/skeleton.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: { width: '60%', height: 16 },
  render: (args) => (
    <SkeletonGroup label="Loading invoices">
      <Skeleton {...args} />
    </SkeletonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'One line of text, inside the `SkeletonGroup` that announces "Loading invoices" for it. A bare `Skeleton` is `aria-hidden`, so without the group a screen reader user hears nothing at all.',
      },
    },
  },
};

/** The default corner. For a line of text or a form field, such as an `Input`, which uses the same radius. */
export const Control: Story = {
  args: { radius: 'control', width: '100%', height: 40 },
};

/** For a card, a panel or an image, so the placeholder has the same corners as the `Card` that replaces it. */
export const Surface: Story = {
  args: { radius: 'surface', width: '100%', height: 160 },
};

/** For something fully rounded, such as a `Badge`, `Avatar` or `Button`, which all use the pill radius. */
export const Pill: Story = {
  args: { radius: 'pill', width: 72, height: 18 },
};
