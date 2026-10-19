// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=9-44
// source=docs/Iconography.mdx
// component=Icon/add
import figma from 'figma';

// The package ships no glyphs: Material Symbols draws the icon from its ligature name.
export default {
  example: figma.code`<span className="material-symbols-outlined">add</span>`,
  id: 'icon-add',
  metadata: { nestable: true },
};
