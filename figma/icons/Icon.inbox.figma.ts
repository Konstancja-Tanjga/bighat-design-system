// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=9-62
// source=docs/Iconography.mdx
// component=Icon/inbox
import figma from 'figma';

// The package ships no glyphs: Material Symbols draws the icon from its ligature name.
export default {
  example: figma.code`<span className="material-symbols-outlined">inbox</span>`,
  id: 'icon-inbox',
  metadata: { nestable: true },
};
