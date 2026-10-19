// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=15-1474
// source=src/components/Menu/Menu.tsx
// component=Menu
import figma from 'figma';
const instance = figma.selectedInstance;

// The trigger label is the button's text; the items are data, one per MenuItem.
// Open is runtime state, not a prop.
const label = instance.getString('Trigger label');

export default {
  example: figma.code`<Menu label="${label}" items={items} />`,
  imports: ['import { Menu } from "@bighat/ui"'],
  id: 'menu',
  metadata: { nestable: true },
};
