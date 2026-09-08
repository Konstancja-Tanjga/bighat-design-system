import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { RemovableChip } from './RemovableChip';

const meta = {
  title: 'Components/RemovableChip',
  component: RemovableChip,
  args: { label: 'Finance', onRemove: () => {} },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RemovableChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NamedForWhatItRemoves: Story = {
  args: { label: 'Finance', removeLabel: 'Remove tag Finance' },
  parameters: {
    docs: {
      description: {
        story:
          'The default name is `Remove {label}` — "Remove Finance", which reads like removing the department. Pass `removeLabel` when the noun needs saying. What it must never be is "×": eight chips then announce as eight identical buttons, and the reader has to leave the chip to work out which is which.',
      },
    },
  },
};

export const Disabled: Story = { args: { disabled: true } };

export const ASetOfTags: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['Finance', 'Legal', 'Q3 2026']);

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <RemovableChip
            key={tag}
            label={tag}
            removeLabel={`Remove tag ${tag}`}
            onRemove={() => setTags((current) => current.filter((t) => t !== tag))}
          />
        ))}
        {tags.length === 0 && <span>No tags</span>}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Removing the last chip leaves an empty row, so say something in it. An empty container is indistinguishable from a broken one.',
      },
    },
  },
};
