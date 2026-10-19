// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=9-14
// source=docs/Iconography.mdx
// component=Icon/expand-more
import figma from 'figma';

// The package ships no glyphs: Material Symbols draws the icon from its ligature name.
export default {
  example: figma.code`<span className="material-symbols-outlined">expand_more</span>`,
  id: 'icon-expand-more',
  metadata: { nestable: true },
};
