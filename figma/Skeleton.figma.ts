// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=11-214
// source=src/components/Skeleton/Skeleton.tsx
// component=Skeleton
import figma from 'figma';
const instance = figma.selectedInstance;

// control is the default radius in code.
const radius = instance.getEnum('Radius', {
  control: '',
  field: ' radius="field"',
  surface: ' radius="surface"',
  pill: ' radius="pill"',
});

export default {
  // Always inside a <SkeletonGroup label="Loading …">, which carries the one announcement.
  example: figma.code`<Skeleton width="60%" height={12}${radius} />`,
  imports: ['import { Skeleton } from "@bighat/ui"'],
  id: 'skeleton',
  metadata: { nestable: true },
};
