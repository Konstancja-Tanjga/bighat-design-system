// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=58-31
// source=src/components/Accordion/Accordion.tsx
// component=AccordionItem
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Title');
const meta = instance.getBoolean('Show meta') ? instance.getString('Meta') : '';
const content = instance.getString('Content');
// open is the Accordion's defaultOpen, and hover is the pointer's: neither is a prop here.

export default {
  example: figma.code`<AccordionItem title="${title}"${meta ? figma.code` meta="${meta}"` : ''}>
  ${content}
</AccordionItem>`,
  imports: ['import { AccordionItem } from "@bighat/ui"'],
  id: 'accordion-item',
  metadata: { nestable: true },
};
