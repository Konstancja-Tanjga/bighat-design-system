import type { Meta, StoryObj } from '@storybook/react-vite';

import { KanbanTemplate } from './KanbanBoard';

const meta = {
  title: 'Templates/Kanban board',
  component: KanbanTemplate,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Documents moving through classification, review and approval. The layout is the easy part — the reason this is a template is the move interaction, which works without a pointer.',
      },
    },
  },
  decorators: [(Story) => <div style={{ margin: -24, height: '100dvh' }}>{Story()}</div>],
} satisfies Meta<typeof KanbanTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = {
  args: { state: 'ready' },
  parameters: {
    docs: {
      description: {
        story:
          'Try it with the keyboard: tab to a card, tab again to its **Move to…** control, choose a column. The move is announced by the board’s live region, because a card that has just left the place the user was standing needs to say where it went.',
      },
    },
  },
};

export const OverWipLimit: Story = {
  name: 'Over the WIP limit',
  args: { state: 'ready', overLimit: true },
  parameters: {
    docs: {
      description: {
        story:
          'The limit is surfaced, never enforced. Blocking the move would mean the tool deciding it knows more about the team’s week than the team does — and the usual result is people working around the tool rather than within it. The warning is a sentence as well as an amber border, so it is not colour carrying the meaning alone.',
      },
    },
  },
};

export const EmptyColumns: Story = {
  name: 'Empty columns',
  args: { state: 'ready' },
  parameters: {
    docs: {
      description: {
        story:
          'Each column falls back to a `StateBlock` with copy specific to that column — "uploaded documents land here first" for the inbox, "move a document in to get started" everywhere else. One generic "no items" across five columns would tell the user nothing about what each column is for.',
      },
    },
  },
};

export const Loading: Story = {
  args: { state: 'loading' },
  parameters: {
    docs: {
      description: {
        story:
          'The shape of the result is known — four columns of cards — so skeletons are the right call. `SkeletonGroup` makes the single polite announcement so a screen reader is not read a wall of empty placeholders.',
      },
    },
  },
};

export const ServiceFailure: Story = {
  args: { state: 'error' },
  parameters: {
    docs: {
      description: {
        story:
          'States explicitly that nothing was uploaded, moved or deleted. On a board where the user has been dragging things around, "did my last move save?" is the first question a failure raises.',
      },
    },
  },
};
