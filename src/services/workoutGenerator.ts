import { Exercise, Workout, WorkoutGoal, CardioExercise } from '../types';
import { mockWorkouts } from '../data/mockWorkouts';
import { equipment as equipmentData } from '../data/equipment';

/**
 * Scientifically-enhanced workout generator
 * Based on principles from exercise science research, periodization models,
 * and progressive overload concepts
 */
export const generateWorkout = async (goal: WorkoutGoal): Promise<Workout> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Create a base workout structure
  const baseWorkout = { ...mockWorkouts[0] };
  
  // Customize the workout based on goal and scientific principles
  const workout: Workout = {
    ...baseWorkout,
    id: `workout-${Date.now()}`,
    title: generateTitle(goal),
    createdAt: new Date(),
    difficulty: goal.fitnessLevel,
    targetBodyParts: goal.targetBodyParts,
    exercises: generateExercises(goal),
    cardioComponent: generateCardioComponent(goal),
    estimatedTime: calculateEstimatedTime(goal),
    caloriesBurned: calculateCaloriesBurned(goal),
    tags: generateTags(goal),
    notes: generateNotes(goal),
    trainingPhase: determineTrainingPhase(goal),
    weeklyFrequencyRecommendation: recommendFrequency(goal),
    progressionStrategy: generateProgressionStrategy(goal)
  };
  
  return workout;
};

/**
 * Generate a scientifically appropriate title based on the workout goal
 */
const generateTitle = (goal: WorkoutGoal): string => {
  // Extract keywords from goal text
  const text = goal.text.toLowerCase();
  let title = '';
  
  // Title based on primary goal
  if (text.includes('strength') || text.includes('strong')) {
    title = 'Progressive Strength Development';
  } else if (text.includes('cardio') || text.includes('endurance')) {
    title = 'Cardiorespiratory Endurance Training';
  } else if (text.includes('weight loss') || text.includes('fat') || text.includes('lose weight')) {
    title = 'High-Efficiency Fat Loss Protocol';
  } else if (text.includes('muscle') || text.includes('build') || text.includes('hypertrophy')) {
    title = 'Scientific Hypertrophy Program';
  } else if (text.includes('tone') || text.includes('definition') || text.includes('sculpt')) {
    title = 'Muscle Definition & Toning Workout';
  } else if (text.includes('beginner') || text.includes('new') || text.includes('start')) {
    title = 'Foundational Fitness Development';
  } else if (text.includes('home') || text.includes('minimal equipment')) {
    title = 'Home-Based Total Body Conditioning';
  } else if (text.includes('quick') || text.includes('short') || text.includes('efficient')) {
    title = 'Time-Optimized Training Session';
  } else {
    // Default title based on targeted body parts
    if (goal.targetBodyParts.length === 0) {
      title = 'Full-Body Progressive Training';
    } else if (containsUpperBodyFocus(goal.targetBodyParts)) {
      title = 'Upper Body Development Program';
    } else if (containsLowerBodyFocus(goal.targetBodyParts)) {
      title = 'Lower Body Strength & Power';
    } else if (goal.targetBodyParts.includes('core')) {
      title = 'Core Strength & Stabilization Focus';
    } else {
      title = 'Targeted Training Protocol';
    }
  }
  
  // Add fitness level descriptor for more personalization
  const levelPrefix = goal.fitnessLevel === 'Beginner' ? 'Foundational' :
                     goal.fitnessLevel === 'Intermediate' ? 'Progressive' :
                     goal.fitnessLevel === 'Advanced' ? 'Advanced' : 'Elite';
  
  return `${levelPrefix} ${title}`;
};

/**
 * Helper function to check if workout has upper body focus
 */
const containsUpperBodyFocus = (bodyParts: string[]): boolean => {
  const upperBodyParts = ['chest', 'back', 'shoulders', 'arms'];
  return bodyParts.some(part => upperBodyParts.includes(part));
};

/**
 * Helper function to check if workout has lower body focus
 */
const containsLowerBodyFocus = (bodyParts: string[]): boolean => {
  const lowerBodyParts = ['legs', 'glutes', 'calves'];
  return bodyParts.some(part => lowerBodyParts.includes(part));
};

/**
 * Generate scientifically designed exercises based on goal and available equipment
 */
