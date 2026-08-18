import type { ReactNode } from 'react';

import './UserProfile.css';
import { Avatar } from '../Avatar/Avatar';
import { Menu, type MenuItem } from '../Menu/Menu';

/**
 * Who is signed in, and what they can do about it — the last slot in the app
 * bar, and the one place a user checks when a screen shows the wrong data.
 *
 * Two rules it enforces rather than suggests. The name is always available as
 * text, not only as an avatar, because "which account am I in" cannot be
 * answered by two initials in a circle. And the identity that disambiguates
 * accounts — the e-mail, the tenant — is shown next to the name, because
 * people hold several accounts on the same product and one avatar looks
 * identical in all of them.
 */
export type UserProfileProps = {
  name: string;
  /** E-mail, tenant, or role. What tells two accounts apart. */
  secondary?: string;
  avatarSrc?: string;
  /** Account actions. Sign out belongs last. */
  items?: MenuItem[];
  /** Compact hides the text and leaves the avatar. Only where space forces it. */
  compact?: boolean;
  /** Small status line, e.g. a plan or environment tag. */
  badge?: ReactNode;
};

export function UserProfile({
  name,
  secondary,
  avatarSrc,
  items,
  compact = false,
  badge,
}: UserProfileProps) {
  const identity = (
    <>
      <Avatar name={name} src={avatarSrc} size={compact ? 'sm' : 'md'} decorative />
      {!compact && (
        <span className="bh-user-profile__text">
          <span className="bh-user-profile__name">{name}</span>
          {secondary && <span className="bh-user-profile__secondary">{secondary}</span>}
        </span>
      )}
      {badge && <span className="bh-user-profile__badge">{badge}</span>}
    </>
  );

  if (!items || items.length === 0) {
    return <div className="bh-user-profile">{identity}</div>;
  }

  return (
    <Menu
      label={name}
      align="end"
      items={items}
      renderTrigger={(props) => (
        <button
          type="button"
          {...props}
          className="bh-user-profile bh-user-profile--button bh-focusable"
          // Compact hides the name visually, so the button says it out loud.
          aria-label={compact ? `Account: ${name}` : undefined}
        >
          {identity}
          <span className="bh-user-profile__caret" aria-hidden="true" />
        </button>
      )}
    />
  );
}
