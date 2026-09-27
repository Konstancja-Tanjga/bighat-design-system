---
'@bighat/ui': minor
---

**List is redesigned.** It was a white box with full-width grey rules that read
as an unstyled table on a sunken page. Now:

- it takes the surface it sits on, with `border.hairline` rules inset to the
  text;
- a row that responds to the pointer hovers with an inset `fill.hover` capsule
  and is at least `control.lg` tall; static rows keep their natural height;
- a title with a supporting line under it takes `weight.emphasis`, and the
  supporting line is `text.secondary` instead of `text.muted`;
- a row with `href` ends in a chevron;
- **new `variant="inset"`**: a grouped list on its own raised surface, like a
  `Card`, for a page whose content is the list.

A row's accessible name now separates title and description ("Tokens The two
layers", was "TokensThe two layers"). No prop was removed or renamed.
