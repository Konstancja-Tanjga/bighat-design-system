// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=25-1352
// source=src/components/Combobox/Combobox.tsx
// component=ComboboxOption
import figma from 'figma';
const instance = figma.selectedInstance;

// An option is one entry of <Combobox options>. active and selected are runtime state.
const label = instance.getString('Label');
const hint = instance.getBoolean('Hint')
  ? figma.code`, hint: '${instance.getString('Hint text')}'`
  : '';

export default {
  example: figma.code`{ value: 'fabrikam', label: '${label}'${hint} }`,
  imports: ['import type { ComboboxOption } from "@bighat/ui"'],
  id: 'combobox-option',
  metadata: { nestable: true },
};
