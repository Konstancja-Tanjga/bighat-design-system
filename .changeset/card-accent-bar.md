---
'@bighat/ui': patch
---

`Card`'s accent is a straight capsule bar beside the content instead of an edge
stripe. Since 4.2's 20px corner the stripe bent with the curve and read as a
crescent. The bar runs the height of the content, keeps its length on a short
`snug` card, and an accented card now takes section padding on its leading side
so the bar never crowds the text. In forced-colours mode, where the old inset
shadow disappeared, the bar is drawn in the system text colour.
