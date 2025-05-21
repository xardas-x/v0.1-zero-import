import React, { createContext, useContext, useState } from 'react';
import { WorkoutGoal, Workout, WorkoutSession } from '../types';
import { mockWorkouts } from '../data/mockWorkouts';

interface WorkoutContextType {
  workoutGoal: WorkoutGoal | null;
  setWorkoutGoal: (goal: Partial<WorkoutGoal>) => void;
  currentWorkout: Workout | null;
  setCurrentWorkout: (workout: Workout | null) => void;
  workoutHistory: Workout[];
  addToWorkoutHistory: (workout: Workout) => void;
  activeSession: WorkoutSession | null;
  startNewSession: (goal: WorkoutGoal) => void;
  continueSession: (workout: Workout) => void;
  endSession: () => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workoutGoal, setWorkoutGoalState] = useState<WorkoutGoal | null>(null);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>(mockWorkouts);
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const setWorkoutGoal = (goal: Partial<WorkoutGoal>) => {
    setWorkoutGoalState(current => ({
      ...current,
      ...goal,
      text: goal.text || current?.text || '',
      targetBodyParts: goal.targetBodyParts || current?.targetBodyParts || [],
      fitnessLevel: goal.fitnessLevel || current?.fitnessLevel || 'Intermediate',
      selectedEquipment: goal.selectedEquipment || current?.selectedEquipment || [],
    } as WorkoutGoal));
  };

  const addToWorkoutHistory = (workout: Workout) => {
    setWorkoutHistory([workout, ...workoutHistory]);
  };

  const startNewSession = (goal: WorkoutGoal) => {
    const newSession: WorkoutSession = {
      id: `session-${Date.now()}`,
      workouts: [],
      goal,
      isActive: true,
      startedAt: new Date()
    };
    setActiveSession(newSession);
  };

  const continueSession = (workout: Workout) => {
    if (activeSession) {
      setActiveSession({
        ...activeSession,
        workouts: [...activeSession.workouts, workout]
      });
    }
  };

  const endSession = () => {
    if (activeSession) {
      setActiveSession({
        ...activeSession,
        isActive: false
      });
    }
  };

  return (
    <WorkoutContext.Provider value={{
      workoutGoal,
      setWorkoutGoal,
      currentWorkout,
      setCurrentWorkout,
      workoutHistory,
      addToWorkoutHistory,
      activeSession,
      startNewSession,
      continueSession,
      endSession,
      isGenerating,
      setIsGenerating
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};