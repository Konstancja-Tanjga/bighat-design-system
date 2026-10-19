// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=25-1283
// source=src/components/ListView/ListView.tsx
// component=ListView
import figma from 'figma';

export default {
  example: figma.code`<ListView ariaLabel="Customers" items={customers} value={selected} onChange={setSelected} />`,
  imports: ['import { ListView } from "@bighat/ui"'],
  id: 'list-view',
  metadata: { nestable: true },
};