const generateExercises = (goal: WorkoutGoal): Exercise[] => {
  // Science-based exercise templates organized by body part and movement pattern
  // Based on research evidence for muscle activation and exercise efficiency
  const compoundExerciseTemplates: Partial<Exercise>[] = [
    // Compound lower body exercises
    {
      name: 'Barbell Back Squat',
      bodyPart: 'legs',
      movementPattern: 'squat',
      equipment: ['barbell', 'squat-rack'],
      primaryMuscles: ['quadriceps', 'glutes', 'hamstrings'],
      secondaryMuscles: ['calves', 'core'],
      exerciseType: 'compound',
      instructions: 'Position barbell on upper back, feet shoulder-width apart. Descend by breaking at hips and knees until thighs are parallel to ground. Maintain neutral spine. Drive through heels to return to standing position.'
    },
    {
      name: 'Romanian Deadlift',
      bodyPart: 'legs',
      movementPattern: 'hinge',
      equipment: ['barbell'],
      primaryMuscles: ['hamstrings', 'glutes'],
      secondaryMuscles: ['lower back', 'core'],
      exerciseType: 'compound',
      instructions: 'Hold barbell at hip level with straight arms. Push hips back while keeping back flat and knees slightly bent. Lower bar along shins until feeling hamstring stretch. Return to starting position by driving hips forward.'
    },
    {
      name: 'Barbell Bench Press',
      bodyPart: 'chest',
      movementPattern: 'horizontal push',
      equipment: ['barbell', 'bench'],
      primaryMuscles: ['chest', 'triceps', 'shoulders'],
      secondaryMuscles: ['core'],
      exerciseType: 'compound',
      instructions: 'Lie on bench with feet flat on floor. Grip barbell slightly wider than shoulder width. Unrack bar and lower to mid-chest. Press bar upward until arms are fully extended.'
    },
    {
      name: 'Pull-Ups',
      bodyPart: 'back',
      movementPattern: 'vertical pull',
      equipment: ['pull-up-bar'],
      primaryMuscles: ['latissimus dorsi', 'biceps'],
      secondaryMuscles: ['shoulders', 'core'],
      exerciseType: 'compound',
      instructions: 'Hang from bar with hands slightly wider than shoulder width, palms facing away. Pull body upward until chin clears bar. Lower with control to starting position.'
    },
    {
      name: 'Dumbbell Shoulder Press',
      bodyPart: 'shoulders',
      movementPattern: 'vertical push',
      equipment: ['dumbbells'],
      primaryMuscles: ['deltoids', 'triceps'],
      secondaryMuscles: ['upper chest', 'core'],
      exerciseType: 'compound',
      instructions: 'Sit or stand with dumbbells at shoulder level, palms facing forward. Press weights overhead until arms are fully extended. Lower with control back to starting position.'
    },
    {
      name: 'Dumbbell Row',
      bodyPart: 'back',
      movementPattern: 'horizontal pull',
      equipment: ['dumbbells', 'bench'],
      primaryMuscles: ['latissimus dorsi', 'rhomboids'],
      secondaryMuscles: ['biceps', 'rear deltoids'],
      exerciseType: 'compound',
      instructions: 'Place one knee and hand on bench with opposite foot on floor. Hold dumbbell with free hand, arm extended. Pull dumbbell to side of torso while keeping back flat. Lower with control.'
    },
    {
      name: 'Goblet Squat',
      bodyPart: 'legs',
      movementPattern: 'squat',
      equipment: ['dumbbell', 'kettlebell'],
      primaryMuscles: ['quadriceps', 'glutes'],
      secondaryMuscles: ['core', 'upper back'],
      exerciseType: 'compound',
      instructions: 'Hold dumbbell or kettlebell close to chest. Feet shoulder-width apart, toes slightly turned out. Squat down until thighs are parallel to floor. Drive through heels to return to standing position.'
    },
    {
      name: 'Push-Ups',
      bodyPart: 'chest',
      movementPattern: 'horizontal push',
      equipment: [],
      primaryMuscles: ['chest', 'triceps', 'shoulders'],
      secondaryMuscles: ['core'],
      exerciseType: 'compound',
      instructions: 'Start in plank position with hands slightly wider than shoulder width. Lower body until chest nearly touches floor. Keep body in straight line. Push back up to starting position.'
    }
  ];
  
  const isolationExerciseTemplates: Partial<Exercise>[] = [
    // Isolation exercises for specific muscle targeting
    {
      name: 'Dumbbell Bicep Curls',
      bodyPart: 'arms',
      movementPattern: 'elbow flexion',
      equipment: ['dumbbells'],
      primaryMuscles: ['biceps'],
      secondaryMuscles: ['forearms'],
      exerciseType: 'isolation',
      instructions: 'Stand holding dumbbells with arms extended, palms facing forward. Keeping upper arms stationary, curl weights while contracting biceps. Return to starting position with controlled movement.'
    },
    {
      name: 'Tricep Pushdowns',
      bodyPart: 'arms',
      movementPattern: 'elbow extension',
      equipment: ['cable-machine'],
      primaryMuscles: ['triceps'],
      secondaryMuscles: [],
      exerciseType: 'isolation',
      instructions: 'Stand facing cable machine with rope attachment at upper position. Grasp rope with both hands, elbows bent at sides. Extend arms downward while keeping upper arms stationary. Return to starting position with control.'
    },
    {
      name: 'Leg Extensions',
      bodyPart: 'legs',
      movementPattern: 'knee extension',
      equipment: ['leg-extension-machine'],
      primaryMuscles: ['quadriceps'],
      secondaryMuscles: [],
      exerciseType: 'isolation',
      instructions: 'Sit on machine with pads on top of lower shins. Extend knees to lift weight until legs are straight. Return to starting position with control.'
    },
    {
      name: 'Leg Curls',
      bodyPart: 'legs',
      movementPattern: 'knee flexion',
      equipment: ['leg-curl-machine'],
      primaryMuscles: ['hamstrings'],
      secondaryMuscles: ['calves'],
      exerciseType: 'isolation',
      instructions: 'Lie face down on machine with pads against back of ankles. Curl legs upward by flexing knees. Return to starting position with control.'
    },
    {
      name: 'Lateral Raises',
      bodyPart: 'shoulders',
      movementPattern: 'shoulder abduction',
      equipment: ['dumbbells'],
      primaryMuscles: ['lateral deltoids'],
      secondaryMuscles: [],
      exerciseType: 'isolation',
      instructions: 'Stand holding dumbbells at sides, palms facing inward. Raise arms out to sides until parallel with floor. Keep elbows slightly bent. Lower with control to starting position.'
    },
    {
      name: 'Calf Raises',
      bodyPart: 'calves',
      movementPattern: 'ankle plantar flexion',
      equipment: ['dumbbell'],
      primaryMuscles: ['gastrocnemius', 'soleus'],
      secondaryMuscles: [],
      exerciseType: 'isolation',
      instructions: 'Stand with balls of feet on elevated surface, heels hanging off. Rise up onto toes as high as possible. Lower heels below level of platform to stretch calves.'
    }
  ];
  
  const coreExerciseTemplates: Partial<Exercise>[] = [
    // Core-specific exercises
    {
      name: 'Plank',
      bodyPart: 'core',
      movementPattern: 'isometric anti-extension',
      equipment: [],
      primaryMuscles: ['rectus abdominis', 'transverse abdominis'],
      secondaryMuscles: ['shoulders', 'glutes'],
      exerciseType: 'core',
      instructions: 'Start in forearm position with elbows under shoulders. Form straight line from head to heels. Keep core engaged and hold position while breathing normally.'
    },
    {
      name: 'Russian Twists',
      bodyPart: 'core',
      movementPattern: 'rotation',
      equipment: ['kettlebell', 'dumbbell'],
      primaryMuscles: ['obliques'],
      secondaryMuscles: ['rectus abdominis'],
      exerciseType: 'core',
      instructions: 'Sit on floor with knees bent and feet elevated. Hold weight with both hands. Rotate torso to tap weight on floor beside hip. Rotate to opposite side in controlled movement.'
    },
    {
      name: 'Mountain Climbers',
      bodyPart: 'core',
      movementPattern: 'dynamic anti-extension',
      equipment: [],
      primaryMuscles: ['core', 'hip flexors'],
      secondaryMuscles: ['shoulders', 'chest'],
      exerciseType: 'core',
      instructions: 'Start in push-up position. Alternately drive knees toward chest in running motion while keeping hips level and core engaged.'
    },
    {
      name: 'Bicycle Crunches',
      bodyPart: 'core',
      movementPattern: 'flexion with rotation',
      equipment: [],
      primaryMuscles: ['rectus abdominis', 'obliques'],
      secondaryMuscles: ['hip flexors'],
      exerciseType: 'core',
      instructions: 'Lie on back with hands behind head, knees bent. Lift shoulder blades off floor. Bring right elbow to left knee while extending right leg. Alternate sides in pedaling motion.'
    }
  ];
  
  const bodyweightExerciseTemplates: Partial<Exercise>[] = [
    // Bodyweight exercises for home workouts
    {
      name: 'Bodyweight Squats',
      bodyPart: 'legs',
      movementPattern: 'squat',
      equipment: [],
      primaryMuscles: ['quadriceps', 'glutes', 'hamstrings'],
      secondaryMuscles: ['calves', 'core'],
      exerciseType: 'compound',
      instructions: 'Stand with feet shoulder-width apart. Lower body by bending knees and pushing hips back as if sitting in chair. Keep chest up. Return to standing position.'
    },
    {
      name: 'Lunges',
      bodyPart: 'legs',
      movementPattern: 'lunge',
      equipment: [],
      primaryMuscles: ['quadriceps', 'glutes', 'hamstrings'],
      secondaryMuscles: ['calves', 'core'],
      exerciseType: 'compound',
      instructions: 'Stand upright. Step forward with one leg and lower hips until both knees form 90-degree angles. Push through front heel to return to starting position. Alternate legs.'
    },
    {
      name: 'Push-Ups',
      bodyPart: 'chest',
      movementPattern: 'horizontal push',
      equipment: [],
      primaryMuscles: ['chest', 'triceps', 'shoulders'],
      secondaryMuscles: ['core'],
      exerciseType: 'compound',
      instructions: 'Start in plank position with hands slightly wider than shoulder width. Lower body until chest nearly touches floor. Keep body in straight line. Push back up to starting position.'
    },
    {
      name: 'Inverted Rows',
      bodyPart: 'back',
      movementPattern: 'horizontal pull',
      equipment: ['table', 'bar'],
      primaryMuscles: ['latissimus dorsi', 'rhomboids', 'biceps'],
      secondaryMuscles: ['rear deltoids', 'core'],
      exerciseType: 'compound',
      instructions: 'Position body under sturdy horizontal bar or table. Grasp bar with overhand grip, arms extended, body straight. Pull chest toward bar by squeezing shoulder blades together. Lower with control.'
    },
    {
      name: 'Pike Push-Ups',
      bodyPart: 'shoulders',
      movementPattern: 'vertical push',
      equipment: [],
      primaryMuscles: ['deltoids', 'triceps'],
      secondaryMuscles: ['upper chest', 'core'],
      exerciseType: 'compound',
      instructions: 'Start in downward dog position with hips high and hands shoulder-width apart. Lower head toward floor by bending elbows. Push back up to starting position.'
    },
    {
      name: 'Glute Bridges',
      bodyPart: 'glutes',
      movementPattern: 'hip extension',
      equipment: [],
      primaryMuscles: ['glutes', 'hamstrings'],
      secondaryMuscles: ['lower back'],
      exerciseType: 'isolation',
      instructions: 'Lie on back with knees bent, feet flat on floor. Press through heels to lift hips until body forms straight line from shoulders to knees. Squeeze glutes at top. Lower with control.'
    }
  ];

  // Determine exercise focus ratio based on fitness level and goal text
  // This determines the mix of compound vs. isolation exercises
  let compoundRatio = 0.7; // Default 70% compound, 30% isolation
  let coreRatio = 0.2; // Default 20% core-specific exercises
  
  const goalText = goal.text.toLowerCase();
  
  // Adjust compound/isolation ratio based on goal
  if (goalText.includes('strength') || goalText.includes('power')) {
    compoundRatio = 0.85; // More compound for strength goals
    coreRatio = 0.15;
  } else if (goalText.includes('muscle') || goalText.includes('hypertrophy') || goalText.includes('build')) {
    compoundRatio = 0.65; // More balanced for muscle building
    coreRatio = 0.15;
  } else if (goalText.includes('tone') || goalText.includes('definition')) {
    compoundRatio = 0.6; // More isolation for definition
    coreRatio = 0.2;
  } else if (goalText.includes('core') || goalText.includes('abs')) {
    compoundRatio = 0.5; // Balance compound with core focus
    coreRatio = 0.35;
  } else if (goalText.includes('endurance') || goalText.includes('cardio')) {
    compoundRatio = 0.75; // More compound for endurance
    coreRatio = 0.15;
  }

  // Determine number of exercises based on fitness level
  let totalExerciseCount;
  switch(goal.fitnessLevel) {
    case 'Beginner':
      totalExerciseCount = 4 + Math.floor(Math.random() * 2); // 4-5 exercises
      break;
    case 'Intermediate':
      totalExerciseCount = 6 + Math.floor(Math.random() * 2); // 6-7 exercises
      break;
    case 'Advanced':
      totalExerciseCount = 7 + Math.floor(Math.random() * 3); // 7-9 exercises
      break;
    case 'Elite':
      totalExerciseCount = 8 + Math.floor(Math.random() * 4); // 8-11 exercises
      break;
    default:
      totalExerciseCount = 5 + Math.floor(Math.random() * 2); // 5-6 exercises
  }

  // Calculate number of each exercise type based on ratios
  const compoundExerciseCount = Math.round(totalExerciseCount * compoundRatio);
  const coreExerciseCount = Math.round(totalExerciseCount * coreRatio);
  const isolationExerciseCount = totalExerciseCount - compoundExerciseCount - coreExerciseCount;

  // Filter exercises by targeted body parts and available equipment
  let availableCompoundExercises = filterExercisesByEquipmentAndBodyPart(
    goal.selectedEquipment.length === 0 ? bodyweightExerciseTemplates : compoundExerciseTemplates,
    goal.selectedEquipment,
    goal.targetBodyParts
  );
  
  let availableIsolationExercises = filterExercisesByEquipmentAndBodyPart(
    isolationExerciseTemplates,
    goal.selectedEquipment,
    goal.targetBodyParts
  );
  
  let availableCoreExercises = filterExercisesByEquipmentAndBodyPart(
    coreExerciseTemplates,
    goal.selectedEquipment,
    goal.targetBodyParts.length === 0 ? ['core'] : goal.targetBodyParts
  );

  // If no matching exercises, use bodyweight alternatives
  if (availableCompoundExercises.length < compoundExerciseCount) {
    availableCompoundExercises = [...availableCompoundExercises, ...filterExercisesByBodyPart(bodyweightExerciseTemplates, goal.targetBodyParts)];
  }
  
  if (availableIsolationExercises.length < isolationExerciseCount) {
    availableIsolationExercises = [...availableIsolationExercises, ...filterExercisesByBodyPart(bodyweightExerciseTemplates, goal.targetBodyParts)];
  }
  
  if (availableCoreExercises.length < coreExerciseCount) {
    availableCoreExercises = [...availableCoreExercises, ...filterExercisesByBodyPart(bodyweightExerciseTemplates.filter(ex => ex.bodyPart === 'core'), ['core'])];
  }

  // Randomly select exercises while ensuring variety in movement patterns
  const selectedExercises = [
    ...selectExercisesWithMovementVariety(availableCompoundExercises, compoundExerciseCount),
    ...selectExercisesWithMovementVariety(availableIsolationExercises, isolationExerciseCount),
    ...selectExercisesWithMovementVariety(availableCoreExercises, coreExerciseCount)
  ];

  // Generate exercise parameters based on scientific principles
  return selectedExercises.map((ex, index) => {
    const {sets, reps, restTime, intensity} = calculateExerciseParameters(goal, ex.exerciseType || 'compound', index);
    
    // Map intensity to a difficulty level
    const difficulty: ('Easy' | 'Medium' | 'Hard') = 
      intensity < 70 ? 'Easy' : 
      intensity < 85 ? 'Medium' : 'Hard';
    
    return {
      id: `ex-${Date.now()}-${index}`,
      name: ex.name || 'Exercise',
      bodyPart: ex.bodyPart || 'general',
      movementPattern: ex.movementPattern || '',
      primaryMuscles: ex.primaryMuscles || [],
      secondaryMuscles: ex.secondaryMuscles || [],
      exerciseType: ex.exerciseType || 'compound',
      sets,
      reps,
      restTime,
      difficulty,
      equipment: ex.equipment || [],
      instructions: ex.instructions || 'Perform the exercise with proper form.'
    } as Exercise;
  });
};

