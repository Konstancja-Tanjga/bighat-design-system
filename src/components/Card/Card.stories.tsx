import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

import { Card } from './Card';

/**
 * A bounded surface around one thing the user acts on as a unit — an invoice,
 * a document, a task. It encodes one decision: the card's edge means "this is
 * a record", so a card around anything else spends that signal, and a card with
 * `onClick` is one button, so it can hold one action and no more.
 */
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story, { parameters }) => (
      <div style={{ maxWidth: parameters.wide ? 640 : 360 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Card>;

/*
 * Spans, not divs or headings: the same content goes inside an interactive
 * card, which renders a <button>, and a button may only hold phrasing content.
 */
const stack = { display: 'grid', gap: 'var(--bh-gap-tight)' } as const;
const title = {
  display: 'block',
  fontSize: 'var(--bh-text-size-body)',
  fontWeight: 'var(--bh-text-weight-heading)',
} as const;
const detail = { display: 'block', color: 'var(--bh-text-secondary)' } as const;

function InvoiceSummary({ status }: { status?: ReactNode }) {
  return (
    <span style={stack}>
      <span style={title}>INV-2043 · Nordwind sp. z o.o.</span>
      <span style={detail}>€4,280.00 · due 14 October</span>
      {status}
    </span>
  );
}

export const Default: Story = {
  args: {
    children: <InvoiceSummary />,
  },
};

/** On a surface that is already raised, or in a dense grid, where a shadow on every card would read as noise rather than height. */
export const Flat: Story = {
  args: { elevation: 'flat', children: <InvoiceSummary /> },
};

/** The default since 4.2: a card on the page, one step off it, with elevation rather than a border drawing its edge. */
export const Raised: Story = {
  args: { elevation: 'raised', children: <InvoiceSummary /> },
};

/** When opening the record is the card's only action. The whole surface becomes one button, and hover lifts it to `floating`. */
export const Interactive: Story = {
  args: {
    onClick: () => {},
    ariaLabel: 'Open INV-2043 · Nordwind sp. z o.o.',
    children: <InvoiceSummary />,
  },
};

/** When a card has more than one action: it stays a plain surface, and the actions sit in its own row at the foot, trailing edge, primary last. */
export const WithActions: Story = {
  args: {
    children: <InvoiceSummary />,
    actions: (
      <>
        <Button size="sm" variant="secondary">
          Download PDF
        </Button>
        <Button size="sm">Send reminder</Button>
      </>
    ),
  },
};

/** Cards in a row line their actions up at the foot, however long their content runs. */
export const ActionsInAGrid: Story = {
  parameters: { wide: true },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 'var(--bh-gap-normal)',
      }}
    >
      <Card actions={<Button size="sm">Send reminder</Button>}>
        <InvoiceSummary />
      </Card>
      <Card
        actions={
          <Button size="sm" variant="secondary">
            Download PDF
          </Button>
        }
      >
        <span style={stack}>
          <InvoiceSummary />
          <span style={{ color: 'var(--bh-text-secondary)' }}>
            Paid in two instalments. The second cleared on 2 October, eleven days after the first.
          </span>
        </span>
      </Card>
    </div>
  ),
};

/** When cards in a list carry a status and the bar helps the eye group them. The status is still written out. */
export const Accent: Story = {
  args: {
    accent: 'warning',
    children: <InvoiceSummary status={<Badge tone="warning">Overdue by 12 days</Badge>} />,
  },
};

/** In a tight grid or a side panel, where the section padding would leave more margin than content. */
export const Snug: Story = {
  args: { padding: 'snug', children: <InvoiceSummary /> },
};

/** For a board pattern that implements its own drag: marks the card being moved. It changes the look only. */
export const Dragging: Story = {
  args: { dragging: true, children: <InvoiceSummary /> },
};
