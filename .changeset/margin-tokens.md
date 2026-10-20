---
'@bighat/ui': minor
---

Margin tokens. A `margin` group sits beside `gap` and `padding`: `--bh-margin-tight` (4px), `snug` (8px), `normal` (12px), `loose` (16px), `section` (24px) and `hero` (48px). They are the steps component margins already used, under the role they play — the space outside a component, between stacked blocks, and the room a frame leaves around a control so its focus ring and shadow are not clipped. `margin.tight` is also the focus ring's clearance: a 2px ring at a 2px offset.

Margin declarations in the component and template CSS that borrowed a gap or padding step now use the margin token of the same value, so nothing moves. Margins inside `calc()` and the 2px `gap.hairline` margins stay as they were: the margin group has no 2px step. Foundations → Tokens lists the group under Spacing and size, the drift audit and the token codemod accept and suggest `--bh-margin-*` for margins, and the Figma library has the same variables in its Spacing & size collection.
