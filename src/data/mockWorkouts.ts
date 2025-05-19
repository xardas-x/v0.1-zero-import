import { Exercise, Workout } from '../types';

const exercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Barbell Bench Press',
    bodyPart: 'chest',
    sets: 4,
    reps: 8,
    restTime: 90,
    difficulty: 'Medium',
    equipment: ['barbell', 'bench'],
    instructions: 'Lie on a bench, grip the barbell with hands slightly wider than shoulder-width, lower the bar to your chest, and press it back up.'
  },
  {
    id: 'ex2',
    name: 'Pull-Ups',
    bodyPart: 'back',
    sets: 3,
    reps: 10,
    restTime: 60,
    difficulty: 'Hard',
    equipment: ['pull-up-bar'],
    instructions: 'Hang from a pull-up bar with palms facing away, pull yourself up until your chin is over the bar, and lower back down with control.'
  },
  {
    id: 'ex3',
    name: 'Squats',
    bodyPart: 'legs',
    sets: 4,
    reps: 12,
    restTime: 90,
    difficulty: 'Medium',
    equipment: ['barbell', 'squat-rack'],
    instructions: 'Stand with feet shoulder-width apart, lower your hips by bending your knees as if sitting in a chair, keep your chest up, then stand back up.'
  },
  {
    id: 'ex4',
    name: 'Dumbbell Shoulder Press',
    bodyPart: 'shoulders',
    sets: 3,
    reps: 10,
    restTime: 60,
    difficulty: 'Medium',
    equipment: ['dumbbells'],
    instructions: 'Sit on a bench with back support, hold dumbbells at shoulder height, press them overhead, and lower them back down with control.'
  },
  {
    id: 'ex5',
    name: 'Bicep Curls',
    bodyPart: 'arms',
    sets: 3,
    reps: 12,
    restTime: 45,
    difficulty: 'Easy',
    equipment: ['dumbbells'],
    instructions: 'Stand with dumbbells in hand, keep elbows close to your sides, curl the weights toward your shoulders, and lower them back down.'
  },
  {
    id: 'ex6',
    name: 'Plank',
    bodyPart: 'core',
    sets: 3,
    reps: 1,
    restTime: 60,
    difficulty: 'Medium',
    equipment: ['yoga-mat'],
    instructions: 'Start in a push-up position but with your weight on your forearms, keep your body in a straight line, and hold the position.'
  }
];

export const mockWorkouts: Workout[] = [
  {
    id: 'workout1',
    title: 'Full Body Strength',
    createdAt: new Date('2023-07-15'),
    exercises: [exercises[0], exercises[1], exercises[2], exercises[5]],
    estimatedTime: 60,
    caloriesBurned: 450,
    difficulty: 'Intermediate',
    targetBodyParts: ['chest', 'back', 'legs', 'core'],
    tags: ['strength', 'full-body']
  },
  {
    id: 'workout2',
    title: 'Upper Body Focus',
    createdAt: new Date('2023-07-18'),
    exercises: [exercises[0], exercises[1], exercises[3], exercises[4]],
    estimatedTime: 45,
    caloriesBurned: 350,
    difficulty: 'Intermediate',
    targetBodyParts: ['chest', 'back', 'shoulders', 'arms'],
    tags: ['upper-body', 'strength']
  },
  {
    id: 'workout3',
    title: 'Quick Home Workout',
    createdAt: new Date('2023-07-20'),
    exercises: [exercises[4], exercises[5]],
    estimatedTime: 20,
    caloriesBurned: 200,
    difficulty: 'Beginner',
    targetBodyParts: ['arms', 'core'],
    notes: 'Great for busy days when you have limited time.',
    tags: ['quick', 'home', 'no-equipment']
  }
];