// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=29-2404
// source=src/components/Composer/Composer.tsx
// component=Composer
import figma from 'figma';
const instance = figma.selectedInstance;

const placeholder = instance.getString('Placeholder / value');
const hint = instance.getBoolean('Hint')
  ? figma.code`
  hint="${instance.getString('Hint text')}"`
  : '';
const modes = instance.getBoolean('Modes')
  ? figma.code`
  modes={modes}
  activeMode={mode}
  onModeChange={setMode}`
  : '';
// focus is the browser's; busy and disabled are props.
const state = instance.getEnum('State', {
  default: '',
  focus: '',
  busy: figma.code`
  busy`,
  disabled: figma.code`
  disabled`,
});

export default {
  example: figma.code`<Composer
  label="Ask the assistant"
  placeholder="${placeholder}"
  onSubmit={send}${modes}${hint}${state}
/>`,
  imports: ['import { Composer } from "@bighat/ui"'],
  id: 'composer',
  metadata: { nestable: true },
};
