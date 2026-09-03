---
'@bighat/ui': major
---

4.0 — DTCG tokens, contracts, and eight gates.

**Tokens are now DTCG.** The source moves from `src/tokens/*.ts` to
`tokens/*.tokens.json` in the W3C Design Tokens format, and four artefacts are
generated from it: `dist/tokens.css`, `.scss`, `.ts` and `.flat.json`. The
committed copies are compared against the source by `tokens:check`, so a
hand-edit fails the build rather than surviving to the next rebuild.

**Components are described by contracts.** `spec/components/*.json` states each
component's anatomy, keyboard intent and ARIA obligations against the WAI-ARIA
APG pattern it claims. The test suite is generated from those contracts rather
than written per component, and `components.json` is removed in favour of them.

**Eight gates, six of them new.** `tokens:check`, `spec:validate`,
`audit:drift`, `aria`, `docs:check`, `check:docs`, `lint`, `test`. Two write
reports that ship with the library: `ARIA.md` records that of 41 components 8
conform, 10 are partial and 14 fail — published rather than fixed quietly,
because a conformance claim without the failures is marketing. `DRIFT-REPORT.md`
records token drift, currently clean on all eight scales.

**`check:docs` is red on 18 scaffolded files, deliberately.** An invisibly
incomplete library is worse than a visibly incomplete one.

**CSS moves out of the components.** Each component's stylesheet leaves
`src/components/X/X.css` for `src/styles/components/X.css`, and components no
longer import their own CSS. This is what lets a second framework binding reuse
the stylesheets rather than reimplement them.

### Breaking

- `tone="default"` → `tone="neutral"`
- `StateBlock` `density` → `scope`
- `--bh-font-family` → `--bh-font-family-sans`
- `className` is now omitted on all 41 components, not 7
- Prop types are exported for all 41 components

`MIGRATION-4.0.md` carries the codemods. `DECISIONS-4.0.md` records the 52
off-scale token values and the reasoning for each — the default answer was snap
to the nearest role, and two of twelve cleared the bar for a new token.

### Package scope

`@bighatpoland/ui` → `@bighat/ui`. The old scope was an account handle, and that
account is now `Konstancja-Tanjga`; the package takes the name of the design
system instead, which does not move. This also repairs the Pages links the
account rename broke — GitHub redirects an old username for repository URLs but
not for Pages, so every `bighatpoland.github.io` Storybook link was a 404.
