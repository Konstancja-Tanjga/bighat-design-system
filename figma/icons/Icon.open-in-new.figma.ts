// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=9-80
// source=docs/Iconography.mdx
// component=Icon/open-in-new
import figma from 'figma';

// The package ships no glyphs: Material Symbols draws the icon from its ligature name.
export default {
  example: figma.code`<span className="material-symbols-outlined">open_in_new</span>`,
  id: 'icon-open-in-new',
  metadata: { nestable: true },
};
