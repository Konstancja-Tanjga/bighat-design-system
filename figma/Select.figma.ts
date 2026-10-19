// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=12-505
// source=src/components/Select/Select.tsx
// component=Select
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const placeholder = instance.getString('Value');
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
