---
'@bighat/ui': minor
---

**New: `Article` and `ArticleMargin`, and an Article template.** `Article` lays
out a long read by its own width: text at a reading measure, a margin for
figures and asides, and a table of contents that stays in view when wide, folds
into a disclosure when medium, and a single column when narrow.
`ArticleMargin`, placed before a paragraph, floats into the margin level with
it and returns to the text on a narrow screen. The table of contents marks the
section in view with `aria-current="location"`. `Article` does not style the
text inside it; long-form typography stays the product's.

`Templates/Article` shows a lesson: the module's lessons as the syllabus in the
shell navigation, "Lesson 1 of 5", learning goals, photos with their credit in
the margin, and the next lesson as a card, in ready, loading and error states.

The template stories no longer shift the shell 24px off the left edge: a
negative margin meant for padded previews was applied under
`layout: 'fullscreen'`.
