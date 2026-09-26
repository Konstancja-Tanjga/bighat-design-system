---
'@bighat/ui': patch
---

The hover on a secondary `Button` fades in instead of jumping. The tint is an
overlay whose opacity transitions, and the lifted shadow keeps the resting
layers so the browser can interpolate between the two.
