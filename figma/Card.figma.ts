// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=15-849
// source=src/components/Card/Card.tsx
// component=Card
import figma from 'figma';
const instance = figma.selectedInstance;

// raised is the default; hover is the clickable card's lift, so it means onClick.
const elevation = instance.getEnum('Elevation', { raised: '', flat: ' elevation="flat"' });
const clickable = instance.getEnum('State', {
  default: '',
  hover: ' onClick={open} ariaLabel="Open"',
});
const accent = instance.getEnum('Accent', {
  none: '',
  info: ' accent="info"',
  success: ' accent="success"',
  warning: ' accent="warning"',
  critical: ' accent="critical"',
});
const actions = instance.getBoolean('Actions', { true: ' actions={actions}', false: '' });
const title = instance.getString('Title');
const body = instance.getString('Body');

export default {
  example: figma.code`<Card${elevation}${accent}${clickable}${actions}>
  <h3>${title}</h3>
  <p>${body}</p>
</Card>`,
  imports: ['import { Card } from "@bighat/ui"'],
  id: 'card',
  metadata: { nestable: true },
};
