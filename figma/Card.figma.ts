// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=15-849
// source=src/components/Card/Card.tsx
// component=Card
import figma from 'figma';
const instance = figma.selectedInstance;

// raised is the default; hover is the clickable card's lift, so it means onClick.
const elevation = instance.getEnum('Elevation', { raised: '', flat: ' elevation="flat"' });
const isClickable = instance.getEnum('State', { default: false, hover: true });
const clickable = isClickable ? ' onClick={open} ariaLabel="Open"' : '';
const accent = instance.getEnum('Accent', {
  none: '',
  info: ' accent="info"',
  success: ' accent="success"',
  warning: ' accent="warning"',
  critical: ' accent="critical"',
});
// A card that is a button cannot hold buttons: in code onClick and actions exclude
// each other, so a clickable card drops the drawn actions row.
const actions = !isClickable && instance.getBoolean('Actions') ? ' actions={actions}' : '';
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
