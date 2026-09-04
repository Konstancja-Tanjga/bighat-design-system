import { useId, useMemo, useState, type ReactNode } from 'react';

/**
 * Choosing one icon out of a grid of them.
 *
 * Every icon here is a picture of a word, and the word is what makes it
 * pickable at all: it is the accessible name, the search term, and the label
 * a screen reader reads instead of "graphic". So `name` is required and
 * `keywords` only widens the search — an icon nobody can name is an icon
 * nobody can find.
 *
 * The grid is a radio group, not a wall of buttons: one tab stop, arrows to
 * move, and a state that announces as selected rather than pressed.
 */
export type IconOption = {
  /** The icon's name. Searched, and read out as the option's label. */
  name: string;
  /** The glyph. Decorative — hidden from assistive tech. */
  icon: ReactNode;
  /** Extra search terms, e.g. ['bin', 'remove'] for "trash". */
  keywords?: string[];
};

export type IconPickerProps = {
  /** What the icon is for, e.g. "Project icon". */
  label: string;
  icons: IconOption[];
  value?: string;
  onChange: (name: string) => void;
  /** Hides the filter field for short, fixed sets. */
  searchable?: boolean;
  columns?: number;
};

export function IconPicker({
  label,
  icons,
  value,
  onChange,
  searchable = true,
  columns = 8,
}: IconPickerProps) {
  const id = useId();
  const [query, setQuery] = useState('');

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return icons;
    return icons.filter(
      (icon) =>
        icon.name.toLowerCase().includes(needle) ||
        icon.keywords?.some((keyword) => keyword.toLowerCase().includes(needle)),
    );
  }, [icons, query]);

  return (
    <fieldset className="bh-icon-picker">
      <legend className="bh-field__label">{label}</legend>

      {searchable && (
        <input
          type="search"
          className="bh-input bh-focusable"
          placeholder="Search icons"
          aria-label={`Search ${label.toLowerCase()}`}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      )}

      <div
        className="bh-icon-picker__grid"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {matches.map((icon) => {
          const optionId = `${id}-${icon.name}`;
          return (
            <div className="bh-icon-picker__cell" key={icon.name}>
              <input
                type="radio"
                className="bh-icon-picker__input"
                id={optionId}
                name={id}
                value={icon.name}
                checked={value === icon.name}
                onChange={() => onChange(icon.name)}
              />
              {/* The name is the label. It is visually hidden inside the tile,
                  never dropped — the tile would otherwise be an unnamed square. */}
              <label className="bh-icon-picker__tile" htmlFor={optionId}>
                <span className="bh-icon-picker__glyph" aria-hidden="true">
                  {icon.icon}
                </span>
                <span className="bh-visually-hidden">{icon.name}</span>
              </label>
            </div>
          );
        })}
      </div>

      {matches.length === 0 && <p className="bh-field__description">No icon matches “{query}”.</p>}

      <p className="bh-visually-hidden" role="status" aria-live="polite">
        {query ? `${matches.length} icons` : ''}
      </p>
    </fieldset>
  );
}
