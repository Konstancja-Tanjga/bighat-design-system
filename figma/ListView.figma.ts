// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=61-111
// source=src/components/ListView/ListView.tsx
// component=ListView
import figma from 'figma';

export default {
  example: figma.code`<ListView ariaLabel="Customers" items={customers} value={selected} onChange={setSelected} />`,
  imports: ['import { ListView } from "@bighat/ui"'],
  id: 'list-view',
  metadata: { nestable: true },
};
