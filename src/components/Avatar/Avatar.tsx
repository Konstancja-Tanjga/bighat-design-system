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

export type AvatarProps = {
  /** Full name. Used for initials and for the accessible name. */
  name: string;
  src?: string;
  size?: AvatarSize;
  /** True when the name is already visible next to the avatar. */
  decorative?: boolean;
};

/** Two initials at most: more is unreadable at 24px and wrong more often. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function Avatar({ name, src, size = 'md', decorative = false }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      className={`bh-avatar bh-avatar--${size}`}
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
