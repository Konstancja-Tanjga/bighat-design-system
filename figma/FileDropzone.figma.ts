// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=64-32
// source=src/components/FileDropzone/FileDropzone.tsx
// component=FileDropzone
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const description = instance.getBoolean('Show description')
  ? figma.code`
  description="${instance.getString('Description')}"`
  : '';
const prompt = instance.getString('Prompt');
// over and focus are the drag's and the keyboard's, not props.
const state = instance.getEnum('state', {
  default: '',
  over: '',
  focus: '',
  invalid: figma.code`
  error={error}`,
  disabled: figma.code`
  disabled`,
});

export default {
  example: figma.code`<FileDropzone
  label="${label}"${description}
  prompt="${prompt}"
  accept="application/pdf,image/*"
  multiple
  onFiles={addFiles}${state}
/>`,
  imports: ['import { FileDropzone } from "@bighat/ui"'],
  id: 'file-dropzone',
  metadata: { nestable: true },
};