/**
 * Filter exercises based on equipment and target body parts
 */
const filterExercisesByEquipmentAndBodyPart = (
  exercises: Partial<Exercise>[], 
  availableEquipment: string[], 
  targetBodyParts: string[]
): Partial<Exercise>[] => {
  return exercises.filter(ex => {
    // Check if exercise targets a selected body part (or any if none specified)
    const matchesBodyPart = targetBodyParts.length === 0 || 
                           (ex.bodyPart && targetBodyParts.includes(ex.bodyPart));
    
    // Check if required equipment is available or if exercise uses no equipment
    const hasEquipment = !ex.equipment || ex.equipment.length === 0 || 
                        availableEquipment.length === 0 ||
                        ex.equipment.some(eq => availableEquipment.includes(eq));
    
    return matchesBodyPart && hasEquipment;
  });
};

/**
 * Filter exercises based only on target body parts
 */
const filterExercisesByBodyPart = (
  exercises: Partial<Exercise>[],
  targetBodyParts: string[]
): Partial<Exercise>[] => {
  if (targetBodyParts.length === 0) return exercises;
  
  return exercises.filter(ex => ex.bodyPart && targetBodyParts.includes(ex.bodyPart));
};

/**
 * Select exercises ensuring movement pattern variety
 */
const selectExercisesWithMovementVariety = (
  availableExercises: Partial<Exercise>[],
  count: number
): Partial<Exercise>[] => {
  if (availableExercises.length <= count) return availableExercises;
  
  const selectedExercises: Partial<Exercise>[] = [];
  const movementPatternsUsed = new Set<string>();
  
  // First pass - prioritize movement pattern variety
  for (const exercise of availableExercises) {
    if (selectedExercises.length >= count) break;
    
    const movementPattern = exercise.movementPattern || 'unknown';
    
    if (!movementPatternsUsed.has(movementPattern)) {
      selectedExercises.push(exercise);
      movementPatternsUsed.add(movementPattern);
    }
  }
  
  // Second pass - fill in remaining slots with random exercises
  const remainingExercises = availableExercises.filter(ex => !selectedExercises.includes(ex));
  while (selectedExercises.length < count && remainingExercises.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingExercises.length);
    selectedExercises.push(remainingExercises[randomIndex]);
    remainingExercises.splice(randomIndex, 1);
  }
  
  return selectedExercises;
};

/**
 * Calculate scientifically-based exercise parameters (sets, reps, rest time)
 * based on goal and exercise type
 */
