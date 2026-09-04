import { useState } from 'react';

import { Accordion, AccordionItem } from '../components/Accordion/Accordion';
import { AppBar } from '../components/AppBar/AppBar';
import { AppShell, SkipLink } from '../components/AppShell/AppShell';
import { Badge } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Composer } from '../components/Composer/Composer';
import { Divider } from '../components/Divider/Divider';
import { Input } from '../components/Input/Input';
import { List, ListItem } from '../components/List/List';
import { NavGroup, NavItem } from '../components/NavList/NavList';
import { NavRail } from '../components/NavRail/NavRail';
import { Progress } from '../components/Progress/Progress';
import { ScrollArea } from '../components/ScrollArea/ScrollArea';
import { SidePanel } from '../components/SidePanel/SidePanel';
import { Skeleton, SkeletonGroup } from '../components/Skeleton/Skeleton';
import { StateBlock } from '../components/StateBlock/StateBlock';
import { StatusBar } from '../components/StatusBar/StatusBar';
import { Tab, TabList, TabPanel, Tabs } from '../components/Tabs/Tabs';
import { Tooltip } from '../components/Tooltip/Tooltip';
import { UserProfile } from '../components/UserProfile/UserProfile';
import {
  IconAttach,
  IconBrief,
  IconChart,
  IconDoc,
  IconFlow,
  IconGrid,
  IconHome,
  IconInbox,
  IconList,
  IconMic,
  IconSparkle,
  IconStar,
  IconTrend,
} from './icons';
/**
 * Template — conversational analysis workspace.
 *
 * A template is not a component. It is an argument about which components
 * belong together and in what arrangement, held in one file so a product team
 * can copy it and start from a screen that already handles its own states.
 *
 * Everything here is assembled from the system: nothing is styled inline, no
 * colour appears outside a semantic token, and the three data states are
 * `StateBlock` and `Skeleton` rather than three bespoke inventions.
 */

const RAIL = [
  { id: 'home', label: 'Home', icon: <IconHome /> },
  { id: 'workspaces', label: 'Workspaces', icon: <IconGrid /> },
  { id: 'reports', label: 'Reports', icon: <IconChart /> },
  { id: 'chat', label: 'AI Chat', icon: <IconSparkle /> },
  { id: 'pipelines', label: 'Pipelines', icon: <IconFlow /> },
  { id: 'trends', label: 'Trends', icon: <IconTrend /> },
  { id: 'saved', label: 'Saved', icon: <IconStar /> },
];

const RAIL_FOOTER = [{ id: 'inbox', label: 'Inbox', icon: <IconInbox />, badge: true }];

const PINNED = [
  { id: 'p1', label: 'EMEA revenue spike — week 9', subline: '10 sources · updated 2h ago' },
  { id: 'p2', label: 'Churn drivers, enterprise tier', subline: '4 sources · yesterday' },
  { id: 'p3', label: 'Invoice ageing by region', subline: '2 sources · Monday' },
];

const RECENT = [
  { id: 'r1', label: 'Why did DACH margin drop in Q3?', subline: '3 sources · 1h ago' },
  { id: 'r2', label: 'Top 20 accounts by open balance', subline: '1 source · 4h ago' },
  { id: 'r3', label: 'Forecast accuracy, last 6 quarters', subline: '6 sources · Tuesday' },
  { id: 'r4', label: 'Seasonality in Nordics orders', subline: '2 sources · last week' },
];

const SUGGESTIONS = [
  {
    title: 'What drove the EMEA spike?',
    detail: 'Break week 9 revenue down by country, product and channel.',
  },
  {
    title: 'Is this spike repeatable?',
    detail: 'Compare against the same week in the previous three years.',
  },
  {
    title: 'Which accounts moved most?',
    detail: 'Rank customers by change in booked revenue week over week.',
  },
  {
    title: 'Did discounting change?',
    detail: 'Average realised discount, week 8 versus week 9.',
  },
  {
    title: 'Any data quality caveats?',
    detail: 'Late-arriving rows and currency conversion dates.',
  },
  {
    title: 'Draft the weekly brief',
    detail: 'One page for the regional leadership call on Thursday.',
  },
];

const MEMORY = [
  'Fiscal calendar: 4-4-5, week 9 ends 2 March',
  'Revenue means booked, net of credit notes',
  '“EMEA” excludes Turkey — finance definition',
  'Currency converted at month-end rate',
  'Q3 restatement applied to 2025 only',
  'Northwind moved to annual billing in week 7',
];

