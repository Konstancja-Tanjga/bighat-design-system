// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=42-34
// source=src/components/Avatar/Avatar.tsx
// component=AvatarGroup
import figma from 'figma';

export default {
  example: figma.code`<AvatarGroup label="Reviewers" people={people} max={3} />`,
  imports: ['import { AvatarGroup } from "@bighat/ui"'],
  id: 'avatar-group',
  metadata: { nestable: true },
};
