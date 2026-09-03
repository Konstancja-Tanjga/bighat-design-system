import './Skeleton.css';
/**
 * A placeholder for content that is on its way.
 *
 * The rule that makes skeletons help rather than hurt: use them when the shape
 * of the result is **known** — a list of eight cards, a table of ten rows.
 * They work by letting the eye settle into a layout that will not move. Used
 * for content of unknown shape they promise a layout that never arrives, which
 * is worse than a spinner.
 *
 * For a wait with no known shape, use `StateBlock state="loading"`.
 */
export type SkeletonProps = {
    width?: number | string;
    height?: number | string;
    radius?: 'control' | 'surface' | 'pill';
    /** Adds the shimmer. Off under `prefers-reduced-motion`, always. */
    animated?: boolean;
};
export declare function Skeleton({ width, height, radius, animated, }: SkeletonProps): import("react").JSX.Element;
/**
 * Wraps a set of skeletons and makes the single announcement on their behalf.
 * `label` is what a screen reader user hears instead of the visual placeholder.
 */
export declare function SkeletonGroup({ label, children, className, }: {
    label: string;
    children: React.ReactNode;
    className?: string;
}): import("react").JSX.Element;
//# sourceMappingURL=Skeleton.d.ts.map