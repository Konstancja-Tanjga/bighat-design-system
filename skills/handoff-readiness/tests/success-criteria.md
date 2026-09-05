# Success criteria

Rough targets, not thresholds. The point is to notice degradation, not to score
the skill.

They are ordered deliberately. A checker fails in two ways: it misses something,
or it claims something it did not check. The first is loud and gets fixed. The
second reads as coverage and gets trusted. Everything under **Honesty** below
outranks everything under **Coverage**, and if only one number survives it
should be the first one.

## Honesty

**Zero unevidenced passes.** Every `pass` row carries a command with its output
or a screenshot path. Measure by reading the pass rows — not the fail rows — in
the last five real reports.

This is the criterion that earns its keep. The first run against the tripwire
branch produced exactly this failure: `clickthrough.mjs` exited 0, wrote fifteen
screenshots, reported no blank pages, and gate 4 would have passed. The route
rendered nothing. Every other criterion on this page would have let it through.

**No verdict rests on an exit code.** A tool that ran is not a thing that was
checked. Where a gate's evidence is a screenshot, the verdict requires that the
image was opened; where it is a command, the verdict quotes its output. Measure
by asking of each `pass`: what would this row look like if the tool were broken?
If the answer is "the same", the row is a claim.

**`not checked` is used, and used honestly.** A run in which every gate returns
`pass` or `fail` is suspicious rather than good — this repository has no lint,
no test script and one theme, so at least gates 7 and 9 have reason to abstain.
Measure by counting `not checked` verdicts across runs: a sustained zero means
the skill has started guessing.

**Zero aborted runs.** Every failure mode in the error-handling table ends in a
verdict, not a stop. Measure by counting runs that ended without a report —
target zero, and each one is a missing row in that table.

## Coverage

**Finds 7 of 7 seeded defects.** `cases.md` plants one per gate that can hold
one. A checker that misses a planted defect is broken in the specific way that
matters, and this is the number to watch after every change to
`references/gates.md`.

Seven, not eight: gate 7 has no fixture while the config carries one theme.
When a dark theme exists, seed it and the number becomes eight.

**Triggers on all six should-trigger queries, and none of the four negatives.**
Run the table in `triggers.md` in fresh sessions. Measured baseline: 10/10.

Count the two directions separately and always rerun both. They trade off
against each other, and not in theory: narrowing the description to stop N1
firing is what silently cost P6, and the two edits were four minutes apart.
A trigger rate reported alone is half a measurement.

**Verdicts are stable across runs.** Run the tripwire branch three times. The
verdicts and the findings should match; the prose may differ. Verdicts that move
between runs mean a gate is written as a judgement where it should be a check.
Not yet measured — `claude -p` is now on PATH, so `scripts/run_eval.py` from
skill-creator can do this without a human sitting through three runs.

This is a test of the skill, on the fixture, once a quarter and after any change
to `references/gates.md`. It is **not** a thing to do to a branch. Repetition
measures variance: it tells you whether a gate answers the same way twice, and
nothing at all about whether it can see. A gate blind to a defect is blind to it
on every run, so three agreeing runs on real work buy confidence that was never
earned — the click-through script would have reported "no blank pages" three
times out of three.

Step 7 of the skill re-checks a gate after a fix, which is a different thing
again: not the same input measured twice, but a changed input measured once.

**Run cost stays in proportion.** A run on a repository this size should be
minutes, not a session. Note the wall-clock time on the tripwire branch after
each change; a step that doubles it needs to earn it. No baseline recorded yet —
take one on the next full run.

## Qualitative

**The note goes into the PR without editing.** Count the edits made before
pasting. One or two is fine; rewriting the note means the template is wrong, not
the writer.

**A teammate gets through it first time.** The only thing they should have to be
told is which routes matter — everything else comes from the config, and if it
does not, the gap is in `references/config.md`.

**Nobody has to ask what to do next.** The report ends with what would close
each failing gate. If the reply to a report is "and now what?", that line is
missing.

**The report survives disagreement.** When someone contests a `fail`, the
argument should be about the finding, not about whether the skill looked. If a
conversation about a report turns into "are you sure it actually checked that",
the evidence was too thin regardless of what the verdict said.

## What is deliberately not measured

**Tool-call count.** This skill is not competing with doing the work by hand —
it is competing with not checking at all, and optimising for fewer calls would
push it toward reading the source instead of running the screen, which is the
one shortcut it exists to refuse.

**Gate pass rate.** A run where nine gates pass is not better than one where
four fail; it is a different branch. Tracking the rate would create pressure to
soften gates, which is the opposite of the point.