const calculateExerciseParameters = (
  goal: WorkoutGoal,
  exerciseType: string,
  exerciseIndex: number
): { sets: number; reps: number; restTime: number; intensity: number } => {
  const goalText = goal.text.toLowerCase();
  let intensity = 0;
  let sets = 0;
  let reps = 0;
  let restTime = 0;
  
  // Adjust training parameters based on fitness goals
  // Based on scientific research for optimal training zones
  if (goalText.includes('strength') || goalText.includes('power')) {
    // Strength focus: High intensity (85-95% 1RM), lower reps, longer rest
    intensity = 85 + Math.floor(Math.random() * 10); // 85-95%
    sets = exerciseType === 'compound' ? 4 : 3;
    reps = exerciseType === 'compound' ? 4 + Math.floor(Math.random() * 3) : 6 + Math.floor(Math.random() * 3); // 4-6 for compound, 6-8 for isolation
    restTime = exerciseType === 'compound' ? 180 + Math.floor(Math.random() * 60) : 120 + Math.floor(Math.random() * 60); // 3-4 min for compound, 2-3 min for isolation
    
  } else if (goalText.includes('muscle') || goalText.includes('hypertrophy') || goalText.includes('build')) {
    // Hypertrophy focus: Moderate intensity (70-85% 1RM), moderate reps, moderate rest
    intensity = 70 + Math.floor(Math.random() * 15); // 70-85%
    sets = exerciseType === 'compound' ? 3 + Math.floor(Math.random() * 2) : 3; // 3-4 for compound, 3 for isolation
    reps = exerciseType === 'compound' ? 8 + Math.floor(Math.random() * 4) : 10 + Math.floor(Math.random() * 5); // 8-12 for compound, 10-15 for isolation
    restTime = exerciseType === 'compound' ? 90 + Math.floor(Math.random() * 30) : 60 + Math.floor(Math.random() * 30); // 90-120s for compound, 60-90s for isolation
    
  } else if (goalText.includes('endurance') || goalText.includes('stamina')) {
    // Muscular endurance: Lower intensity (50-70% 1RM), higher reps, shorter rest
    intensity = 50 + Math.floor(Math.random() * 20); // 50-70%
    sets = 2 + Math.floor(Math.random() * 2); // 2-3 sets
    reps = 15 + Math.floor(Math.random() * 10); // 15-25 reps
    restTime = 30 + Math.floor(Math.random() * 30); // 30-60s rest
    
  } else if (goalText.includes('tone') || goalText.includes('definition') || goalText.includes('lean')) {
    // Toning/Definition: Moderate intensity (65-80% 1RM), moderate-high reps, shorter rest
    intensity = 65 + Math.floor(Math.random() * 15); // 65-80%
    sets = 3;
    reps = 12 + Math.floor(Math.random() * 5); // 12-17 reps
    restTime = 45 + Math.floor(Math.random() * 30); // 45-75s rest
    
  } else if (goalText.includes('weight loss') || goalText.includes('fat') || goalText.includes('lose weight')) {
    // Fat loss: Moderate intensity (65-75% 1RM), moderate reps, shorter rest for higher calorie burn
    intensity = 65 + Math.floor(Math.random() * 10); // 65-75%
    sets = 3 + Math.floor(Math.random() * 2); // 3-4 sets
    reps = 12 + Math.floor(Math.random() * 4); // 12-16 reps
    restTime = 30 + Math.floor(Math.random() * 30); // 30-60s rest to keep heart rate elevated
} else {
    // General fitness: Balanced approach
    intensity = 70 + Math.floor(Math.random() * 10); // 70-80%
    sets = 3;
    reps = 10 + Math.floor(Math.random() * 5); // 10-15 reps
    restTime = 60 + Math.floor(Math.random() * 30); // 60-90s rest
  }
  
  // Adjust based on fitness level
  const fitnessLevelModifier = getFitnessLevelModifier(goal.fitnessLevel);
  sets = Math.max(2, Math.round(sets * fitnessLevelModifier.setsMultiplier));
  reps = Math.max(4, Math.round(reps * fitnessLevelModifier.repsMultiplier));
  restTime = Math.max(30, Math.round(restTime * fitnessLevelModifier.restMultiplier));
  
  // For core exercises, typically use higher reps and lower rest
  if (exerciseType === 'core') {
    reps = Math.round(reps * 1.5); // 50% more reps for core
    restTime = Math.round(restTime * 0.7); // 30% less rest for core
  }
  
  // Exercise order adjustment - early exercises may have higher intensity
  if (exerciseIndex < 2) {
    intensity = Math.min(95, intensity + 5); // Primary exercises are slightly more intense
  } else if (exerciseIndex > 4) {
    intensity = Math.max(50, intensity - 5); // Later exercises slightly less intense
  }
  
  return { sets, reps, restTime, intensity };
};

/**
 * Get fitness level-specific modifiers for workout parameters
 */
const getFitnessLevelModifier = (fitnessLevel: string): { 
  setsMultiplier: number; 
  repsMultiplier: number; 
  restMultiplier: number; 
  volumeMultiplier: number;
} => {
  switch (fitnessLevel) {
    case 'Beginner':
      return {
        setsMultiplier: 0.8, // Fewer sets for beginners to prevent overtraining
        repsMultiplier: 1.0, 
        restMultiplier: 1.2, // Longer rest periods for beginners
        volumeMultiplier: 0.7 // Lower overall volume
      };
    case 'Intermediate':
      return {
        setsMultiplier: 1.0,
        repsMultiplier: 1.0,
        restMultiplier: 1.0,
        volumeMultiplier: 1.0
      };
    case 'Advanced':
      return {
        setsMultiplier: 1.2, // More sets for advanced lifters
        repsMultiplier: 0.9, // Slightly lower reps (often with higher intensity)
        restMultiplier: 0.9, // Slightly shorter rest periods
        volumeMultiplier: 1.3 // Higher overall volume
      };
    case 'Elite':
      return {
        setsMultiplier: 1.3, // Most sets for elite lifters
        repsMultiplier: 0.85,
        restMultiplier: 0.85,
        volumeMultiplier: 1.5 // Highest overall volume
      };
    default:
      return {
        setsMultiplier: 1.0,
        repsMultiplier: 1.0,
        restMultiplier: 1.0,
        volumeMultiplier: 1.0
      };
  }
};

/**
 * Generate an appropriate cardio component based on the workout goal
 */
const generateCardioComponent = (goal: WorkoutGoal): CardioExercise[] | null => {
  const goalText = goal.text.toLowerCase();
  
  // Skip cardio for certain goals
  if (goalText.includes('strength only') || 
      goalText.includes('no cardio') || 
      goalText.includes('just weights') ||
      goalText.includes('purely strength')) {
    return null;
  }
  
  // Determine cardio emphasis
  const isCardioFocused = goalText.includes('cardio') || 
                         goalText.includes('endurance') || 
                         goalText.includes('aerobic') ||
                         goalText.includes('weight loss') ||
                         goalText.includes('fat loss');
  
  // Create cardio component based on goal
  const cardioExercises: CardioExercise[] = [];
  
  if (isCardioFocused) {
    // Main cardio workout
    const { heartRateZone, duration, cardioType } = generateMainCardioWorkout(goal);
    
    cardioExercises.push({
      id: `cardio-${Date.now()}-1`,
      name: `${cardioType} Training`,
      type: cardioType,
      duration,
      heartRateZone,
      caloriesBurned: calculateCardioCalories(cardioType, duration, goal.fitnessLevel),
      instructions: generateCardioInstructions(cardioType, heartRateZone, duration)
    });
    
    // Maybe add interval component for more intense cardio goals
    if (goalText.includes('hiit') || 
        goalText.includes('interval') || 
        goalText.includes('intense cardio')) {
      cardioExercises.push(generateIntervalCardio(goal));
    }
  } else {
    // Just add warm-up cardio for primarily strength-focused workouts
    cardioExercises.push({
      id: `cardio-${Date.now()}-warmup`,
      name: 'Warm-up Cardio',
      type: selectAppropriateCardioType(goal),
      duration: 5 + Math.floor(Math.random() * 6), // 5-10 minutes
      heartRateZone: 'Zone 1 (50-60% max HR)',
      caloriesBurned: 30 + Math.floor(Math.random() * 20), // 30-50 calories
      instructions: 'Perform light cardio to increase heart rate and prepare muscles for strength training. Keep intensity low, focusing on increasing blood flow to muscles.'
    });
    
    // Add optional cooldown cardio
    if (Math.random() > 0.5) { // 50% chance to include cooldown
      cardioExercises.push({
        id: `cardio-${Date.now()}-cooldown`,
        name: 'Cooldown Cardio',
        type: selectAppropriateCardioType(goal),
        duration: 5 + Math.floor(Math.random() * 6), // 5-10 minutes
        heartRateZone: 'Zone 1 (50-60% max HR)',
        caloriesBurned: 25 + Math.floor(Math.random() * 15), // 25-40 calories
        instructions: 'Perform light cardio to gradually reduce heart rate and facilitate recovery. Focus on deep breathing and relaxing muscles.'
      });
    }
  }
  
  return cardioExercises;
};

