// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=29-1621
// source=src/components/StatusBar/StatusBar.tsx
// component=StatusBar
import figma from 'figma';
const instance = figma.selectedInstance;

const message = instance.getString('Message');
const end = instance.getBoolean('End', { true: '\n  end={end}', false: '' });

export default {
  example: figma.code`<StatusBar
  items={[
    { label: 'Documents', value: count },
    { label: 'Owner', value: owner },
  ]}
  message="${message}"${end}
/>`,
  imports: ['import { StatusBar } from "@bighat/ui"'],
  id: 'status-bar',
  metadata: { nestable: true },
};
