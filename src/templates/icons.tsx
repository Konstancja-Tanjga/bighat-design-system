/**
 * Icons for the templates.
 *
 * Deliberately not a system component. Icon sets are a product decision —
 * teams already own a licence, a sprite, or a preference — and a design system
 * that ships its own forces every consumer to carry two.
 *
 * Every icon here is `aria-hidden` at the point of use, so none of them takes
 * a title or a label: the component that renders it supplies the name.
 */
const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const IconHome = () => (
  <svg {...base}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);

export const IconGrid = () => (
  <svg {...base}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

export const IconChart = () => (
  <svg {...base}>
    <path d="M4 20V10" />
    <path d="M10 20V4" />
    <path d="M16 20v-6" />
    <path d="M22 20H2" />
  </svg>
);

export const IconSparkle = () => (
  <svg {...base}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    <path d="M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
  </svg>
);

export const IconFlow = () => (
  <svg {...base}>
    <rect x="3" y="3" width="6" height="5" rx="1.5" />
    <rect x="15" y="9" width="6" height="5" rx="1.5" />
    <rect x="3" y="16" width="6" height="5" rx="1.5" />
    <path d="M9 5.5h3a2 2 0 0 1 2 2v4M9 18.5h3a2 2 0 0 0 2-2v-4" />
  </svg>
);

export const IconTrend = () => (
  <svg {...base}>
    <path d="M3 16l5-5 4 4 8-8" />
    <path d="M15 7h5v5" />
  </svg>
);

export const IconStar = () => (
  <svg {...base}>
    <path d="M12 4l2.5 5.1 5.5.8-4 3.9.9 5.5L12 16.7 7.1 19.3l.9-5.5-4-3.9 5.5-.8z" />
  </svg>
);

export const IconDoc = () => (
  <svg {...base} width={14} height={14}>
    <path d="M6 3h7l5 5v13H6z" />
    <path d="M13 3v5h5" />
  </svg>
);

export const IconSearch = () => (
  <svg {...base} width={15} height={15}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
);

export const IconAttach = () => (
  <svg {...base} width={16} height={16}>
    <path d="M20 11.5l-7.6 7.6a4.5 4.5 0 0 1-6.4-6.4l8-8a3 3 0 0 1 4.3 4.3l-8 8a1.5 1.5 0 0 1-2.1-2.1l7.3-7.3" />
  </svg>
);

export const IconMic = () => (
  <svg {...base} width={16} height={16}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);

export const IconList = () => (
  <svg {...base} width={15} height={15}>
    <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
  </svg>
);

export const IconBrief = () => (
  <svg {...base} width={15} height={15}>
    <rect x="3" y="5" width="18" height="15" rx="2" />
    <path d="M7 10h10M7 14h6" />
  </svg>
);

export const IconInbox = () => (
  <svg {...base}>
    <path d="M3 13h5l1.5 3h5L16 13h5" />
    <path d="M4.5 5h15l1.5 8v6H3v-6z" />
  </svg>
);
