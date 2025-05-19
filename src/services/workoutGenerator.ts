import { Exercise, Workout, WorkoutGoal } from '../types';
import { mockWorkouts } from '../data/mockWorkouts';
import { equipment as equipmentData } from '../data/equipment';

// This is a mock service that would be replaced by an actual AI-powered API
export const generateWorkout = async (goal: WorkoutGoal): Promise<Workout> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // For the purpose of this demo, we'll use mock data and customize it
  const baseWorkout = { ...mockWorkouts[0] };
  
  // Customize the workout based on goal
  const workout: Workout = {
    ...baseWorkout,
    id: `workout-${Date.now()}`,
    title: generateTitle(goal),
    createdAt: new Date(),
    difficulty: goal.fitnessLevel,
    targetBodyParts: goal.targetBodyParts,
    exercises: generateExercises(goal),
    estimatedTime: Math.floor(Math.random() * 30) + 30, // 30-60 minutes
    caloriesBurned: Math.floor(Math.random() * 300) + 200, // 200-500 calories
    tags: generateTags(goal),
    notes: generateNotes(goal)
  };
  
  return workout;
};

const generateTitle = (goal: WorkoutGoal): string => {
  // Extract keywords from goal text
  const text = goal.text.toLowerCase();
  let title = '';
  
  if (text.includes('strength')) {
    title = 'Strength Building Workout';
  } else if (text.includes('cardio') || text.includes('endurance')) {
    title = 'Cardio & Endurance Training';
  } else if (text.includes('weight loss') || text.includes('fat')) {
    title = 'Fat Burning Workout';
  } else if (text.includes('muscle') || text.includes('build')) {
    title = 'Muscle Building Program';
  } else if (text.includes('home')) {
    title = 'Effective Home Workout';
  } else if (text.includes('quick') || text.includes('short')) {
    title = '30-Minute Power Session';
  } else {
    // Default title based on targeted body parts
    if (goal.targetBodyParts.includes('arms') && goal.targetBodyParts.includes('chest')) {
      title = 'Upper Body Focus';
    } else if (goal.targetBodyParts.includes('legs')) {
      title = 'Leg Day Challenge';
    } else if (goal.targetBodyParts.length > 3) {
      title = 'Full Body Workout';
    } else {
      title = 'Personalized Training Plan';
    }
  }
  
  return title;
};

const generateExercises = (goal: WorkoutGoal): Exercise[] => {
  // This is where real AI would generate specific exercises
  // For now, we'll use mock exercises and filter by body parts
  
  // Baseline difficulty adjustment based on fitness level
  const difficultyMultiplier = 
    goal.fitnessLevel === 'Beginner' ? 0.7 :
    goal.fitnessLevel === 'Intermediate' ? 1 :
    goal.fitnessLevel === 'Advanced' ? 1.3 : 1.5;
  
  // Sample exercise templates
  const exerciseTemplates: Partial<Exercise>[] = [
    {
      name: 'Bench Press',
      bodyPart: 'chest',
      equipment: ['barbell', 'bench'],
      instructions: 'Lie on a bench, grip the barbell with hands slightly wider than shoulder-width, lower the bar to your chest, and press it back up.'
    },
    {
      name: 'Pull-Ups',
      bodyPart: 'back',
      equipment: ['pull-up-bar'],
      instructions: 'Hang from a pull-up bar with palms facing away, pull yourself up until your chin is over the bar, and lower back down with control.'
    },
    {
      name: 'Squats',
      bodyPart: 'legs',
      equipment: ['barbell', 'squat-rack'],
      instructions: 'Stand with feet shoulder-width apart, lower your hips by bending your knees as if sitting in a chair, keep your chest up, then stand back up.'
    },
    {
      name: 'Shoulder Press',
      bodyPart: 'shoulders',
      equipment: ['dumbbells'],
      instructions: 'Sit on a bench with back support, hold dumbbells at shoulder height, press them overhead, and lower them back down with control.'
    },
    {
      name: 'Bicep Curls',
      bodyPart: 'arms',
      equipment: ['dumbbells'],
      instructions: 'Stand with dumbbells in hand, keep elbows close to your sides, curl the weights toward your shoulders, and lower them back down.'
    },
    {
      name: 'Tricep Dips',
      bodyPart: 'arms',
      equipment: ['bench'],
      instructions: 'Sit on the edge of a bench with hands gripping the edge, slide off the bench, lower your body by bending your elbows, then push back up.'
    },
    {
      name: 'Plank',
      bodyPart: 'core',
      equipment: ['yoga-mat'],
      instructions: 'Start in a push-up position but with your weight on your forearms, keep your body in a straight line, and hold the position.'
    },
    {
      name: 'Russian Twists',
      bodyPart: 'core',
      equipment: ['kettlebell'],
      instructions: 'Sit on the floor with knees bent, lean back slightly, hold a weight with both hands, and twist your torso from side to side.'
    },
    {
      name: 'Deadlifts',
      bodyPart: 'back',
      equipment: ['barbell'],
      instructions: 'Stand with feet hip-width apart, bend at hips and knees to lower and grip the barbell, then stand up straight, keeping the barbell close to your body.'
    },
    {
      name: 'Lunges',
      bodyPart: 'legs',
      equipment: [],
      instructions: 'Stand upright, step forward with one leg, lowering your hips until both knees are bent at about a 90-degree angle, then push back to the starting position.'
    }
  ];
  
  // Filter exercises by targeted body parts and available equipment
  let filteredExercises = exerciseTemplates.filter(ex => {
    // Check if exercise targets a selected body part
    const matchesBodyPart = goal.targetBodyParts.length === 0 || 
                           (ex.bodyPart && goal.targetBodyParts.includes(ex.bodyPart));
    
    // Check if required equipment is available
    const hasEquipment = !ex.equipment || ex.equipment.length === 0 || 
                        ex.equipment.some(eq => goal.selectedEquipment.includes(eq));
    
    return matchesBodyPart && hasEquipment;
  });
  
  // If no matching exercises, return some default ones
  if (filteredExercises.length === 0) {
    filteredExercises = exerciseTemplates.slice(0, 4);
  }
  
  // Generate 4-8 exercises based on fitness level
  const exerciseCount = Math.floor(Math.random() * 3) + 
                        (goal.fitnessLevel === 'Beginner' ? 4 : 
                         goal.fitnessLevel === 'Intermediate' ? 5 :
                         goal.fitnessLevel === 'Advanced' ? 6 : 7);
  
  // If not enough exercises match, repeat some
  while (filteredExercises.length < exerciseCount) {
    const randomIndex = Math.floor(Math.random() * exerciseTemplates.length);
    filteredExercises.push(exerciseTemplates[randomIndex]);
  }
  
  // Take only the needed number of exercises
  filteredExercises = filteredExercises.slice(0, exerciseCount);
  
  // Complete the exercise objects with sets, reps, etc.
  return filteredExercises.map((ex, index) => {
    const difficulty: ('Easy' | 'Medium' | 'Hard') = 
      index % 3 === 0 ? 'Easy' : 
      index % 3 === 1 ? 'Medium' : 'Hard';
    
    const sets = Math.floor(difficultyMultiplier * 
                (difficulty === 'Easy' ? 3 : 
                 difficulty === 'Medium' ? 4 : 5));
    
    const reps = Math.floor(difficultyMultiplier * 
                (difficulty === 'Easy' ? 12 : 
                 difficulty === 'Medium' ? 10 : 8));
    
    const restTime = Math.floor(
                (difficulty === 'Easy' ? 60 : 
                 difficulty === 'Medium' ? 90 : 120) / difficultyMultiplier);
    
    return {
      id: `ex-${Date.now()}-${index}`,
      name: ex.name || 'Exercise',
      bodyPart: ex.bodyPart || 'general',
      sets,
      reps,
      restTime,
      difficulty,
      equipment: ex.equipment || [],
      instructions: ex.instructions || 'Perform the exercise with proper form.'
    } as Exercise;
  });
};

