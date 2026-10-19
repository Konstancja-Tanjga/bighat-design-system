// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=25-1475
// source=src/components/IconPicker/IconPicker.tsx
// component=IconPicker
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const searchable = instance.getBoolean('Searchable', { true: '', false: ' searchable={false}' });

// The icons are data; each needs a name a screen reader can say.
export default {
  example: figma.code`<IconPicker label="${label}" icons={icons} value={icon} onChange={setIcon}${searchable} />`,
  imports: ['import { IconPicker } from "@bighat/ui"'],
  id: 'icon-picker',
  metadata: { nestable: true },
};
