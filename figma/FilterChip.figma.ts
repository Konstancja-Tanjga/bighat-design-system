// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=13-346
// source=src/components/FilterChip/FilterChip.tsx
// component=FilterChip
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const pressed = instance.getEnum('Pressed', { true: '{true}', false: '{false}' });
// hover and focus are pointer and keyboard states, not props.
const disabled = instance.getEnum('State', {
  default: '',
  hover: '',
  focus: '',
  disabled: ' disabled',
});

export default {
  example: figma.code`<FilterChip label="${label}" pressed=${pressed} onClick={toggle}${disabled} />`,
  imports: ['import { FilterChip } from "@bighat/ui"'],
  id: 'filter-chip',
  metadata: { nestable: true },
};
