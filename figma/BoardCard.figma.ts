// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=32-2840
// source=src/components/Board/Board.tsx
// component=BoardCard
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Title');
// hover and dragging are the pointer's; the move control is always there in code.

export default {
  example: figma.code`<BoardCard title="${title}" onOpen={open} moveTargets={columns} onMove={move}>
  {content}
</BoardCard>`,
  imports: ['import { BoardCard } from "@bighat/ui"'],
  id: 'board-card',
  metadata: { nestable: true },
};
