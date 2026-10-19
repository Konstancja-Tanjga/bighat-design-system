// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=11-147
// source=src/components/Avatar/Avatar.tsx
// component=Avatar
import figma from 'figma';
const instance = figma.selectedInstance;

// Figma draws one fixed tone; code derives it from the name (tone="auto"). The tone
// written here pins it, so delete it unless the design needs that exact colour.
// overflow is the "+N" disc AvatarGroup draws itself, so it maps to the group.
const tone = instance.getEnum('Tone', {
  neutral: ' tone="neutral"',
  violet: ' tone="violet"',
  teal: ' tone="teal"',
  plum: ' tone="plum"',
  olive: ' tone="olive"',
  overflow: 'overflow',
});
const size = instance.getEnum('Size', { sm: ' size="sm"', md: '', lg: ' size="lg"' });

export default {
  example:
    tone === 'overflow'
      ? figma.code`<AvatarGroup label="Reviewers" people={people} max={3} />`
      : figma.code`<Avatar name={name}${size}${tone} />`,
  imports: ['import { Avatar, AvatarGroup } from "@bighat/ui"'],
  id: 'avatar',
  metadata: { nestable: true },
};
