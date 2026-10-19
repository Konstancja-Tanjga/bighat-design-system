// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=11-81
// source=src/components/Badge/Badge.tsx
// component=Badge
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
// neutral is the default in code, so it is left out of the snippet.
const tone = instance.getEnum('Tone', {
  neutral: '',
  info: ' tone="info"',
  success: ' tone="success"',
  warning: ' tone="warning"',
  critical: ' tone="critical"',
});
const dot = instance.getBoolean('Dot', { true: ' dot', false: '' });

export default {
  example: figma.code`<Badge${tone}${dot}>${label}</Badge>`,
  imports: ['import { Badge } from "@bighat/ui"'],
  id: 'badge',
  metadata: { nestable: true },
};
