---
'@bighat/ui': minor
---

**`Composer` shows its label.** It was always visually hidden, which broke the
rule every other form control keeps (SKILL.md rule 6), and the ARIA audit
marked Composer as failing for it. The label is now a field label above the
box, the same as on `Input` and `Textarea`. `hideLabel` is the explicit
exception for a chat box whose context names it; the placeholder must then
repeat the label word for word (WCAG 2.5.3), and a development warning says so
when it does not. `Templates/AI Chat` uses `hideLabel` with a matching
placeholder.

This is a visible change: a Composer without `hideLabel` gains a label line
above the field.
