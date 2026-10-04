// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=41-79
// source=src/components/Card/Card.tsx
// component=Card
import figma from 'figma';
const instance = figma.selectedInstance;

// raised is the default; hover is the clickable card's lift, so it means onClick.
const elevation = instance.getEnum('elevation', {
  raised: '',
  flat: ' elevation="flat"',
  hover: ' onClick={open} ariaLabel="Open"',
});
const accent = instance.getEnum('accent', {
  none: '',
  info: ' accent="info"',
  success: ' accent="success"',
  warning: ' accent="warning"',
  critical: ' accent="critical"',
});
const title = instance.getString('Title');
const body = instance.getString('Body');

export default {
  example: figma.code`<Card${elevation}${accent}>
  <h3>${title}</h3>
  <p>${body}</p>
</Card>`,
  imports: ['import { Card } from "@bighat/ui"'],
  id: 'card',
  metadata: { nestable: true },
};
