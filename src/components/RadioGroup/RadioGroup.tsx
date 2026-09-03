import { useId, type ReactNode } from 'react';

/**
 * Radios only exist in groups, so the group is the component and the single
 * radio is not exported.
 *
 * That forces the two things a lone `<Radio>` always loses: a `<fieldset>` with
 * a `<legend>`, which is how a screen reader tells the user what the choice is
 * about, and one shared `name`, which is what makes arrow keys move between the
 * options instead of tabbing through every one of them.
 */
export type RadioOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export type RadioGroupProps = {
  /** The question. Rendered as the fieldset's legend. */
  legend: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  description?: ReactNode;
  error?: string;
  required?: boolean;
  /** Horizontal only for two or three short options. */
  orientation?: 'vertical' | 'horizontal';
};

export function RadioGroup({
  legend,
  options,
  value,
  defaultValue,
  onChange,
  name,
  description,
  error,
  required,
  orientation = 'vertical',
}: RadioGroupProps) {
  const generatedId = useId();
  const groupName = name ?? generatedId;
  const descriptionId = `${generatedId}-description`;
  const errorId = `${generatedId}-error`;

  const describedBy = [error ? errorId : null, description ? descriptionId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <fieldset
      className="bh-radio-group"
      aria-describedby={describedBy || undefined}
      aria-invalid={error ? true : undefined}
      aria-required={required || undefined}
    >
      <legend className="bh-field__label">
        {legend}
        {required && (
          <span className="bh-field__required" aria-hidden="true">
            *
          </span>
        )}
      </legend>

      {description && (
        <p className="bh-field__description" id={descriptionId}>
          {description}
        </p>
      )}

      <div className={`bh-radio-group__options bh-radio-group__options--${orientation}`}>
        {options.map((option) => {
          const optionId = `${generatedId}-${option.value}`;
          const optionDescriptionId = `${optionId}-description`;

          return (
            <div className="bh-radio" key={option.value}>
              <input
                type="radio"
                className="bh-radio__input bh-focusable"
                id={optionId}
                name={groupName}
                value={option.value}
                disabled={option.disabled}
                checked={value === undefined ? undefined : value === option.value}
                defaultChecked={value === undefined ? defaultValue === option.value : undefined}
                aria-describedby={option.description ? optionDescriptionId : undefined}
                onChange={(event) => onChange?.(event.target.value)}
              />
              <span className="bh-radio__dot" aria-hidden="true" />
              <label className="bh-radio__label" htmlFor={optionId}>
                {option.label}
              </label>
              {option.description && (
                <p className="bh-field__description bh-radio__hint" id={optionDescriptionId}>
                  {option.description}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <p className="bh-field__error" id={errorId}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
