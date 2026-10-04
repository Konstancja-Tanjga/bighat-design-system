// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=42-59
// source=src/components/UserProfile/UserProfile.tsx
// component=UserProfile
import figma from 'figma';
const instance = figma.selectedInstance;

const name = instance.getString('Name');
const secondary = instance.getString('Secondary');
// With items it is a Menu trigger and shows a caret.
const menu = instance.getBoolean('Menu', { true: ' items={items}', false: '' });

export default {
  example: figma.code`<UserProfile name="${name}" secondary="${secondary}"${menu} />`,
  imports: ['import { UserProfile } from "@bighat/ui"'],
  id: 'user-profile',
  metadata: { nestable: true },
};
