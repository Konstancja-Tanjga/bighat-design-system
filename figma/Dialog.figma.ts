// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=15-1605
// source=src/components/Dialog/Dialog.tsx
// component=Dialog
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Title');
const description = instance.getBoolean('Description')
  ? instance.getString('Description text')
  : '';
// md is the default in code, so it is left out of the snippet.
const size = instance.getEnum('Size', { sm: ' size="sm"', md: '', lg: ' size="lg"' });
const dismissible = instance.getBoolean('Dismissible', {
  true: '',
  false: '\n  dismissible={false}',
});

export default {
  example: figma.code`<Dialog
  open={open}
  onClose={close}
  title="${title}"${
    description
      ? figma.code`
  description="${description}"`
      : ''
  }${size}${dismissible}
  footer={footer}
>
  {children}
</Dialog>`,
  imports: ['import { Dialog } from "@bighat/ui"'],
  id: 'dialog',
  metadata: { nestable: false },
};
