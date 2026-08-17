import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react';

import '../Input/Input.css';
import './Select.css';

/**
 * A native `<select>` in a system that otherwise builds its own controls.
 *
 * This is the deliberate omission. A custom listbox is roughly 400 lines of
 * roving tabindex, typeahead, virtualisation and mobile fallbacks, and the
 * native element already gives us the platform picker on touch devices, form
 * autofill, and correct behaviour in every assistive technology we do not own
 * a licence to test against.
 *
 * When a product genuinely needs multi-select with search, that is a different
 * component with a different name — not a prop on this one.
 */
export type SelectOption = { value: string; label: string; disabled?: boolean };

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'id'> & {
  label: string;
  options: SelectOption[];
  /** Rendered as a disabled first option, not as a real selectable value. */
  placeholder?: string;
  description?: ReactNode;
  error?: string;
  id?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, description, error, id, required, ...rest },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const descriptionId = `${selectId}-description`;
  const errorId = `${selectId}-error`;

  const describedBy = [error ? errorId : null, description ? descriptionId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="bh-field">
      <label className="bh-field__label" htmlFor={selectId}>
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

      <div className="bh-select-wrapper">
        <select
          {...rest}
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={`bh-select bh-focusable${error ? ' bh-select--invalid' : ''}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="bh-select__chevron" aria-hidden="true" />
      </div>

      {error && (
        <p className="bh-field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
});
