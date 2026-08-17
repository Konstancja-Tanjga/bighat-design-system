import type { ReactNode } from 'react';

/**
 * Do / Don't blocks for the documentation.
 *
 * Two properties this has that a bulleted list of rules does not:
 *
 * 1. The examples are **live components**, not screenshots. A screenshot of
 *    guidance goes stale the moment the component changes and nobody notices,
 *    because images have no build step.
 * 2. The verdict is a word, not a colour. A green and a red frame with no label
 *    is exactly the WCAG 1.4.1 failure this system tells everyone else not to
 *    ship.
 *
 * Each block takes a `reason`, not just an instruction. "Don't do X" gets
 * argued with; "don't do X because a screen reader user never hears the failure"
 * gets followed.
 */

const frame = (accent: string): React.CSSProperties => ({
  border: `1px solid ${accent}`,
  borderRadius: 10,
  overflow: 'hidden',
  background: 'var(--bh-surface-base)',
  display: 'flex',
  flexDirection: 'column',
});

const banner = (accent: string, tint: string): React.CSSProperties => ({
  background: tint,
  color: accent,
  padding: '8px 14px',
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  borderBottom: `1px solid ${accent}`,
});

const stage: React.CSSProperties = {
  padding: 20,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  alignItems: 'center',
  background: 'var(--bh-surface-sunken)',
  minHeight: 72,
};

const caption: React.CSSProperties = {
  padding: '12px 14px 16px',
  fontSize: 14,
  lineHeight: 1.5,
  color: 'var(--bh-text-secondary)',
  margin: 0,
};

export function Guidance({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20,
        margin: '20px 0 28px',
      }}
    >
      {children}
    </div>
  );
}

export function Do({ children, reason }: { children: ReactNode; reason: ReactNode }) {
  return (
    <section style={frame('#0a7f55')}>
      <header style={banner('#0a7f55', '#ecfdf5')}>✓ Do</header>
      <div style={stage}>{children}</div>
      <p style={caption}>{reason}</p>
    </section>
  );
}

export function Dont({ children, reason }: { children: ReactNode; reason: ReactNode }) {
  return (
    <section style={frame('#c02a2f')}>
      <header style={banner('#c02a2f', '#fef2f2')}>✗ Don&rsquo;t</header>
      <div style={stage}>{children}</div>
      <p style={caption}>{reason}</p>
    </section>
  );
}

/**
 * A named usability heuristic, so guidance points at a published principle
 * instead of at the author's taste. Ten heuristics, Jakob Nielsen, 1994 —
 * still the most widely shared vocabulary in the industry, which is exactly
 * what makes them useful in a review argument.
 */
export function Heuristic({ name, children }: { name: string; children?: ReactNode }) {
  return (
    <aside
      style={{
        borderLeft: '3px solid var(--bh-action-primary-bg)',
        background: 'var(--bh-surface-sunken)',
        padding: '12px 16px',
        margin: '20px 0',
        borderRadius: '0 8px 8px 0',
        fontSize: 14,
        lineHeight: 1.55,
        color: 'var(--bh-text-secondary)',
      }}
    >
      <strong style={{ color: 'var(--bh-text-primary)' }}>Heuristic — {name}</strong>
      {children ? <div style={{ marginTop: 4 }}>{children}</div> : null}
    </aside>
  );
}
