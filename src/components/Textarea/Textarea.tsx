import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from 'react';

/**
 * Multi-line free text: a note, a description, a reason for rejecting something.
 *
 * It exists because `Input` is single-line by contract and `Composer` is a
 * prompt — it owns Enter, and a field that submits when you try to start a new
 * paragraph is the wrong field for a paragraph. Between them was the most
 * ordinary form control in the system, and it had nowhere to go.
 *
 * The ARIA wiring is `Input`'s, deliberately identical: the props that render
 * the visible text are the props that build `aria-describedby`, so the two
 * cannot drift. What is *not* here is `hideLabel`. A single-line field can
 * sometimes borrow its name from context — a search box under a magnifier. A
 * four-line box cannot: nothing about its shape says what belongs in it, and
 * every hidden-label multi-line field found in the wild was a comment box
 * labelled only by a placeholder that vanished at the first keystroke.
 */
export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className' | 'id'
> & {
  label: string;
  /** Persistent helper text. Shown above the error, never replaced by it. */
  description?: ReactNode;
  /** Presence of this string is what puts the field into the invalid state. */
  error?: string;
  /** Visible lines before it scrolls. */
  rows?: number;
  /**
   * `vertical` (the default) lets the user make room for a long answer.
   * `none` only when the surrounding layout genuinely cannot take the growth —
   * it takes away an affordance the platform gives for free.
   */
  resize?: 'vertical' | 'none';
  id?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, description, error, rows = 4, resize = 'vertical', id, required, ...rest },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const descriptionId = `${textareaId}-description`;
  const errorId = `${textareaId}-error`;

  // Error first: it is the more urgent of the two, and describedby is read in
  // the order given. Same order as Input, for the same reason.
  const describedBy = [error ? errorId : null, description ? descriptionId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="bh-field">
      <label className="bh-field__label" htmlFor={textareaId}>
        {label}
        {required && (
          <span className="bh-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {description && (
        <p className="bh-field__description" id={descriptionId}>
          {description}
        </p>
      )}

      <textarea
        {...rest}
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`bh-textarea bh-textarea--resize-${resize} bh-focusable${
          error ? ' bh-textarea--invalid' : ''
        }`}
      />

      {/* Not a live region, for the reason Input's error is not one: the field
          already points at this node, so a screen reader reaches it through the
          control. A live region here speaks on every keystroke of client-side
          validation. */}
      {error && (
        <p className="bh-field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
});
