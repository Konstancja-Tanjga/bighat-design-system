// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=65-174
// source=src/components/Board/Board.tsx
// component=Board
import figma from 'figma';

// Columns and cards render through BoardColumn.figma.ts and BoardCard.figma.ts.
export default {
  example: figma.code`<Board ariaLabel="Renewals" announcement={announcement}>
  {columns.map((column) => (
    <BoardColumn key={column.id} title={column.title} count={column.cards.length} limit={column.limit}>
      {column.cards.map((card) => (
        <BoardCard key={card.id} title={card.title} moveTargets={targets} onMove={(to) => move(card, to)} onOpen={() => open(card)}>
          {card.content}
        </BoardCard>
      ))}
    </BoardColumn>
  ))}
</Board>`,
  imports: ['import { Board, BoardCard, BoardColumn } from "@bighat/ui"'],
  id: 'board',
  metadata: { nestable: false },
};
