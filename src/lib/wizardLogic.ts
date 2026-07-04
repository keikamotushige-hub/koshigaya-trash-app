import type { CategoryId, MaterialId, SizeId } from '../data/types'

export function resolveCategory(material: MaterialId, size: SizeId): CategoryId {
  if (size === 'large') {
    if (material === 'furniture' || material === 'appliance') return 'bulky'
  }

  switch (material) {
    case 'food':
    case 'plastic':
      return 'burnable'
    case 'paper':
      return 'paper'
    case 'metal':
      return 'cans'
    case 'glass':
      return size === 'large' ? 'bulky' : 'non-burnable'
    case 'ceramic':
      return 'non-burnable'
    case 'textile':
      return 'clothing'
    case 'pet-clear':
      return 'pet-bottle'
    case 'battery':
    case 'spray':
      return 'hazardous'
    case 'appliance':
      return size === 'large' ? 'bulky' : 'non-burnable'
    case 'furniture':
      return 'bulky'
    default:
      return 'burnable'
  }
}

export function materialHints(material: MaterialId): string[] {
  const hints: Partial<Record<MaterialId, string[]>> = {
    food: ['Drain liquids', 'Use a transparent or semi-transparent bag'],
    plastic: ['Remove non-plastic parts', 'Transparent or semi-transparent bag'],
    paper: ['Tie by type with string', 'Remove tape and plastic'],
    metal: ['Empty and rinse', 'Yellow basket'],
    glass: ['Wrap broken pieces in newspaper'],
    ceramic: ['Yellow basket', 'Wrap sharp edges'],
    textile: ['Wash and dry', 'No rain days'],
    'pet-clear': ['Remove cap and label', 'Rinse and flatten'],
    battery: ['Separate in a marked bag', 'Red basket'],
    spray: ['Do not puncture', 'Mark if not empty'],
    appliance: ['Cut cords separately as hazardous on their day'],
    furniture: ['Book bulky waste pickup or bring to recycling plaza'],
  }
  return hints[material] ?? []
}
