export interface ColorToken {
  name: string
  hex: string
  textColor: string
  outline?: string
  pantone?: string
}

export interface FontFace {
  family: string
  weight: string | number
  file: string
}

export interface NavItem {
  label: string
  id: string
  children?: Omit<NavItem, 'children'>[]
  groupId?: string
  subId?: string
}

export interface NavGroup {
  group: string
  items: NavItem[]
}

export interface TypeScaleEntry {
  size: string
  name: string
  family: string
  weight: number
  ls: string
  lh: number
}

export interface BrandConfig {
  typeScale: TypeScaleEntry[]
  meta: {
    client: string
    nameLine1: string
    nameLine2: string
    title: string
    version: string
    date: string
    preparedBy: string
    sidebarLogoImage: string
    coverSealImage: string
  }
  specimens: {
    display96: string
    display73: string
    display64: string
    display48: string
    headline42: string
    headline32: string
    headline24: string
    headline21: string
    body18: string
    body16: string
    body14: string
    body12: string
    sentence: string
    avoidText: string
    avoidTextPart1: string
    avoidTextPart2: string
    fallbackGoogle16: string
    fallbackSystem16: string
  }
  tokens: Record<string, string>
  typography: { displayFont: string; bodyFont: string; fonts: FontFace[] }
  colors: { primary: ColorToken[]; secondary: ColorToken[] }
  nav: NavGroup[]
}

