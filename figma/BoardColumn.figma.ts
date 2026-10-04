// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=65-173
// source=src/components/Board/Board.tsx
// component=BoardColumn
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Title');
const limit = instance.getEnum('over limit', { false: '', true: ' limit={3}' });

export default {
  example: figma.code`<BoardColumn title="${title}" count={cards.length}${limit}>
  {cards.map((card) => (
    <BoardCard key={card.id} title={card.title} onOpen={() => open(card)} moveTargets={columns} onMove={(to) => move(card, to)}>
      {card.content}
    </BoardCard>
  ))}
</BoardColumn>`,
  imports: ['import { BoardCard, BoardColumn } from "@bighat/ui"'],
  id: 'board-column',
  metadata: { nestable: true },
};
