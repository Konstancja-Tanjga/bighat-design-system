// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=61-2244
// source=src/components/Slider/Slider.tsx
// component=Slider
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const description = instance.getBoolean('Show description')
  ? figma.code`
  description="${instance.getString('Description')}"`
  : '';
const hideValue = instance.getBoolean('Show value')
  ? ''
  : figma.code`
  hideValue`;
const disabled = instance.getEnum('state', {
  default: '',
  hover: '',
  focus: '',
  disabled: figma.code`
  disabled`,
});

export default {
  example: figma.code`<Slider
  label="${label}"
  value={value}
  onChange={setValue}
  min={1}
  max={30}${description}${hideValue}${disabled}
/>`,
  imports: ['import { Slider } from "@bighat/ui"'],
  id: 'slider',
  metadata: { nestable: true },
};
