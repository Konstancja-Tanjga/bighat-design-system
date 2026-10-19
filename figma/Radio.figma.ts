// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=12-825
// source=src/components/RadioGroup/RadioGroup.tsx
// component=RadioOption
import figma from 'figma';
const instance = figma.selectedInstance;

// One drawn radio is one entry of <RadioGroup options>; the group holds the legend
// and the value. Checked is the group's value; hover and focus are the pointer's
// and the keyboard's.
const label = instance.getString('Label');
const disabled = instance.getEnum('State', {
  default: '',
  hover: '',
  focus: '',
  disabled: ', disabled: true',
});

export default {
  example: figma.code`{ value: '${label.toLowerCase().replace(/\s+/g, '-')}', label: '${label}'${disabled} }`,
  imports: ['import type { RadioOption } from "@bighat/ui"'],
  id: 'radio-option',
  metadata: { nestable: true },
};
