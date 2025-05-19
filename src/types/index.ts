export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  height: number;
  heightUnit: 'cm' | 'feet';
  weight: number;
  weightUnit: 'kg' | 'lbs';
  bodyFat?: number;
  fitnessExperience: number; // in months
  
  // Medical Considerations
  injuries: string[];
  medicalConditions: string[];
  otherMedicalInfo?: string;
  
  // Fitness Assessment
  cardioEndurance: number;
  strengthLevel: number;
  flexibility: number;
  mobilityLimitations: string[];
  
  // Workout Preferences
  workoutDuration: '15 minutes' | '30 minutes' | '45 minutes' | '60+ minutes';
  workoutFrequency: '1-2' | '3-4' | '5-6' | '7';
  workoutTime: 'Morning' | 'Afternoon' | 'Evening';
  exerciseStyles: string[];
  
  // Recovery Profile
  sleepHours: number;
  stressLevel: number;
  
  // Nutrition Basics
  dietType: string;
  proteinIntake: string;
  mealTiming: string[];
}