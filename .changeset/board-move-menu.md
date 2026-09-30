---
'@bighat/ui': major
---

`BoardCard`'s move control is now a `Menu` instead of a `<select>`. On Windows
a closed select commits as its value changes, so the first arrow key moved the
card before the user had seen where it could go; the menu moves nothing until a
destination is chosen, and Escape closes it without moving. The button reads
"Move to…" and is named "Move to… {title}", so the words a voice-control user
sees are the start of its name.

Breaking: the `<select>` and its `bh-board__move-select` class are gone, and the
control is now a `bh-board__move-trigger` button. Tests that called
`selectOptions` on it need to click the button and then the destination. See
MIGRATION.md.

`Menu` now opens upward when a scrolling ancestor or the viewport leaves no
room below the trigger, so the last card in a board column, or the last row in
a scrolling table, is no longer clipped.
