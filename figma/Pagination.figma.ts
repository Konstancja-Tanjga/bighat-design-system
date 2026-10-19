// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=15-1216
// source=src/components/Pagination/Pagination.tsx
// component=Pagination
import figma from 'figma';
const instance = figma.selectedInstance;

const sizeControl = instance.getBoolean('Page size', {
  true: '\n  pageSizeOptions={[5, 10, 25]}\n  onPageSizeChange={setPageSize}',
  false: '',
});

export default {
  example: figma.code`<Pagination
  page={page}
  pageSize={pageSize}
  total={total}
  unit="invoices"
  onPageChange={setPage}${sizeControl}
/>`,
  imports: ['import { Pagination } from "@bighat/ui"'],
  id: 'pagination',
  metadata: { nestable: true },
};
