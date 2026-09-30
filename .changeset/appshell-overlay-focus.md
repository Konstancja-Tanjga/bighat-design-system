---
'@bighat/ui': minor
---

An overlaid `AppShell` panel now behaves as a modal. Below `breakpoint.md`,
opening the navigation or the trailing panel moves focus to its first control,
and makes the header, `main` and the other panels `inert`. Escape closes it
through the same toggle, and on close focus returns to the control that opened
it. Before, focus stayed behind the scrim, Tab walked through the hidden page,
and closing left focus on `<body>`. At full width nothing changes. If your
product added its own Escape listener for the overlay, remove it, or the toggle
runs twice.