/**
 * Generate main cardio workout based on goal
 */
const generateMainCardioWorkout = (goal: WorkoutGoal): {
  heartRateZone: string;
  duration: number;
  cardioType: string;
} => {
  const goalText = goal.text.toLowerCase();
  
  // Determine cardio intensity based on goal
  let intensity = '';
  let duration = 0;
  let cardioType = selectAppropriateCardioType(goal);
  
  if (goalText.includes('hiit') || goalText.includes('high intensity')) {
    intensity = 'Zone 4-5 (85-95% max HR)';
    duration = 15 + Math.floor(Math.random() * 11); // 15-25 minutes for HIIT
  } else if (goalText.includes('fat') || goalText.includes('weight loss')) {
    intensity = 'Zone 3 (70-80% max HR)';
    duration = 20 + Math.floor(Math.random() * 16); // 20-35 minutes for fat loss
  } else if (goalText.includes('endurance') || goalText.includes('stamina')) {
    intensity = 'Zone 2-3 (60-80% max HR)';
    duration = 30 + Math.floor(Math.random() * 31); // 30-60 minutes for endurance
  } else {
    // Default moderate cardio
    intensity = 'Zone 2 (60-70% max HR)';
    duration = 15 + Math.floor(Math.random() * 16); // 15-30 minutes
  }
  
  // Adjust based on fitness level
  switch (goal.fitnessLevel) {
    case 'Beginner':
      duration = Math.max(10, Math.round(duration * 0.7)); // Shorter for beginners
      intensity = downgradeIntensity(intensity); // Lower intensity for beginners
      break;
    case 'Advanced':
      duration = Math.round(duration * 1.2); // Longer for advanced
      break;
    case 'Elite':
      duration = Math.round(duration * 1.3); // Longest for elite
      intensity = upgradeIntensity(intensity); // Higher intensity for elite
      break;
  }
  
  return { heartRateZone: intensity, duration, cardioType };
};

/**
 * Generate interval cardio protocol
 */
const generateIntervalCardio = (goal: WorkoutGoal): CardioExercise => {
  const cardioType = selectAppropriateCardioType(goal, true); // true = prefer high-intensity options
  let workInterval = 0;
  let restInterval = 0;
  let rounds = 0;
  let totalDuration = 0;
  
  // Adjust interval protocol based on fitness level
  switch (goal.fitnessLevel) {
    case 'Beginner':
      workInterval = 20 + Math.floor(Math.random() * 11); // 20-30s work
      restInterval = 40 + Math.floor(Math.random() * 21); // 40-60s rest
      rounds = 4 + Math.floor(Math.random() * 3); // 4-6 rounds
      break;
    case 'Intermediate':
      workInterval = 30 + Math.floor(Math.random() * 16); // 30-45s work
      restInterval = 30 + Math.floor(Math.random() * 16); // 30-45s rest
      rounds = 6 + Math.floor(Math.random() * 3); // 6-8 rounds
      break;
    case 'Advanced':
      workInterval = 40 + Math.floor(Math.random() * 21); // 40-60s work
      restInterval = 20 + Math.floor(Math.random() * 21); // 20-40s rest
      rounds = 8 + Math.floor(Math.random() * 3); // 8-10 rounds
      break;
    case 'Elite':
      workInterval = 45 + Math.floor(Math.random() * 31); // 45-75s work
      restInterval = 15 + Math.floor(Math.random() * 16); // 15-30s rest
      rounds = 10 + Math.floor(Math.random() * 5); // 10-14 rounds
      break;
    default:
      workInterval = 30;
      restInterval = 30;
      rounds = 6;
  }
  
  totalDuration = Math.round((workInterval + restInterval) * rounds / 60); // convert to minutes
  
  return {
    id: `cardio-${Date.now()}-interval`,
    name: `${cardioType} Interval Training`,
    type: cardioType,
    duration: totalDuration,
    heartRateZone: 'Zone 4-5 (85-95% max HR) during work intervals, Zone 2 (60-70% max HR) during recovery',
    caloriesBurned: calculateCardioCalories(cardioType, totalDuration, goal.fitnessLevel, true), // true = interval training
    instructions: `Perform ${rounds} rounds of ${workInterval}s high-intensity work followed by ${restInterval}s active recovery. Work intervals should be performed at near-maximum effort (RPE 8-9/10), while recovery intervals should be at low intensity (RPE 3-4/10).`
  };
};

/**
 * Select appropriate cardio type based on goal and available equipment
 */
const selectAppropriateCardioType = (goal: WorkoutGoal, preferHighIntensity = false): string => {
  const goalText = goal.text.toLowerCase();
  const possibleTypes = [];
  
  // Check for specific cardio type mentioned in goal
  if (goalText.includes('running') || goalText.includes('run')) {
    possibleTypes.push('Running');
  }
  if (goalText.includes('cycling') || goalText.includes('bike')) {
    possibleTypes.push('Cycling');
  }
  if (goalText.includes('swimming') || goalText.includes('swim')) {
    possibleTypes.push('Swimming');
  }
  if (goalText.includes('rowing') || goalText.includes('row')) {
    possibleTypes.push('Rowing');
  }
  if (goalText.includes('elliptical')) {
    possibleTypes.push('Elliptical');
  }
  if (goalText.includes('stair') || goalText.includes('stepper')) {
    possibleTypes.push('Stair Climber');
  }
  
  // If specific types mentioned, randomly select one
  if (possibleTypes.length > 0) {
    return possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
  }
  
  // Otherwise, select based on intensity preference and equipment
  const allCardioTypes = [
    { name: 'Running', equipment: [], intensity: 'high', impact: 'high' },
    { name: 'Cycling', equipment: ['stationary-bike', 'bike'], intensity: 'moderate', impact: 'low' },
    { name: 'Rowing', equipment: ['rowing-machine'], intensity: 'high', impact: 'low' },
    { name: 'Elliptical', equipment: ['elliptical'], intensity: 'moderate', impact: 'low' },
    { name: 'Stair Climber', equipment: ['stair-climber'], intensity: 'high', impact: 'moderate' },
    { name: 'Swimming', equipment: ['pool'], intensity: 'moderate', impact: 'low' },
    { name: 'Jump Rope', equipment: ['jump-rope'], intensity: 'high', impact: 'high' },
    { name: 'Brisk Walking', equipment: [], intensity: 'low', impact: 'low' }
  ];
  
  // Filter by available equipment
  let filteredTypes = allCardioTypes.filter(type => 
    type.equipment.length === 0 || 
    type.equipment.some(eq => goal.selectedEquipment.includes(eq))
  );
  
  // If no equipment matches, default to options that don't require equipment
  if (filteredTypes.length === 0) {
    filteredTypes = allCardioTypes.filter(type => type.equipment.length === 0);
  }
  
  // Further filter by intensity preference if specified
  if (preferHighIntensity) {
    const highIntensityOptions = filteredTypes.filter(type => type.intensity === 'high');
    if (highIntensityOptions.length > 0) {
      filteredTypes = highIntensityOptions;
    }
  }
  
  // If low impact is specifically mentioned, prioritize low impact options
  if (goalText.includes('low impact') || goalText.includes('joint friendly')) {
    const lowImpactOptions = filteredTypes.filter(type => type.impact === 'low');
    if (lowImpactOptions.length > 0) {
      filteredTypes = lowImpactOptions;
    }
  }
  
  // Select random option from filtered list
  return filteredTypes[Math.floor(Math.random() * filteredTypes.length)].name;
};

