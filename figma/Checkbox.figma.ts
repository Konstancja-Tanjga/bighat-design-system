// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=20-126
// source=src/components/Checkbox/Checkbox.tsx
// component=Checkbox
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const description = instance.getBoolean('Show hint') ? instance.getString('Hint') : '';
const checked = instance.getEnum('checked', {
  off: '',
  on: ' defaultChecked',
  mixed: ' indeterminate',
});
// hover and focus are pointer and keyboard states, not props.
const state = instance.getEnum('state', {
  default: 'default',
  hover: 'default',
  focus: 'default',
  invalid: 'invalid',
  disabled: 'disabled',
});
const error = state === 'invalid' ? instance.getString('Error') : '';

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
