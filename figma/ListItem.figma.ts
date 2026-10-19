// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=25-1114
// source=src/components/List/List.tsx
// component=ListItem
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Title');
const description = instance.getBoolean('Description')
  ? instance.getString('Description text')
  : '';
const trailing = instance.getBoolean('Meta') ? instance.getString('Meta text') : '';
const leading = instance.getBoolean('Leading') ? figma.code` leading={icon}` : '';
// An interactive row is a link or a button in code; href stands for both.
const interactive = instance.getEnum('Interactive', { false: '', true: ' href={href}' });

export default {
  example: figma.code`<ListItem${leading} title="${title}"${description ? figma.code` description="${description}"` : ''}${trailing ? figma.code` trailing="${trailing}"` : ''}${interactive} />`,
  imports: ['import { ListItem } from "@bighat/ui"'],
  id: 'list-item',
  metadata: { nestable: true },
};
