import { type InputHTMLAttributes, type ReactNode } from 'react';
import '../Input/Input.css';
import './DatePicker.css';
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
export type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id' | 'type'> & {
    label: string;
    description?: ReactNode;
    error?: string;
    /** `date` for a day, `month`, `week`, or `datetime-local` for a moment. */
    granularity?: 'date' | 'month' | 'week' | 'datetime-local';
    id?: string;
};
export declare const DatePicker: import("react").ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "id" | "type"> & {
    label: string;
    description?: ReactNode;
    error?: string;
    /** `date` for a day, `month`, `week`, or `datetime-local` for a moment. */
    granularity?: "date" | "month" | "week" | "datetime-local";
    id?: string;
} & import("react").RefAttributes<HTMLInputElement>>;
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
export declare function DateRangePicker({ legend, start, end, error }: DateRangePickerProps): import("react").JSX.Element;
//# sourceMappingURL=DatePicker.d.ts.map