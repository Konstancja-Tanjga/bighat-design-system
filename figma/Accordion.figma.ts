// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=15-1392
// source=src/components/Accordion/Accordion.tsx
// component=Accordion
import figma from 'figma';
const instance = figma.selectedInstance;

// plain is the default, so only inset is written.
const variant = instance.getEnum('Variant', { plain: '', inset: ' variant="inset"' });
// The items render through AccordionItem.figma.ts.
const items = instance
  .findConnectedInstances((node) => node.codeConnectId() === 'accordion-item')
  .map((item) => (item.type === 'INSTANCE' ? item.executeTemplate().example : ''));

export default {
  example: figma.code`<Accordion${variant}>
  ${items}
</Accordion>`,
  imports: ['import { Accordion, AccordionItem } from "@bighat/ui"'],
  id: 'accordion',
  metadata: { nestable: false },
};
