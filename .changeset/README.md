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

Merging to `main` opens a *Version Packages* pull request that collects the
pending changesets. Publishing to npm happens when that PR is merged — so
bumping a version is always a separate, reviewed decision.
