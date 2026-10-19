// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=25-1413
// source=src/components/Combobox/Combobox.tsx
// component=Combobox
import figma from 'figma';
const instance = figma.selectedInstance;

// Open is the listbox while typing: runtime state, not a prop.
const label = instance.getString('Label');
const placeholder = instance.getString('Value');

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
