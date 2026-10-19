// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=11-191
// source=src/components/Divider/Divider.tsx
// component=Divider
import figma from 'figma';
const instance = figma.selectedInstance;

// horizontal is the default. spacing is a margin, set in code, not drawn.
const orientation = instance.getEnum('Orientation', {
  horizontal: '',
  vertical: ' orientation="vertical"',
});
const labelled = instance.getEnum('Labelled', { true: true, false: false });
const label = labelled ? instance.getString('Label') : '';

export default {
  example: labelled
    ? figma.code`<Divider${orientation}>${label}</Divider>`
    : figma.code`<Divider${orientation} />`,
  imports: ['import { Divider } from "@bighat/ui"'],
  id: 'divider',
  metadata: { nestable: true },
};
