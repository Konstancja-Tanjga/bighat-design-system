// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=13-514
// source=src/components/SegmentedControl/SegmentedControl.tsx
// component=SegmentedControl
import figma from 'figma';
const instance = figma.selectedInstance;

// md is the default in code, so it is left out of the snippet.
const size = instance.getEnum('Size', { sm: ' size="sm"', md: '' });
const legend = instance.getString('Legend');
// The legend is always in the DOM; showLegend makes it visible too.
const showLegend = instance.getBoolean('Show legend', { true: ' showLegend', false: '' });

export default {
  example: figma.code`<SegmentedControl legend="${legend}"${showLegend} options={options} value={value} onChange={setValue}${size} />`,
  imports: ['import { SegmentedControl } from "@bighat/ui"'],
  id: 'segmented-control',
  metadata: { nestable: true },
};
