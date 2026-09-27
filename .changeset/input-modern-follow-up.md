---
'@bighat/ui': patch
---

Corrects the field states from the modern outline. An invalid field keeps its
critical edge under focus, where focus used to turn it green at the moment the
reader tabbed in to fix it. In forced colours, which repaint every edge alike
and drop the background, an invalid field's edge is dashed. The error icon's
height has a fallback for engines without the `lh` unit. `Skeleton` gains
`radius="field"` to match the new field corner.
