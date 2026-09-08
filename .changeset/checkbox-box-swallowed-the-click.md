---
'@bighat/ui': patch
---

**`Checkbox` could not be clicked where its label is visually hidden.**

The drawn box is decorative and the real input is positioned over it, so that
the platform's control receives the pointer — that is what the comment on
`.bh-checkbox__input` has always claimed. It was not what the stack did:
`.bh-checkbox__box` comes later in the DOM, is itself positioned, and so
painted on top and swallowed every click.

A checkbox with a visible label hid the bug, because the label still worked. It
surfaced only where the label has no hit area, which is exactly how `Table`
renders its selection column — so **row selection in a table was operable by
keyboard and not by mouse.**

The box now takes `pointer-events: none`. `aria-hidden` decoration has no
business receiving pointer events in either case, and the fix needs no z-index,
so it does not touch the `layer` scale.

Found by building bulk selection in a product against the library:
`Konstancja-Tanjga/Docu-Manager`. A regression test now asserts the contract
the CSS has to keep — a click anywhere in the control toggles it — because
jsdom applies no CSS and could not have caught the original defect.
