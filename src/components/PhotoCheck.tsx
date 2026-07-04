import { useRef, useState } from 'react'
import type { TrashCategory } from '../data/types'
import { useI18n } from '../i18n'
import { bestCategoryFromPredictions } from '../lib/imageClassifier'
import { CategoryDetail } from './CategoryDetail'

type ModelModule = typeof import('@tensorflow-models/mobilenet')

export function PhotoCheck() {
  const { bundle, findCategory } = useI18n()
  const { ui } = bundle
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<TrashCategory | null>(null)
  const [label, setLabel] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<number | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  const analyze = async (file: File) => {
    setLoading(true)
    setError(null)
    setCategory(null)
    setLabel(null)
    setConfidence(null)

    const url = URL.createObjectURL(file)
    setPreview(url)

    try {
      const img = new Image()
      img.src = url
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Image load failed'))
      })

      const [tf, mobilenet] = await Promise.all([
        import('@tensorflow/tfjs'),
        import('@tensorflow-models/mobilenet') as Promise<ModelModule>,
      ])
      await tf.ready()
      const model = await mobilenet.load()
      const predictions = await model.classify(img)
      const best = bestCategoryFromPredictions(predictions)

      if (best?.label) setLabel(best.label)
      if (best?.confidence != null) setConfidence(best.confidence)

      if (best?.categoryId) {
        const cat = findCategory(best.categoryId)
        if (cat) setCategory(cat)
      }
    } catch {
      setError(ui.photoLowConfidence)
    } finally {
      setLoading(false)
    }
  }

  if (showDetail && category) {
    return <CategoryDetail category={category} onBack={() => setShowDetail(false)} />
  }

  return (
    <div className="animate-fade-in space-y-4 pb-8">
      <div>
        <h2 className="text-lg font-bold text-sky-900">{ui.photoTitle}</h2>
        <p className="text-sm text-slate-600 mt-1">{ui.photoDesc}</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) void analyze(file)
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="w-full rounded-2xl bg-sky-600 text-white font-bold py-4 min-h-[52px] shadow-lg active:scale-[0.98] disabled:opacity-60"
      >
        {loading ? ui.photoAnalyzing : ui.photoStart}
      </button>

      {preview && (
        <div className="rounded-2xl overflow-hidden border border-sky-100 shadow">
          <img src={preview} alt="" className="w-full max-h-64 object-cover" />
        </div>
      )}

      {loading && (
        <p className="text-center text-sm text-slate-500 animate-pulse">{ui.photoAnalyzing}</p>
      )}

      {category && !loading && (
        <div className={`rounded-2xl border-2 p-4 bg-white shadow-md ${category.borderClass}`}>
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">{ui.photoResult}</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <p className="font-bold text-lg">{category.label}</p>
              <p className={`text-sm font-bold rounded-full px-2 py-0.5 inline-block mt-1 ring-1 ${category.colorClass}`}>
                {category.container}
              </p>
            </div>
          </div>
          {label && confidence != null && (
            <p className="text-xs text-slate-500 mt-2">
              Detected: {label} ({Math.round(confidence * 100)}%)
            </p>
          )}
          <button
            type="button"
            onClick={() => setShowDetail(true)}
            className="mt-3 w-full rounded-xl bg-sky-100 text-sky-800 font-bold py-2.5 min-h-[44px]"
          >
            {ui.openDetail}
          </button>
        </div>
      )}

      {!category && !loading && preview && !error && (
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">
          {ui.photoLowConfidence}
        </p>
      )}

      {error && (
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">{error}</p>
      )}

      <p className="text-xs text-slate-500 leading-relaxed">{ui.photoDisclaimer}</p>
    </div>
  )
}
