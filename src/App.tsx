import { useMemo, useState } from 'react'
import { LOCALE_OPTIONS, useI18n } from './i18n'
import { CategoryDetail } from './components/CategoryDetail'
import { PhotoCheck } from './components/PhotoCheck'
import { StepWizard } from './components/StepWizard'

type Tab = 'guide' | 'wizard' | 'photo' | 'search' | 'sheet' | 'official'

function App() {
  const { bundle, locale, setLocale, categories, searchItems, findCategory } = useI18n()
  const { ui, official, cheatsheetRows } = bundle

  const [tab, setTab] = useState<Tab>('guide')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const selectedCategory = selectedCategoryId ? findCategory(selectedCategoryId as never) : undefined
  const searchResults = useMemo(() => searchItems(query), [query, searchItems])

  const openCategory = (id: string) => {
    setSelectedCategoryId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'guide', label: ui.tabGuide, icon: '🗂️' },
    { id: 'wizard', label: ui.tabWizard, icon: '🪜' },
    { id: 'photo', label: ui.tabPhoto, icon: '📷' },
    { id: 'search', label: ui.tabSearch, icon: '🔍' },
    { id: 'sheet', label: ui.tabSheet, icon: '📋' },
    { id: 'official', label: ui.tabOfficial, icon: '🏛️' },
  ]

  return (
    <div className="mx-auto min-h-dvh max-w-lg flex flex-col">
      <header className="sticky top-0 z-10 bg-sky-800 text-white px-4 pt-safe pb-3 shadow-lg">
        <div className="pt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sky-200 text-xs font-medium tracking-wide">{ui.headerTagline}</p>
            <h1 className="text-2xl font-bold tracking-tight">{ui.headerTitle}</h1>
            <p className="text-sky-100 text-sm mt-0.5">{ui.headerDesc}</p>
          </div>
          <label className="shrink-0">
            <span className="sr-only">{ui.langLabel}</span>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as typeof locale)}
              className="rounded-xl bg-sky-900/80 border border-sky-600 text-white text-sm font-bold px-2 py-2 min-h-[44px] max-w-[110px]"
            >
              {LOCALE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <main className="flex-1 px-4 py-4">
        {selectedCategory ? (
          <CategoryDetail category={selectedCategory} onBack={() => setSelectedCategoryId(null)} />
        ) : tab === 'guide' ? (
          <div className="space-y-3 animate-fade-in pb-4">
            <p className="text-sm text-slate-600">{ui.noDesignatedBag}</p>
            <div className="grid gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => openCategory(cat.id)}
                  className={`flex items-center gap-3 rounded-2xl bg-white p-4 text-left shadow border active:scale-[0.98] min-h-[68px] ${cat.borderClass}`}
                >
                  <span className="text-3xl shrink-0">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base text-slate-900">{cat.shortLabel}</p>
                    <p className="text-xs text-slate-500 truncate">{cat.container}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-bold ring-1 ${cat.colorClass}`}>
                    →
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed pt-2">{ui.disclaimer}</p>
          </div>
        ) : tab === 'wizard' ? (
          <StepWizard />
        ) : tab === 'photo' ? (
          <PhotoCheck />
        ) : tab === 'search' ? (
          <div className="animate-fade-in space-y-4 pb-4">
            <div>
              <h2 className="text-lg font-bold text-sky-900">{ui.searchTitle}</h2>
              <p className="text-sm text-slate-600">{ui.searchDesc}</p>
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={ui.searchPlaceholder}
              className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-base shadow-sm min-h-[48px]"
            />
            <div className="grid gap-2">
              {searchResults.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-8">{ui.searchEmpty}</p>
              ) : (
                searchResults.map((item) => {
                  const cat = findCategory(item.categoryId)
                  if (!cat) return null
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openCategory(item.categoryId)}
                      className="flex items-center gap-3 rounded-2xl bg-white p-4 text-left shadow border border-sky-50 active:scale-[0.98]"
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">{cat.label}</p>
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </div>
        ) : tab === 'sheet' ? (
          <div className="animate-fade-in space-y-4 pb-4">
            <div>
              <h2 className="text-lg font-bold text-sky-900">{ui.cheatsheetTitle}</h2>
              <p className="text-sm text-slate-600">{ui.cheatsheetDesc}</p>
            </div>
            <div className="rounded-2xl bg-white shadow border border-sky-100 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {cheatsheetRows.map((row) => {
                    const cat = findCategory(row.categoryId)
                    if (!cat) return null
                    return (
                      <tr
                        key={row.categoryId}
                        className="border-b border-sky-50 last:border-0 cursor-pointer hover:bg-sky-50/50"
                        onClick={() => openCategory(row.categoryId)}
                      >
                        <td className="p-3 w-10 text-xl">{cat.icon}</td>
                        <td className="p-3 font-bold text-slate-900">{cat.shortLabel}</td>
                        <td className="p-3 text-slate-600 text-xs">{row.summary}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">{ui.disclaimer}</p>
          </div>
        ) : (
          <div className="animate-fade-in space-y-4 pb-4">
            <div>
              <h2 className="text-lg font-bold text-sky-900">{official.title}</h2>
              <p className="text-sm text-slate-600 mt-1">{official.desc}</p>
            </div>
            <ul className="space-y-2">
              {official.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl bg-white p-4 shadow border border-sky-100 text-sky-700 font-bold text-sm hover:bg-sky-50"
                  >
                    {link.label} ↗
                    {link.note && <span className="block text-xs font-normal text-slate-500 mt-1">{link.note}</span>}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 rounded-xl p-3">{official.sanaruNote}</p>
            <p className="text-xs text-slate-500 leading-relaxed">{ui.disclaimer}</p>
          </div>
        )}
      </main>

      <nav className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-sky-100 px-1 pt-1 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex overflow-x-auto gap-0.5 scrollbar-none">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTab(t.id)
                setSelectedCategoryId(null)
              }}
              className={`flex-1 min-w-[56px] flex flex-col items-center py-2 px-1 rounded-xl transition-colors min-h-[56px] ${
                tab === t.id && !selectedCategoryId
                  ? 'bg-sky-100 text-sky-800'
                  : 'text-slate-500 hover:text-sky-700'
              }`}
            >
              <span className="text-lg leading-none">{t.icon}</span>
              <span className="text-[10px] font-bold mt-1 leading-tight text-center">{t.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default App
