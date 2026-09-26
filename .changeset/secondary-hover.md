---
'@bighat/ui': patch
---

A hovered secondary `Button` and `Menu` trigger now tint the glass with
`fill.hover` and lift to `elevation.floating`. The thicker material used before
was invisible on a white page, so hover showed no change at all. A pressed
critical primary button stays red instead of turning green.
