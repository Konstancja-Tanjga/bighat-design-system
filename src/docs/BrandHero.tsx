import type { CSSProperties } from 'react';

import { cssVar } from '../../dist/tokens';
import { BigHatLogo } from '../templates/BigHatLogo';

/**
 * The opening of the Introduction page, as the cover of the Figma library has
 * it: the logo, one sentence on what the system is, and the same screen in
 * Light and Dark.
 *
 * The logo takes its colours from the tokens (see BigHatLogo), so it follows
 * the theme toolbar like any component. The composition is an image on purpose: it shows both themes at once, and the
 * dark theme here is the whole document's, so it cannot be scoped to half a
 * page.
 */

// The system face, as on the cover and in the wordmark. Set on the elements
// themselves: the docs theme styles h1 and p directly, so inheriting loses.
const face = cssVar('fontFamily.sans');

const headline: CSSProperties = {
  fontFamily: face,
  margin: 0,
  border: 0,
  padding: 0,
  color: cssVar('text.primary'),
  fontSize: 'clamp(2rem, 1.4rem + 2.2vw, 3rem)',
  fontWeight: cssVar('textWeight.heading'),
  lineHeight: 1.08,
  letterSpacing: '-0.02em',
  textWrap: 'balance',
};

const standfirst: CSSProperties = {
  fontFamily: face,
  margin: 0,
  color: cssVar('text.secondary'),
  fontSize: cssVar('textSize.heading'),
  lineHeight: cssVar('textLeading.normal'),
};

export function BrandHero({ art }: { art: string }) {
  return (
    <header
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        alignItems: 'center',
        gap: cssVar('padding.hero'),
        margin: `0 0 ${cssVar('padding.hero')}`,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: cssVar('padding.section') }}>
        <BigHatLogo />
        <h1 style={headline}>Tokens, components, and the rules a build can check.</h1>
        <p style={standfirst}>
          Forty-six components and their tokens, in React and in a Figma library generated from the
          same files. Dark is one switch, and every component in Dev Mode shows the code a developer
          would write.
        </p>
      </div>
      <img
        src={art}
        alt="The same invoice screen built from Big Hat components twice: once in the light theme, and overlapping it, once in the dark theme."
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
    </header>
  );
}
