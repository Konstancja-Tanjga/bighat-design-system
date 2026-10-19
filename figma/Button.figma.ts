// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=10-382
// source=src/components/Button/Button.tsx
// component=Button
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
// primary, neutral and md are the defaults in code, so they are left out of the snippet.
const variant = instance.getEnum('Variant', {
  primary: '',
  secondary: ' variant="secondary"',
  ghost: ' variant="ghost"',
});
const tone = instance.getEnum('Tone', { neutral: '', critical: ' tone="critical"' });
const size = instance.getEnum('Size', {
  sm: ' size="sm"',
  md: '',
  lg: ' size="lg"',
});
// hover is a pointer state, not a prop.
const disabled = instance.getEnum('State', {
  default: '',
  hover: '',
  disabled: ' disabled',
});
const loading = instance.getBoolean('Loading', { true: ' loading', false: '' });
// Icons are decorative slots; each icon renders through its own template.
const start = instance.getBoolean('Icon start')
  ? instance.getInstanceSwap('Icon start ↳ icon')
  : null;
const end = instance.getBoolean('Icon end') ? instance.getInstanceSwap('Icon end ↳ icon') : null;
const iconStart =
  start && start.type === 'INSTANCE'
    ? figma.code` iconStart={${start.executeTemplate().example}}`
    : '';
const iconEnd =
  end && end.type === 'INSTANCE' ? figma.code` iconEnd={${end.executeTemplate().example}}` : '';

export default {
  example: figma.code`<Button${variant}${tone}${size}${loading}${disabled}${iconStart}${iconEnd}>${label}</Button>`,
  imports: ['import { Button } from "@bighat/ui"'],
  id: 'button',
  metadata: { nestable: true },
};
