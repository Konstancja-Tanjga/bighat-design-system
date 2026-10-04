import { useId, useRef, useState } from 'react';

import { AppBar } from '../components/AppBar/AppBar';
import { AppShell, SkipLink } from '../components/AppShell/AppShell';
import { Badge, type BadgeTone } from '../components/Badge/Badge';
import { Board, BoardCard, BoardColumn } from '../components/Board/Board';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { Button } from '../components/Button/Button';
import { Combobox } from '../components/Combobox/Combobox';
import { DateRangePicker } from '../components/DatePicker/DatePicker';
import { Divider } from '../components/Divider/Divider';
import { FilterChip } from '../components/FilterChip/FilterChip';
import { Input } from '../components/Input/Input';
import { NavRail } from '../components/NavRail/NavRail';
import { SegmentedControl } from '../components/SegmentedControl/SegmentedControl';
import { RemovableChip } from '../components/RemovableChip/RemovableChip';
import { SidePanel } from '../components/SidePanel/SidePanel';
import { Skeleton, SkeletonGroup } from '../components/Skeleton/Skeleton';
import { StateBlock } from '../components/StateBlock/StateBlock';
import { StatusBar } from '../components/StatusBar/StatusBar';
import { Toolbar } from '../components/Toolbar/Toolbar';
import { Tooltip } from '../components/Tooltip/Tooltip';
import { UserProfile } from '../components/UserProfile/UserProfile';
import { IconDoc, IconFlow, IconGrid, IconHome, IconInbox, IconStar } from './icons';
import { BigHatLogo } from './BigHatLogo';
/**
 * Template — document management board.
 *
 * A kanban view of documents moving through classification, review and
 * approval. The interesting part is not the layout; it is that moving a card
 * does not require a mouse.
 */

type ColumnId = 'inbox' | 'classifying' | 'review' | 'approved' | 'archived';

type Doc = {
  id: string;
  title: string;
  meta: string;
  column: ColumnId;
  tone: BadgeTone;
  status: string;
};

/** Everyone in the tenant — a list nobody scans, which is why Owner is a Combobox. */
const OWNERS = [
  { value: 'me', label: 'Ada Lovelace', hint: 'You' },
  { value: 'legal', label: 'Legal team', hint: '6 people' },
  { value: 'finance', label: 'Finance team', hint: '11 people' },
  { value: 'grace', label: 'Grace Hopper', hint: 'Compliance' },
  { value: 'katherine', label: 'Katherine Johnson', hint: 'Finance' },
];

const DOC_TYPES = [
  { value: 'contract', label: 'Contract' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'certificate', label: 'Certificate' },
];

const COLUMNS: Array<{ id: ColumnId; title: string; limit?: number }> = [
  { id: 'inbox', title: 'Inbox' },
  { id: 'classifying', title: 'Classifying', limit: 3 },
  { id: 'review', title: 'In review', limit: 4 },
  { id: 'approved', title: 'Approved' },
  { id: 'archived', title: 'Archived' },
];

const INITIAL: Doc[] = [
  {
    id: 'd1',
    title: 'Master services agreement — Northwind',
    meta: 'PDF · 2.4 MB · uploaded 10:12',
    column: 'inbox',
    tone: 'neutral',
    status: 'Unclassified',
  },
  {
    id: 'd2',
    title: 'Invoice INV-2041',
    meta: 'PDF · 180 KB · uploaded 09:48',
    column: 'inbox',
    tone: 'neutral',
    status: 'Unclassified',
  },
  {
    id: 'd3',
    title: 'NDA — Fabrikam Energy',
    meta: 'DOCX · 96 KB · uploaded yesterday',
    column: 'classifying',
    tone: 'info',
    status: 'Auto-classifying',
  },
  {
    id: 'd4',
    title: 'Q3 audit letter',
    meta: 'PDF · 1.1 MB · uploaded yesterday',
    column: 'classifying',
    tone: 'warning',
    status: 'Low confidence',
  },
  {
    id: 'd5',
    title: 'Supplier contract — Tailspin',
    meta: 'PDF · 3.8 MB · 2 days ago',
    column: 'review',
    tone: 'warning',
    status: 'Needs review',
  },
  {
    id: 'd6',
    title: 'Data processing addendum',
    meta: 'PDF · 420 KB · 2 days ago',
    column: 'review',
    tone: 'critical',
    status: 'Missing signature',
  },
  {
    id: 'd7',
    title: 'Framework agreement — Contoso',
    meta: 'PDF · 2.0 MB · last week',
    column: 'approved',
    tone: 'success',
    status: 'Approved',
  },
  {
    id: 'd8',
    title: 'Insurance certificate 2025',
    meta: 'PDF · 640 KB · last month',
    column: 'archived',
    tone: 'neutral',
    status: 'Archived',
  },
];

