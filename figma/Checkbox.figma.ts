// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=12-703
// source=src/components/Checkbox/Checkbox.tsx
// component=Checkbox
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const description = instance.getBoolean('Hint') ? instance.getString('Hint text') : '';
const checked = instance.getEnum('Checked', {
  unchecked: '',
  checked: ' defaultChecked',
  indeterminate: ' indeterminate',
});
// hover and focus are pointer and keyboard states, not props.
const state = instance.getEnum('State', {
  default: 'default',
  hover: 'default',
  focus: 'default',
  invalid: 'invalid',
  disabled: 'disabled',
});
const error = state === 'invalid' ? instance.getString('Error text') : '';

export default {
  example: figma.code`<Checkbox
  label="${label}"${
    description
      ? figma.code`
  description="${description}"`
      : ''
  }${
    error
      ? figma.code`
  error="${error}"`
      : ''
  }${checked}${state === 'disabled' ? ' disabled' : ''}
/>`,
  imports: ['import { Checkbox } from "@bighat/ui"'],
  id: 'checkbox',
  metadata: { nestable: true },
};
