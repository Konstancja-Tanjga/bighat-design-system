import type { Size } from '../../tokens/vocabulary';

import { useId, type ReactNode } from 'react';

/**
 * Two to five mutually exclusive options, all visible at once — a chart's
 * granularity, a list's density.
 *
 * It looks like a row of buttons and behaves like a radio group, so it is built
 * as one: native inputs with a shared `name`, arrow keys from the platform, and
 * a `<legend>` naming the choice. Building it out of `<button>`s instead is the
 * version where nothing announces which segment is on.
 *
 * Not a filter with a "clear" state, and never more than five: past that the
 * segments are unreadable and it wanted to be a Select.
 */
export type SegmentedOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type SegmentedControlProps = {
  /** Names the choice. Visually hidden unless `showLegend`. */
  legend: string;
  showLegend?: boolean;
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  size?: Extract<Size, 'sm' | 'md'>;
  fullWidth?: boolean;
};

export function SegmentedControl({
  legend,
  showLegend = false,
  options,
  value,
  onChange,
  size = 'md',
  fullWidth = false,
}: SegmentedControlProps) {
  const name = useId();

  return (
    <fieldset className="bh-segmented-field">
      <legend className={showLegend ? 'bh-segmented__legend' : 'bh-visually-hidden'}>
        {legend}
      </legend>

      <div
        className={`bh-segmented bh-segmented--${size}${fullWidth ? ' bh-segmented--full' : ''}`}
      >
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          return (
            <div className="bh-segmented__segment" key={option.value}>
              <input
                type="radio"
                className="bh-segmented__input"
                id={id}
                name={name}
                value={option.value}
                checked={value === option.value}
                disabled={option.disabled}
                onChange={() => onChange(option.value)}
              />
              <label className="bh-segmented__label" htmlFor={id}>
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
