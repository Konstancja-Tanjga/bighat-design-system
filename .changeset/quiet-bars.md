---
'@bighat/ui': minor
---

**Toolbar and StatusBar stop drawing grey boxes.** A `Toolbar` is a well of the
translucent `fill.hover`, like `SegmentedControl`'s track, instead of
`surface.sunken` edged with `border.subtle`. The glass controls in it draw their
own edges, so the group needs only enough tint to read as one. A `flush` toolbar
and the `StatusBar` are a `border.hairline` line with no background, the same
line `AppBar` draws beneath itself. No prop was removed or renamed.
