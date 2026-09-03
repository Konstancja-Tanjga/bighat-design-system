import { type ReactNode } from 'react';
import '../Input/Input.css';
import './Combobox.css';
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
export declare function Combobox({ label, options, value, onChange, placeholder, description, error, disabled, filter, emptyMessage, }: ComboboxProps): import("react").JSX.Element;
//# sourceMappingURL=Combobox.d.ts.map