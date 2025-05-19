import { BodyPart } from '../types';

export const bodyParts: BodyPart[] = [
  {
    id: 'arms',
    name: 'Arms',
    selected: false,
    subParts: [
      { id: 'biceps', name: 'Biceps' },
      { id: 'triceps', name: 'Triceps' },
      { id: 'forearms', name: 'Forearms' }
    ]
  },
  {
    id: 'shoulders',
    name: 'Shoulders',
    selected: false,
    subParts: [
      { id: 'front-deltoids', name: 'Front Deltoids' },
      { id: 'lateral-deltoids', name: 'Lateral Deltoids' },
      { id: 'rear-deltoids', name: 'Rear Deltoids' }
    ]
  },
  {
    id: 'chest',
    name: 'Chest',
    selected: false,
    subParts: [
      { id: 'upper-chest', name: 'Upper Chest' },
      { id: 'middle-chest', name: 'Middle Chest' },
      { id: 'lower-chest', name: 'Lower Chest' }
    ]
  },
  {
    id: 'back',
    name: 'Back',
    selected: false,
    subParts: [
      { id: 'lats', name: 'Lats' },
      { id: 'traps', name: 'Traps' },
      { id: 'rhomboids', name: 'Rhomboids' }
    ]
  },
  {
    id: 'core',
    name: 'Core',
    selected: false,
    subParts: [
      { id: 'abs', name: 'Abs' },
      { id: 'obliques', name: 'Obliques' },
      { id: 'lower-back', name: 'Lower Back' }
    ]
  },
  {
    id: 'legs',
    name: 'Legs',
    selected: false,
    subParts: [
      { id: 'quads', name: 'Quads' },
      { id: 'hamstrings', name: 'Hamstrings' },
      { id: 'calves', name: 'Calves' },
      { id: 'glutes', name: 'Glutes' }
    ]
  }
];