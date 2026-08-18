import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

import '../Input/Input.css';
import './Checkbox.css';

/**
 * A native `<input type="checkbox">` with the box visually replaced.
 *
 * The input itself is never removed from the DOM and never `display: none` —
 * it stays under the drawn box, so it keeps form participation, the platform's
 * own keyboard handling, and the state a screen reader reads. Everything
 * visible is a sibling that reacts to `:checked` and `:focus-visible`.
 *
 * `indeterminate` is a DOM property, not an attribute, so it is set in an
 * effect rather than rendered — the mistake that makes tri-state trees announce
 * the wrong thing.
 */
export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'id' | 'type'
> & {
  label: ReactNode;
  description?: ReactNode;
  error?: string;
  /** Mixed state: some children checked. Visual only until the user clicks. */
  indeterminate?: boolean;
  id?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, error, indeterminate = false, id, required, ...rest },
  forwardedRef,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const localRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localRef.current) localRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const describedBy = [error ? errorId : null, description ? descriptionId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="bh-checkbox-field">
      <div className="bh-checkbox">
        <input
          {...rest}
          type="checkbox"
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className="bh-checkbox__input bh-focusable"
          ref={(node) => {
            localRef.current = node;
            if (typeof forwardedRef === 'function') forwardedRef(node);
            else if (forwardedRef) forwardedRef.current = node;
          }}
        />
        <span className="bh-checkbox__box" aria-hidden="true" />
        <label className="bh-checkbox__label" htmlFor={inputId}>
          {label}
          {required && (
            <span className="bh-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      </div>

      {description && (
        <p className="bh-field__description bh-checkbox__hint" id={descriptionId}>
          {description}
        </p>
      )}
      {error && (
        <p className="bh-field__error bh-checkbox__hint" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
});
