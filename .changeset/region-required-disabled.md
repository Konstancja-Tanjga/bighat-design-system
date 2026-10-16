---
'@bighat/ui': patch
---

Three fixes the new axe gate found, each bringing the implementation in line with its contract:

- `StatusBar` is a labelled `region`, not a `contentinfo`. A contentinfo landmark is only valid at the top level of a page, and a status bar sits inside `main` or an `AppShell`.
- `RadioGroup` carries `required` on each radio input instead of `aria-required` on the fieldset, which `role=group` does not permit. Note that native `required` engages the browser's constraint validation: a form with a required group and no selection will not submit until one is made.
- `FileDropzone` says disabled with tokens (`surface.sunken`, `border.subtle`, `text.muted`) instead of `opacity: 0.6`, which took the prompt below 4.5:1. The surface also carries `aria-disabled` while disabled.
