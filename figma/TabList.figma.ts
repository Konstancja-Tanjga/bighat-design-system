// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=30-542
// source=src/components/Tabs/Tabs.tsx
// component=Tabs
import figma from 'figma';
const instance = figma.selectedInstance;

// The tabs inside the list render through their own template.
const tabs = instance.findConnectedInstances((node) => node.codeConnectId() === 'tab');
const first = tabs[0] && tabs[0].type === 'INSTANCE' ? tabs[0].executeTemplate().example : '';
const second = tabs[1] && tabs[1].type === 'INSTANCE' ? tabs[1].executeTemplate().example : '';
const third = tabs[2] && tabs[2].type === 'INSTANCE' ? tabs[2].executeTemplate().example : '';

export default {
  example: figma.code`<Tabs>
  <TabList ariaLabel="Views">
    ${first}
    ${second}
    ${third}
  </TabList>
</Tabs>`,
  imports: ['import { Tab, TabList, Tabs } from "@bighat/ui"'],
  id: 'tabs',
  metadata: { nestable: false },
};
