// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=22-21
// source=src/components/Menu/Menu.tsx
// component=MenuItem
import figma from 'figma';
const instance = figma.selectedInstance;

// An item is data passed to <Menu items>, so the snippet is the item object.
const label = instance.getString('Label');
const shortcut = instance.getBoolean('Show shortcut') ? instance.getString('Shortcut') : '';
const tone = instance.getEnum('tone', { neutral: '', critical: ", tone: 'critical'" });
// active is the highlighted item, a runtime state, not a prop.
const disabled = instance.getEnum('state', {
  default: '',
  active: '',
  disabled: ', disabled: true',
});

export default {
  example: figma.code`{ label: '${label}'${shortcut ? figma.code`, shortcut: '${shortcut}'` : ''}${tone}${disabled}, onSelect }`,
  imports: ['import type { MenuItem } from "@bighat/ui"'],
  id: 'menu-item',
  metadata: { nestable: true },
};
