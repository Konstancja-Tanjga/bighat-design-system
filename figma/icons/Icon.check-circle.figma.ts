// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=9-38
// source=docs/Iconography.mdx
// component=Icon/check-circle
import figma from 'figma';

// The package ships no glyphs: Material Symbols draws the icon from its ligature name.
export default {
  example: figma.code`<span className="material-symbols-outlined">check_circle</span>`,
  id: 'icon-check-circle',
  metadata: { nestable: true },
};
