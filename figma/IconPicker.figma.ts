// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=64-46
// source=src/components/IconPicker/IconPicker.tsx
// component=IconPicker
import figma from 'figma';

// The icons are data; each needs a name a screen reader can say.
export default {
  example: figma.code`<IconPicker label="Board icon" icons={icons} value={icon} onChange={setIcon} />`,
  imports: ['import { IconPicker } from "@bighat/ui"'],
  id: 'icon-picker',
  metadata: { nestable: true },
};
