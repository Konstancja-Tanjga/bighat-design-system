// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=24-1255
// source=src/components/DatePicker/DatePicker.tsx
// component=DateRangePicker
import figma from 'figma';
const instance = figma.selectedInstance;

const legend = instance.getString('Legend');

export default {
  example: figma.code`<DateRangePicker
  legend="${legend}"
  start={{ label: 'From', value: from, onChange: (event) => setFrom(event.target.value) }}
  end={{ label: 'To', value: to, onChange: (event) => setTo(event.target.value) }}
/>`,
  imports: ['import { DateRangePicker } from "@bighat/ui"'],
  id: 'date-range-picker',
  metadata: { nestable: true },
};
