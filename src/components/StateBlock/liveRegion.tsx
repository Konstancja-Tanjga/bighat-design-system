import { useEffect, useState, type ReactNode } from 'react';

/**
 * True once the browser has painted at least one frame since mount.
 *
 * A live region is announced for what changes inside it, and most screen
 * readers stay silent about a role="status" that arrives with its words
 * already in it. One React render later is not enough to count as a change:
 * browsers batch accessibility-tree updates per rendering pass, so two tasks
 * before a frame look like one. Two animation frames put a paint between the
 * empty region and its words. Internal - not exported from the package.
 */
export function useAfterPaint(): boolean {
  const [painted, setPainted] = useState(false);
  useEffect(() => {
    const raf =
      typeof requestAnimationFrame === 'function'
        ? requestAnimationFrame
        : (callback: FrameRequestCallback) =>
            setTimeout(() => callback(Date.now()), 16) as unknown as number;
    const cancel =
      typeof cancelAnimationFrame === 'function'
        ? cancelAnimationFrame
        : (id: number) => clearTimeout(id);
    let inner = 0;
    const outer = raf(() => {
      inner = raf(() => setPainted(true));
    });
    return () => {
      cancel(outer);
      cancel(inner);
    };
  }, []);
  return painted;
}

/**
 * A visually hidden live region for one announcement. Key it by what it
 * announces, so a change of state mounts a fresh region rather than reusing
 * one that already holds words.
 *
 * - status mounts empty and receives its words after a paint.
 * - alert is inserted with its words: an alert is announced on insertion, and
 *   an empty alert, even for a frame, is the riskier sequence.
 */
export function Announcement({
  role,
  children,
}: {
  role: 'status' | 'alert';
  children: ReactNode;
}) {
  const painted = useAfterPaint();
  return (
    <span className="bh-visually-hidden" role={role}>
      {role === 'alert' || painted ? children : null}
    </span>
  );
}
