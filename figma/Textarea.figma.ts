// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=28-59
// source=src/components/Textarea/Textarea.tsx
// component=Textarea
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const description = instance.getBoolean('Show description')
  ? instance.getString('Description')
  : '';
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
  example: figma.code`<Textarea
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
  }${state === 'disabled' ? ' disabled' : ''}
/>`,
  imports: ['import { Textarea } from "@bighat/ui"'],
  id: 'textarea',
  metadata: { nestable: true },
};
