import { Equipment, EquipmentPreset } from '../types';

export const equipment: Equipment[] = [
  // Minimal Equipment
  { id: 'dumbbells', name: 'Dumbbells', icon: 'dumbbell', category: 'Minimal' },
  { id: 'resistance-bands', name: 'Resistance Bands', icon: 'stretching', category: 'Minimal' },
  { id: 'pull-up-bar', name: 'Pull-Up Bar', icon: 'arrow-up-from-bracket', category: 'Minimal' },
  { id: 'kettlebell', name: 'Kettlebell', icon: 'bell', category: 'Minimal' },
  { id: 'yoga-mat', name: 'Yoga Mat', icon: 'square', category: 'Minimal' },
  
  // Standard Equipment
  { id: 'barbell', name: 'Barbell', icon: 'barbell', category: 'Standard' },
  { id: 'bench', name: 'Bench', icon: 'grip', category: 'Standard' },
  { id: 'squat-rack', name: 'Squat Rack', icon: 'square-stack', category: 'Standard' },
  { id: 'cable-machine', name: 'Cable Machine', icon: 'cable', category: 'Standard' },
  { id: 'leg-press', name: 'Leg Press', icon: 'send', category: 'Standard' },
  { id: 'lat-pulldown', name: 'Lat Pulldown', icon: 'arrow-down', category: 'Standard' },
  { id: 'chest-press', name: 'Chest Press Machine', icon: 'chevron-right', category: 'Standard' },
  
  // Advanced Equipment
  { id: 'smith-machine', name: 'Smith Machine', icon: 'align-center', category: 'Advanced' },
  { id: 'hack-squat', name: 'Hack Squat Machine', icon: 'chevron-down', category: 'Advanced' },
  { id: 'pec-deck', name: 'Pec Deck', icon: 'chevrons-left-right', category: 'Advanced' },
  { id: 'leg-curl', name: 'Leg Curl Machine', icon: 'fold-horizontal', category: 'Advanced' },
  { id: 'leg-extension', name: 'Leg Extension Machine', icon: 'fold-vertical', category: 'Advanced' },
  { id: 'ab-machine', name: 'Ab Machine', icon: 'fold', category: 'Advanced' },
  { id: 'rowing-machine', name: 'Rowing Machine', icon: 'move-horizontal', category: 'Advanced' }
];

export const equipmentPresets: EquipmentPreset[] = [
  {
    id: 'home-gym',
    name: 'Home Gym',
    equipmentIds: ['dumbbells', 'resistance-bands', 'pull-up-bar', 'kettlebell', 'yoga-mat']
  },
  {
    id: 'work-travel',
    name: 'Work Travel',
    equipmentIds: ['resistance-bands', 'yoga-mat']
  },
  {
    id: 'full-gym',
    name: 'Full Gym Access',
    equipmentIds: [
      'dumbbells', 'barbell', 'bench', 'squat-rack', 'cable-machine', 
      'leg-press', 'lat-pulldown', 'chest-press', 'smith-machine', 
      'hack-squat', 'pec-deck', 'leg-curl', 'leg-extension'
    ]
  }
];