const MODES = [
  { id: 'ask', label: 'Ask', icon: <IconSparkle /> },
  { id: 'plan', label: 'Plan first', icon: <IconList /> },
  { id: 'chart', label: 'Make a chart', icon: <IconChart /> },
  { id: 'brief', label: 'Brief me', icon: <IconBrief /> },
];

export type AiChatTemplateProps = {
  /** Which of the three data states the working area is in. */
  state?: 'ready' | 'loading' | 'error';
  /** Hides the explainer card — it is dismissible and should stay dismissed. */
  showExplainer?: boolean;
};

export function AiChatTemplate({ state = 'ready', showExplainer = true }: AiChatTemplateProps) {
  const [activeRail, setActiveRail] = useState('chat');
  const [activeChat, setActiveChat] = useState('p1');
  const [mode, setMode] = useState('ask');
  const [explainerOpen, setExplainerOpen] = useState(showExplainer);

  return (
    <AppShell
      header={
        <>
          <SkipLink />
          <AppBar
            brand={
              <>
                <span className="bh-ai__logo" aria-hidden="true">
                  bh<sup>◆</sup>
                </span>
                <span className="bh-visually-hidden">Big Hat Poland</span>
              </>
            }
            title="AI Chat"
            actions={
              <>
                <Button size="sm">New analysis</Button>
                <UserProfile
                  name="Ada Lovelace"
                  secondary="Nordwind sp. z o.o."
                  items={[
                    { label: 'Profile' },
                    { label: 'Data sources' },
                    { label: 'Sign out', tone: 'critical' },
                  ]}
                />
              </>
            }
          />
        </>
      }
      rail={
        <NavRail
          items={RAIL}
          footerItems={RAIL_FOOTER}
          activeId={activeRail}
          onSelect={setActiveRail}
          ariaLabel="Product areas"
        />
      }
      sidebar={
        <SidePanel
          ariaLabel="Conversations"
          width={280}
          header={
            <>
              <Button fullWidth size="sm">
                New chat
              </Button>
              <Input label="Search conversations" hideLabel placeholder="Search conversations" />
            </>
          }
        >
          <NavGroup label="Pinned">
            {PINNED.map((item) => (
              <NavItem
                key={item.id}
                item={{ ...item, icon: <IconDoc /> }}
                active={item.id === activeChat}
                onSelect={setActiveChat}
              />
            ))}
          </NavGroup>

          <NavGroup label="Recent">
            {RECENT.map((item) => (
              <NavItem
                key={item.id}
                item={{ ...item, icon: <IconDoc /> }}
                active={item.id === activeChat}
                onSelect={setActiveChat}
              />
            ))}
          </NavGroup>
        </SidePanel>
      }
      aside={
        <SidePanel ariaLabel="Working memory" side="end" title="Working memory" width={280}>
          <p className="bh-ai__memory-intro">
            Facts AI Chat is holding for this conversation. Everything here shapes the answers below
            it.
          </p>

          {/* A List, not a <ul> with a class: the facts are records with a
              leading marker, and the list announces its own length. */}
          <ScrollArea ariaLabel="Working memory facts" maxHeight={220}>
            <List ariaLabel="Facts in working memory" dividers={false}>
              {MEMORY.map((fact) => (
                <ListItem key={fact} leading="•" title={fact} />
              ))}
            </List>
          </ScrollArea>

          <Divider spacing="snug" />

          <Accordion headingLevel={3}>
            <AccordionItem id="sources" title="Sources" meta="10 connected">
              Warehouse, billing exports and the CRM. Every answer names the tables it read.
            </AccordionItem>
            <AccordionItem id="caveats" title="Known caveats" meta="2">
              Late-arriving rows are excluded, and Q3 restatements apply to 2025 only.
            </AccordionItem>
          </Accordion>
        </SidePanel>
      }
    >
      <div className="bh-ai">
        <header className="bh-ai__head">
          <h2 className="bh-ai__title">EMEA revenue spike — week 9</h2>
          <div className="bh-ai__chips">
            <Badge tone="neutral">Read-only mode</Badge>
            <Badge tone="info">10 sources connected</Badge>
            <Divider orientation="vertical" spacing="none" />
            <span className="bh-ai__governance">Governance enforced by Admin</span>
          </div>
        </header>

        {explainerOpen && state === 'ready' && (
          <Card>
            <div className="bh-ai__explainer">
              <div className="bh-ai__explainer-head">
                <p className="bh-ai__eyebrow">How AI Chat works</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExplainerOpen(false)}
                  aria-label="Dismiss explanation"
                >
                  ✕
                </Button>
              </div>
              <h3 className="bh-ai__explainer-title">An assistant that shows its work.</h3>
              <p className="bh-ai__explainer-body">
                Ask anything about the business in plain English. AI Chat plans the analysis,
                queries your live data, and returns the answer together with the chart, the SQL it
                ran, and any caveats it found on the way.
              </p>
            </div>
          </Card>
        )}

        <section className="bh-ai__suggestions" aria-labelledby="bh-ai-suggest">
          <h3 className="bh-ai__section-title" id="bh-ai-suggest">
            What should we look into?
          </h3>

          {state === 'loading' && <Progress label="Contacting your data sources" size="sm" />}

          {state === 'loading' && (
            <SkeletonGroup label="Loading suggestions" className="bh-ai__grid">
              {Array.from({ length: 6 }, (_, index) => (
                <Card key={index} padding="snug">
                  <Skeleton width="70%" height={14} />
                  <div style={{ height: 10 }} />
                  <Skeleton width="100%" height={12} />
                  <div style={{ height: 6 }} />
                  <Skeleton width="55%" height={12} />
                </Card>
              ))}
            </SkeletonGroup>
          )}

          {state === 'error' && (
            <StateBlock
              state="error"
              title="We could not reach your data sources"
              description="The warehouse connection timed out. Nothing has been queried and nothing has changed."
              action={<Button size="sm">Try again</Button>}
              secondaryAction={
                <Button size="sm" variant="ghost">
                  Check connections
                </Button>
              }
              diagnostics="correlation-id: 8f2c1a94-4b7e-4d31-9a55-0c9d2f6e1b03 · HTTP 504"
            />
          )}

          {state === 'ready' && (
            <Tabs defaultTab="suggested">
              <TabList ariaLabel="Starting points">
                <Tab id="suggested" badge={SUGGESTIONS.length}>
                  Suggested
                </Tab>
                <Tab id="recent" badge={RECENT.length}>
                  Recent questions
                </Tab>
              </TabList>

              <TabPanel id="suggested">
                <div className="bh-ai__grid">
                  {SUGGESTIONS.map((suggestion) => (
                    <Card
                      key={suggestion.title}
                      padding="snug"
                      onClick={() => {}}
                      ariaLabel={`Ask: ${suggestion.title}`}
                    >
                      <span className="bh-ai__suggestion-title">{suggestion.title}</span>
                      <span className="bh-ai__suggestion-detail">{suggestion.detail}</span>
                    </Card>
                  ))}
                </div>
              </TabPanel>

              <TabPanel id="recent">
                <List ariaLabel="Recent questions">
                  {RECENT.map((item) => (
                    <ListItem
                      key={item.id}
                      title={item.label}
                      description={item.subline}
                      onSelect={() => setActiveChat(item.id)}
                    />
                  ))}
                </List>
              </TabPanel>
            </Tabs>
          )}
        </section>
      </div>

      <div className="bh-ai__composer">
        <Composer
          label="Ask anything about the business"
          placeholder="Ask anything about the business"
          modes={MODES}
          activeMode={mode}
          onModeChange={setMode}
          submitLabel="Ask"
          hint="Answers come with the SQL that produced them. Read-only — AI Chat cannot change your data."
          tools={
            <>
              <Tooltip content="Attach a file">
                <Button variant="ghost" size="sm" aria-label="Attach a file">
                  <IconAttach />
                </Button>
              </Tooltip>
              <Tooltip content="Dictate">
                <Button variant="ghost" size="sm" aria-label="Dictate">
                  <IconMic />
                </Button>
              </Tooltip>
            </>
          }
        />
      </div>

      <StatusBar
        ariaLabel="Session status"
        items={[
          { label: 'Sources', value: '10 connected' },
          { label: 'Mode', value: MODES.find((entry) => entry.id === mode)?.label ?? 'Ask' },
        ]}
        message={
          state === 'error'
            ? 'Data sources unreachable — nothing was queried.'
            : state === 'loading'
              ? 'Planning the analysis…'
              : 'Read-only. AI Chat cannot change your data.'
        }
        end={<Badge tone="neutral">Governed workspace</Badge>}
      />
    </AppShell>
  );
}
