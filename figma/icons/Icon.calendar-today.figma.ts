// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=9-74
// source=docs/Iconography.mdx
// component=Icon/calendar-today
import figma from 'figma';

// The package ships no glyphs: Material Symbols draws the icon from its ligature name.
export default {
  example: figma.code`<span className="material-symbols-outlined">calendar_today</span>`,
  id: 'icon-calendar-today',
  metadata: { nestable: true },
};
