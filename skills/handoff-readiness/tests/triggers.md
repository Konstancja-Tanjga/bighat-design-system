# Triggering tests

The description is the only thing deciding whether this skill loads. It is
therefore the part most worth testing, and the part that rots fastest: people
ask for the same thing in new words, and the skill silently stops firing.

Run each query as the **first message of a fresh session** and record whether
the skill loaded. Ten queries, ten minutes, and the only test that catches a
skill nobody can reach.

## Write the queries the way people type

Short clean phrases like "Ready for PR?" are a poor test. Claude reaches for a
skill when a task looks like work it cannot do in one step, so a three-word
query fails to trigger regardless of how good the description is — and passes
or fails for reasons that have nothing to do with the wording being measured.

The queries below carry what real messages carry: a branch name, a component,
a deadline, a package, lowercase, missing diacritics, a bit of backstory.

## Should trigger

| # | Query | Language |
| --- | --- | --- |
| P1 | "hej, skonczylam branch big-hat z sekcja about, jutro rano chce to wrzucic na review — mozesz mi to przejrzec zanim odpale PR? glownie chodzi mi o to czy nie nadpisalam czegos z design systemu" | PL |
| P2 | "before i open the PR on this branch can you sanity check it — i refactored the process board into an interactive thing and im not 100% sure the dark theme still holds on the /about page" | EN |
| P3 | "i need to write the PR description for this branch, can you put together what changed and what a reviewer should look at first" | EN |
| P4 | "sprawdz prosze czy niczego nie zepsulam w tej galezi, jutro merge" | PL |
| P5 | "did we actually use the @bighatpoland/ui components on the about page or did someone rebuild the buttons by hand? want to know before this goes to review" | EN |
| P6 | "czy ten prototyp w ogole sie klika? bo mam wrazenie ze ktoras podstrona jest pusta" | PL |

P3 and P6 never say handoff, PR review or design system. They are the two that
break first when the description is trimmed, and the reason to keep them.

## Should not trigger

The useful negatives are near misses — queries sharing vocabulary with the
skill that nonetheless need something else. "What's the weather in Warsaw?"
tests nothing.

| # | Query | Why not, and what should win |
| --- | --- | --- |
| N1 | "open a PR for this branch with a sensible title and description" | Asking to *do* the thing the skill refuses. Nothing should trigger. |
| N2 | "dodaj dark theme do sekcji kontakt, uzyj tokenow z @bighatpoland/ui zeby bylo zgodne z design systemem" | Building, not checking — and it names the design system, so a keyword match would wrongly fire. |
| N3 | "the build is failing on CI with a type error in About.tsx:42, can you fix it" | A repair request. Gate 1 covers a failing build, but the ask is the fix. |
| N4 | "review the changes on this branch for security issues before we ship" | "review this branch before we ship" is nearly P4. `security-review` should win. |

## The measured baseline

Ten queries, one fresh session each, model Opus 5:

| | P1 | P2 | P3 | P4 | P5 | P6 | N1 | N2 | N3 | N4 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Result | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

10/10. Two of them were failures first, and both are worth remembering:

**N1 fired.** The description said "before I open the PR" and never said that
*opening* one is somebody else's job. Naming the exclusion in the description
fixed it. A skill that refuses a request in its body still has to decline it in
its description, because the body is not read until after the skill loads.

**P6 stopped firing** when "Make sure to use this skill whenever" was shortened
to "Use it whenever" during an unrelated edit. Claude under-reaches for skills
by default, so the pushy phrasing is load-bearing rather than clumsy. Restoring
it brought P6 back stronger than before.

## When one fails

**Missed trigger:** add the phrase to the description in the words the person
used, and add the query here. The description is a trigger surface, not a
summary.

**False trigger:** the description is claiming ground the skill does not hold.
Narrow it — then rerun the whole table, because narrowing reliably costs a
paraphrase somewhere else. That is exactly how P6 was lost.

**Either way, rerun all ten.** Both failures above were caused by a change made
for a good reason somewhere else in the description.
