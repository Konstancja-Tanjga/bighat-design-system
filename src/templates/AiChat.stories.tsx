import type { Meta, StoryObj } from '@storybook/react-vite';

import { AiChatTemplate } from './AiChat';

const meta = {
  title: 'Templates/AI Chat',
  component: AiChatTemplate,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A conversational analysis workspace assembled entirely from system components. Templates exist so a product team starts from a screen that already handles its own empty, loading and error states, instead of shipping the happy path and discovering the other three later.',
      },
    },
  },
  // The shell owns the viewport, so the preview decorator's padding has to go.
  decorators: [(Story) => <div style={{ margin: -24, height: '100dvh' }}>{Story()}</div>],
} satisfies Meta<typeof AiChatTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = {
  args: { state: 'ready', showExplainer: true },
};

export const Loading: Story = {
  args: { state: 'loading' },
  parameters: {
    docs: {
      description: {
        story:
          'Skeletons rather than a spinner, because the shape of the result is known — six suggestion cards. `SkeletonGroup` makes one polite announcement on behalf of all of them, so a screen reader hears "Loading suggestions" once instead of reading thirty blank placeholders.',
      },
    },
  },
};

export const DataSourceFailure: Story = {
  args: { state: 'error' },
  parameters: {
    docs: {
      description: {
        story:
          'The failure the demo never shows. It states what did *not* happen to the data, offers retry as the primary action and a diagnosis route as the secondary, and keeps the correlation id available for support without putting a stack trace on screen.',
      },
    },
  },
};

export const ReturningUser: Story = {
  args: { state: 'ready', showExplainer: false },
  parameters: {
    docs: {
      description: {
        story:
          'The explainer card is dismissible, and dismissal has to stick. A product that re-explains itself on every visit is telling the user it did not notice they had been here before.',
      },
    },
  },
};
