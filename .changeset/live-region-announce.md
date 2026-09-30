---
'@bighat/ui': patch
---

`StateBlock` (loading and error) and `SkeletonGroup` are now heard when they
appear. Their live region used to mount with its words already inside it,
which most screen readers do not announce, and with `aria-busy="true"`, which
tells assistive technology to hold announcements back and was never cleared.
The visible content still renders at once, so nothing shifts and server-rendered
markup keeps its text. The words are now spoken from a visually hidden region:
a status region mounts empty and fills after the first paint, and an error is
inserted as an alert with its words. The region is keyed by state, so a
StateBlock that goes from loading to error and back announces each step.
`aria-busy` is gone. The empty state is not a live region and is unchanged.
