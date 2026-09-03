import { type ReactNode } from 'react';
import '../Input/Input.css';
import './IconPicker.css';
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
export declare function IconPicker({ label, icons, value, onChange, searchable, columns, }: IconPickerProps): import("react").JSX.Element;
//# sourceMappingURL=IconPicker.d.ts.map