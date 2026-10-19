// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=13-669
// source=src/components/Toast/Toast.tsx
// component=useToast
import figma from 'figma';
const instance = figma.selectedInstance;

const tone = instance.getEnum('Tone', {
  info: 'info',
  success: 'success',
  warning: 'warning',
  critical: 'critical',
});
const title = instance.getString('Title');
const description = instance.getBoolean('Description')
  ? instance.getString('Description text')
  : '';

export default {
  // A toast is raised, not placed: the snippet is the call that shows it,
  // with notify from const { notify } = useToast().
  example: figma.code`notify({ tone: '${tone}', title: '${title}'${description ? figma.code`, description: '${description}'` : ''} });`,
  imports: ['import { useToast } from "@bighat/ui"'],
  id: 'toast',
  metadata: { nestable: false },
};
