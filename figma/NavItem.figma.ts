// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=29-1993
// source=src/components/NavList/NavList.tsx
// component=NavItem
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const subline = instance.getBoolean('Subline')
  ? figma.code`, subline: '${instance.getString('Subline text')}'`
  : '';
const icon = instance.getBoolean('Icon') ? figma.code`, icon: icon` : '';
const meta = instance.getBoolean('Meta') ? figma.code`, meta: count` : '';
// active is the current page; hover is the pointer's.
const active = instance.getEnum('State', { default: '', hover: '', active: ' active' });

export default {
  example: figma.code`<NavItem item={{ id: 'inbox', label: '${label}'${subline}${icon}${meta} }}${active} onSelect={go} />`,
  imports: ['import { NavItem } from "@bighat/ui"'],
  id: 'nav-item',
  metadata: { nestable: true },
};
