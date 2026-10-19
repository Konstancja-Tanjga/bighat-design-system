// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=29-1812
// source=src/components/NavRail/NavRail.tsx
// component=NavRailItem
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
// Labels is the rail's showLabels, active is its activeId, hover is the pointer's.
const badge = instance.getBoolean('Dot', { true: ', badge: true', false: '' });

export default {
  // One entry of <NavRail items>; the icon is the product's own.
  example: figma.code`{ id: '${label.toLowerCase()}', label: '${label}', icon: <Icon${label.replace(/\s+/g, '')} />${badge} }`,
  imports: ['import type { NavRailItem } from "@bighat/ui"'],
  id: 'nav-rail-item',
  metadata: { nestable: true },
};
