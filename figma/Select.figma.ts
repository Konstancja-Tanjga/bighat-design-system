// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=21-122
// source=src/components/Select/Select.tsx
// component=Select
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const placeholder = instance.getString('Value');
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
  // The options are data, not drawn in Figma; the snippet leaves them to the product.
  example: figma.code`<Select
  label="${label}"
  placeholder="${placeholder}"
  options={options}${
    error
      ? figma.code`
  error="${error}"`
      : ''
  }${state === 'disabled' ? ' disabled' : ''}
/>`,
  imports: ['import { Select } from "@bighat/ui"'],
  id: 'select',
  metadata: { nestable: true },
};