/**
 * Helper function to downgrade cardio intensity
 */
const downgradeIntensity = (intensity: string): string => {
  if (intensity.includes('Zone 4-5')) return 'Zone 3-4 (75-85% max HR)';
  if (intensity.includes('Zone 3')) return 'Zone 2-3 (65-75% max HR)';
  if (intensity.includes('Zone 2-3')) return 'Zone 2 (60-70% max HR)';
  return 'Zone 1-2 (50-65% max HR)';
};

/**
 * Helper function to upgrade cardio intensity
 */
const upgradeIntensity = (intensity: string): string => {
  if (intensity.includes('Zone 1-2')) return 'Zone 2 (60-70% max HR)';
  if (intensity.includes('Zone 2')) return 'Zone 2-3 (65-75% max HR)';
  if (intensity.includes('Zone 2-3')) return 'Zone 3 (70-80% max HR)';
  if (intensity.includes('Zone 3')) return 'Zone 3-4 (75-85% max HR)';
  return 'Zone 4-5 (85-95% max HR)';
};

/**
 * Generate cardio instructions based on type and parameters
 */
const generateCardioInstructions = (type: string, heartRateZone: string, duration: number): string => {
  let baseInstructions = `Perform ${duration} minutes of ${type} training, maintaining heart rate in ${heartRateZone}.`;
  
  // Add type-specific instructions
  switch (type) {
    case 'Running':
      baseInstructions += ` Focus on maintaining a consistent pace that allows you to stay in the target heart rate zone. Start with a 2-minute gradual warm-up and end with a 2-minute cooldown.`;
      break;
    case 'Cycling':
      baseInstructions += ` Adjust resistance as needed to maintain target heart rate. Aim for a cadence of 80-100 RPM for optimal efficiency. Include a 2-minute easy pedaling warm-up and cooldown.`;
      break;
    case 'Rowing':
      baseInstructions += ` Focus on proper form: legs-hips-arms on the drive, arms-hips-legs on the recovery. Aim for a stroke rate of 24-28 SPM for steady state work. Include a 2-minute light rowing warm-up and cooldown.`;
      break;
    case 'Elliptical':
      baseInstructions += ` Adjust resistance and incline to maintain target heart rate. Keep an upright posture and maintain a natural stride pattern. Include a 2-minute easy warm-up and cooldown.`;
      break;
    case 'Stair Climber':
      baseInstructions += ` Maintain an upright posture, avoid leaning heavily on handrails. Step with your entire foot on each stair, not just your toes. Include a 2-minute light intensity warm-up and cooldown.`;
      break;
    case 'Swimming':
      baseInstructions += ` Focus on controlled breathing and efficient technique. Alternate between strokes if desired to work different muscle groups. Include 2-minute easy swimming warm-up and cooldown.`;
      break;
    case 'Jump Rope':
      baseInstructions += ` Keep jumps low and efficient, landing softly on the balls of your feet. Maintain a consistent rhythm and adjust speed to maintain target heart rate. If needed, take brief 15-30 second breaks while staying active.`;
      break;
    case 'Brisk Walking':
      baseInstructions += ` Focus on maintaining a purposeful pace with good posture. Swing arms naturally to increase intensity. Consider adding incline or slight hills if available to increase heart rate.`;
      break;
    default:
      baseInstructions += ` Begin with a 2-minute warm-up at lower intensity and end with a 2-minute cooldown.`;
  }
  
  return baseInstructions;
};

/**
 * Calculate estimated calories burned for cardio activity
 */
const calculateCardioCalories = (
  type: string, 
  duration: number, 
  fitnessLevel: string, 
  isInterval: boolean = false
): number => {
  // Base calories burned per minute (approximate MET values converted to calories)
  const caloriesPerMinute: {[key: string]: number} = {
    'Running': 12,
    'Cycling': 10,
    'Rowing': 11,
    'Elliptical': 9,
    'Stair Climber': 10,
    'Swimming': 9,
    'Jump Rope': 12,
    'Brisk Walking': 7
  };
  
  // Default value if type not found
  let calsPerMin = caloriesPerMinute[type] || 10;
  
  // Adjust for fitness level (more fit people burn slightly fewer calories)
  const fitnessMultiplier = fitnessLevel === 'Beginner' ? 1.1 :
                           fitnessLevel === 'Intermediate' ? 1.0 :
                           fitnessLevel === 'Advanced' ? 0.95 : 0.9;
  
  // Adjust for interval training (increases calorie burn)
  const intervalMultiplier = isInterval ? 1.3 : 1.0;
  
  // Calculate and randomize slightly for variability
  const baseCalories = Math.round(calsPerMin * duration * fitnessMultiplier * intervalMultiplier);
  const randomVariation = 0.9 + (Math.random() * 0.2); // 0.9 to 1.1 multiplier
  
  return Math.round(baseCalories * randomVariation);
};

/**
 * Calculate estimated workout time
 */
const calculateEstimatedTime = (goal: WorkoutGoal): number => {
  // Start with base time for exercises
  let totalTime = 0;
  
  // Get exercise count based on fitness level (using the same logic as in generateExercises)
  let exerciseCount;
  switch(goal.fitnessLevel) {
    case 'Beginner':
      exerciseCount = 4 + Math.floor(Math.random() * 2); // 4-5 exercises
      break;
    case 'Intermediate':
      exerciseCount = 6 + Math.floor(Math.random() * 2); // 6-7 exercises
      break;
    case 'Advanced':
      exerciseCount = 7 + Math.floor(Math.random() * 3); // 7-9 exercises
      break;
    case 'Elite':
      exerciseCount = 8 + Math.floor(Math.random() * 4); // 8-11 exercises
      break;
    default:
      exerciseCount = 5 + Math.floor(Math.random() * 2); // 5-6 exercises
  }
  
  // Average time per exercise including rest (assume average of 45-60 seconds per set plus rest)
  const goalText = goal.text.toLowerCase();
  let timePerExercise;
  
  if (goalText.includes('strength')) {
    timePerExercise = 6; // Longer rest periods, ~6 minutes per exercise
  } else if (goalText.includes('hypertrophy') || goalText.includes('muscle')) {
    timePerExercise = 5; // Moderate rest periods, ~5 minutes per exercise
  } else if (goalText.includes('endurance') || goalText.includes('tone')) {
    timePerExercise = 4; // Shorter rest periods, ~4 minutes per exercise
  } else if (goalText.includes('circuit') || goalText.includes('quick')) {
    timePerExercise = 3; // Minimal rest, ~3 minutes per exercise
  } else {
    timePerExercise = 5; // Default average
  }
  
  // Calculate exercise portion
  totalTime = exerciseCount * timePerExercise;
  
  // Add warm-up time
  totalTime += 5;
  
  // Add cardio time if applicable
  if (goalText.includes('cardio') || 
      goalText.includes('endurance') || 
      goalText.includes('weight loss') || 
      goalText.includes('fat')) {
    // Determine cardio duration based on goal
    if (goalText.includes('hiit') || goalText.includes('interval')) {
      totalTime += 15 + Math.floor(Math.random() * 11); // 15-25 minutes for HIIT
    } else if (goalText.includes('endurance')) {
      totalTime += 20 + Math.floor(Math.random() * 21); // 20-40 minutes for endurance
    } else {
      totalTime += 15 + Math.floor(Math.random() * 16); // 15-30 minutes for general cardio
    }
  } else {
    // Just add warm-up/cooldown cardio time
    totalTime += 5 + Math.floor(Math.random() * 6); // 5-10 minutes
  }
  
  // Add cooldown/stretching time
  totalTime += 5;
  
  return totalTime;
};

