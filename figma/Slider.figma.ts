// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=24-1114
// source=src/components/Slider/Slider.tsx
// component=Slider
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const description = instance.getBoolean('Description')
  ? figma.code`
  description="${instance.getString('Description text')}"`
  : '';
const disabled = instance.getEnum('State', {
  default: '',
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
  max={30}${description}${disabled}
/>`,
  imports: ['import { Slider } from "@bighat/ui"'],
  id: 'slider',
  metadata: { nestable: true },
};
