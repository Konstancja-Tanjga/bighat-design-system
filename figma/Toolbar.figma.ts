// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=29-1550
// source=src/components/Toolbar/Toolbar.tsx
// component=Toolbar
import figma from 'figma';
const instance = figma.selectedInstance;

const flush = instance.getEnum('Variant', { default: '', flush: ' flush' });
const orientation = instance.getEnum('Orientation', {
  horizontal: '',
  vertical: ' orientation="vertical"',
});

export default {
  example: figma.code`<Toolbar ariaLabel="Document board"${flush}${orientation} end={end}>
  {children}
</Toolbar>`,
  imports: ['import { Toolbar } from "@bighat/ui"'],
  id: 'toolbar',
  metadata: { nestable: true },
};
