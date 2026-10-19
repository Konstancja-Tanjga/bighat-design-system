// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=9-53
// source=docs/Iconography.mdx
// component=Icon/download
import figma from 'figma';

// The package ships no glyphs: Material Symbols draws the icon from its ligature name.
export default {
  example: figma.code`<span className="material-symbols-outlined">download</span>`,
  id: 'icon-download',
  metadata: { nestable: true },
};
