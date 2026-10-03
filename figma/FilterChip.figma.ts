// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=21-24
// source=src/components/FilterChip/FilterChip.tsx
// component=FilterChip
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const pressed = instance.getEnum('pressed', { true: '{true}', false: '{false}' });
// hover is a pointer state, not a prop.
const disabled = instance.getEnum('state', { default: '', hover: '', disabled: ' disabled' });

export default {
  example: figma.code`<FilterChip label="${label}" pressed=${pressed} onClick={toggle}${disabled} />`,
  imports: ['import { FilterChip } from "@bighat/ui"'],
  id: 'filter-chip',
  metadata: { nestable: true },
};
