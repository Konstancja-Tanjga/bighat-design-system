// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=63-84
// source=src/components/Combobox/Combobox.tsx
// component=Combobox
import figma from 'figma';
const instance = figma.selectedInstance;

// open is the listbox while typing: runtime state, not a prop.
const label = instance.getString('Label');
const placeholder = instance.getString('Placeholder');

export default {
  example: figma.code`<Combobox
  label="${label}"
  placeholder="${placeholder}"
  options={options}
  value={value}
  onChange={setValue}
/>`,
  imports: ['import { Combobox } from "@bighat/ui"'],
  id: 'combobox',
  metadata: { nestable: true },
};