export type KanbanTemplateProps = {
  state?: 'ready' | 'loading' | 'error';
  /** Demonstrates the work-in-progress limit being exceeded. */
  overLimit?: boolean;
};

export function KanbanTemplate({ state = 'ready', overLimit = false }: KanbanTemplateProps) {
  const [docs, setDocs] = useState<Doc[]>(
    overLimit
      ? INITIAL.map((doc) => (doc.column === 'inbox' ? { ...doc, column: 'classifying' } : doc))
      : INITIAL,
  );
  const [announcement, setAnnouncement] = useState('');
  const [activeRail, setActiveRail] = useState('documents');
  const [owner, setOwner] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState('30');
  const [layout, setLayout] = useState('board');
  const [types, setTypes] = useState<Set<string>>(new Set());
  const [onlyMine, setOnlyMine] = useState(false);
  const [needsReview, setNeedsReview] = useState(false);
  const appliedRef = useRef<HTMLDivElement>(null);
  const typeGroup = useId();
  const showGroup = useId();
  const toggleType = (type: string) =>
    setTypes((current) => {
      const next = new Set(current);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  const active = [
    ...DOC_TYPES.filter((t) => types.has(t.value)).map((t) => ({
      key: t.value,
      label: t.label,
      remove: () => toggleType(t.value),
    })),
    ...(onlyMine ? [{ key: 'mine', label: 'Owned by me', remove: () => setOnlyMine(false) }] : []),
    ...(needsReview
      ? [{ key: 'review', label: 'Needs my review', remove: () => setNeedsReview(false) }]
      : []),
  ];

  const move = (docId: string, targetId: string) => {
    const doc = docs.find((d) => d.id === docId);
    const target = COLUMNS.find((c) => c.id === targetId);
    if (!doc || !target) return;

    setDocs((current) => current.map((d) => (d.id === docId ? { ...d, column: target.id } : d)));
    // Announced by the board's live region. Without this the card simply
    // vanishes from where the keyboard user was standing.
    setAnnouncement(`${doc.title} moved to ${target.title}.`);
  };

  return (
    <AppShell
      header={
        <>
          <SkipLink />
          <AppBar
            brand={<BigHatLogo height={24} />}
            title="Document Manager"
            actions={
              <>
                <Button variant="secondary" size="sm">
                  Import
                </Button>
                <Button size="sm">Upload</Button>
                <UserProfile
                  name="Ada Lovelace"
                  secondary="Legal team"
                  items={[
                    { label: 'Profile' },
                    { label: 'Notification rules' },
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
          items={[
            { id: 'home', label: 'Home', icon: <IconHome /> },
            { id: 'documents', label: 'Documents', icon: <IconGrid /> },
            { id: 'workflows', label: 'Workflows', icon: <IconFlow /> },
            { id: 'starred', label: 'Starred', icon: <IconStar /> },
          ]}
          footerItems={[{ id: 'inbox', label: 'Inbox', icon: <IconInbox />, badge: true }]}
          activeId={activeRail}
          onSelect={setActiveRail}
          ariaLabel="Product areas"
        />
      }
      sidebar={
        <SidePanel
          ariaLabel="Filters"
          title="Filters"
          width={272}
          header={<Input label="Search documents" hideLabel placeholder="Search documents" />}
        >
          <div className="bh-kanban__filters">
            {/* Chips rather than a select: types combine (contracts and
                invoices), and every option stays in view instead of behind a
                closed control. The group is named, so the chips are not four
                unrelated buttons to a keyboard reader. */}
            <div className="bh-kanban__chip-group" role="group" aria-labelledby={typeGroup}>
              <span className="bh-field__label" id={typeGroup}>
                Document type
              </span>
              <div className="bh-kanban__chips">
                {DOC_TYPES.map((type) => (
                  <FilterChip
                    key={type.value}
                    label={type.label}
                    pressed={types.has(type.value)}
                    onClick={() => toggleType(type.value)}
                  />
                ))}
              </div>
            </div>
            {/* Owner is a Combobox rather than a Select: the list is every
                person in the tenant, which is not a list anyone scans. */}
            <Combobox
              label="Owner"
              placeholder="Anyone"
              options={OWNERS}
              value={owner}
              onChange={setOwner}
            />

            <SegmentedControl
              legend="Uploaded"
              showLegend
              size="sm"
              value={uploaded}
              onChange={setUploaded}
              options={[
                { value: '7', label: '7 days' },
                { value: '30', label: '30 days' },
                { value: 'custom', label: 'Custom' },
              ]}
            />

            {uploaded === 'custom' && (
              <DateRangePicker
                legend="Upload date"
                start={{ label: 'From', defaultValue: '2026-07-18' }}
                end={{ label: 'To', defaultValue: '2026-08-18' }}
              />
            )}

            <Divider spacing="snug" />

            <div className="bh-kanban__chip-group" role="group" aria-labelledby={showGroup}>
              <span className="bh-field__label" id={showGroup}>
                Show
              </span>
              <div className="bh-kanban__chips">
                <FilterChip
                  label="Owned by me"
                  pressed={onlyMine}
                  onClick={() => setOnlyMine((value) => !value)}
                />
                <FilterChip
                  label="Needs my review"
                  pressed={needsReview}
                  onClick={() => setNeedsReview((value) => !value)}
                />
              </div>
            </div>
          </div>
        </SidePanel>
      }
    >
      <div className="bh-kanban">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Documents', href: '#' },
            { label: 'All documents' },
          ]}
        />

        <header className="bh-kanban__head">
          <h2 className="bh-kanban__title">All documents</h2>
          <p className="bh-kanban__subtitle">
            {docs.length} documents · classification runs automatically on upload
          </p>
        </header>

        <Toolbar
          ariaLabel="Document board"
          flush
          end={
            <SegmentedControl
              legend="Layout"
              size="sm"
              value={layout}
              onChange={setLayout}
              options={[
                { value: 'board', label: 'Board' },
                { value: 'list', label: 'List' },
              ]}
            />
          }
        >
          <Button size="sm" variant="secondary">
            Classify selected
          </Button>
          <Tooltip content="Download the current view as CSV">
            <Button size="sm" variant="ghost">
              Export
            </Button>
          </Tooltip>
          <Divider orientation="vertical" spacing="none" />
          <Tooltip content="Moves documents to the archive column">
            <Button size="sm" variant="ghost">
              Archive
            </Button>
          </Tooltip>
        </Toolbar>

        {/* What is applied, next to what it narrows, each removable in one
            press - the sidebar can be scrolled away or collapsed. */}
        {/* Always rendered: removing the last chip must leave focus somewhere
            that still says what happened, not on the page body. */}
        <div
          className="bh-kanban__applied"
          role="group"
          aria-label="Applied filters"
          ref={appliedRef}
          tabIndex={-1}
        >
          {active.length === 0 ? (
            <span className="bh-kanban__applied-none">No filters applied</span>
          ) : (
            active.map((filter, index) => (
              <RemovableChip
                key={filter.key}
                label={filter.label}
                removeLabel={`Remove filter ${filter.label}`}
                onRemove={() => {
                  filter.remove();
                  // The removed chip took focus with it. Move to the chip that
                  // takes its place, or to the group once none are left.
                  requestAnimationFrame(() => {
                    const group = appliedRef.current;
                    const buttons = group?.querySelectorAll<HTMLButtonElement>('button');
                    const next = buttons?.[Math.min(index, buttons.length - 1)];
                    (next ?? group)?.focus();
                  });
                }}
              />
            ))
          )}
        </div>

        {state === 'loading' && (
          <SkeletonGroup label="Loading documents" className="bh-kanban__skeleton">
            {COLUMNS.slice(0, 4).map((column) => (
              <div key={column.id} className="bh-kanban__skeleton-column">
                <Skeleton width="45%" height={13} />
                {[0, 1, 2].map((row) => (
                  <div key={row} className="bh-kanban__skeleton-card">
                    <Skeleton width="85%" height={13} />
                    <Skeleton width="60%" height={11} />
                    <Skeleton width={72} height={18} radius="pill" />
                  </div>
                ))}
              </div>
            ))}
          </SkeletonGroup>
        )}

        {state === 'error' && (
          <StateBlock
            state="error"
            density="page"
            title="We could not load your documents"
            description="The document service did not respond. Nothing has been uploaded, moved or deleted."
            action={<Button size="sm">Try again</Button>}
            diagnostics="correlation-id: 4c81de20-9a3f-4d02-b6ab-71f0a2c5e918 · HTTP 503"
          />
        )}

        {state === 'ready' && (
          <Board ariaLabel="Documents by stage" announcement={announcement}>
            {COLUMNS.map((column) => {
              const items = docs.filter((doc) => doc.column === column.id);
              return (
                <BoardColumn
                  key={column.id}
                  title={column.title}
                  count={items.length}
                  limit={column.limit}
                  empty={
                    <StateBlock
                      density="inline"
                      state="empty"
                      title="Nothing here"
                      description={
                        column.id === 'inbox'
                          ? 'Uploaded documents land here first.'
                          : 'Move a document in to get started.'
                      }
                    />
                  }
                >
                  {items.map((doc) => (
                    <BoardCard
                      key={doc.id}
                      title={doc.title}
                      onOpen={() => {}}
                      moveTargets={COLUMNS.filter((c) => c.id !== column.id).map((c) => ({
                        id: c.id,
                        label: c.title,
                      }))}
                      onMove={(targetId) => move(doc.id, targetId)}
                    >
                      <span className="bh-kanban__card-title">
                        <span className="bh-kanban__card-icon" aria-hidden="true">
                          <IconDoc />
                        </span>
                        {doc.title}
                      </span>
                      <span className="bh-kanban__card-meta">{doc.meta}</span>
                      <span className="bh-kanban__card-status">
                        <Badge tone={doc.tone}>{doc.status}</Badge>
                      </span>
                    </BoardCard>
                  ))}
                </BoardColumn>
              );
            })}
          </Board>
        )}
      </div>
      <StatusBar
        ariaLabel="Board status"
        items={[
          { label: 'Documents', value: docs.length },
          {
            label: 'Owner',
            value: OWNERS.find((entry) => entry.value === owner)?.label ?? 'Anyone',
          },
          { label: 'Uploaded', value: uploaded === 'custom' ? 'Custom range' : `${uploaded} days` },
        ]}
        // The board keeps its own live region for moves; this one carries the
        // ambient filter state, which is never urgent.
        message={
          onlyMine || needsReview
            ? 'Filtered view — some documents are hidden.'
            : 'Showing every document in this workspace.'
        }
        end={<Badge tone="neutral">{layout === 'board' ? 'Board view' : 'List view'}</Badge>}
      />
    </AppShell>
  );
}
