---
'@bighat/ui': minor
---

An overlaid `AppShell` panel now behaves as a modal. Below `breakpoint.md`,
opening the navigation or the trailing panel moves focus to its first control,
and makes the header, `main` and the other panels `inert`. Escape closes it
through the same toggle, unless something inside used it first (an open
`Menu`, a `Combobox` list, a `Dialog`), and on close focus returns to the control that opened
it. Before, focus stayed behind the scrim, Tab walked through the hidden page,
and closing left focus on `<body>`. At full width nothing changes. `Combobox` now marks the Escape that closes its
list as handled, so an enclosing overlay stays open. If your
product added its own Escape listener for the overlay, remove it, or the toggle
runs twice.