/**
 * Calculate estimated calories burned
 */
const calculateCaloriesBurned = (goal: WorkoutGoal): number => {
  const goalText = goal.text.toLowerCase();
  const { volumeMultiplier } = getFitnessLevelModifier(goal.fitnessLevel);
  
  // Base calories for workout (before adjustments)
  let baseCalories = 300; // Default moderate workout
  
  // Adjust based on workout type
  if (goalText.includes('hiit') || goalText.includes('interval') || goalText.includes('circuit')) {
    baseCalories = 400; // Higher intensity = more calories
  } else if (goalText.includes('strength') || goalText.includes('power')) {
    baseCalories = 250; // Pure strength workouts burn fewer calories during session
  } else if (goalText.includes('endurance') || goalText.includes('cardio')) {
    baseCalories = 350; // Cardio focus burns more calories
  }
  
  // Adjust based on volume and fitness level
  baseCalories = Math.round(baseCalories * volumeMultiplier);
  
  // Adjust based on estimated time (from calculateEstimatedTime function)
  const estimatedTime = calculateEstimatedTime(goal);
  const timeAdjustment = estimatedTime / 45; // Normalize to 45-minute workout
  baseCalories = Math.round(baseCalories * timeAdjustment);
  
  // Add randomization for variability
  const randomFactor = 0.9 + (Math.random() * 0.2); // 0.9 to 1.1
  return Math.round(baseCalories * randomFactor);
};

/**
 * Generate tags for the workout
 */
const generateTags = (goal: WorkoutGoal): string[] => {
  const tags: string[] = [];
  const goalText = goal.text.toLowerCase();
  
  // Add fitness level tag
  tags.push(goal.fitnessLevel.toLowerCase());
  
  // Add body part focus tags
  if (goal.targetBodyParts.length > 0) {
    if (goal.targetBodyParts.length >= 3) {
      tags.push('full-body');
    } else {
      goal.targetBodyParts.forEach(part => {
        tags.push(part);
      });
    }
  } else {
    tags.push('full-body');
  }
  
  // Add equipment tags
  if (goal.selectedEquipment.length === 0) {
    tags.push('bodyweight');
  } else {
    // Add primary equipment tags (limit to 2)
    const primaryEquipment = ['barbell', 'dumbbells', 'kettlebells', 'resistance-bands', 'cables'];
    const availablePrimary = goal.selectedEquipment.filter(eq => primaryEquipment.includes(eq));
    
    if (availablePrimary.length > 0) {
      availablePrimary.slice(0, 2).forEach(eq => {
        tags.push(eq);
      });
    }
  }
  
  // Add training style tags based on goal text
  if (goalText.includes('strength') || goalText.includes('strong')) tags.push('strength');
  if (goalText.includes('power') || goalText.includes('explosive')) tags.push('power');
  if (goalText.includes('hypertrophy') || goalText.includes('muscle') || goalText.includes('build')) tags.push('hypertrophy');
  if (goalText.includes('endurance') || goalText.includes('stamina')) tags.push('endurance');
  if (goalText.includes('tone') || goalText.includes('definition')) tags.push('toning');
  if (goalText.includes('cardio') || goalText.includes('aerobic')) tags.push('cardio');
  if (goalText.includes('hiit') || goalText.includes('interval')) tags.push('hiit');
  if (goalText.includes('weight loss') || goalText.includes('fat loss')) tags.push('fat-loss');
  if (goalText.includes('home') || goalText.includes('apartment')) tags.push('home-workout');
  if (goalText.includes('quick') || goalText.includes('short') || goalText.includes('efficient')) tags.push('time-efficient');
  if (goalText.includes('beginner') || goalText.includes('new')) tags.push('beginner-friendly');
  
  // Return unique tags, limiting to 5 for clarity
  return [...new Set(tags)].slice(0, 5);
};

/**
 * Generate scientifically-informed workout notes
 */
const generateNotes = (goal: WorkoutGoal): string => {
  const goalText = goal.text.toLowerCase();
  
  // Create pool of general workout notes based on scientific principles
  const generalNotes = [
    "Focus on maintaining proper form throughout each exercise. Quality of movement is more important than quantity.",
    "Stay properly hydrated before, during, and after your workout for optimal performance and recovery.",
    "Progressive overload is key to improvement - aim to gradually increase weight, reps, or sets over time.",
    "Rest periods are as important as work periods - stick to the recommended rest times for your goal.",
    "Track your workouts to monitor progress and ensure you're applying progressive overload principles.",
    "Proper breathing technique enhances performance - generally exhale during the exertion phase and inhale during the return phase.",
    "Listen to your body - distinguish between productive discomfort and potential injury signals."
  ];
  
  // Goal-specific notes
  const goalSpecificNotes: {[key: string]: string[]} = {
    strength: [
      "For maximal strength gains, focus on maintaining proper technique even as weights get challenging.",
      "Research shows compound exercises like squats, deadlifts, and bench press are most effective for strength development.",
      "For optimal strength gains, ensure full recovery between sets - typically 2-3 minutes for heavy compound movements.",
      "Periodization is key for long-term strength progress - this program should be cycled with lighter weeks every 4-6 weeks.",
      "Scientific evidence suggests 3-5 sets of 3-6 reps at 85-95% 1RM is optimal for strength development."
    ],
    hypertrophy: [
      "For optimal muscle growth, aim to create adequate mechanical tension, metabolic stress, and muscle damage through a variety of rep ranges.",
      "Research shows that training each muscle group 2-3 times per week with sufficient volume (10-20 sets per week) is optimal for hypertrophy.",
      "A mixture of compound and isolation exercises is most effective for maximizing muscle growth across all areas of target muscles.",
      "Studies show the 6-12 rep range with moderate-heavy weights (70-85% 1RM) is generally most effective for hypertrophy.",
      "Proper nutrient timing and protein intake (1.6-2.2g/kg of body weight daily) will significantly enhance muscle building results."
    ],
endurance: [
      "For muscular endurance, shorter rest periods (30-60 seconds) help maintain elevated heart rate and improve stamina.",
      "Higher rep ranges (15-25) with lighter weights are scientifically proven to enhance muscular endurance capacity.",
      "Research shows that combining resistance training with cardio exercise enhances overall endurance performance.",
      "For endurance improvements, focus on maintaining consistent form even as fatigue sets in during higher rep sets.",
      "Gradually decrease rest periods over time to progressively challenge your cardiovascular and muscular endurance systems."
    ],
    fat_loss: [
      "For optimal fat loss, this combination of resistance training and cardio creates the highest caloric expenditure both during and after exercise.",
      "Studies show that maintaining muscle through resistance training while in a caloric deficit is essential for healthy, sustainable fat loss.",
      "The 'afterburn effect' (EPOC) from this workout helps you continue burning calories for up to 24-48 hours after completion.",
      "Research indicates that compound movements that engage multiple large muscle groups maximize calorie burning efficiency.",
      "For best fat loss results, pair this workout with a moderate caloric deficit of 300-500 calories per day and adequate protein intake."
    ],
    cardio: [
      "Heart rate zones are based on the formula: Max HR = 220 - age. Adjust intensity to stay within your target zone.",
      "For improved cardiovascular health, aim to accumulate at least 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity cardio weekly.",
      "The Karvonen formula (Target HR = ((Max HR − Resting HR) × %Intensity) + Resting HR) provides personalized heart rate zones based on your fitness level.",
      "Research shows that a mix of steady-state and interval cardio produces the best overall cardiovascular adaptations.",
      "Proper breathing during cardio helps optimize oxygen delivery - focus on rhythmic breathing patterns synchronized with your movement."
    ],
    beginning: [
      "As a beginner, focus on learning proper movement patterns before increasing weight or intensity.",
      "Research shows that beginners can make significant gains with just 2-3 training sessions per week.",
      "Don't hesitate to take extra rest between sets if needed - proper recovery between sets is essential.",
      "Consistency is more important than intensity when starting out - aim for regular workouts rather than occasional intense sessions.",
      "Studies show that beginners can often build strength and endurance simultaneously during the first 3-6 months of training."
    ],
    advanced: [
      "At your advanced level, periodization becomes essential - cycle through phases of different volumes and intensities for continued progress.",
      "Research shows that advanced lifters benefit from more frequent exercise variation to overcome plateaus.",
      "Consider implementing techniques like drop sets, rest-pause, or mechanical advantage drop sets to increase training stimulus.",
      "Recovery becomes increasingly important at advanced levels - ensure adequate sleep, nutrition, and recovery sessions.",
      "For continued progress, scientific literature suggests implementing autoregulation techniques like RPE (Rate of Perceived Exertion) or RIR (Reps in Reserve)."
    ]
  };
  
  // Select 3 general notes
  let selectedNotes = selectRandomItems(generalNotes, 3);
  
  // Add goal-specific notes based on goal text
  if (goalText.includes('strength') || goalText.includes('strong') || goalText.includes('power')) {
    selectedNotes = [...selectedNotes, ...selectRandomItems(goalSpecificNotes.strength, 2)];
  } else if (goalText.includes('muscle') || goalText.includes('hypertrophy') || goalText.includes('build')) {
    selectedNotes = [...selectedNotes, ...selectRandomItems(goalSpecificNotes.hypertrophy, 2)];
  } else if (goalText.includes('endurance') || goalText.includes('stamina')) {
    selectedNotes = [...selectedNotes, ...selectRandomItems(goalSpecificNotes.endurance, 2)];
  } else if (goalText.includes('weight loss') || goalText.includes('fat') || goalText.includes('lean')) {
    selectedNotes = [...selectedNotes, ...selectRandomItems(goalSpecificNotes.fat_loss, 2)];
  } else if (goalText.includes('cardio') || goalText.includes('aerobic')) {
    selectedNotes = [...selectedNotes, ...selectRandomItems(goalSpecificNotes.cardio, 2)];
  }
  
  // Add level-specific notes
  if (goal.fitnessLevel === 'Beginner') {
    selectedNotes = [...selectedNotes, ...selectRandomItems(goalSpecificNotes.beginning, 1)];
  } else if (goal.fitnessLevel === 'Advanced' || goal.fitnessLevel === 'Elite') {
    selectedNotes = [...selectedNotes, ...selectRandomItems(goalSpecificNotes.advanced, 1)];
  }
  
  // Return notes as a single string with proper spacing
  return selectedNotes.join("\n\n");
};

