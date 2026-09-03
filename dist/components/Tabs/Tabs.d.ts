import { type ReactNode } from 'react';
import './Tabs.css';
export type TabsProps = {
    /** Id of the tab shown first. Defaults to the first tab registered. */
    defaultTab?: string;
    value?: string;
    onChange?: (id: string) => void;
    /** Arrows move focus only; Enter or Space activates. */
    manual?: boolean;
    children: ReactNode;
};
export declare function Tabs({ defaultTab, value, onChange, manual, children }: TabsProps): import("react").JSX.Element;
export type TabListProps = {
    /** Names the tab list. Required when a screen has more than one. */
    ariaLabel: string;
    children: ReactNode;
};
export declare function TabList({ ariaLabel, children }: TabListProps): import("react").JSX.Element;
export type TabProps = {
    id: string;
    /** Short count or dot. Never the only carrier of meaning. */
    badge?: ReactNode;
    disabled?: boolean;
    children: ReactNode;
};
export declare function Tab({ id, badge, disabled, children }: TabProps): import("react").JSX.Element;
export type TabPanelProps = {
    id: string;
    children: ReactNode;
};
export declare function TabPanel({ id, children }: TabPanelProps): import("react").JSX.Element;
//# sourceMappingURL=Tabs.d.ts.map