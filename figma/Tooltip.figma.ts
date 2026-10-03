// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=31-3
// source=src/components/Tooltip/Tooltip.tsx
// component=Tooltip
import figma from 'figma';
const instance = figma.selectedInstance;

const content = instance.getString('Text');

export default {
  // The trigger is whatever control the tooltip describes - never a disabled one.
  example: figma.code`<Tooltip content="${content}">{trigger}</Tooltip>`,
  imports: ['import { Tooltip } from "@bighat/ui"'],
  id: 'tooltip',
  metadata: { nestable: true },
};
