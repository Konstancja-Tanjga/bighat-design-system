# `.claude/handoff.json`

One file per repository, naming what the project is made of. Without it the
skill has to guess at the design system, the commands and the routes — and a
guess that is wrong makes a gate report a problem the project does not have.

Write it on the first run, then it costs nothing again.

```json
{
  "workdir": "site",
  "designSystem": {
    "package": "@bighatpoland/ui",
    "tokenPrefix": "--bh-",
    "primitiveNames": ["color.", "space.", "radius.", "fontSize."],
    "inventory": "node_modules/@bighatpoland/ui/components.json"
  },
  "commands": {
    "install": "npm ci",
    "check": "npm run check",
    "lint": null,
    "test": null,
    "build": "npm run build",
    "dev": "npm run dev",
    "devUrl": "http://localhost:5173"
  },
  "routes": [
    { "name": "Home", "path": "/" },
    { "name": "About", "path": "/about" }
  ],
  "themes": [
    { "name": "light", "query": "" },
    { "name": "dark", "query": "?theme=dark" }
  ],
  "widths": [430, 900, 1400],
  "screenshots": ".handoff/shots"
}
```

## The fields

**`workdir`** — where `package.json` lives, if it is not the repository root.
Every command runs there.

**`designSystem.package`** — the import that a component is supposed to come
from. Gate 2 reads the diff's imports against it.

**`designSystem.tokenPrefix`** — the custom-property prefix that marks a
semantic token. Anything else in a changed stylesheet is a literal until
proven otherwise.

**`designSystem.primitiveNames`** — the primitive layer's shape, so gate 2 can
tell a role from a raw value. Product code may reference the semantic layer
only.

**`designSystem.inventory`** — a machine-readable component list, if the
system ships one. Gate 2 consults its "not for" column before accepting that
the system cannot do something.

**`commands`** — what to run. `null` means the project has none, and a gate
that depends on it reports `not checked` rather than passing.

**`commands.devUrl`** — where the dev server answers. The click-through waits
for it rather than sleeping.

**`routes`** — the paths worth walking. Not every route: the ones this branch
could plausibly have broken, plus the front door.

**`themes`** — how a theme is selected. `query` is appended to the URL. A
project that switches themes by attribute rather than by URL needs its own
line here; say so rather than pretending the theme was checked.

**`widths`** — the container widths that matter. Three is usually right:
narrow, panel, full.

**`screenshots`** — where the click-through writes. Add it to `.gitignore`:
evidence belongs in the report, not in the repository.

## Bootstrapping it

If the file is missing, read `package.json` and the router, propose a config,
and ask about the three things a repository cannot tell you: which routes
matter, how themes are selected, and which widths the work has to hold at.
Write the file before running the gates.
