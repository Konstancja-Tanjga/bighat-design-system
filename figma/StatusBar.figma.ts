// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=49-80
// source=src/components/StatusBar/StatusBar.tsx
// component=StatusBar
import figma from 'figma';
const instance = figma.selectedInstance;

const message = instance.getString('Message');

export default {
  example: figma.code`<StatusBar
  items={[
    { label: 'Documents', value: count },
    { label: 'Owner', value: owner },
  ]}
  message="${message}"
  end={end}
/>`,
  imports: ['import { StatusBar } from "@bighat/ui"'],
  id: 'status-bar',
  metadata: { nestable: true },
};
