// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=15-1331
// source=src/components/Accordion/Accordion.tsx
// component=AccordionItem
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Title');
const meta = instance.getBoolean('Meta') ? instance.getString('Meta text') : '';
const content = instance.getString('Panel text');
// Open is the Accordion's defaultOpen, and hover is the pointer's: neither is a prop here.

export default {
  example: figma.code`<AccordionItem title="${title}"${meta ? figma.code` meta="${meta}"` : ''}>
  ${content}
</AccordionItem>`,
  imports: ['import { AccordionItem } from "@bighat/ui"'],
  id: 'accordion-item',
  metadata: { nestable: true },
};
