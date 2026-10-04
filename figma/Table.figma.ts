// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=51-101
// source=src/components/Table/Table.tsx
// component=Table
import figma from 'figma';

// Columns and rows are data; the snippet shows the props the drawn table uses.
export default {
  example: figma.code`<Table
  caption="Invoices"
  hideCaption
  columns={columns}
  rows={rows}
  rowKey={(row) => row.id}
  sort={sort}
  onSortChange={setSort}
  selection={{ selected, onChange: setSelected, label: 'Select all invoices' }}
  rowActions={(row) => actionsFor(row)}
  totals={(rows) => totalsFor(rows)}
/>`,
  imports: ['import { Table } from "@bighat/ui"'],
  id: 'table',
  metadata: { nestable: false },
};
