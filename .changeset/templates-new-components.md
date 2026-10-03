---
'@bighat/ui': major
---

`Table` row actions are a round `⋯` icon button named after its row ("Actions
for INV-2046") instead of a "Row actions" capsule in every row. A new
`rowLabel` prop supplies the row's name; it defaults to `rowKey`. Tests that
found the trigger by "Row actions" need the new name (see MIGRATION.md).

`Pagination` lays its page-size control out inline as intended (the label had
been stacking above the box) and lists plain numbers, since the label already
says "Per page". `Composer`'s field gets the same edge as every other text
field: the control shadow, and a hover and focus that change the border.
