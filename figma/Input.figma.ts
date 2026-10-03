// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=12-143
// source=src/components/Input/Input.tsx
// component=Input
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const placeholder = instance.getString('Value');
const description = instance.getBoolean('Show description')
  ? instance.getString('Description')
  : '';
const required = instance.getBoolean('Required', { true: ' required', false: '' });
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
  example: figma.code`<Input
  label="${label}"
  placeholder="${placeholder}"${
    description
      ? figma.code`
  description="${description}"`
      : ''
  }${
    error
      ? figma.code`
  error="${error}"`
      : ''
  }${required}${state === 'disabled' ? ' disabled' : ''}
/>`,
  imports: ['import { Input } from "@bighat/ui"'],
  id: 'input',
  metadata: { nestable: true },
};
