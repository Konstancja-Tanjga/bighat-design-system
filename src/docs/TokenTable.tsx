import { contrastPairs, contrastRatio, size, themes, WCAG_AA } from '../tokens';

/**
 * Documentation rendered from the token source rather than transcribed from
 * it. A table of hex values typed into MDX is out of date the first time
 * someone tunes the palette, and nobody notices because documentation has no
 * build step. This one does.
 */

type Entry = { path: string; value: string };

function flatten(value: unknown, path: string[] = []): Entry[] {
  if (typeof value === 'string') return [{ path: path.join('.'), value }];
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).flatMap(([key, child]) => flatten(child, [...path, key]));
  }
  return [];
}

const isColour = (value: string) => value.startsWith('#');

const cell: React.CSSProperties = {
  padding: '8px 12px',
  borderBottom: '1px solid var(--bh-border-subtle)',
  textAlign: 'left',
  verticalAlign: 'middle',
};

export function TokenTable({ group }: { group: string }) {
  const source: Record<string, unknown> = { ...themes.light, ...size };
  const entries = flatten(source[group], [group]);

  if (entries.length === 0) return <p>No tokens in “{group}”.</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, margin: '16px 0' }}>
      <caption style={{ ...cell, fontWeight: 600, fontSize: 14, borderBottom: 0 }}>{group}</caption>
      <thead>
        <tr>
          <th style={cell}>Token</th>
          <th style={cell}>CSS variable</th>
          <th style={cell}>Light</th>
          <th style={cell}>Dark</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(({ path, value }) => {
          const cssName = `--bh-${path
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase()
            .replace(/\./g, '-')}`;
          const darkEntry = flatten({ ...themes.dark, ...size }[group as never], [group]).find(
            (entry) => entry.path === path,
          );

          return (
            <tr key={path}>
              <td style={{ ...cell, fontFamily: 'ui-monospace, monospace' }}>{path}</td>
              <td
                style={{
                  ...cell,
                  fontFamily: 'ui-monospace, monospace',
                  color: 'var(--bh-text-muted)',
                }}
              >
                {cssName}
              </td>
              <td style={cell}>
                <Swatch value={value} />
              </td>
              <td style={cell}>{darkEntry && <Swatch value={darkEntry.value} />}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Swatch({ value }: { value: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {isColour(value) && (
        <span
          aria-hidden="true"
          style={{
            width: 18,
            height: 18,
            borderRadius: 4,
            background: value,
            border: '1px solid var(--bh-border-strong)',
            flex: 'none',
          }}
        />
      )}
      <code style={{ fontSize: 12 }}>{value}</code>
    </span>
  );
}

export function ContrastTable() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, margin: '16px 0' }}>
      <thead>
        <tr>
          <th style={cell}>Pair</th>
          <th style={cell}>Requirement</th>
          <th style={cell}>Light</th>
          <th style={cell}>Dark</th>
        </tr>
      </thead>
      <tbody>
        {contrastPairs.map((pair) => {
          const light = contrastRatio(pair.fg(themes.light), pair.bg(themes.light));
          const dark = contrastRatio(pair.fg(themes.dark), pair.bg(themes.dark));
          const threshold = WCAG_AA[pair.requirement];

          return (
            <tr key={pair.name}>
              <td style={{ ...cell, fontFamily: 'ui-monospace, monospace' }}>{pair.name}</td>
              <td style={{ ...cell, color: 'var(--bh-text-muted)' }}>
                {threshold}:1 · {pair.requirement}
              </td>
              <td style={cell}>
                <Ratio value={light} threshold={threshold} />
              </td>
              <td style={cell}>
                <Ratio value={dark} threshold={threshold} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Ratio({ value, threshold }: { value: number; threshold: number }) {
  const passes = value >= threshold;
  return (
    <span
      style={{ color: passes ? 'var(--bh-status-success-fg)' : 'var(--bh-status-critical-fg)' }}
    >
      {/* The word, not just the colour — this table would be its own bad example. */}
      {value.toFixed(2)}:1 {passes ? 'pass' : 'FAIL'}
    </span>
  );
}
