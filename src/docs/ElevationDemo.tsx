import type { CSSProperties } from 'react';

import { cssVar, type TokenPath } from '../../dist/tokens';

/**
 * Live specimens for the Elevation & materials page. Every value is a custom
 * property, so the tiles follow the theme toolbar - a screenshot of the scale
 * would show one theme and go stale the first time a shadow is tuned.
 */

const caption: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  fontSize: 12,
  color: cssVar('text.muted'),
};

const code: CSSProperties = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 12,
  fontWeight: 600,
  color: cssVar('text.primary'),
};

const levels: { token: TokenPath; use: string }[] = [
  { token: 'elevation.flat', use: 'On the page' },
  { token: 'elevation.raised', use: 'Card, list container' },
  { token: 'elevation.floating', use: 'Hovered card, toast' },
  { token: 'elevation.overlay', use: 'Menu, popover, listbox' },
  { token: 'elevation.modal', use: 'Dialog, side panel' },
];

export function ElevationScale() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 28,
        padding: 28,
        margin: '16px 0',
        borderRadius: cssVar('radius.surface'),
        background: cssVar('surface.sunken'),
      }}
    >
      {levels.map(({ token, use }) => (
        <div key={token} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              height: 88,
              borderRadius: cssVar('radius.surface'),
              background: token === 'elevation.flat' ? 'transparent' : cssVar('surface.raised'),
              boxShadow:
                token === 'elevation.flat'
                  ? `0 0 0 1px ${cssVar('border.hairline')}`
                  : cssVar(token),
            }}
          />
          <div style={caption}>
            <span style={code}>{token}</span>
            {use}
          </div>
        </div>
      ))}
    </div>
  );
}

const materials = [
  { name: 'thin', use: 'Tooltip, a control over an image' },
  { name: 'regular', use: 'Menu, popover, toast' },
  { name: 'thick', use: 'Dialog, side panel' },
  { name: 'chrome', use: 'App bar, sticky header' },
] as const;

/** Glass needs something behind it; on an empty page a material is just grey. */
const backdrop: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  margin: '16px 0',
  padding: 28,
  borderRadius: cssVar('radius.modal'),
  background: '#152a66',
};

const blob = (size: number, colour: string, left: string, top: number): CSSProperties => ({
  position: 'absolute',
  width: size,
  height: size,
  left,
  top,
  borderRadius: '50%',
  background: colour,
});

export function MaterialScale() {
  return (
    <div style={backdrop}>
      <div aria-hidden style={blob(180, '#34d399', '8%', 40)} />
      <div aria-hidden style={blob(150, '#fbbf24', '38%', -40)} />
      <div aria-hidden style={blob(170, '#f87171', '62%', 70)} />
      <div aria-hidden style={blob(130, '#5b87fb', '86%', -10)} />
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: 20,
        }}
      >
        {materials.map(({ name, use }) => (
          <div
            key={name}
            style={{
              minHeight: 110,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: cssVar('radius.surface'),
              background: cssVar(`material.${name}.bg` as TokenPath),
              backdropFilter: `blur(${cssVar(`material.${name}.blur` as TokenPath)}) saturate(${cssVar('material.saturation')})`,
              boxShadow: `${cssVar('material.rim')}, ${cssVar('elevation.overlay')}`,
            }}
          >
            <span style={code}>material.{name}</span>
            <span style={{ ...caption, color: cssVar('text.secondary') }}>{use}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
