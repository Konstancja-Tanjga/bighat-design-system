// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=11-300
// source=src/components/Progress/Progress.tsx
// component=Progress
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
// Indeterminate has no value: the bar travels instead of filling.
const determinate = instance.getEnum('State', { determinate: true, indeterminate: false });
const value = determinate
  ? figma.code` value={${instance.getString('Value text').replace('%', '')}}`
  : '';
// neutral and md are the defaults in code, so they are left out of the snippet.
const tone = instance.getEnum('Tone', {
  neutral: '',
  success: ' tone="success"',
  critical: ' tone="critical"',
});
const size = instance.getEnum('Size', { sm: ' size="sm"', md: '' });
const hideLabel = instance.getBoolean('Show label row', { true: '', false: ' hideLabel' });

export default {
  example: figma.code`<Progress label="${label}"${value}${tone}${size}${hideLabel} />`,
  imports: ['import { Progress } from "@bighat/ui"'],
  id: 'progress',
  metadata: { nestable: true },
};
