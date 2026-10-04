// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=49-94
// source=src/components/SidePanel/SidePanel.tsx
// component=SidePanel
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Title');
const footer = instance.getBoolean('Show footer', { true: '\n  footer={footer}', false: '' });

export default {
  example: figma.code`<SidePanel
  ariaLabel="${title}"
  title="${title}"${footer}
>
  {children}
</SidePanel>`,
  imports: ['import { SidePanel } from "@bighat/ui"'],
  id: 'side-panel',
  metadata: { nestable: false },
};
