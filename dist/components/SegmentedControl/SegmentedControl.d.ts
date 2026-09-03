import { type ReactNode } from 'react';
import './SegmentedControl.css';
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
    size?: 'sm' | 'md';
    fullWidth?: boolean;
};
export declare function SegmentedControl({ legend, showLegend, options, value, onChange, size, fullWidth, }: SegmentedControlProps): import("react").JSX.Element;
//# sourceMappingURL=SegmentedControl.d.ts.map