---
'@bighat/ui': minor
---

`BoardCard`'s move control is now a `Menu` instead of a `<select>`. On Windows
a closed select commits as its value changes, so the first arrow key moved the
card before the user had seen where it could go; the menu moves nothing until a
destination is chosen, and Escape closes it without moving. The button reads
"Move to…" and is named "Move to… {title}", so the words a voice-control user
sees are the start of its name. The `bh-board__move-select` class is replaced
by `bh-board__move-trigger`; tests that used `selectOptions` on the old control
need to click the button and then the destination.
