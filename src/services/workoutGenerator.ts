import { WorkoutGoal, Workout } from '../types';
import { mockWorkouts } from '../data/mockWorkouts';

export const generateWorkout = async (goal: WorkoutGoal): Promise<Workout> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a base workout structure
    const baseWorkout = { ...mockWorkouts[0] };
    
    // Customize the workout based on goal
    const workout: Workout = {
      ...baseWorkout,
      id: `workout-${Date.now()}`,
      title: `Custom ${goal.text.split(' ').slice(0, 3).join(' ')}...`,
      createdAt: new Date(),
      targetBodyParts: goal.targetBodyParts,
      difficulty: goal.fitnessLevel === 'Beginner' ? 'Beginner' :
                 goal.fitnessLevel === 'Intermediate' ? 'Intermediate' : 'Advanced',
      estimatedTime: 45,
      caloriesBurned: Math.floor(Math.random() * 300) + 200,
      notes: `This workout is customized for your ${goal.fitnessLevel.toLowerCase()} fitness level.`,
      tags: ['custom', ...goal.targetBodyParts]
    };
    
    return workout;
  } catch (error) {
    console.error('Error generating workout:', error);
    throw new Error('Failed to generate workout. Please try again.');
  }
};