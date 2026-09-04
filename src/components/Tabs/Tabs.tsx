import { createContext, useContext, useId, useRef, useState, type ReactNode } from 'react';

/**
 * Tabs are a filter on one screen, not navigation between screens. If the
 * content has its own URL, it wants links.
 *
 * The keyboard model is the ARIA one and it is the part hand-rolled tabs always
 * miss: exactly one tab is in the tab order, arrows move between them, Home and
 * End jump to the ends. Tabbing out of the tab list lands in the panel, not on
 * the next tab.
 *
 * Activation follows focus, which is correct only because every panel here is
 * already rendered. If a panel is expensive to load, pass `manual` so arrows
 * move focus and Enter or Space activates.
 */
type TabsContextValue = {
  activeId: string;
  setActiveId: (id: string) => void;
  baseId: string;
  manual: boolean;
  register: (id: string) => void;
  ids: () => string[];
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(component: string) {
  const context = useContext(TabsContext);
  if (!context) throw new Error(`${component} must be rendered inside Tabs`);
  return context;
}

export type TabsProps = {
  /** Id of the tab shown first. Defaults to the first tab registered. */
  defaultTab?: string;
  value?: string;
  onChange?: (id: string) => void;
  /** Arrows move focus only; Enter or Space activates. */
  manual?: boolean;
  children: ReactNode;
};

export function Tabs({ defaultTab, value, onChange, manual = false, children }: TabsProps) {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultTab ?? '');
  const order = useRef<string[]>([]);
  // Falling back to the first registered tab keeps `defaultTab` optional
  // without setting state from a child's render pass.
  const activeId = value ?? internal;

  const context: TabsContextValue = {
    get activeId() {
      return activeId || (order.current[0] ?? '');
    },
    setActiveId: (id) => {
      if (value === undefined) setInternal(id);
      onChange?.(id);
    },
    baseId,
    manual,
    register: (id) => {
      if (!order.current.includes(id)) order.current.push(id);
    },
    ids: () => order.current,
  };

  return (
    <div className="bh-tabs">
      <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
    </div>
  );
}

export type TabListProps = {
  /** Names the tab list. Required when a screen has more than one. */
  ariaLabel: string;
  children: ReactNode;
};

export function TabList({ ariaLabel, children }: TabListProps) {
  const context = useTabs('TabList');
  const { setActiveId, manual, ids, baseId } = context;
  const ref = useRef<HTMLDivElement>(null);

  const focusTab = (id: string) => {
    const node = ref.current?.querySelector<HTMLButtonElement>(
      `#${CSS.escape(`${baseId}-tab-${id}`)}`,
    );
    node?.focus();
    if (!manual) setActiveId(id);
  };

  return (
    <div
      ref={ref}
      role="tablist"
      aria-label={ariaLabel}
      className="bh-tabs__list"
      onKeyDown={(event) => {
        const order = ids();
        const index = order.indexOf(context.activeId);
        const move = (next: number) => {
          event.preventDefault();
          focusTab(order[(next + order.length) % order.length]!);
        };

        if (event.key === 'ArrowRight') move(index + 1);
        else if (event.key === 'ArrowLeft') move(index - 1);
        else if (event.key === 'Home') move(0);
        else if (event.key === 'End') move(order.length - 1);
      }}
    >
      {children}
    </div>
  );
}

export type TabProps = {
  id: string;
  /** Short count or dot. Never the only carrier of meaning. */
  badge?: ReactNode;
  disabled?: boolean;
  children: ReactNode;
};

export function Tab({ id, badge, disabled, children }: TabProps) {
  const context = useTabs('Tab');
  // Registration first: the fallback "first tab is selected" is read from the
  // order, so destructuring activeId before this would evaluate it too early.
  context.register(id);
  const { setActiveId, baseId } = context;
  const selected = context.activeId === id;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${id}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${id}`}
      // Roving tabindex: the tab list is one tab stop, not one per tab.
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      className="bh-tabs__tab bh-focusable"
      onClick={() => setActiveId(id)}
    >
      {children}
      {badge !== undefined && <span className="bh-tabs__badge">{badge}</span>}
    </button>
  );
}

export type TabPanelProps = {
  id: string;
  children: ReactNode;
};

export function TabPanel({ id, children }: TabPanelProps) {
  const context = useTabs('TabPanel');
  const { baseId } = context;
  const selected = context.activeId === id;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${id}`}
      aria-labelledby={`${baseId}-tab-${id}`}
      // The panel takes a tab stop so keyboard users reach its content
      // directly instead of arrowing back through the tabs.
      tabIndex={0}
      hidden={!selected}
      className="bh-tabs__panel bh-focusable"
    >
      {children}
    </div>
  );
}
