// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=49-79
// source=src/components/Toolbar/Toolbar.tsx
// component=Toolbar
import figma from 'figma';
const instance = figma.selectedInstance;

const flush = instance.getEnum('flush', { true: ' flush', false: '' });

export default {
  example: figma.code`<Toolbar ariaLabel="Document board"${flush} end={end}>
  {children}
</Toolbar>`,
  imports: ['import { Toolbar } from "@bighat/ui"'],
  id: 'toolbar',
  metadata: { nestable: true },
};
