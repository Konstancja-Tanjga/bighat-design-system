// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=21-33
// source=src/components/RemovableChip/RemovableChip.tsx
// component=RemovableChip
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const disabled = instance.getEnum('state', { default: '', disabled: ' disabled' });

export default {
  // removeLabel names the kind of thing: "Remove filter Contract", not "Remove".
  example: figma.code`<RemovableChip
  label="${label}"
  removeLabel="Remove filter ${label}"
  onRemove={remove}${disabled}
/>`,
  imports: ['import { RemovableChip } from "@bighat/ui"'],
  id: 'removable-chip',
  metadata: { nestable: true },
};
