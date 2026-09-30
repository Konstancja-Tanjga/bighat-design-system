import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { StateBlock } from '../StateBlock/StateBlock';
import { Board, BoardCard, BoardColumn } from './Board';

/**
 * Columns of cards for work that moves through stages — documents through
 * classification and review, invoices from draft to paid. The decision it
 * encodes is that moving a card is never a drag-only gesture: `BoardCard`
 * renders a visible "Move to…" menu from `moveTargets` and `onMove`, and the
 * board owns one polite live region so the move is announced.
 *
 * Scaffolded from packages/spec/components/board.json. The anatomy, props,
 * states and keyboard map come from the contract; the prose and the stories
 * beyond `Default` do not.
 */
const meta = {
  title: 'Components/Board',
  component: Board,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Board>;
export default meta;

type Story = StoryObj<typeof meta>;

const STAGES = [
  { id: 'inbox', label: 'Inbox' },
  { id: 'review', label: 'In review' },
  { id: 'approved', label: 'Approved' },
];

const targetsFrom = (current: string) => STAGES.filter((stage) => stage.id !== current);

/** The shape most boards start from: a few stages, every card movable without a pointer. */
export const Default: Story = {
  args: {
    ariaLabel: 'Documents by stage',
    children: (
      <>
        <BoardColumn title="Inbox" count={2}>
          <BoardCard
            title="Invoice INV-2041"
            moveTargets={targetsFrom('inbox')}
            onMove={() => {}}
            onOpen={() => {}}
          >
            Invoice INV-2041 — Northwind Traders, €4,180.00
          </BoardCard>
          <BoardCard
            title="Master services agreement — Northwind"
            moveTargets={targetsFrom('inbox')}
            onMove={() => {}}
            onOpen={() => {}}
          >
            Master services agreement — Northwind
          </BoardCard>
        </BoardColumn>
        <BoardColumn title="In review" count={1}>
          <BoardCard
            title="Supplier contract — Tailspin"
            moveTargets={targetsFrom('review')}
            onMove={() => {}}
            onOpen={() => {}}
          >
            Supplier contract — Tailspin
          </BoardCard>
        </BoardColumn>
        <BoardColumn title="Approved" count={1}>
          <BoardCard
            title="Framework agreement — Contoso"
            moveTargets={targetsFrom('approved')}
            onMove={() => {}}
            onOpen={() => {}}
          >
            Framework agreement — Contoso
          </BoardCard>
        </BoardColumn>
      </>
    ),
  },
};

/** When a stage has a work-in-progress limit the team has agreed to and needs to see broken. */
export const OverLimit: Story = {
  args: {
    ariaLabel: 'Invoices by stage',
    children: (
      <BoardColumn title="Awaiting approval" count={4} limit={3}>
        {['INV-2038', 'INV-2039', 'INV-2040', 'INV-2041'].map((invoice) => (
          <BoardCard
            key={invoice}
            title={`Invoice ${invoice}`}
            moveTargets={[
              { id: 'approved', label: 'Approved' },
              { id: 'rejected', label: 'Rejected' },
            ]}
            onMove={() => {}}
          >
            Invoice {invoice}
          </BoardCard>
        ))}
      </BoardColumn>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'The limit is surfaced, never enforced: the column still accepts the fifth card. The border turns amber, but the sentence under the heading is what carries the meaning, so the warning does not rely on colour alone.',
      },
    },
  },
};

/** When a stage can legitimately be empty and the reader needs to know what fills it. */
export const EmptyColumn: Story = {
  args: {
    ariaLabel: 'Documents by stage',
    children: (
      <>
        <BoardColumn title="In review" count={1}>
          <BoardCard
            title="Data processing addendum"
            moveTargets={[{ id: 'approved', label: 'Approved' }]}
            onMove={() => {}}
          >
            Data processing addendum
          </BoardCard>
        </BoardColumn>
        <BoardColumn
          title="Approved"
          count={0}
          empty={
            <StateBlock
              scope="inline"
              state="empty"
              title="Nothing approved yet"
              description="Documents appear here once a reviewer signs them off."
            />
          }
        />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          '`empty` replaces the card list only when `count` is 0. The column reads `count` as given; it does not count its children.',
      },
    },
  },
};

type Invoice = { id: string; title: string; stage: string };

/** Reach for this to check the whole move: choose a destination, the card moves, the move is announced. */
export const KeyboardMove: Story = {
  args: { ariaLabel: 'Invoices by stage', children: null },
  render: function Render(args) {
    const [invoices, setInvoices] = useState<Invoice[]>([
      { id: 'inv-2041', title: 'Invoice INV-2041', stage: 'inbox' },
      { id: 'inv-2042', title: 'Invoice INV-2042', stage: 'inbox' },
      { id: 'inv-2036', title: 'Invoice INV-2036', stage: 'review' },
    ]);
    const [announcement, setAnnouncement] = useState('');

    const move = (invoice: Invoice, targetId: string) => {
      const target = STAGES.find((stage) => stage.id === targetId);
      if (!target) return;
      setInvoices((all) =>
        all.map((item) => (item.id === invoice.id ? { ...item, stage: targetId } : item)),
      );
      setAnnouncement(`${invoice.title} moved to ${target.label}.`);
    };

    return (
      <Board ariaLabel={args.ariaLabel} announcement={announcement}>
        {STAGES.map((stage) => {
          const items = invoices.filter((invoice) => invoice.stage === stage.id);
          return (
            <BoardColumn
              key={stage.id}
              title={stage.label}
              count={items.length}
              empty={
                <StateBlock
                  scope="inline"
                  state="empty"
                  title="No invoices at this stage"
                  description="Move an invoice here with its “Move to…” menu."
                />
              }
            >
              {items.map((invoice) => (
                <BoardCard
                  key={invoice.id}
                  title={invoice.title}
                  moveTargets={targetsFrom(stage.id)}
                  onMove={(targetId) => move(invoice, targetId)}
                >
                  {invoice.title}
                </BoardCard>
              ))}
            </BoardColumn>
          );
        })}
      </Board>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'The product owns the move and the sentence: `onMove` updates the data, and the string passed to `announcement` is what the live region reads. The board does not write the announcement and does not move focus.',
      },
    },
  },
};
