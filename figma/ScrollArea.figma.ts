// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=64-139
// source=src/components/ScrollArea/ScrollArea.tsx
// component=ScrollArea
import figma from 'figma';
const instance = figma.selectedInstance;

// vertical is the default.
const axis = instance.getEnum('axis', { vertical: '', horizontal: ' axis="horizontal"' });

export default {
  example: figma.code`<ScrollArea ariaLabel="Audit log" maxHeight={180}${axis}>
  {children}
</ScrollArea>`,
  imports: ['import { ScrollArea } from "@bighat/ui"'],
  id: 'scroll-area',
  metadata: { nestable: true },
};
