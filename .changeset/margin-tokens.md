---
'@bighat/ui': minor
---

Margin tokens. A `margin` group sits beside `gap` and `padding`: `--bh-margin-tight` (4px), `snug` (8px), `normal` (12px), `loose` (16px), `section` (24px) and `hero` (48px). They are the steps component margins already used, under the role they play — the space outside a component, between stacked blocks, and the room a frame leaves around a control so its focus ring and shadow are not clipped. `margin.tight` is that focus-ring clearance: a 2px ring at a 2px offset.

Every `margin` declaration in the component and template CSS that borrowed a gap or padding token now uses the margin token of the same value, so nothing moves. Foundations → Tokens lists the group under Spacing and size, and the Figma library has the same variables.
