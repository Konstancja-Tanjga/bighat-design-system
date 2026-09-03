import type { ReactNode } from 'react';
import './AppBar.css';
/**
 * The top bar.
 *
 * Three slots, in reading order: brand, title, actions. The constraint worth
 * keeping is that `title` names the *screen*, not the product — the product is
 * already in `brand`, and repeating it costs the one horizontal strip where a
 * user looks to find out where they are.
 */
export type AppBarProps = {
    /** Logo or wordmark. Keep it to an image or short text. */
    brand?: ReactNode;
    /** Names the current screen. Rendered as the page's `<h1>` unless disabled. */
    title?: ReactNode;
    /**
     * `false` when the screen already has a visible `<h1>` further down — two of
     * them is a worse outcome than a bar with no heading semantics.
     */
    titleAsHeading?: boolean;
    /** Search, filters — anything that acts on the current screen. */
    center?: ReactNode;
    /** Trailing controls. Primary action last, closest to the reading exit. */
    actions?: ReactNode;
};
export declare function AppBar({ brand, title, titleAsHeading, center, actions }: AppBarProps): import("react").JSX.Element;
//# sourceMappingURL=AppBar.d.ts.map