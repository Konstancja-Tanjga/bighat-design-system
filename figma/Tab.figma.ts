// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=13-565
// source=src/components/Tabs/Tabs.tsx
// component=Tab
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const badge = instance.getBoolean('Badge') ? instance.getString('Count') : '';
// hover is a pointer state; which tab is selected belongs to <Tabs value>.
const disabled = instance.getEnum('State', {
  default: '',
  hover: '',
  selected: '',
  disabled: ' disabled',
});

export default {
  example: figma.code`<Tab id="${label.toLowerCase().replace(/\s+/g, '-')}"${badge ? figma.code` badge={${badge}}` : ''}${disabled}>${label}</Tab>`,
  imports: ['import { Tab } from "@bighat/ui"'],
  id: 'tab',
  metadata: { nestable: true },
};
