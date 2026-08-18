import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

import '../Input/Input.css';
import './Slider.css';

/**
 * A native `<input type="range">`, restyled rather than rebuilt.
 *
 * The platform already ships arrow keys, Home and End, Page Up and Page Down,
 * touch handling and the correct `slider` role. A custom div with a draggable
 * thumb ships none of that and is the single most reliable way to make a value
 * unreachable without a mouse.
 *
 * `aria-valuetext` is exposed as `formatValue` because "24" tells a screen
 * reader user nothing when the unit is "24 hours" or "24 zł".
 */
export type SliderProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'id' | 'type' | 'value' | 'defaultValue' | 'onChange'
> & {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  description?: ReactNode;
  /** Turns the raw number into something a person would say out loud. */
  formatValue?: (value: number) => string;
  /** Hides the numeric readout next to the label. */
  hideValue?: boolean;
  id?: string;
};

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    label,
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    description,
    formatValue,
    hideValue = false,
    id,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const text = formatValue ? formatValue(value) : String(value);
  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;

  return (
    <div className="bh-field bh-slider-field">
      <div className="bh-slider__header">
        <label className="bh-field__label" htmlFor={inputId}>
          {label}
        </label>
        {!hideValue && <span className="bh-slider__value">{text}</span>}
      </div>

      {description && (
        <p className="bh-field__description" id={descriptionId}>
          {description}
        </p>
      )}

      <input
        {...rest}
        ref={ref}
        type="range"
        id={inputId}
        className="bh-slider bh-focusable"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={formatValue ? text : undefined}
        aria-describedby={description ? descriptionId : undefined}
        style={{ '--bh-slider-percent': `${percent}%` } as React.CSSProperties}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
});
