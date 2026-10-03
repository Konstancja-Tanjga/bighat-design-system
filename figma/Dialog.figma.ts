// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=32-93
// source=src/components/Dialog/Dialog.tsx
// component=Dialog
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Title');
const description = instance.getBoolean('Show description')
  ? instance.getString('Description')
  : '';
// md is the default in code, so it is left out of the snippet.
const size = instance.getEnum('size', { sm: ' size="sm"', md: '', lg: ' size="lg"' });

export default {
  example: figma.code`<Dialog
  open={open}
  onClose={close}
  title="${title}"${
    description
      ? figma.code`
  description="${description}"`
      : ''
  }${size}
  footer={footer}
>
  {children}
</Dialog>`,
  imports: ['import { Dialog } from "@bighat/ui"'],
  id: 'dialog',
  metadata: { nestable: false },
};
