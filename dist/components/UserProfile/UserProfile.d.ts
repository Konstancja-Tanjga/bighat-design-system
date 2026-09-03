import type { ReactNode } from 'react';
import './UserProfile.css';
import { type MenuItem } from '../Menu/Menu';
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
export declare function UserProfile({ name, secondary, avatarSrc, items, compact, badge, }: UserProfileProps): import("react").JSX.Element;
//# sourceMappingURL=UserProfile.d.ts.map