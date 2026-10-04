// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=44-81
// source=src/components/StateBlock/StateBlock.tsx
// component=StateBlock
import figma from 'figma';
const instance = figma.selectedInstance;

const state = instance.getEnum('state', { empty: 'empty', loading: 'loading', error: 'error' });
// section is the default scope in code.
const scope = instance.getEnum('scope', { inline: ' scope="inline"', section: '' });
const title = instance.findText('Title').textContent;
// Empty offers its one action; error offers a retry; loading offers nothing.
const action = state === 'empty' ? ' action={action}' : state === 'error' ? ' action={retry}' : '';

export default {
  example: figma.code`<StateBlock state="${state}" title="${title}"${scope}${action} />`,
  imports: ['import { StateBlock } from "@bighat/ui"'],
  id: 'state-block',
  metadata: { nestable: true },
};
