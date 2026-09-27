---
'@bighat/ui': minor
---

**`Card` gains an `actions` slot.** The card's own actions render as a row at
the foot of the card, aligned to the trailing edge, primary last. The card
becomes a column so the row sits at the foot, and cards in a grid row line
their actions up however long their content runs. Passing `actions` together
with `onClick` is a type error: a card that is a button cannot hold buttons.

The Card docs gain an **Anatomy and order** section: accent, title, status,
content, then actions, with the rules for keeping actions inside the card,
aligning them across a row, and one primary that goes last.
