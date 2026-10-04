// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=48-26
// source=src/components/NavRail/NavRail.tsx
// component=NavRail
import figma from 'figma';

// The items are data; each Figma item maps through NavRailItem.figma.ts.
export default {
  example: figma.code`<NavRail
  ariaLabel="Product areas"
  items={items}
  footerItems={footerItems}
  activeId={activeId}
  onSelect={setActiveId}
/>`,
  imports: ['import { NavRail } from "@bighat/ui"'],
  id: 'nav-rail',
  metadata: { nestable: true },
};
