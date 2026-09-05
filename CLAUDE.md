# Working in this repository

`@bighat/ui` — a React design system. Two token layers, WCAG AA enforced
in CI, 39 components, 2 page templates in Storybook.

## Before writing any UI

Read **`agent/SKILL.md`** first. It holds the rules that types, lint and tests
cannot express — the ones a correct-looking, type-checking, lint-passing change
can still break. Do not infer the rules from surrounding code; several of them
exist precisely because the wrong version compiles.

`components.json` is the machine-readable inventory: every component, its props,
and what it is **not** for. Consult the negative column before reaching for an
adjacent component.

## The one command

```bash
npm run verify   # lint · format · token sync · 134 tests (58 contrast) · both builds
```

Run it before reporting any change as done. `src/styles/tokens.css` is generated
from `src/tokens/*.ts` — edit the TypeScript, never the CSS, and regenerate with
`npm run tokens`.

## Three questions, kept apart

Never collapse these into one summary — they fail for different reasons and need
different fixes.

| Question        | What it asks                                     | What enforces it                      |
| --------------- | ------------------------------------------------ | ------------------------------------- |
| Token-legal?    | Semantic layer only, spacing from the scale      | `npm run tokens:check`, lint, review  |
| Usable?         | Labels, focus, contrast, landmarks, no drag-only | Required props, contrast gate, review |
| State-complete? | Empty, loading and error via `StateBlock`        | Nothing automatic — a human must look |

## Routing a request

"Is this handoff-safe?" is the `handoff-readiness` skill — ten gates over the
diff and the running prototype, one verdict each with the evidence attached, and
the handover note written for the pull request. It reports; it does not edit,
open the pull request, or declare the work done.

It lives in its own marketplace, because eight of its ten gates have nothing to
do with any design system:

```bash
/plugin marketplace add Konstancja-Tanjga/claude-skills
/plugin install handoff-readiness@konstancja-skills
```

The gates that do concern this system read their rules from the path a project's
`.claude/handoff.json` gives as `designSystem.rules` — point it at
`agent/SKILL.md` inside the installed package. The rules stay here; the skill
cites them rather than keeping a second copy that drifts.

The questions that are not a handoff ("the spacing looks off", "bighat cannot do
what I need", "should this become a component?") are routed in
`agent/REQUESTS.md`.

Both replaced `agent/HANDOFF.md`, which said these things without being
runnable.

## Human steps, on purpose

Two things are never done autonomously: **filing a proposal** to add something to
the system, and **declaring a prototype done**. Both are commitments made on
someone's behalf and must carry the name of the person who stands behind them.
Draft them; do not file them.

## Reference

- `README.md` — the four decisions and why each cost what it cost
- `agent/SKILL.md` — the rules a build cannot enforce
- `agent/EVIDENCE.md` — whether the skill file changes what an agent writes (it was tested; the result contradicted the hypothesis)
- `MIGRATION.md` — the 2.0 → 3.0 `variant` / `tone` split
- `docs/handoff-guide.html` — the same guidance as a published page for humans
