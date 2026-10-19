// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=24-944
// source=src/components/UserProfile/UserProfile.tsx
// component=UserProfile
import figma from 'figma';
const instance = figma.selectedInstance;

const name = instance.getString('Name');
const secondary = instance.getString('Secondary');
const compact = instance.getEnum('Compact', { false: '', true: ' compact' });
const badge = instance.getBoolean('Badge', { true: ' badge={badge}', false: '' });

export default {
  // The caret is drawn because it is a Menu trigger: items are its account actions.
  example: figma.code`<UserProfile name="${name}" secondary="${secondary}"${compact}${badge} items={items} />`,
  imports: ['import { UserProfile } from "@bighat/ui"'],
  id: 'user-profile',
  metadata: { nestable: true },
};
