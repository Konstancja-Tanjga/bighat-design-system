/**
 * The header on top of every component page in the Figma library, as data.
 *
 * Each page opens with the component's name, its layer and implementation
 * status, its purpose in one sentence, what it is not for, and links to its
 * Storybook page and its contract. All of it is read from the contracts in
 * spec/components, so the header is a projection of the contract, not a second
 * copy someone keeps in step by hand. Guidance that is tested and rendered live
 * — do and don't, keyboard, ARIA — stays in Storybook and is linked, not
 * copied.
 *
 * The output is what the Figma agent draws from: change a contract, run this,
 * and ask for the headers to be redrawn. The frames say so on the canvas.
 *
 *   node scripts/figma-headers.mjs > figma/headers.json
 */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const SPEC = resolve('spec/components');
const STORYBOOK =
  'https://konstancja-tanjga.github.io/bighat-design-system/?path=/docs/components-';
const REPO = 'https://github.com/Konstancja-Tanjga/bighat-design-system/blob/main/spec/components/';

// Figma page → the contracts it draws. Pages that hold no component
// (Foundations, Icons, Showcase) get no header.
const PAGES = {
  Button: ['button'],
  Badge: ['badge'],
  Input: ['input'],
  Checkbox: ['checkbox'],
  Chip: ['filter-chip', 'removable-chip'],
  Select: ['select'],
  Menu: ['menu'],
  RadioGroup: ['radio-group'],
  Switch: ['switch'],
  SegmentedControl: ['segmented-control'],
  Textarea: ['textarea'],
  Tabs: ['tabs'],
  'Tooltip & Toast': ['tooltip', 'toast'],
  Dialog: ['dialog'],
  Card: ['card'],
  'Avatar & UserProfile': ['avatar', 'user-profile'],
  'Breadcrumbs & Pagination': ['breadcrumbs', 'pagination'],
  'Progress, Skeleton & StateBlock': ['progress', 'skeleton', 'state-block'],
  NavRail: ['nav-rail'],
  'App frame': ['app-bar', 'toolbar', 'status-bar', 'side-panel'],
  Table: ['table'],
  'Accordion & Divider': ['accordion', 'divider'],
  'List & DescriptionList': ['list', 'description-list'],
  'NavList & ListView': ['nav-list', 'list-view'],
  Slider: ['slider'],
  'Combobox & DatePicker': ['combobox', 'date-picker'],
  'FileDropzone, IconPicker & ScrollArea': ['file-dropzone', 'icon-picker', 'scroll-area'],
  'Composer & Board': ['composer', 'board'],
  'Article & AppShell': ['article', 'app-shell'],
};

// The contract's status, said the way a designer asks it: where can I use this?
function where({ status, alsoImplementedIn } = {}) {
  if (status === 'react-only') return 'React';
  if (status === 'parity') return `React and ${title(alsoImplementedIn)}, at parity`;
  if (status === 'partial') return `React; ${title(alsoImplementedIn)} in part`;
  return alsoImplementedIn ? `React and ${title(alsoImplementedIn)}` : 'React';
}
const title = (word = '') => word.charAt(0).toUpperCase() + word.slice(1);

const files = new Set(readdirSync(SPEC).map((f) => f.replace(/\.json$/, '')));
const pages = Object.entries(PAGES).map(([page, contracts]) => ({
  page,
  components: contracts.map((file) => {
    if (!files.has(file)) throw new Error(`${page}: no contract spec/components/${file}.json`);
    const spec = JSON.parse(readFileSync(resolve(SPEC, `${file}.json`), 'utf8'));
    return {
      name: spec.name,
      layer: title(spec.layer),
      where: where(spec.implementations),
      purpose: spec.purpose,
      notFor: spec.notFor ?? [],
      storybook: `${STORYBOOK}${spec.name.toLowerCase()}--docs`,
      contract: `${REPO}${file}.json`,
      contractPath: `spec/components/${file}.json`,
    };
  }),
}));

// Every contract belongs to exactly one page, so a new component cannot ship
// without a header to go with it.
const drawn = Object.values(PAGES).flat();
const missing = [...files].filter((f) => !drawn.includes(f));
if (missing.length) throw new Error(`No Figma page lists: ${missing.join(', ')}`);

process.stdout.write(`${JSON.stringify(pages, null, 2)}\n`);
