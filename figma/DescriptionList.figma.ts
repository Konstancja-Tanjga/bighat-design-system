// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=24-1030
// source=src/components/DescriptionList/DescriptionList.tsx
// component=DescriptionList
import figma from 'figma';
const instance = figma.selectedInstance;

// columns and comfortable are the defaults.
const layout = instance.getEnum('Layout', { rows: ' layout="rows"', columns: '' });
const density = instance.getEnum('Density', { comfortable: '', compact: ' density="compact"' });

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
