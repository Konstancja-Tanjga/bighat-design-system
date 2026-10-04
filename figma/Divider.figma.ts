// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=58-81
// source=src/components/Divider/Divider.tsx
// component=Divider
import figma from 'figma';
const instance = figma.selectedInstance;

// horizontal is the default. spacing is a margin, set in code, not drawn.
const orientation = instance.getEnum('orientation', {
  horizontal: '',
  vertical: ' orientation="vertical"',
});
const labelled = instance.getEnum('label', { true: true, false: false });
const label = labelled ? instance.getString('Label') : '';

export default {
  example: labelled
    ? figma.code`<Divider${orientation}>${label}</Divider>`
    : figma.code`<Divider${orientation} />`,
  imports: ['import { Divider } from "@bighat/ui"'],
  id: 'divider',
  metadata: { nestable: true },
};
