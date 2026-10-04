// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=48-25
// source=src/components/NavRail/NavRail.tsx
// component=NavRailItem
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const badge = instance.getBoolean('Badge', { true: ', badge: true', false: '' });

export default {
  // One entry of <NavRail items>; the icon is the product's own.
  example: figma.code`{ id: '${label.toLowerCase()}', label: '${label}', icon: <Icon${label.replace(/\s+/g, '')} />${badge} }`,
  imports: ['import type { NavRailItem } from "@bighat/ui"'],
  id: 'nav-rail-item',
  metadata: { nestable: true },
};
