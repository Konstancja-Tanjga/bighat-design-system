// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=15-1473
// source=src/components/Menu/Menu.tsx
// component=MenuItem
import figma from 'figma';
const instance = figma.selectedInstance;

// An item is data passed to <Menu items>, so the snippet is the item object.
const label = instance.getString('Label');
const shortcut = instance.getBoolean('Shortcut') ? instance.getString('Shortcut text') : '';
const tone = instance.getEnum('Tone', { neutral: '', critical: ", tone: 'critical'" });
// focus is the highlighted item, a runtime state, not a prop.
const disabled = instance.getEnum('State', {
  default: '',
  focus: '',
  disabled: ', disabled: true',
});

export default {
  example: figma.code`{ label: '${label}'${shortcut ? figma.code`, shortcut: '${shortcut}'` : ''}${tone}${disabled}, onSelect }`,
  imports: ['import type { MenuItem } from "@bighat/ui"'],
  id: 'menu-item',
  metadata: { nestable: true },
};
