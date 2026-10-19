// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=32-2637
// source=src/components/Table/Table.tsx
// component=Table
import figma from 'figma';
const instance = figma.selectedInstance;

const caption = instance.getString('Caption');
// comfortable is the default density.
const density = instance.getEnum('Density', { comfortable: '', compact: '\n  density="compact"' });
const totals = instance.getBoolean('Totals', {
  true: '\n  totals={(rows) => totalsFor(rows)}',
  false: '',
});

// Columns and rows are data; the snippet shows the props the drawn table uses.
export default {
  example: figma.code`<Table
  caption="${caption}"
  columns={columns}
  rows={rows}
  rowKey={(row) => row.id}
  sort={sort}
  onSortChange={setSort}
  selection={{ selected, onChange: setSelected, label: 'Select all invoices' }}
  rowActions={(row) => actionsFor(row)}${totals}${density}
/>`,
  imports: ['import { Table } from "@bighat/ui"'],
  id: 'table',
  metadata: { nestable: false },
};
