// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=24-1254
// source=src/components/DatePicker/DatePicker.tsx
// component=DatePicker
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const required = instance.getBoolean('Required', { true: ' required', false: '' });
const description = instance.getBoolean('Description')
  ? figma.code`
  description="${instance.getString('Description text')}"`
  : '';
// focus is the keyboard's, not a prop.
const state = instance.getEnum('State', {
  default: '',
  focus: '',
  invalid: figma.code`
  error="${instance.getString('Error text')}"`,
  disabled: figma.code`
  disabled`,
});

export default {
  example: figma.code`<DatePicker
  label="${label}"${description}
  value={value}
  onChange={(event) => setValue(event.target.value)}${required}${state}
/>`,
  imports: ['import { DatePicker } from "@bighat/ui"'],
  id: 'date-picker',
  metadata: { nestable: true },
};
