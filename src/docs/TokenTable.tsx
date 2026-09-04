import { contrast, tokens } from '../../dist/tokens';
import { contrastRatio } from '../tokens/contrast';

/**
 * Documentation rendered from the token source rather than transcribed from
 * it. A table of hex values typed into MDX is out of date the first time
 * someone tunes the palette, and nobody notices because documentation has no
 * build step. This one does.
 */

type Entry = { path: string; light: string; dark: string };

/**
 * 4.0 resolves both themes into one flat record keyed by dotted path, so the
 * recursive flatten this used to need is gone — the shape the generator emits
 * is already the shape the table renders.
 */
function entriesFor(group: string): Entry[] {
  return Object.entries(tokens)
    .filter(([path]) => path.startsWith(`${group}.`))
    .map(([path, value]) => ({ path, light: value.light, dark: value.dark }));
}

const isColour = (value: string) => value.startsWith('#');

const cell: React.CSSProperties = {
  padding: '8px 12px',
  borderBottom: '1px solid var(--bh-border-subtle)',
  textAlign: 'left',
  verticalAlign: 'middle',
};

export function TokenTable({ group }: { group: string }) {
  const entries = entriesFor(group);

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
        {entries.map(({ path, light, dark }) => {
          const cssName = `--bh-${path
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase()
            .replace(/\./g, '-')}`;
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
                <Swatch value={light} />
              </td>
              <td style={cell}>
                <Swatch value={dark} />
              </td>
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
        {contrast.pairs.map(([fg, bg, requirement]) => {
          const name = `${fg} on ${bg}`;
          const light = contrastRatio(tokens[fg].light, tokens[bg].light);
          const dark = contrastRatio(tokens[fg].dark, tokens[bg].dark);
          const threshold = contrast.thresholds[requirement];

          return (
            <tr key={name}>
              <td style={{ ...cell, fontFamily: 'ui-monospace, monospace' }}>{name}</td>
              <td style={{ ...cell, color: 'var(--bh-text-muted)' }}>
                {threshold}:1 · {requirement}
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
