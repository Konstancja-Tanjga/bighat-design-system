import { useId, useRef, useState, type ReactNode } from 'react';

/**
 * A text field that filters a list — the one place this system does build a
 * custom listbox, because the native `<select>` it prefers cannot be typed
 * into and `<datalist>` is inconsistent across browsers and unreadable to
 * several screen readers.
 *
 * The bargain is that everything the native control gave away has to be paid
 * for by hand, and this is the whole bill:
 *
 * - `role="combobox"` on the input, with `aria-expanded` and `aria-controls`
 * - `aria-activedescendant` rather than moving focus, so typing keeps working
 * - Down/Up to move, Enter to commit, Escape to close then to clear
 * - the result count in a live region, so a filter that finds nothing says so
 *
 * Selection is by value, so the visible text is never the source of truth.
 */
export type ComboboxOption = {
  value: string;
  label: string;
  /** Second line — disambiguates two options with the same label. */
  hint?: string;
};

export type ComboboxProps = {
  label: string;
  options: ComboboxOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  description?: ReactNode;
  error?: string;
  disabled?: boolean;
  /** Replaces the default "contains, case-insensitive" match. */
  filter?: (option: ComboboxOption, query: string) => boolean;
  emptyMessage?: string;
};

const defaultFilter = (option: ComboboxOption, query: string) =>
  option.label.toLowerCase().includes(query.toLowerCase());

export function Combobox({
  label,
  options,
  value,
  onChange,
  placeholder,
  description,
  error,
  disabled,
  filter = defaultFilter,
  emptyMessage = 'No matches',
}: ComboboxProps) {
  const id = useId();
  const listId = `${id}-list`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  const selected = options.find((option) => option.value === value) ?? null;
  const [query, setQuery] = useState(selected?.label ?? '');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // An empty query after a selection means "show everything again", not
  // "nothing matches" — otherwise clicking into the field looks broken.
  const matches =
    query && query !== selected?.label ? options.filter((o) => filter(o, query)) : options;

  const describedBy = [error ? errorId : null, description ? descriptionId : null]
    .filter(Boolean)
    .join(' ');

  const commit = (option: ComboboxOption) => {
    onChange(option.value);
    setQuery(option.label);
    setOpen(false);
  };

  const openList = () => {
    setOpen(true);
    setActiveIndex(
      Math.max(
        0,
        matches.findIndex((o) => o.value === value),
      ),
    );
  };

  return (
    <div className="bh-field bh-combobox">
      <label className="bh-field__label" htmlFor={id}>
        {label}
      </label>

      {description && (
        <p className="bh-field__description" id={descriptionId}>
          {description}
        </p>
      )}

      <div className="bh-combobox__control">
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          autoComplete="off"
          className={`bh-input bh-focusable${error ? ' bh-input--invalid' : ''}`}
          value={query}
          placeholder={placeholder}
          disabled={disabled}
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && matches[activeIndex] ? `${id}-option-${activeIndex}` : undefined
          }
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setOpen(true);
            if (event.target.value === '') onChange(null);
          }}
          onFocus={openList}
          onBlur={() => {
            setOpen(false);
            // Free text is not a value: on blur the field snaps back to the
            // committed selection rather than leaving a half-typed lie.
            setQuery(selected?.label ?? '');
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              if (!open) return openList();
              setActiveIndex((index) => (index + 1) % Math.max(1, matches.length));
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              if (!open) return openList();
              setActiveIndex((index) => (index - 1 + matches.length) % Math.max(1, matches.length));
            } else if (event.key === 'Enter') {
              const option = matches[activeIndex];
              if (open && option) {
                event.preventDefault();
                commit(option);
              }
            } else if (event.key === 'Escape') {
              // First Escape closes the list, a second one clears the field.
              if (open) setOpen(false);
              else {
                setQuery('');
                onChange(null);
              }
            }
          }}
        />

        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          hidden={!open}
          className="bh-combobox__list"
        >
          {matches.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={option.value === value}
              className={`bh-combobox__option${index === activeIndex ? ' is-active' : ''}`}
              // Mouse down, not click: click fires after blur has closed the list.
              onMouseDown={(event) => {
                event.preventDefault();
                commit(option);
              }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="bh-combobox__option-label">{option.label}</span>
              {option.hint && <span className="bh-combobox__option-hint">{option.hint}</span>}
            </li>
          ))}
          {matches.length === 0 && (
            <li className="bh-combobox__empty" role="presentation">
              {emptyMessage}
            </li>
          )}
        </ul>
      </div>

      {/* Result count, spoken after typing stops. Without it, filtering to zero
          results is silent for anyone not looking at the list. */}
      <p className="bh-visually-hidden" role="status" aria-live="polite">
        {open ? `${matches.length} results` : ''}
      </p>

      {error && (
        <p className="bh-field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
