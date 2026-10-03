// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=27-38
// source=src/components/RadioGroup/RadioGroup.tsx
// component=RadioGroup
import figma from 'figma';
const instance = figma.selectedInstance;

// The options are the Radio instances inside the group; in code they are data.
const legend = instance.getString('Legend');

export default {
  example: figma.code`<RadioGroup legend="${legend}" options={options} value={value} onChange={setValue} />`,
  imports: ['import { RadioGroup } from "@bighat/ui"'],
  id: 'radio-group',
  metadata: { nestable: true },
};
