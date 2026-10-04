// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=42-33
// source=src/components/Avatar/Avatar.tsx
// component=Avatar
import figma from 'figma';
const instance = figma.selectedInstance;

// In code the tone is derived from the name (tone="auto"); pass one only to pin it.
const tone = instance.getEnum('tone', {
  neutral: ' tone="neutral"',
  violet: ' tone="violet"',
  teal: ' tone="teal"',
  plum: ' tone="plum"',
  olive: ' tone="olive"',
});
const size = instance.getEnum('size', { sm: ' size="sm"', md: '', lg: ' size="lg"' });

export default {
  example: figma.code`<Avatar name={name}${size}${tone} />`,
  imports: ['import { Avatar } from "@bighat/ui"'],
  id: 'avatar',
  metadata: { nestable: true },
};
