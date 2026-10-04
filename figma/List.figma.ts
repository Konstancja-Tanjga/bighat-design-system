// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=59-103
// source=src/components/List/List.tsx
// component=List
import figma from 'figma';
const instance = figma.selectedInstance;

const variant = instance.getEnum('variant', { plain: '', inset: ' variant="inset"' });
const items = instance
  .findConnectedInstances((node) => node.codeConnectId() === 'list-item')
  .map((item) => (item.type === 'INSTANCE' ? item.executeTemplate().example : ''));

export default {
  example: figma.code`<List ariaLabel="Files" dividers${variant}>
  ${items}
</List>`,
  imports: ['import { List, ListItem } from "@bighat/ui"'],
  id: 'list',
  metadata: { nestable: false },
};
