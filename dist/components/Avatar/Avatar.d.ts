import './Avatar.css';
/**
 * An avatar is a picture of a person, and a picture of a person is decoration
 * whenever the name is already on screen.
 *
 * So `name` is required — it produces the initials and the accessible name
 * when the avatar stands alone. `decorative` is the explicit way to say "the
 * name is right next to me", instead of every caller inventing their own
 * `alt=""`.
 */
export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarProps = {
    /** Full name. Used for initials and for the accessible name. */
    name: string;
    src?: string;
    size?: AvatarSize;
    /** True when the name is already visible next to the avatar. */
    decorative?: boolean;
};
export declare function Avatar({ name, src, size, decorative }: AvatarProps): import("react").JSX.Element;
export type AvatarGroupProps = {
    /** Names the group, e.g. "Assignees". Required — a count is not a name. */
    label: string;
    /** Avatars past this count collapse into a +n chip. */
    max?: number;
    size?: AvatarSize;
    people: Array<{
        name: string;
        src?: string;
    }>;
};
export declare function AvatarGroup({ label, max, size, people }: AvatarGroupProps): import("react").JSX.Element;
//# sourceMappingURL=Avatar.d.ts.map