---
'@bighat/ui': patch
---

The active `NavList` item gains a leading bar in `selection.mark`, the same one
the `Article` contents and `NavRail` use. Without it, once the 1px ring was
removed, the active item had no cue held to 3:1: `selection.bg` is about
1.1-1.25:1 against the surface, which left weight alone. The NavList, NavRail
and SidePanel docs list the tokens their contracts do.