const brand: BrandConfig = {
  typeScale: [
    { size: '96px', name: 'Display XL',  family: 'Saans', weight: 600, ls: '-0.03em',  lh: 0.9  },
    { size: '73px', name: 'Display L',   family: 'Saans', weight: 600, ls: '-0.025em', lh: 0.9  },
    { size: '64px', name: 'Display M',   family: 'Saans', weight: 600, ls: '-0.02em',  lh: 0.9  },
    { size: '48px', name: 'Display S',   family: 'Saans', weight: 600, ls: '-0.015em', lh: 0.95 },
    { size: '42px', name: 'Headline XL', family: 'Saans', weight: 600, ls: '-0.01em',  lh: 1.0  },
    { size: '32px', name: 'Headline L',  family: 'Saans', weight: 600, ls: '-0.01em',  lh: 1.1  },
    { size: '24px', name: 'Headline M',  family: 'Saans', weight: 600, ls: '-0.005em', lh: 1.2  },
    { size: '21px', name: 'Headline S',  family: 'Saans', weight: 600, ls: '0',        lh: 1.2  },
    { size: '18px', name: 'Body XL',     family: 'Saans', weight: 400, ls: '0',        lh: 1.55 },
    { size: '16px', name: 'Body L',      family: 'Saans', weight: 400, ls: '0',        lh: 1.6  },
    { size: '14px', name: 'Body M',      family: 'Saans', weight: 400, ls: '0',        lh: 1.6  },
    { size: '12px', name: 'Caption',     family: 'Saans', weight: 400, ls: '0',        lh: 1.5  },
  ],

  meta: {
    client:           'Kingsway',
    nameLine1:        'Kingsway',
    nameLine2:        '',
    title:            'Brand guidelines',
    version:          'Version 1.0',
    date:             'July 2026',
    preparedBy:       'Paper Tiger',
    sidebarLogoImage: `${import.meta.env.BASE_URL}images/logos/kingsway-logo-full-dark-blue.svg`,
    coverSealImage:   `${import.meta.env.BASE_URL}images/logos/kingsway-mark-white.svg`,
  },

  specimens: {
    display96:        'Kingsway',
    display73:        'Building through search',
    display64:        'Acquire. Build. Compound.',
    display48:        'Decentralized by design',
    headline42:       'High-quality service businesses built to last',
    headline32:       'The only public search fund company in America',
    headline24:       'Kingsway compounds long-term shareholder value through talented operators and a decentralized model.',
    headline21:       'Asset-light. Growing. Profitable. Recurring.',
    body18:           'Kingsway owns and operates a collection of high-quality B2B and B2C services companies built around recurring revenues.',
    body16:           'Kingsway is the only publicly-traded US company employing the Search Fund model to acquire and build great businesses. Our decentralized model empowers talented operators to compound value over the long term.',
    body14:           'Kingsway owns and operates a collection of high-quality B2B and B2C services companies that are asset-light, growing, profitable, and that have recurring revenues. We compound long-term shareholder value through our decentralized management model, talented operators, and tax-advantaged structure.',
    body12:           'Caption. Kingsway owns and operates a collection of high-quality B2B and B2C services companies built around recurring revenues and operational excellence.',
    sentence:         'Kingsway compounds long-term shareholder value through decentralized management and talented operators.',
    avoidText:        'Kingsway acquires businesses that compound value over time.',
    avoidTextPart1:   'Kingsway',
    avoidTextPart2:   'is building through search since 2010.',
    fallbackGoogle16: 'Kingsway owns and operates a collection of high-quality B2B and B2C services companies. When brand fonts are unavailable, the Google fallback font provides a clean, modern alternative.',
    fallbackSystem16: 'Kingsway owns and operates a collection of high-quality B2B and B2C services companies. When brand fonts are unavailable, the system fallback font maintains clarity and legibility.',
  },

  tokens: {
    'primary-orange': '#F05102',
    'dark-blue':      '#082C48',
    'black':          '#010F1D',
    'white':          '#F7FAFC',
    'tan':            '#F1EBC9',
    'mid-blue':       '#3B6684',
    'pale-blue':      '#BED2E0',
  },

  typography: {
    displayFont: 'Saans',
    bodyFont:    'Saans',
    fonts: [
      { family: 'Saans', weight: 400, file: 'Saans-TRIAL-Regular.woff2'  },
      { family: 'Saans', weight: 600, file: 'Saans-TRIAL-SemiBold.woff2' },
      { family: 'Saans', weight: 700, file: 'Saans-TRIAL-Bold.woff2'     },
    ],
  },

  colors: {
    primary: [
      { name: 'Primary Orange', hex: '#F05102', textColor: '#000000', pantone: 'Orange 021 C' },
      { name: 'Dark Blue',      hex: '#082C48', textColor: '#F1EBC9', pantone: 'P 108-16 C'  },
      { name: 'Midnight Blue',  hex: '#010F1D', textColor: '#BED2E0' },
      { name: 'White',          hex: '#F7FAFC', textColor: '#000000', outline: '1px solid #D0D8DF' },
    ],
    secondary: [
      { name: 'Tan',       hex: '#F1EBC9', textColor: '#082C48', pantone: 'P 2-1 C'     },
      { name: 'Mid Blue',  hex: '#3B6684', textColor: '#FFFFFF',  pantone: 'P 111-14 C'  },
      { name: 'Pale Blue', hex: '#BED2E0', textColor: '#082C48', pantone: 'P 117-9 C'   },
    ],
  },

  nav: [
    {
      group: 'Visual identity',
      items: [{ label: 'Introduction', id: 'vi-intro' }],
    },
    {
      group: 'Logo & mark',
      items: [
        { label: 'Main wordmark',    id: 'logo-main-wordmark' },
        { label: 'Wordmark and mark', id: 'logo-horizontal' },
        { label: 'Stacked logo',     id: 'logo-stacked' },
        { label: 'Logo mark',        id: 'h-logo-mark' },
        { label: 'Avatar & favicon', id: 'logo-avatar' },
        { label: 'Co-branding',      id: 'logo-cobranding' },
        { label: 'What to avoid',    id: 'logo-avoid' },
      ],
    },
    {
      group: 'Color',
      items: [
        { label: 'Introduction',                 id: 'color-intro' },
        { label: 'Primary palette',              id: 'primary-palette' },
        { label: 'Secondary palette',            id: 'secondary-palette' },
        { label: 'Combinations & accessibility', id: 'color-combinations' },
        { label: 'Color pathways',               id: 'color-pathways' },
      ],
    },
    {
      group: 'Typography',
      items: [
        { label: 'Introduction', id: 'type-intro' },
        {
          label: 'Display & body', id: 'fg-overview',
          groupId: 'nav-fg-group', subId: 'nav-fg-sub',
          children: [
            { label: 'Overview',      id: 'fg-overview'  },
            { label: 'Usage',         id: 'fg-usage'     },
            { label: 'Type specimen', id: 'fg-specimen'  },
            { label: 'Size & scale',  id: 'fg-scale'     },
          ],
        },
        { label: 'Google fallback', id: 'google-fallback' },
        { label: 'System fallback', id: 'type-fallback'   },
        { label: 'What to avoid',   id: 'type-avoid'      },
      ],
    },
    {
      group: 'Photography',
      items: [
        { label: 'Introduction', id: 'photo-intro'    },
        { label: 'Examples',     id: 'photo-examples' },
        { label: 'Dos',          id: 'photo-dos'      },
        { label: "Don'ts",       id: 'photo-donts'    },
      ],
    },
    {
      group: 'Data visualisation',
      items: [
        { label: 'Color sequence',   id: 'dataviz-colors' },
        { label: 'Chart guidelines', id: 'dataviz-charts' },
      ],
    },
    {
      group: 'Applications',
      items: [
        { label: 'Introduction', id: 'app-intro'    },
        { label: 'Examples',     id: 'app-examples' },
      ],
    },
    {
      group: 'Iconography',
      items: [{ label: 'Introduction', id: 'icon-intro' }],
    },
    {
      group: 'Print & export',
      items: [{ label: 'Specifications', id: 'print-specs' }],
    },
  ],
}

function _lum(hex: string): number {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16) / 255
  const g = parseInt(c.slice(2, 4), 16) / 255
  const b = parseInt(c.slice(4, 6), 16) / 255
  const lin = (x: number) => x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
const _sorted = [...brand.colors.primary].sort((a, b) => _lum(a.hex) - _lum(b.hex))
export const darkestPrimary  = _sorted[0]
export const lightestPrimary = _sorted[_sorted.length - 1]

export default brand
