// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=22-34
// source=src/components/Menu/Menu.tsx
// component=Menu
import figma from 'figma';
const instance = figma.selectedInstance;

// The trigger is the Menu component: its label is the button's text, and the
// items come from the Menu / List next to it.
const label = instance.getString('Label');

export default {
  example: figma.code`<Menu label="${label}" items={items} />`,
  imports: ['import { Menu } from "@bighat/ui"'],
  id: 'menu',
  metadata: { nestable: true },
};
