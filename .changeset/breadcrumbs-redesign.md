---
'@bighat/ui': minor
---

**Breadcrumbs are redesigned.** The trail was blue underlined links split by
slashes, the browser's default look. It is now quiet wayfinding: links in
`text.secondary` that hover with the ghost Button's `fill.hover` capsule, muted
chevrons, and the current page in `text.primary` at `weight.emphasis`, so it is
marked by weight and not only by the difference between two greys. Every crumb
is at least 24px tall (WCAG 2.5.8).

**The collapsed middle is now reachable.** Past `maxItems`, the ellipsis used
to be an `aria-hidden` span, so those levels could not be reached by pointer,
keyboard or screen reader. It is a button that says how many levels it holds
("Show 3 more levels"); pressing it reveals them and moves focus to the first.
No prop was removed or renamed.
