// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=25-1413
// source=src/components/Combobox/Combobox.tsx
// component=Combobox
import figma from 'figma';
const instance = figma.selectedInstance;

// Open is the listbox while typing: runtime state, not a prop.
const label = instance.getString('Label');
// The drawn text is the empty field's prompt ("Search customers"); a chosen value
// is runtime state, so it is value={value}, not a string.
const placeholder = instance.getString('Value');
const description = instance.getBoolean('Description')
  ? figma.code`
  description="${instance.getString('Description text')}"`
  : '';
const required = instance.getBoolean('Required', { true: ' required', false: '' });

export default {
  example: figma.code`<Combobox
  label="${label}"
  placeholder="${placeholder}"${description}
  options={options}
  value={value}
  onChange={setValue}${required}
/>`,
  imports: ['import { Combobox } from "@bighat/ui"'],
  id: 'combobox',
  metadata: { nestable: true },
};
