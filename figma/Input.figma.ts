// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=12-225
// source=src/components/Input/Input.tsx
// component=Input
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const placeholder = instance.getString('Placeholder');
const description = instance.getBoolean('Description')
  ? instance.getString('Description text')
  : '';
const required = instance.getBoolean('Required', { true: ' required', false: '' });
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
