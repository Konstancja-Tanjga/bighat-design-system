// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=9-32
// source=docs/Iconography.mdx
// component=Icon/error
import figma from 'figma';

// The package ships no glyphs: Material Symbols draws the icon from its ligature name.
export default {
  example: figma.code`<span className="material-symbols-outlined">error</span>`,
  id: 'icon-error',
  metadata: { nestable: true },
};
