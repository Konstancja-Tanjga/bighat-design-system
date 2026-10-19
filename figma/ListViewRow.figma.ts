// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=25-1282
// source=src/components/ListView/ListView.tsx
// component=ListViewItem
import figma from 'figma';
const instance = figma.selectedInstance;

// A row is one entry of <ListView items>, so the snippet is the item object.
const title = instance.getString('Title');
const description = instance.getBoolean('Description')
  ? figma.code`, description: '${instance.getString('Description text')}'`
  : '';
const meta = instance.getBoolean('Meta')
  ? figma.code`, meta: '${instance.getString('Meta text')}'`
  : '';
// selected is the ListView's value; hover is the pointer's.
const disabled = instance.getEnum('State', {
  default: '',
  hover: '',
  selected: '',
  disabled: ', disabled: true',
});

export default {
  example: figma.code`{ id: 'northwind', title: '${title}'${description}${meta}${disabled} }`,
  imports: ['import type { ListViewItem } from "@bighat/ui"'],
  id: 'list-view-row',
  metadata: { nestable: true },
};
