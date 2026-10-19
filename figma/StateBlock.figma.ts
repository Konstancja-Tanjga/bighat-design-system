// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=15-1105
// source=src/components/StateBlock/StateBlock.tsx
// component=StateBlock
import figma from 'figma';
const instance = figma.selectedInstance;

const state = instance.getEnum('State', { empty: 'empty', loading: 'loading', error: 'error' });
// section is the default scope in code.
const scope = instance.getEnum('Scope', {
  inline: ' scope="inline"',
  section: '',
  page: ' scope="page"',
});
const title = instance.getString('Title');
const description = instance.getString('Description');
// Empty offers its one action; error offers a retry; loading offers nothing.
const offers = instance.getBoolean('Actions');
const action =
  !offers || state === 'loading' ? '' : state === 'empty' ? ' action={action}' : ' action={retry}';

export default {
  example: figma.code`<StateBlock state="${state}" title="${title}" description="${description}"${scope}${action} />`,
  imports: ['import { StateBlock } from "@bighat/ui"'],
  id: 'state-block',
  metadata: { nestable: true },
};
