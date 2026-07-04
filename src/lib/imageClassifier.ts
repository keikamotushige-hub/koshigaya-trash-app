import type { CategoryId } from '../data/types'

/** Maps MobileNet ImageNet labels (lowercase) to Koshigaya categories — heuristic only. */
const LABEL_MAP: [string, CategoryId][] = [
  ['water bottle', 'pet-bottle'],
  ['pop bottle', 'pet-bottle'],
  ['beer bottle', 'glass-bottles'],
  ['wine bottle', 'glass-bottles'],
  ['pill bottle', 'non-burnable'],
  ['plastic bag', 'burnable'],
  ['grocery bag', 'burnable'],
  ['shopping bag', 'burnable'],
  ['envelope', 'paper'],
  ['newspaper', 'paper'],
  ['carton', 'paper'],
  ['book', 'paper'],
  ['notebook', 'paper'],
  ['can opener', 'non-burnable'],
  ['tin can', 'cans'],
  ['soup bowl', 'non-burnable'],
  ['cup', 'non-burnable'],
  ['coffee mug', 'non-burnable'],
  ['plate', 'non-burnable'],
  ['banana', 'burnable'],
  ['apple', 'burnable'],
  ['orange', 'burnable'],
  ['broccoli', 'burnable'],
  ['mushroom', 'burnable'],
  ['cucumber', 'burnable'],
  ['strawberry', 'burnable'],
  ['pizza', 'burnable'],
  ['burrito', 'burnable'],
  ['hotdog', 'burnable'],
  ['sandwich', 'burnable'],
  ['cellular telephone', 'not-collected'],
  ['laptop', 'not-collected'],
  ['desktop computer', 'not-collected'],
  ['monitor', 'not-collected'],
  ['television', 'not-collected'],
  ['keyboard', 'non-burnable'],
  ['mouse', 'non-burnable'],
  ['remote', 'non-burnable'],
  ['hair spray', 'hazardous'],
  ['syringe', 'hazardous'],
  ['diaper', 'burnable'],
  ['running shoe', 'clothing'],
  ['sneaker', 'clothing'],
  ['jean', 'clothing'],
  ['suit', 'clothing'],
  ['sock', 'clothing'],
  ['towel', 'clothing'],
  ['quilt', 'clothing'],
  ['pillow', 'bulky'],
  ['sofa', 'bulky'],
  ['couch', 'bulky'],
  ['bed', 'bulky'],
  ['bicycle', 'bulky'],
  ['microwave', 'bulky'],
  ['refrigerator', 'not-collected'],
  ['washer', 'not-collected'],
  ['vacuum', 'non-burnable'],
  ['toaster', 'non-burnable'],
  ['iron', 'non-burnable'],
  ['scissors', 'non-burnable'],
  ['knife', 'non-burnable'],
  ['nail', 'non-burnable'],
  ['screwdriver', 'non-burnable'],
  ['hammer', 'non-burnable'],
  ['light bulb', 'hazardous'],
  [' candle', 'burnable'],
  ['matchstick', 'hazardous'],
  ['battery', 'hazardous'],
  ['oil filter', 'not-collected'],
  ['gas pump', 'not-collected'],
  ['trash', 'burnable'],
  ['rubbish', 'burnable'],
]

export function labelToCategory(label: string): CategoryId | null {
  const lower = label.toLowerCase()
  for (const [key, cat] of LABEL_MAP) {
    if (lower.includes(key)) return cat
  }
  if (lower.includes('bottle') && lower.includes('plastic')) return 'pet-bottle'
  if (lower.includes('bottle')) return 'glass-bottles'
  if (lower.includes('can')) return 'cans'
  if (lower.includes('glass')) return 'non-burnable'
  if (lower.includes('paper')) return 'paper'
  if (lower.includes('plastic')) return 'burnable'
  if (lower.includes('metal')) return 'non-burnable'
  return null
}

export type ClassificationResult = {
  categoryId: CategoryId | null
  label: string
  confidence: number
}

export function bestCategoryFromPredictions(
  predictions: { className: string; probability: number }[],
): ClassificationResult | null {
  for (const p of predictions) {
    const cat = labelToCategory(p.className)
    if (cat) {
      return { categoryId: cat, label: p.className, confidence: p.probability }
    }
  }
  const top = predictions[0]
  if (!top) return null
  return { categoryId: labelToCategory(top.className), label: top.className, confidence: top.probability }
}
