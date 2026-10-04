// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=61-28
// source=src/components/NavList/NavList.tsx
// component=NavList
import figma from 'figma';

// Groups and items are data the product holds; one item is NavItem.figma.ts.
export default {
  example: figma.code`<NavGroup label="Workspace">
  <NavList>
    {items.map((item) => (
      <NavItem key={item.id} item={item} active={item.id === current} onSelect={go} />
    ))}
  </NavList>
</NavGroup>`,
  imports: ['import { NavGroup, NavItem, NavList } from "@bighat/ui"'],
  id: 'nav-list',
  metadata: { nestable: true },
};
