import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../Button/Button';
import { Composer } from './Composer';

/**
 * The prompt input for an assistant: a `<textarea>` inside its own `<form>`,
 * where Enter sends the draft and Shift+Enter starts a new line.
 *
 * The decision it encodes is that the prompt is a form, not a styled
 * `contenteditable`. The form submits by ordinary means as well as on Enter, so
 * voice control and switch access can send a message without knowing about the
 * key handler, and the field keeps its label, undo and autocomplete. For
 * multi-line text inside a larger form, where Enter must start a new paragraph,
 * use `Textarea`.
 *
 * Scaffolded from packages/spec/components/composer.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof Composer> = {
  title: 'Components/Composer',
  component: Composer,
  tags: ['autodocs'],
  args: {
    label: 'Ask anything about the business',
    placeholder: 'Which invoices are overdue this month?',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=65-58',
    },
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Composer>;

const MODES = [
  { id: 'ask', label: 'Ask' },
  { id: 'plan', label: 'Plan first' },
  { id: 'chart', label: 'Make a chart' },
];

/** The starting point: a visible label and an example question as the placeholder, for a screen with one question to ask. */
export const Default: Story = {};

/** When the same prompt can be answered in more than one way and the reader has to choose before sending. */
export const WithModes: Story = {
  render: function Render(args) {
    const [mode, setMode] = useState('ask');
    return <Composer {...args} modes={MODES} activeMode={mode} onModeChange={setMode} />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Modes are a native radio group inside a `<fieldset>`, so a screen reader announces which one is selected and the arrow keys move between them. `activeMode` is controlled: without `onModeChange` updating it, clicking a mode changes nothing.',
      },
    },
  },
};

/** When the answer carries a condition the reader must know before relying on it — scope, accuracy, what the assistant cannot do. */
export const WithHint: Story = {
  args: {
    hint: 'Answers come with the SQL that produced them. Read-only — AI Chat cannot change your data.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The hint is linked to the field with `aria-describedby`, so a screen reader hears it on focus. Put the notice here rather than in the placeholder, which disappears at the first keystroke.',
      },
    },
  },
};

/** When the draft needs actions of its own, such as attaching a file, placed beside the submit button. */
export const WithTools: Story = {
  args: {
    tools: (
      <Button variant="ghost" size="sm">
        Attach a file
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Anything in `tools` sits inside the form, before the submit button. An icon-only button here needs its own `aria-label`; the Composer does not supply one.',
      },
    },
  },
};

/** While a response is being generated, so a second message cannot be sent on top of the first. */
export const Busy: Story = {
  render: function Render(args) {
    const [draft, setDraft] = useState('Which regions missed their Q3 target?');
    return <Composer {...args} value={draft} onValueChange={setDraft} busy />;
  },
  parameters: {
    docs: {
      description: {
        story:
          '`busy` blocks submission and sets `aria-disabled` on the submit button, which stays focusable. The reader can keep typing the next question. It does not announce anything by itself: telling a screen reader that a response is on its way is the job of the conversation around it.',
      },
    },
  },
};

/** When the assistant is unavailable for this reader, for example without access to the workspace's data. */
export const Disabled: Story = {
  args: {
    disabled: true,
    hint: 'AI Chat is turned off for this workspace. Ask an administrator to enable it.',
  },
};
