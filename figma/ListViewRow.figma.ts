// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=61-110
// source=src/components/ListView/ListView.tsx
// component=ListViewItem
import figma from 'figma';
const instance = figma.selectedInstance;

// A row is one entry of <ListView items>, so the snippet is the item object.
const title = instance.getString('Title');
const description = instance.getBoolean('Show description')
  ? figma.code`, description: '${instance.getString('Description')}'`
  : '';
const meta = instance.getBoolean('Show meta')
  ? figma.code`, meta: '${instance.getString('Meta')}'`
  : '';
// selected is the ListView's value; hover is the pointer's.
const disabled = instance.getEnum('state', {
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
