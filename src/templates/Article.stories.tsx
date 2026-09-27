import type { Meta, StoryObj } from '@storybook/react-vite';

import { ArticleTemplate } from './Article';

const meta = {
  title: 'Templates/Article',
  component: ArticleTemplate,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A lesson in a course, assembled from system components. The syllabus lives in the shell navigation, the table of contents beside the text, and photos with their credit in the margin at the height of their paragraph. Resize the frame to see the three shapes: text, margin and table of contents; text and margin with the table of contents folded; one column.',
      },
    },
  },
  decorators: [(Story) => <div style={{ height: '100dvh' }}>{Story()}</div>],
} satisfies Meta<typeof ArticleTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = { args: { state: 'ready' } };

/** The header is known before the body arrives, so only the body is a skeleton. */
export const Loading: Story = { args: { state: 'loading' } };

/** What did not happen to the reader's progress, and a way forward. */
export const Error: Story = { args: { state: 'error' } };
