// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=12-411
// source=src/components/Textarea/Textarea.tsx
// component=Textarea
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const description = instance.getBoolean('Description')
  ? instance.getString('Description text')
  : '';
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
