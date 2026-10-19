// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=24-1173
// source=src/components/ScrollArea/ScrollArea.tsx
// component=ScrollArea
import figma from 'figma';
const instance = figma.selectedInstance;

// vertical is the default.
const axis = instance.getEnum('Axis', { vertical: '', horizontal: ' axis="horizontal"' });

export default {
  example: figma.code`<ScrollArea ariaLabel="Audit log" maxHeight={180}${axis}>
  {children}
</ScrollArea>`,
  imports: ['import { ScrollArea } from "@bighat/ui"'],
  id: 'scroll-area',
  metadata: { nestable: true },
};
