# Changesets

Every pull request that changes published behaviour carries a changeset:

```bash
npx changeset
```

It asks for a bump type and a description, and writes a markdown file into this
folder. The description is what consumers read in the CHANGELOG, so write it
for the person upgrading, not for the person who wrote the code:

- **Bad:** "refactor Button props"
- **Good:** "`Button` splits `variant` into `variant` and `tone`. `variant="danger"` still works and warns; see MIGRATION.md."

Merging to `main` opens a _Version Packages_ pull request that collects the
pending changesets. Merging **that** pull request bumps the version and writes
`CHANGELOG.md` — so a version bump is always a separate, reviewed decision
rather than a side effect of merging a feature.

Publication to a registry is deliberately not automated. It has its own
credentials and its own failure modes, and wiring it into every merge to `main`
means the pipeline can go red for a reason that has nothing to do with the
code. To publish, run `npm run release` locally with an npm token.
