import { useState } from 'react'
import type { MaterialId, SizeId, TrashCategory } from '../data/types'
import { useI18n } from '../i18n'
import { resolveCategory } from '../lib/wizardLogic'
import { CategoryDetail } from './CategoryDetail'

export function StepWizard() {
  const { bundle, findCategory } = useI18n()
  const { ui, wizard } = bundle
  const [material, setMaterial] = useState<MaterialId | null>(null)
  const [size, setSize] = useState<SizeId | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  const categoryId = material && size ? resolveCategory(material, size) : null
  const category: TrashCategory | undefined = categoryId ? findCategory(categoryId) : undefined

  const reset = () => {
    setMaterial(null)
    setSize(null)
    setShowDetail(false)
  }

  if (showDetail && category) {
    return <CategoryDetail category={category} onBack={() => setShowDetail(false)} />
  }

  return (
    <div className="animate-fade-in space-y-5 pb-8">
      <div>
        <h2 className="text-lg font-bold text-sky-900">{ui.wizardTitle}</h2>
        <p className="text-sm text-slate-600 mt-1">{ui.wizardDesc}</p>
      </div>

      {!material ? (
        <section>
          <p className="text-xs font-bold text-sky-700 uppercase tracking-wide mb-2">{ui.step1}</p>
          <h3 className="font-bold text-slate-800 mb-3">{wizard.materialTitle}</h3>
          <p className="text-sm text-slate-500 mb-3">{wizard.materialDesc}</p>
          <div className="grid grid-cols-2 gap-2">
            {wizard.materials.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setMaterial(opt.id as MaterialId)}
                className="flex flex-col items-start rounded-2xl bg-white p-3.5 text-left shadow border border-sky-50 active:scale-[0.98] min-h-[80px]"
              >
                <span className="text-2xl">{opt.icon}</span>
                <span className="mt-1 font-bold text-sm text-slate-900 leading-tight">{opt.label}</span>
              </button>
            ))}
          </div>
        </section>
      ) : !size ? (
        <section>
          <button type="button" onClick={() => setMaterial(null)} className="text-sky-700 text-sm font-semibold mb-3">
            ← {wizard.back}
          </button>
          <p className="text-xs font-bold text-sky-700 uppercase tracking-wide mb-2">{ui.step2}</p>
          <h3 className="font-bold text-slate-800 mb-3">{wizard.sizeTitle}</h3>
          <p className="text-sm text-slate-500 mb-3">{wizard.sizeDesc}</p>
          <div className="grid gap-2">
            {wizard.sizes.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSize(opt.id as SizeId)}
                className="flex items-center gap-3 rounded-2xl bg-white p-4 text-left shadow border border-sky-50 active:scale-[0.98] min-h-[64px]"
              >
                <span className="text-3xl">{opt.icon}</span>
                <span className="font-bold text-base text-slate-900">{opt.label}</span>
              </button>
            ))}
          </div>
        </section>
      ) : category ? (
        <section className="space-y-4">
          <button type="button" onClick={() => setSize(null)} className="text-sky-700 text-sm font-semibold">
            ← {wizard.back}
          </button>
          <p className="text-xs font-bold text-sky-700 uppercase tracking-wide">{ui.step3}</p>
          <h3 className="font-bold text-slate-800">{wizard.resultTitle}</h3>

          {size === 'large' && (
            <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">
              ⚠️ {wizard.largeNote}
            </p>
          )}

          <div className={`rounded-2xl border-2 p-4 bg-white shadow-md ${category.borderClass}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <p className="font-bold text-lg text-slate-900">{category.label}</p>
                <p className={`text-sm font-bold rounded-full px-2 py-0.5 inline-block mt-1 ring-1 ${category.colorClass}`}>
                  {category.container}
                </p>
              </div>
            </div>

            <h4 className="font-bold text-slate-800 mb-2">{wizard.resultStepsTitle}</h4>
            <div className="relative pl-4 border-l-2 border-sky-200 space-y-3">
              {category.howTo.map((step, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[21px] w-4 h-4 rounded-full bg-sky-500 border-2 border-white" />
                  <p className="text-sm text-slate-700 leading-relaxed pl-2">{step}</p>
                </div>
              ))}
              <div className="relative">
                <span className="absolute -left-[21px] w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                <p className="text-sm font-medium text-slate-800 pl-2">{ui.putOutTime}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowDetail(true)}
              className="flex-1 rounded-xl bg-sky-600 text-white font-bold py-3 min-h-[48px] active:scale-[0.98]"
            >
              {ui.openDetail}
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-xl bg-slate-100 text-slate-700 font-bold px-4 py-3 min-h-[48px] active:scale-[0.98]"
            >
              {wizard.restart}
            </button>
          </div>
        </section>
      ) : null}
    </div>
  )
}
