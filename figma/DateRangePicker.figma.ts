// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=63-228
// source=src/components/DatePicker/DatePicker.tsx
// component=DateRangePicker
import figma from 'figma';

export default {
  example: figma.code`<DateRangePicker
  legend="Invoice period"
  start={{ label: 'From', value: from, onChange: (event) => setFrom(event.target.value) }}
  end={{ label: 'To', value: to, onChange: (event) => setTo(event.target.value) }}
/>`,
  imports: ['import { DateRangePicker } from "@bighat/ui"'],
  id: 'date-range-picker',
  metadata: { nestable: true },
};
