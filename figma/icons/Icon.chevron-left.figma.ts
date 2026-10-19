// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=9-23
// source=docs/Iconography.mdx
// component=Icon/chevron-left
import figma from 'figma';

// The package ships no glyphs: Material Symbols draws the icon from its ligature name.
export default {
  example: figma.code`<span className="material-symbols-outlined">chevron_left</span>`,
  id: 'icon-chevron-left',
  metadata: { nestable: true },
};
