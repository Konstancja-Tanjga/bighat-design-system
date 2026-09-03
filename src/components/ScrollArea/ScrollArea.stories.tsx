import type { Meta, StoryObj } from '@storybook/react-vite';

import { ScrollArea } from './ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <ScrollArea ariaLabel="Release notes">
        <div style={{ display: 'grid', gap: 8, padding: 12 }}>
          {Array.from({ length: 20 }, (_, index) => (
            <p key={index} style={{ margin: 0 }}>
              Line {index + 1} — tab to this region and use the arrow keys.
            </p>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};

export const NoOverflow: Story = {
  name: 'No overflow, no tab stop',
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <ScrollArea ariaLabel="Short note" fade={false}>
        <p style={{ margin: 0, padding: 12 }}>
          This content fits, so the region takes no place in the tab order.
        </p>
      </ScrollArea>
    </div>
  ),
};
