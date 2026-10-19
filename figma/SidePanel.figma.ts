// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=29-2176
// source=src/components/SidePanel/SidePanel.tsx
// component=SidePanel
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Title');
const footer = instance.getBoolean('Footer', { true: '\n  footer={footer}', false: '' });
const collapsed = instance.getEnum('Collapsed', {
  false: '',
  true: '\n  collapsed\n  onToggle={toggle}',
});

export default {
  example: figma.code`<SidePanel
  ariaLabel="${title}"
  title="${title}"${footer}${collapsed}
>
  {children}
</SidePanel>`,
  imports: ['import { SidePanel } from "@bighat/ui"'],
  id: 'side-panel',
  metadata: { nestable: false },
};
