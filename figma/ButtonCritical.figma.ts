// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=6-165
// source=src/components/Button/Button.tsx
// component=Button
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
// primary and md are the defaults in code, so they are left out of the snippet.
const variant = instance.getEnum('variant', {
  primary: '',
  secondary: ' variant="secondary"',
  ghost: ' variant="ghost"',
});
const size = instance.getEnum('size', {
  sm: ' size="sm"',
  md: '',
  lg: ' size="lg"',
});
// hover is a pointer state, not a prop.
const disabled = instance.getEnum('state', {
  default: '',
  hover: '',
  disabled: ' disabled',
});
const loading = instance.getBoolean('Loading', { true: ' loading', false: '' });

export default {
  example: figma.code`<Button${variant} tone="critical"${size}${loading}${disabled}>${label}</Button>`,
  imports: ['import { Button } from "@bighat/ui"'],
  id: 'button-critical',
  metadata: { nestable: true },
};
