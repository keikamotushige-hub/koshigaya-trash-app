import type { TrashCategory } from '../data/types'
import { useI18n } from '../i18n'

type Props = {
  category: TrashCategory
  onBack: () => void
}

export function CategoryDetail({ category, onBack }: Props) {
  const { bundle } = useI18n()
  const { ui } = bundle

  return (
    <div className="animate-fade-in space-y-4 pb-8">
      <button
        type="button"
        onClick={onBack}
        className="text-sky-700 font-semibold text-sm min-h-[44px] px-1"
      >
        ← {ui.back}
      </button>

      <div className={`rounded-2xl border-2 p-5 bg-white shadow-md ${category.borderClass}`}>
        <div className="flex items-start gap-3">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{category.label}</h2>
            <p className={`inline-block mt-2 text-sm font-bold rounded-full px-3 py-1 ring-1 ${category.colorClass}`}>
              {category.container}
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-2xl bg-white p-4 shadow border border-sky-50">
        <h3 className="font-bold text-slate-800 mb-2">{ui.examples}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{category.examples}</p>
      </section>

      <section className="rounded-2xl bg-white p-4 shadow border border-sky-50">
        <h3 className="font-bold text-slate-800 mb-3">{ui.putOutBy}</h3>
        <ol className="space-y-2">
          {category.howTo.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-700">
              <span className="shrink-0 w-7 h-7 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs">
                {i + 1}
              </span>
              <span className="pt-1 leading-relaxed">{step}</span>
            </li>
          ))}
          <li className="flex gap-3 text-sm text-slate-700">
            <span className="shrink-0 w-7 h-7 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
              ✓
            </span>
            <span className="pt-1 leading-relaxed font-medium">{ui.putOutTime}</span>
          </li>
        </ol>
      </section>

      {category.notAccepted && (
        <section className="rounded-2xl bg-amber-50 p-4 border border-amber-200">
          <h3 className="font-bold text-amber-900 mb-1">{ui.notAccepted}</h3>
          <p className="text-sm text-amber-800">{category.notAccepted}</p>
        </section>
      )}

      {category.tips && category.tips.length > 0 && (
        <section className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200">
          <h3 className="font-bold text-emerald-900 mb-2">{ui.tips}</h3>
          <ul className="list-disc pl-5 text-sm text-emerald-800 space-y-1">
            {category.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-xs text-slate-500 leading-relaxed px-1">{ui.disclaimer}</p>
    </div>
  )
}
