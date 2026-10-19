// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=29-1891
// source=src/components/NavRail/NavRail.tsx
// component=NavRail
import figma from 'figma';
const instance = figma.selectedInstance;

// The items are data; each Figma item maps through NavRailItem.figma.ts.
// Labels is showLabels, true by default.
const labels = instance.getEnum('Labels', { true: '', false: '\n  showLabels={false}' });

export default {
  example: figma.code`<NavRail
  ariaLabel="Product areas"
  items={items}
  footerItems={footerItems}
  activeId={activeId}
  onSelect={setActiveId}${labels}
/>`,
  imports: ['import { NavRail } from "@bighat/ui"'],
  id: 'nav-rail',
  metadata: { nestable: true },
};
