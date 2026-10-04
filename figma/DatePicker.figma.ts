// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=63-227
// source=src/components/DatePicker/DatePicker.tsx
// component=DatePicker
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const error = instance.getEnum('state', {
  default: '',
  hover: '',
  focus: '',
  invalid: figma.code`
  error="Choose a date after the invoice date."`,
  disabled: figma.code`
  disabled`,
});

export default {
  example: figma.code`<DatePicker
  label="${label}"
  value={value}
  onChange={(event) => setValue(event.target.value)}${error}
/>`,
  imports: ['import { DatePicker } from "@bighat/ui"'],
  id: 'date-picker',
  metadata: { nestable: true },
};
