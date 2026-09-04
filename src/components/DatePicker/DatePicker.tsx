import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

/**
 * A native `<input type="date">`, for the same reason `Select` is native.
 *
 * A hand-built calendar grid is a month of work — roving focus across a
 * two-dimensional grid, Page Up and Page Down for months, localised week
 * starts, the Hijri and Buddhist calendars, and a text entry path for the many
 * people who would rather type 04/05 than click twice. The platform ships all
 * of it, in the user's own locale, wired to the OS date picker on touch.
 *
 * What the platform does not enforce is a visible format hint, so this
 * component makes `description` the place for it and defaults to naming the
 * range whenever `min` or `max` is set — an "invalid date" error the user
 * cannot predict is the common failure here.
 */
export type DatePickerProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'id' | 'type'
> & {
  label: string;
  description?: ReactNode;
  error?: string;
  /** `date` for a day, `month`, `week`, or `datetime-local` for a moment. */
  granularity?: 'date' | 'month' | 'week' | 'datetime-local';
  id?: string;
};

function rangeHint(
  min?: string | number | readonly string[],
  max?: string | number | readonly string[],
) {
  if (min && max) return `Between ${String(min)} and ${String(max)}.`;
  if (min) return `${String(min)} or later.`;
  if (max) return `${String(max)} or earlier.`;
  return undefined;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  { label, description, error, granularity = 'date', id, required, min, max, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const hint = description ?? rangeHint(min, max);

  const describedBy = [error ? errorId : null, hint ? descriptionId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="bh-field">
      <label className="bh-field__label" htmlFor={inputId}>
        {label}
        {required && (
          <span className="bh-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {hint && (
        <p className="bh-field__description" id={descriptionId}>
          {hint}
        </p>
      )}

      <input
        {...rest}
        ref={ref}
        type={granularity}
        id={inputId}
        min={min}
        max={max}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`bh-input bh-datepicker bh-focusable${error ? ' bh-input--invalid' : ''}`}
      />

      {error && (
        <p className="bh-field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
});

export type DateRangePickerProps = {
  legend: string;
  start: DatePickerProps;
  end: DatePickerProps;
  error?: string;
};

/**
 * Two fields in one fieldset. Not a range widget: two dates the user can type
 * independently beats one popover that forces a click sequence.
 */
export function DateRangePicker({ legend, start, end, error }: DateRangePickerProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <fieldset className="bh-date-range" aria-describedby={error ? errorId : undefined}>
      <legend className="bh-field__label">{legend}</legend>
      <div className="bh-date-range__fields">
        <DatePicker {...start} />
        <DatePicker {...end} />
      </div>
      {error && (
        <p className="bh-field__error" id={errorId}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
