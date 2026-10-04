// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=65-58
// source=src/components/Composer/Composer.tsx
// component=Composer
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const hint = instance.getBoolean('Show hint')
  ? figma.code`
  hint="${instance.getString('Hint')}"`
  : '';
const modes = instance.getBoolean('Show modes')
  ? figma.code`
  modes={modes}
  activeMode={mode}
  onModeChange={setMode}`
  : '';
// focus is the browser's; busy is the only state that is a prop.
const busy = instance.getEnum('state', {
  default: '',
  focus: '',
  busy: figma.code`
  busy`,
});

export default {
  example: figma.code`<Composer
  label="${label}"
  placeholder="Ask a question, or describe the change"
  onSubmit={send}${modes}${hint}${busy}
/>`,
  imports: ['import { Composer } from "@bighat/ui"'],
  id: 'composer',
  metadata: { nestable: true },
};
