// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=65-59
// source=src/components/Board/Board.tsx
// component=BoardCard
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Title');

export default {
  example: figma.code`<BoardCard title="${title}" onOpen={open} moveTargets={columns} onMove={move}>
  {content}
</BoardCard>`,
  imports: ['import { BoardCard } from "@bighat/ui"'],
  id: 'board-card',
  metadata: { nestable: true },
};
