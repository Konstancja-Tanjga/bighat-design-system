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
          "A lesson in a course as World of Raptors ships it: the system's Article under the product's own theme. The theme is a set of semantic-token overrides (warm paper, a rust accent in light and amber in dark, 15px reading text) and two serif faces, scoped to this template's wrapper - a product re-themes the roles, not the components. The module and its numbered lessons sit in a bar under the app bar; sections are numbered; photos with their credit and side notes sit in the margin at the height of their paragraph. Resize the frame to see the margin and the table of contents fold into the text.",
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
