import type { LocaleBundle } from '../../data/types'
import { en } from './en'

type LocalePatch = {
  ui?: Partial<LocaleBundle['ui']>
  categories?: {
    [K in keyof LocaleBundle['categories']]?: Partial<LocaleBundle['categories'][K]>
  }
  items?: Partial<LocaleBundle['items']>
  wizard?: Partial<LocaleBundle['wizard']>
  official?: Partial<LocaleBundle['official']>
  cheatsheetRows?: LocaleBundle['cheatsheetRows']
}

export function extendLocale(code: LocaleBundle['code'], label: string, patch: LocalePatch): LocaleBundle {
  const categories = { ...en.categories }
  if (patch.categories) {
    for (const key of Object.keys(patch.categories) as (keyof LocaleBundle['categories'])[]) {
      const partial = patch.categories[key]
      if (partial) categories[key] = { ...en.categories[key], ...partial }
    }
  }

  return {
    ...en,
    code,
    label,
    ui: { ...en.ui, ...(patch.ui ?? {}) } as LocaleBundle['ui'],
    categories,
    items: { ...en.items, ...(patch.items ?? {}) } as LocaleBundle['items'],
    wizard: { ...en.wizard, ...(patch.wizard ?? {}) },
    official: { ...en.official, ...(patch.official ?? {}) },
    cheatsheetRows: patch.cheatsheetRows ?? en.cheatsheetRows,
  }
}
