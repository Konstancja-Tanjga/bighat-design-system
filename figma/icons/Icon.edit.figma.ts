// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=9-65
// source=docs/Iconography.mdx
// component=Icon/edit
import figma from 'figma';

// The package ships no glyphs: Material Symbols draws the icon from its ligature name.
export default {
  example: figma.code`<span className="material-symbols-outlined">edit</span>`,
  id: 'icon-edit',
  metadata: { nestable: true },
};