const generateTags = (goal: WorkoutGoal): string[] => {
  const tags: string[] = [];
  
  // Add fitness level tag
  tags.push(goal.fitnessLevel.toLowerCase());
  
  // Add body part focus tags
  if (goal.targetBodyParts.length > 0) {
    if (goal.targetBodyParts.length > 3) {
      tags.push('full-body');
    } else {
      goal.targetBodyParts.forEach(part => {
        tags.push(part);
      });
    }
  }
  
  // Add equipment tags
  if (goal.selectedEquipment.length === 0) {
    tags.push('bodyweight');
  } else if (goal.selectedEquipment.includes('dumbbells') && 
            !goal.selectedEquipment.includes('barbell')) {
    tags.push('dumbbell-workout');
  } else if (goal.selectedEquipment.includes('resistance-bands')) {
    tags.push('resistance-bands');
  }
  
  // Add goal-based tags
  const text = goal.text.toLowerCase();
  if (text.includes('strength')) tags.push('strength');
  if (text.includes('cardio')) tags.push('cardio');
  if (text.includes('muscle') || text.includes('build')) tags.push('muscle-building');
  if (text.includes('weight loss') || text.includes('fat')) tags.push('weight-loss');
  if (text.includes('home')) tags.push('home-workout');
  if (text.includes('quick') || text.includes('short')) tags.push('quick');
  
  return tags.slice(0, 5); // Limit to 5 tags
};

const generateNotes = (goal: WorkoutGoal): string => {
  // Generate personalized notes based on the goal
  const notes = [
    "Focus on maintaining proper form throughout each exercise. Quality over quantity!",
    "Stay hydrated before, during, and after your workout for optimal performance.",
    "For best results, complete this workout 2-3 times per week with rest days in between.",
    "Consider supplementing this workout with 20-30 minutes of light cardio on rest days.",
    "Adjust weights as needed to ensure you're challenged but can maintain proper form.",
    "This workout is designed to progressively challenge you as you build strength and endurance."
  ];
  
  // Add specific notes based on fitness level
  if (goal.fitnessLevel === 'Beginner') {
    notes.push("As a beginner, focus on learning the movement patterns before adding heavy weights.");
    notes.push("Don't hesitate to take extra rest if needed between sets.");
  } else if (goal.fitnessLevel === 'Advanced' || goal.fitnessLevel === 'Elite') {
    notes.push("Consider adding drop sets or supersets to increase intensity once you've mastered the basic workout.");
    notes.push("Track your performance to ensure progressive overload over time.");
  }
  
  // Add equipment-specific notes
  if (goal.selectedEquipment.length === 0) {
    notes.push("This bodyweight routine can be made more challenging by slowing down the tempo or adding isometric holds.");
  }
  
  // Select 2-3 random notes
  const noteCount = Math.floor(Math.random() * 2) + 2; // 2-3 notes
  const selectedNotes = [];
  
  for (let i = 0; i < noteCount; i++) {
    const randomIndex = Math.floor(Math.random() * notes.length);
    selectedNotes.push(notes[randomIndex]);
    notes.splice(randomIndex, 1); // Remove selected note to avoid duplicates
  }
  
  return selectedNotes.join(" ");
};