import { forwardRef, useId, type ReactNode } from 'react';

import '../Input/Input.css';
import './Switch.css';

/**
 * A switch takes effect immediately. A checkbox is submitted with a form.
 * That is the whole distinction, and it is the one that decides which of the
 * two a screen is allowed to use.
 *
 * Implemented as a `<button role="switch">` rather than a styled checkbox,
 * because `role="switch"` is what makes the state announce as "on"/"off"
 * instead of "checked", and because a control with no form value has no
 * business being an input.
 */
export type SwitchProps = {
  /** Visible label. Required — an unlabelled switch names nothing it toggles. */
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: ReactNode;
  disabled?: boolean;
  /** Label before the switch instead of after it. */
  labelPosition?: 'start' | 'end';
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { label, checked, onChange, description, disabled, labelPosition = 'end' },
  ref,
) {
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  return (
    <div className="bh-switch-field">
      <div className={`bh-switch-row bh-switch-row--${labelPosition}`}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={labelId}
          aria-describedby={description ? descriptionId : undefined}
          disabled={disabled}
          className="bh-switch bh-focusable"
          onClick={() => onChange(!checked)}
        >
          <span className="bh-switch__thumb" aria-hidden="true" />
        </button>
        {/* A <span>, not a <label>: the accessible name comes from
            aria-labelledby, and htmlFor on a button does nothing. */}
        <span
          className="bh-switch__label"
          id={labelId}
          onClick={() => !disabled && onChange(!checked)}
        >
          {label}
        </span>
      </div>

      {description && (
        <p className="bh-field__description bh-switch__hint" id={descriptionId}>
          {description}
        </p>
      )}
    </div>
  );
});
