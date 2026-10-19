// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=13-419
// source=src/components/RemovableChip/RemovableChip.tsx
// component=RemovableChip
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
// hover and focus are the remove button's pointer and keyboard states.
const disabled = instance.getEnum('State', {
  default: '',
  hover: '',
  focus: '',
  disabled: ' disabled',
});

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
