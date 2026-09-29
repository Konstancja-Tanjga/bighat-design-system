---
'@bighat/ui': patch
---

The Foundations/Tokens docs page renders again. Its contrast table measured
every declared pair with `contrastRatio`, which only accepts opaque hex, so the
pairs on a translucent background (`fill.hover` over a surface) threw and took
the whole page down. The table now composites them with `compositeOver`, as the
contrast gate does, and names the surface underneath ("… over surface.raised").
