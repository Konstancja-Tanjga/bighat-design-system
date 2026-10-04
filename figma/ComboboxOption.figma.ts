// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=63-21
// source=src/components/Combobox/Combobox.tsx
// component=Combobox
import figma from 'figma';
const instance = figma.selectedInstance;

// An option is one entry of <Combobox options>. active and selected are runtime state.
const label = instance.getString('Label');
const hint = instance.getBoolean('Show hint')
  ? figma.code`, hint: '${instance.getString('Hint')}'`
  : '';

export default {
  example: figma.code`{ value: 'fabrikam', label: '${label}'${hint} }`,
  imports: ['import type { ComboboxOption } from "@bighat/ui"'],
  id: 'combobox-option',
  metadata: { nestable: true },
};
