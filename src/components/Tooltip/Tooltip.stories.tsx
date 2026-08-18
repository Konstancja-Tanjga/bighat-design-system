import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ paddingTop: 48 }}>
      <Tooltip content="Archives the invoice. You can restore it for 30 days.">
        <Button variant="secondary">Archive</Button>
      </Tooltip>
    </div>
  ),
};

export const OnAnIconButton: Story = {
  name: 'On an icon button',
  render: () => (
    <div style={{ paddingTop: 48 }}>
      <Tooltip content="Download as PDF">
        {/* The button keeps its own accessible name. The tooltip only
            describes it — it is not a substitute for a label. */}
        <Button variant="ghost" aria-label="Download as PDF">
          ↓
        </Button>
      </Tooltip>
    </div>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Tooltip content="Shown below when there is no room above." placement="bottom">
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
};
