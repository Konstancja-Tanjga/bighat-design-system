import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

/**
 * A text field is the component where accessibility is most often faked: a
 * styled `<div>` label, an error message floating unconnected below, and a red
 * border doing all the communicating.
 *
 * This one wires `aria-describedby` and `aria-invalid` from the same props
 * that render the visible text, so the two cannot drift apart.
 */
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id'> & {
  label: string;
  /** Hides the label visually but keeps it for assistive tech. Use sparingly. */
  hideLabel?: boolean;
  /** Persistent helper text. Shown above the error, never replaced by it. */
  description?: ReactNode;
  /** Presence of this string is what puts the field into the invalid state. */
  error?: string;
  id?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hideLabel = false, description, error, id, required, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;

  // Order matters: screen readers read describedby in the order given, and the
  // error is the more urgent of the two.
  const describedBy = [error ? errorId : null, description ? descriptionId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="bh-field">
      <label
        className={`bh-field__label${hideLabel ? ' bh-visually-hidden' : ''}`}
        htmlFor={inputId}
      >
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

      <input
        {...rest}
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`bh-input bh-focusable${error ? ' bh-input--invalid' : ''}`}
      />

      {/* Not a live region: the field is described by this node, so a screen
          reader reaches it through the input. A live region here would make
          every keystroke during client-side validation speak twice. */}
      {error && (
        <p className="bh-field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
});
