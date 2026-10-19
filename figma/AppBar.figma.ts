// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=29-1659
// source=src/components/AppBar/AppBar.tsx
// component=AppBar
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Title');
const center = instance.getBoolean('Center', {
  true: '\n  center={<Breadcrumbs items={trail} />}',
  false: '',
});

export default {
  example: figma.code`<AppBar
  brand={brand}
  title="${title}"${center}
  actions={actions}
/>`,
  imports: ['import { AppBar } from "@bighat/ui"'],
  id: 'app-bar',
  metadata: { nestable: false },
};
