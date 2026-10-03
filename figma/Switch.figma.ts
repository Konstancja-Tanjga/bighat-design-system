// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=27-165
// source=src/components/Switch/Switch.tsx
// component=Switch
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const description = instance.getBoolean('Show hint') ? instance.getString('Hint') : '';
const checked = instance.getEnum('checked', { true: '{true}', false: '{false}' });
// hover and focus are pointer and keyboard states, not props.
const disabled = instance.getEnum('state', {
  default: '',
  hover: '',
  focus: '',
  disabled: ' disabled',
});

export default {
  example: figma.code`<Switch
  label="${label}"${
    description
      ? figma.code`
  description="${description}"`
      : ''
  }
  checked=${checked}
  onChange={setChecked}${disabled}
/>`,
  imports: ['import { Switch } from "@bighat/ui"'],
  id: 'switch',
  metadata: { nestable: true },
};
