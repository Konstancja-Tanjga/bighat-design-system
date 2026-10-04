// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=61-27
// source=src/components/NavList/NavList.tsx
// component=NavItem
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const subline = instance.getBoolean('Show subline')
  ? figma.code`, subline: '${instance.getString('Subline')}'`
  : '';
const icon = instance.getBoolean('Show icon') ? figma.code`, icon: icon` : '';
const meta = instance.getBoolean('Show meta')
  ? figma.code`, meta: '${instance.getString('Meta')}'`
  : '';
// active is the current page; hover is the pointer's.
const active = instance.getEnum('state', { default: '', hover: '', active: ' active' });

export default {
  example: figma.code`<NavItem item={{ id: 'inbox', label: '${label}'${subline}${icon}${meta} }}${active} onSelect={go} />`,
  imports: ['import { NavItem } from "@bighat/ui"'],
  id: 'nav-item',
  metadata: { nestable: true },
};
