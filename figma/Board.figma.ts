// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=32-2841
// source=src/components/Board/Board.tsx
// component=Board
import figma from 'figma';

// Columns are drawn as frames in Figma and are BoardColumn in code; cards render
// through BoardCard.figma.ts.
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
