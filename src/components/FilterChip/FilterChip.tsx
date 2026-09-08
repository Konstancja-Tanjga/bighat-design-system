import { forwardRef, type ButtonHTMLAttributes } from 'react';

/**
 * One filter, on or off, sitting next to the results it narrows.
 *
 * `Badge` is the component people reach for and it is right to refuse: its
 * `notFor` list says "anything clickable" in as many words. A status you can
 * press is two components wearing one coat — the badge says what something
 * *is*, and a chip says what the reader *asked for*. Pressing a badge would
 * mean pressing a fact.
 *
 * It is a toggle, not a link and not a radio: several chips can be on at once,
 * and each reports its own `aria-pressed`. For one-of-several, use
 * `SegmentedControl` — a set of toggles cannot express "exactly one".
 *
 * The pressed state is carried three ways: `aria-pressed` for assistive
 * technology, a leading check mark that survives greyscale and forced colours,
 * and the `selection` tint. The tint alone would fail WCAG 1.4.1, which is why
 * the mark is not decoration.
 */
export type FilterChipProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'type' | 'aria-pressed' | 'children'
> & {
  /**
   * The visible text, and the accessible name — one string, so the two cannot
   * differ. A chip whose name is not what it says on it is not a voice-control
   * target (WCAG 2.5.3).
   */
  label: string;
  pressed: boolean;
};

export const FilterChip = forwardRef<HTMLButtonElement, FilterChipProps>(function FilterChip(
  { label, pressed, ...rest },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      aria-pressed={pressed}
      className="bh-chip bh-chip--filter bh-focusable"
    >
      {/* Hidden from the accessible name — aria-pressed already says this, and
          announcing "tick Finance, pressed" says it twice. */}
      <span className="bh-chip__mark" aria-hidden="true">
        {pressed ? '✓' : ''}
      </span>
      {label}
    </button>
  );
});
