// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=59-32
// source=src/components/List/List.tsx
// component=ListItem
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Title');
const description = instance.getBoolean('Show description')
  ? instance.getString('Description')
  : '';
const trailing = instance.getBoolean('Show trailing') ? instance.getString('Trailing') : '';
const leading = instance.getBoolean('Show leading') ? figma.code` leading={icon}` : '';
// An interactive row is a link or a button in code; href stands for both.
const interactive = instance.getEnum('kind', { static: '', interactive: ' href={href}' });

export default {
  example: figma.code`<ListItem${leading} title="${title}"${description ? figma.code` description="${description}"` : ''}${trailing ? figma.code` trailing="${trailing}"` : ''}${interactive} />`,
  imports: ['import { ListItem } from "@bighat/ui"'],
  id: 'list-item',
  metadata: { nestable: true },
};
