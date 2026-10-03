// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=27-263
// source=src/components/SegmentedControl/SegmentedControl.tsx
// component=SegmentedControl
import figma from 'figma';
const instance = figma.selectedInstance;

// md is the default in code, so it is left out of the snippet.
const size = instance.getEnum('size', { sm: ' size="sm"', md: '' });

export default {
  example: figma.code`<SegmentedControl legend="View" options={options} value={value} onChange={setValue}${size} />`,
  imports: ['import { SegmentedControl } from "@bighat/ui"'],
  id: 'segmented-control',
  metadata: { nestable: true },
};
