/**
 * A value the reader has already chosen, with a way to take it back: a tag on a
 * document, a recipient on a message, one term in an applied search.
 *
 * Deliberately a different component from `FilterChip` rather than a
 * `removable` prop on it. A filter chip is one control that is on or off; this
 * is a label with a button beside it, and the button's name is not the chip's
 * text. One component covering both would have to lie about one of them — and
 * the lie lands in the accessibility tree, where nobody looks.
 *
 * The remove button is named for what it removes. "×" is not a name, and a row
 * of eight chips announced as eight identical "Remove" buttons is a list the
 * reader has to leave the chip to navigate.
 */
export type RemovableChipProps = {
  /** The visible text, and the stem of the remove button's name. */
  label: string;
  onRemove: () => void;
  /**
   * The remove button's accessible name. Defaults to `Remove {label}`. Pass it
   * when the noun needs saying — "Remove tag Finance" rather than "Remove
   * Finance", which reads like removing the department.
   */
  removeLabel?: string;
  disabled?: boolean;
};

export function RemovableChip({ label, onRemove, removeLabel, disabled }: RemovableChipProps) {
  const name = removeLabel ?? `Remove ${label}`;

  return (
    <span className="bh-chip bh-chip--removable">
      <span className="bh-chip__label">{label}</span>
      <button
        type="button"
        className="bh-chip__remove bh-focusable"
        aria-label={name}
        disabled={disabled}
        onClick={onRemove}
      >
        <span aria-hidden="true">×</span>
      </button>
    </span>
  );
}
