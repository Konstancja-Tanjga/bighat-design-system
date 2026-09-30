---
'@bighat/ui': patch
---

`StateBlock` (loading and error) and `SkeletonGroup` are now heard when they
appear. Their live region used to mount with its words already inside it -
which most screen readers do not announce - and with `aria-busy="true"`, which
tells assistive technology to hold announcements back and was never cleared.
The region now mounts empty and receives its content one render later, and
`aria-busy` is gone. Skeleton bones still draw at once; a StateBlock's content
appears one frame after its box. The empty state is not a live region and is
unchanged.
