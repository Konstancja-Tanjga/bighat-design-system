// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=24-1381
// source=src/components/FileDropzone/FileDropzone.tsx
// component=FileDropzone
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const required = instance.getBoolean('Required', { true: ' required', false: '' });
const description = instance.getBoolean('Description')
  ? figma.code`
  description="${instance.getString('Description text')}"`
  : '';
const prompt = instance.getString('Prompt');
// over and focus are the drag's and the keyboard's, not props.
const state = instance.getEnum('State', {
  default: '',
  over: '',
  focus: '',
  invalid: figma.code`
  error="${instance.getString('Error text')}"`,
  disabled: figma.code`
  disabled`,
});

export default {
  example: figma.code`<FileDropzone
  label="${label}"${description}
  prompt="${prompt}"
  accept="application/pdf,image/*"
  multiple
  onFiles={addFiles}${required}${state}
/>`,
  imports: ['import { FileDropzone } from "@bighat/ui"'],
  id: 'file-dropzone',
  metadata: { nestable: true },
};
