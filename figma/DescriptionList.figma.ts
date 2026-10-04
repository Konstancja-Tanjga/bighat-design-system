// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=59-156
// source=src/components/DescriptionList/DescriptionList.tsx
// component=DescriptionList
import figma from 'figma';
const instance = figma.selectedInstance;

// rows and comfortable are the defaults.
const layout = instance.getEnum('layout', { rows: '', columns: ' layout="columns"' });
const density = instance.getEnum('density', { comfortable: '', compact: ' density="compact"' });

// The pairs are data; the snippet shows their shape.
export default {
  example: figma.code`<DescriptionList${layout}${density}
  items={[
    { term: 'Customer', value: 'Fabrikam Energy' },
    { term: 'Invoice', value: 'INV-2043' },
  ]}
/>`,
  imports: ['import { DescriptionList } from "@bighat/ui"'],
  id: 'description-list',
  metadata: { nestable: true },
};
