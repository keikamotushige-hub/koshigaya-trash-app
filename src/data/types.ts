export type CategoryId =
  | 'burnable'
  | 'non-burnable'
  | 'paper'
  | 'pet-bottle'
  | 'cans'
  | 'glass-bottles'
  | 'clothing'
  | 'white-tray'
  | 'hazardous'
  | 'bulky'
  | 'not-collected'

export type MaterialId =
  | 'food'
  | 'plastic'
  | 'paper'
  | 'metal'
  | 'glass'
  | 'ceramic'
  | 'textile'
  | 'pet-clear'
  | 'battery'
  | 'spray'
  | 'appliance'
  | 'furniture'

export type SizeId = 'small' | 'large'

export interface CategoryMeta {
  id: CategoryId
  icon: string
  colorClass: string
  borderClass: string
}

export interface TrashCategory {
  id: CategoryId
  icon: string
  label: string
  shortLabel: string
  container: string
  examples: string
  howTo: string[]
  notAccepted?: string
  tips?: string[]
  colorClass: string
  borderClass: string
}

export interface TrashItem {
  id: string
  categoryId: CategoryId
  name: string
  keywords: string[]
}

export interface WizardOption {
  id: string
  label: string
  icon: string
}

export interface OfficialLink {
  label: string
  url: string
  note?: string
}

export type LocaleCode =
  | 'ja'
  | 'en'
  | 'ko'
  | 'zh'
  | 'th'
  | 'vi'
  | 'id'
  | 'ms'
  | 'es'
  | 'pt'
  | 'fr'
  | 'de'
  | 'it'

export interface LocaleBundle {
  code: LocaleCode
  label: string
  ui: Record<string, string>
  categories: Record<CategoryId, Omit<TrashCategory, 'id' | 'colorClass' | 'borderClass'>>
  items: Record<string, { name: string; keywords: string[] }>
  wizard: {
    materialTitle: string
    materialDesc: string
    materials: WizardOption[]
    sizeTitle: string
    sizeDesc: string
    sizes: WizardOption[]
    resultTitle: string
    resultStepsTitle: string
    back: string
    restart: string
    largeNote: string
  }
  official: {
    title: string
    desc: string
    links: OfficialLink[]
    sanaruNote: string
  }
  cheatsheetRows: { categoryId: CategoryId; summary: string }[]
}

export const CATEGORY_ORDER: CategoryId[] = [
  'burnable',
  'non-burnable',
  'paper',
  'pet-bottle',
  'cans',
  'glass-bottles',
  'clothing',
  'white-tray',
  'hazardous',
  'bulky',
  'not-collected',
]

export const CATEGORY_META: Record<CategoryId, CategoryMeta> = {
  burnable: {
    id: 'burnable',
    icon: '🔥',
    colorClass: 'bg-orange-100 text-orange-900 ring-orange-200',
    borderClass: 'border-orange-200',
  },
  'non-burnable': {
    id: 'non-burnable',
    icon: '🪨',
    colorClass: 'bg-slate-100 text-slate-900 ring-slate-200',
    borderClass: 'border-slate-300',
  },
  paper: {
    id: 'paper',
    icon: '📰',
    colorClass: 'bg-amber-100 text-amber-900 ring-amber-200',
    borderClass: 'border-amber-200',
  },
  'pet-bottle': {
    id: 'pet-bottle',
    icon: '🥤',
    colorClass: 'bg-yellow-100 text-yellow-900 ring-yellow-200',
    borderClass: 'border-yellow-300',
  },
  cans: {
    id: 'cans',
    icon: '🥫',
    colorClass: 'bg-yellow-100 text-yellow-900 ring-yellow-200',
    borderClass: 'border-yellow-300',
  },
  'glass-bottles': {
    id: 'glass-bottles',
    icon: '🍾',
    colorClass: 'bg-sky-100 text-sky-900 ring-sky-200',
    borderClass: 'border-sky-300',
  },
  clothing: {
    id: 'clothing',
    icon: '👕',
    colorClass: 'bg-violet-100 text-violet-900 ring-violet-200',
    borderClass: 'border-violet-200',
  },
  'white-tray': {
    id: 'white-tray',
    icon: '🍱',
    colorClass: 'bg-yellow-100 text-yellow-900 ring-yellow-200',
    borderClass: 'border-yellow-300',
  },
  hazardous: {
    id: 'hazardous',
    icon: '☣️',
    colorClass: 'bg-red-100 text-red-900 ring-red-200',
    borderClass: 'border-red-200',
  },
  bulky: {
    id: 'bulky',
    icon: '🛋️',
    colorClass: 'bg-indigo-100 text-indigo-900 ring-indigo-200',
    borderClass: 'border-indigo-200',
  },
  'not-collected': {
    id: 'not-collected',
    icon: '🚫',
    colorClass: 'bg-rose-100 text-rose-900 ring-rose-200',
    borderClass: 'border-rose-200',
  },
}

export const ITEM_IDS = [
  'food-waste',
  'plastic-bag',
  'styrofoam',
  'cd-dvd',
  'cooking-oil',
  'broken-glass',
  'knife',
  'vacuum',
  'newspaper',
  'cardboard',
  'pet-bottle',
  'shampoo-bottle',
  'steel-can',
  'spray-can',
  'beer-bottle',
  'cosmetic-jar',
  'clothes',
  'meat-tray',
  'battery',
  'fluorescent-tube',
  'sofa',
  'air-conditioner',
  'television',
  'computer',
  'bicycle',
  'mattress',
] as const

export type ItemId = (typeof ITEM_IDS)[number]

export const ITEM_CATEGORY: Record<ItemId, CategoryId> = {
  'food-waste': 'burnable',
  'plastic-bag': 'burnable',
  styrofoam: 'burnable',
  'cd-dvd': 'burnable',
  'cooking-oil': 'burnable',
  'broken-glass': 'non-burnable',
  knife: 'non-burnable',
  vacuum: 'non-burnable',
  newspaper: 'paper',
  cardboard: 'paper',
  'pet-bottle': 'pet-bottle',
  'shampoo-bottle': 'burnable',
  'steel-can': 'cans',
  'spray-can': 'hazardous',
  'beer-bottle': 'glass-bottles',
  'cosmetic-jar': 'non-burnable',
  clothes: 'clothing',
  'meat-tray': 'white-tray',
  battery: 'hazardous',
  'fluorescent-tube': 'hazardous',
  sofa: 'bulky',
  'air-conditioner': 'not-collected',
  television: 'not-collected',
  computer: 'not-collected',
  bicycle: 'bulky',
  mattress: 'bulky',
}
