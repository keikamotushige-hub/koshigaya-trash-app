import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  ITEM_CATEGORY,
  ITEM_IDS,
  type CategoryId,
  type LocaleBundle,
  type LocaleCode,
  type TrashCategory,
  type TrashItem,
} from '../data/types'
import { de } from './locales/de'
import { en } from './locales/en'
import { es } from './locales/es'
import { fr } from './locales/fr'
import { id } from './locales/id'
import { it } from './locales/it'
import { ja } from './locales/ja'
import { ko } from './locales/ko'
import { ms } from './locales/ms'
import { pt } from './locales/pt'
import { th } from './locales/th'
import { vi } from './locales/vi'
import { zh } from './locales/zh'

const LOCALES: Record<LocaleCode, LocaleBundle> = {
  ja,
  en,
  ko,
  zh,
  th,
  vi,
  id,
  ms,
  es,
  pt,
  fr,
  de,
  it,
}
const STORAGE_KEY = 'koshigaya-trash-locale-v1'

const LANG_MAP: [string, LocaleCode][] = [
  ['ja', 'ja'],
  ['ko', 'ko'],
  ['zh', 'zh'],
  ['th', 'th'],
  ['vi', 'vi'],
  ['id', 'id'],
  ['ms', 'ms'],
  ['es', 'es'],
  ['pt', 'pt'],
  ['fr', 'fr'],
  ['de', 'de'],
  ['it', 'it'],
]

function detectLocale(): LocaleCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as LocaleCode | null
    if (saved && LOCALES[saved]) return saved
  } catch {
    /* ignore */
  }
  const lang = navigator.language.toLowerCase()
  for (const [prefix, code] of LANG_MAP) {
    if (lang.startsWith(prefix)) return code
  }
  return 'en'
}

function buildCategories(bundle: LocaleBundle): TrashCategory[] {
  return CATEGORY_ORDER.map((categoryId) => {
    const meta = CATEGORY_META[categoryId]
    const text = bundle.categories[categoryId]
    return { ...meta, ...text, id: categoryId }
  })
}

function buildItems(bundle: LocaleBundle): TrashItem[] {
  return ITEM_IDS.map((id) => {
    const item = bundle.items[id]
    return {
      id,
      categoryId: ITEM_CATEGORY[id],
      name: item?.name ?? id,
      keywords: item?.keywords ?? [],
    }
  })
}

type I18nContextValue = {
  locale: LocaleCode
  bundle: LocaleBundle
  setLocale: (code: LocaleCode) => void
  categories: TrashCategory[]
  items: TrashItem[]
  findCategory: (id: CategoryId) => TrashCategory | undefined
  searchItems: (query: string) => TrashItem[]
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(detectLocale)
  const bundle = LOCALES[locale]

  const setLocale = (code: LocaleCode) => {
    setLocaleState(code)
    localStorage.setItem(STORAGE_KEY, code)
  }

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const categories = useMemo(() => buildCategories(bundle), [bundle])
  const items = useMemo(() => buildItems(bundle), [bundle])

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      bundle,
      setLocale,
      categories,
      items,
      findCategory: (id) => categories.find((c) => c.id === id),
      searchItems: (query) => {
        const q = query.trim().toLowerCase()
        if (!q) return items
        return items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.keywords.some((k) => k.toLowerCase().includes(q)),
        )
      },
    }),
    [locale, bundle, categories, items],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

export const LOCALE_OPTIONS: { code: LocaleCode; label: string }[] = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'zh', label: '中文' },
  { code: 'th', label: 'ไทย' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
]

export { CATEGORY_ORDER }
