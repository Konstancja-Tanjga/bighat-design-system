import type { Size } from '../../tokens/vocabulary';

import { useState } from 'react';

/**
 * An avatar is a picture of a person, and a picture of a person is decoration
 * whenever the name is already on screen.
 *
 * So `name` is required — it produces the initials and the accessible name
 * when the avatar stands alone. `decorative` is the explicit way to say "the
 * name is right next to me", instead of every caller inventing their own
 * `alt=""`.
 */
export type AvatarSize = Size;

/** The four person colours. None is a status colour, so none reads as one. */
export type AvatarTone = 'violet' | 'teal' | 'plum' | 'olive';
const tones: AvatarTone[] = ['violet', 'teal', 'plum', 'olive'];

export type AvatarProps = {
  /** Full name. Used for initials and for the accessible name. */
  name: string;
  src?: string;
  size?: AvatarSize;
  /** True when the name is already visible next to the avatar. */
  decorative?: boolean;
  /**
   * `auto`, the default, picks the person's colour from their name, so the
   * same person has the same colour on every screen. `neutral` is the grey
   * disc, for a list where colour would be noise. Colour is never a status.
   */
  tone?: 'auto' | 'neutral' | AvatarTone;
};

/** Two initials at most: more is unreadable at 24px and wrong more often. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

/**
 * A stable colour from a name: the same string always lands on the same tone,
 * independent of where or in which order it renders. FNV-1a, because it is
 * short and spreads short strings well enough for four buckets.
 */
export function avatarTone(name: string): AvatarTone {
  let hash = 0x811c9dc5;
  for (const char of name.trim().toLowerCase()) {
    hash ^= char.codePointAt(0)!;
    hash = Math.imul(hash, 0x01000193);
  }
  return tones[(hash >>> 0) % tones.length]!;
}

export function Avatar({ name, src, size = 'md', decorative = false, tone = 'auto' }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;
  const resolved = tone === 'auto' ? avatarTone(name) : tone;

  return (
    <span
      className={`bh-avatar bh-avatar--${size}${resolved === 'neutral' ? '' : ` bh-avatar--${resolved}`}`}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : name}
      aria-hidden={decorative || undefined}
    >
      {showImage ? (
        // The image carries no alt text of its own: the wrapper already names
        // it, and two names on one avatar is the duplicate every audit finds.
        <img src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        <span className="bh-avatar__initials">{initials(name)}</span>
      )}
    </span>
  );
}

export type AvatarGroupProps = {
  /** Names the group, e.g. "Assignees". Required — a count is not a name. */
  label: string;
  /** Avatars past this count collapse into a +n chip. */
  max?: number;
  size?: AvatarSize;
  people: Array<{ name: string; src?: string }>;
};

export function AvatarGroup({ label, max = 4, size = 'md', people }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const overflow = people.length - shown.length;

  return (
    <span className="bh-avatar-group" role="group" aria-label={`${label}: ${people.length}`}>
      {shown.map((person) => (
        <Avatar key={person.name} name={person.name} src={person.src} size={size} />
      ))}
      {overflow > 0 && (
        <span className={`bh-avatar bh-avatar--${size} bh-avatar--overflow`} aria-hidden="true">
          +{overflow}
        </span>
      )}
    </span>
  );
}
