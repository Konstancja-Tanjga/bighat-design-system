// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=31-35
// source=src/components/Toast/Toast.tsx
// component=useToast
import figma from 'figma';
const instance = figma.selectedInstance;

const tone = instance.getEnum('tone', {
  info: 'info',
  success: 'success',
  warning: 'warning',
  critical: 'critical',
});
const title = instance.getString('Title');
const description = instance.getBoolean('Show description')
  ? instance.getString('Description')
  : '';

export default {
  // A toast is raised, not placed: the snippet is the call that shows it.
  example: figma.code`toast.show({ tone: '${tone}', title: '${title}'${description ? figma.code`, description: '${description}'` : ''} });`,
  imports: ['import { useToast } from "@bighat/ui"'],
  id: 'toast',
  metadata: { nestable: false },
};