/**
 * Helper function to select random items from an array
 */
const selectRandomItems = <T>(items: T[], count: number): T[] => {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Determine the appropriate training phase based on goal
 */
const determineTrainingPhase = (goal: WorkoutGoal): string => {
  const goalText = goal.text.toLowerCase();
  
  if (goalText.includes('strength') || goalText.includes('power')) {
    return 'Strength Phase';
  } else if (goalText.includes('hypertrophy') || goalText.includes('muscle') || goalText.includes('build')) {
    return 'Hypertrophy Phase';
  } else if (goalText.includes('endurance') || goalText.includes('stamina')) {
    return 'Endurance Phase';
  } else if (goalText.includes('cut') || goalText.includes('definition') || goalText.includes('lean')) {
    return 'Cutting Phase';
  } else if (goalText.includes('cardio') || goalText.includes('aerobic')) {
    return 'Cardio Phase';
  } else if (goalText.includes('maintain') || goalText.includes('maintenance')) {
    return 'Maintenance Phase';
  } else if (goal.fitnessLevel === 'Beginner') {
    return 'Foundation Phase';
  } else {
    return 'Balanced Development Phase';
  }
};

/**
 * Recommend weekly training frequency
 */
const recommendFrequency = (goal: WorkoutGoal): string => {
  const goalText = goal.text.toLowerCase();
  
  // Base recommendation on fitness level
  let baseFrequency;
  switch (goal.fitnessLevel) {
    case 'Beginner':
      baseFrequency = '2-3 times per week with at least 48 hours between sessions targeting the same muscle groups';
      break;
    case 'Intermediate':
      baseFrequency = '3-4 times per week with a mix of full-body and split routines';
      break;
    case 'Advanced':
      baseFrequency = '4-5 times per week with appropriate split routine to optimize recovery';
      break;
    case 'Elite':
      baseFrequency = '5-6 times per week with carefully programmed intensity and volume management';
      break;
    default:
      baseFrequency = '3-4 times per week with at least 24-48 hours between sessions targeting the same muscle groups';
  }
  
  // Adjust based on goal
  if (goalText.includes('strength') || goalText.includes('power')) {
    return `${baseFrequency}. Research shows optimal strength gains require full recovery between sessions, so ensure adequate rest between training the same movement patterns.`;
  } else if (goalText.includes('hypertrophy') || goalText.includes('muscle') || goalText.includes('build')) {
    return `${baseFrequency}. Scientific evidence suggests training each muscle group 2-3 times per week with 48-72 hours recovery between sessions is optimal for muscle growth.`;
  } else if (goalText.includes('endurance') || goalText.includes('stamina')) {
    return `${baseFrequency}. For endurance development, consider adding 1-2 additional cardio-only sessions per week at moderate intensity.`;
  } else if (goalText.includes('weight loss') || goalText.includes('fat')) {
    return `${baseFrequency}. For optimal fat loss, consider adding 2-3 additional moderate-intensity cardio sessions per week of 30-45 minutes each.`;
  } else if (goalText.includes('quick') || goalText.includes('busy') || goalText.includes('time')) {
    return `${baseFrequency}. With time constraints, focus on 2-3 full-body sessions with compound movements for maximum efficiency.`;
  } else {
    return baseFrequency;
  }
};

/**
 * Generate progressive overload strategy
 */
const generateProgressionStrategy = (goal: WorkoutGoal): string => {
  const goalText = goal.text.toLowerCase();
  
  // Base progression strategy based on fitness level
  let baseStrategy;
  switch (goal.fitnessLevel) {
    case 'Beginner':
      baseStrategy = 'Focus on mastering technique first. Increase weight by 5-10% once you can complete all sets with proper form.';
      break;
    case 'Intermediate':
      baseStrategy = 'Implement a linear progression model: add 2.5-5% weight when you can complete all prescribed sets and reps with good form.';
      break;
    case 'Advanced':
      baseStrategy = 'Utilize undulating periodization: vary intensity and volume throughout the week, increasing overall workload by 2-5% every 2-3 weeks.';
      break;
    case 'Elite':
      baseStrategy = 'Implement block periodization with planned deloads every 4-6 weeks. Progress intensity by 2-3% or add volume through additional sets rather than increased load.';
      break;
    default:
      baseStrategy = 'Apply progressive overload by gradually increasing weight by 2.5-5% when current weight becomes manageable.';
  }
  
  // Adjust based on goal
  if (goalText.includes('strength') || goalText.includes('power')) {
    return `${baseStrategy} For strength development, prioritize weight increases over rep increases, focusing on the 3-6 rep range for main lifts.`;
  } else if (goalText.includes('hypertrophy') || goalText.includes('muscle') || goalText.includes('build')) {
    return `${baseStrategy} For hypertrophy, progress through multiple variables: increase weight by 2.5-5% when possible, add reps (up to 12-15), or add a set to increase total volume.`;
  } else if (goalText.includes('endurance') || goalText.includes('stamina')) {
    return `${baseStrategy} For endurance, gradually increase reps while decreasing rest periods. Once you can perform 20+ reps, increase weight by 5% and reset to the lower rep range.`;
  } else if (goalText.includes('weight loss') || goalText.includes('fat')) {
    return `${baseStrategy} For fat loss, focus on gradually decreasing rest periods and increasing workout density before increasing weight. Track total workout volume and aim to increase it by 5% every 2 weeks.`;
  } else {
    return baseStrategy;
  }
};
