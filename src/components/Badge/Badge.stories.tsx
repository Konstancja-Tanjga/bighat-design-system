import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge, type BadgeTone } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Active' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const tones: BadgeTone[] = ['neutral', 'info', 'success', 'warning', 'critical'];

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tones.map((tone) => (
        <Badge key={tone} tone={tone}>
          {tone}
        </Badge>
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tones.map((tone) => (
        <Badge key={tone} tone={tone} dot>
          {tone}
        </Badge>
      ))}
    </div>
  ),
};

export const ColourIsNeverTheOnlyCue: Story = {
  name: 'Colour is never the only cue',
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 480 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Badge tone="success">Paid</Badge>
        <Badge tone="warning">Pending</Badge>
        <Badge tone="critical">Overdue</Badge>
      </div>
      <p style={{ margin: 0, color: 'var(--bh-text-muted)', fontSize: 13 }}>
        There is no <code>color</code> prop and the label is required. Rendering three identical
        dots in three colours is the version of this component that fails WCAG 1.4.1 — and it is the
        version that gets built when the badge accepts a colour instead of a tone.
      </p>
    </div>
  ),
};
