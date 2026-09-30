import { useAfterMount } from '../liveRegion';

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
  radius?: 'control' | 'field' | 'surface' | 'pill';
  /** Adds the shimmer. Off under `prefers-reduced-motion`, always. */
  animated?: boolean;
};

export function Skeleton({
  width = '100%',
  height = 16,
  radius = 'control',
  animated = true,
}: SkeletonProps) {
  return (
    <span
      className={`bh-skeleton bh-skeleton--${radius}${animated ? ' bh-skeleton--animated' : ''}`}
      style={{ width, height }}
      // The group announces once on behalf of all of them, so individual
      // bones must not reach assistive technology at all - otherwise a screen
      // reader reads "blank" forty times.
      aria-hidden="true"
    />
  );
}

/**
 * Wraps a set of skeletons and makes the single announcement on their behalf.
 * `label` is what a screen reader user hears instead of the visual placeholder.
 */
export function SkeletonGroup({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  // The bones draw at once; the label joins the live region one render after
  // mount, which is what makes it heard - a region is announced for what
  // changes in it, not for what it arrives with. No aria-busy: it held the
  // announcement back and nothing ever cleared it.
  const mounted = useAfterMount();
  return (
    <div className={className} role="status">
      {mounted && <span className="bh-visually-hidden">{label}</span>}
      {children}
    </div>
  );
}
