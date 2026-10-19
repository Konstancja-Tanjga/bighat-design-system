// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=13-618
// source=src/components/Tooltip/Tooltip.tsx
// component=Tooltip
import figma from 'figma';
const instance = figma.selectedInstance;

const content = instance.getString('Content');
// top is the default placement.
const placement = instance.getEnum('Placement', { top: '', bottom: ' placement="bottom"' });

export default {
  // The trigger is whatever control the tooltip describes - never a disabled one.
  example: figma.code`<Tooltip content="${content}"${placement}>{trigger}</Tooltip>`,
  imports: ['import { Tooltip } from "@bighat/ui"'],
  id: 'tooltip',
  metadata: { nestable: true },
};
