// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=12-890
// source=src/components/Switch/Switch.tsx
// component=Switch
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const checked = instance.getEnum('Checked', { true: '{true}', false: '{false}' });
// hover and focus are pointer and keyboard states, not props.
const disabled = instance.getEnum('State', {
  default: '',
  hover: '',
  focus: '',
  disabled: ' disabled',
});

export default {
  example: figma.code`<Switch
  label="${label}"
  checked=${checked}
  onChange={setChecked}${disabled}
/>`,
  imports: ['import { Switch } from "@bighat/ui"'],
  id: 'switch',
  metadata: { nestable: true },
};
