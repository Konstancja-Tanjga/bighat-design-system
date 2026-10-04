// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=44-39
// source=src/components/Progress/Progress.tsx
// component=Progress
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const value = instance.getString('Value').replace('%', '');
// neutral and md are the defaults in code, so they are left out of the snippet.
const tone = instance.getEnum('tone', {
  neutral: '',
  success: ' tone="success"',
  critical: ' tone="critical"',
});
const size = instance.getEnum('size', { sm: ' size="sm"', md: '' });

export default {
  example: figma.code`<Progress label="${label}" value={${value}}${tone}${size} />`,
  imports: ['import { Progress } from "@bighat/ui"'],
  id: 'progress',
  metadata: { nestable: true },
};
