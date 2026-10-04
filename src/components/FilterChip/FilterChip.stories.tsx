import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FilterChip } from './FilterChip';

const meta = {
  title: 'Components/FilterChip',
  component: FilterChip,
  args: { label: 'Finance', pressed: false },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=21-24',
    },
    layout: 'padded',
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pressed: Story = {
  args: { pressed: true },
  parameters: {
    docs: {
      description: {
        story:
          'Three cues, on purpose: `aria-pressed` for assistive technology, the check mark for anyone who cannot see the tint, and the tint for everyone else. The tint alone would fail WCAG 1.4.1.',
      },
    },
  },
};

export const Disabled: Story = { args: { disabled: true } };

const TAGS = ['Finance', 'Legal', 'Approved', 'Q3 2026'];

export const ASetOfFilters: Story = {
  render: function Render() {
    const [active, setActive] = useState<string[]>(['Finance']);

    return (
      <div role="group" aria-label="Filter by tag" style={{ display: 'flex', gap: 8 }}>
        {TAGS.map((tag) => (
          <FilterChip
            key={tag}
            label={tag}
            pressed={active.includes(tag)}
            onClick={() =>
              setActive((current) =>
                current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag],
              )
            }
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Several can be on at once, which is what makes these toggles rather than a radio group. Wrap the set in a `role="group"` with a name — otherwise the chips are four unrelated buttons, and nothing says what they filter. For one-of-several, use `SegmentedControl`: a row of independent toggles cannot express "exactly one".',
      },
    },
  },
};
