import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, BodyPart, Equipment, EquipmentPreset, 
  WorkoutGoal, Workout, WorkoutSession
} from '../types';
import { bodyParts as initialBodyParts } from '../data/bodyParts';
import { equipment as initialEquipment, equipmentPresets as initialPresets } from '../data/equipment';
import { mockWorkouts } from '../data/mockWorkouts';

interface AppContextType {
  // User Profile
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  profiles: UserProfile[];
  addProfile: (profile: UserProfile) => void;
  updateProfile: (profile: UserProfile) => void;
  deleteProfile: (profileId: string) => void;
  switchProfile: (profileId: string) => void;
  
  // Body Parts
  bodyParts: BodyPart[];
  toggleBodyPart: (id: string) => void;
  toggleSubPart: (bodyPartId: string, subPartId: string) => void;
  
  // Equipment
  equipment: Equipment[];
  selectedEquipment: string[];
  toggleEquipment: (id: string) => void;
  equipmentPresets: EquipmentPreset[];
  addCustomEquipment: (name: string) => void;
  addEquipmentPreset: (name: string, equipmentIds: string[]) => void;
  applyPreset: (presetId: string) => void;
  
  // Workout Goal
  workoutGoal: WorkoutGoal | null;
  setWorkoutGoal: (goal: Partial<WorkoutGoal>) => void;
  
  // Fitness Level
  fitnessLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
  setFitnessLevel: (level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite') => void;
  
  // Workout Management
  currentWorkout: Workout | null;
  setCurrentWorkout: (workout: Workout | null) => void;
  workoutHistory: Workout[];
  addToWorkoutHistory: (workout: Workout) => void;
  
  // Session Management
  activeSession: WorkoutSession | null;
  startNewSession: (goal: WorkoutGoal) => void;
  continueSession: (workout: Workout) => void;
  endSession: () => void;
  
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Generator Status
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultProfile: UserProfile = {
  id: 'default',
  name: 'Default User',
  age: 30,
  gender: 'Male',
  height: 175,
  heightUnit: 'cm',
  weight: 75,
  weightUnit: 'kg',
  bodyFat: 15,
  fitnessExperience: 24
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Profile Management
  const [profiles, setProfiles] = useState<UserProfile[]>([defaultProfile]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(defaultProfile);
  
  const [bodyParts, setBodyParts] = useState<BodyPart[]>(initialBodyParts);
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [equipmentPresets, setEquipmentPresets] = useState<EquipmentPreset[]>(initialPresets);
  const [workoutGoal, setWorkoutGoalState] = useState<WorkoutGoal | null>(null);
  const [fitnessLevel, setFitnessLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Elite'>('Intermediate');
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>(mockWorkouts);
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        // Load theme preference
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
          setIsDarkMode(storedTheme === 'dark');
        }

        // Load profiles
        const storedProfiles = localStorage.getItem('profiles');
        if (storedProfiles) {
          const parsedProfiles = JSON.parse(storedProfiles);
          setProfiles(parsedProfiles);
          
          // Set active profile
          const activeProfileId = localStorage.getItem('activeProfileId');
          const activeProfile = parsedProfiles.find((p: UserProfile) => p.id === activeProfileId) || parsedProfiles[0];
          setUserProfile(activeProfile);
        }

        // Load other data
        const storedEquipment = localStorage.getItem('selectedEquipment');
        if (storedEquipment) setSelectedEquipment(JSON.parse(storedEquipment));
        
        const storedWorkoutHistory = localStorage.getItem('workoutHistory');
        if (storedWorkoutHistory) setWorkoutHistory(JSON.parse(storedWorkoutHistory));
      } catch (error) {
        console.error('Error loading stored data:', error);
      }
    };

    loadStoredData();
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('profiles', JSON.stringify(profiles));
    if (userProfile) {
      localStorage.setItem('activeProfileId', userProfile.id);
    }
    if (selectedEquipment.length) {
      localStorage.setItem('selectedEquipment', JSON.stringify(selectedEquipment));
    }
    if (workoutHistory.length) {
      localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
    }
  }, [isDarkMode, profiles, userProfile, selectedEquipment, workoutHistory]);

  // Apply theme class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Profile Management Functions
  const addProfile = (profile: UserProfile) => {
    const newProfiles = [...profiles, profile];
    setProfiles(newProfiles);
    setUserProfile(profile);
  };

  const updateProfile = (profile: UserProfile) => {
    const updatedProfiles = profiles.map(p => 
      p.id === profile.id ? profile : p
    );
    setProfiles(updatedProfiles);
    if (userProfile?.id === profile.id) {
      setUserProfile(profile);
    }
  };

  const deleteProfile = (profileId: string) => {
    const filteredProfiles = profiles.filter(p => p.id !== profileId);
    setProfiles(filteredProfiles);
    if (userProfile?.id === profileId) {
      setUserProfile(filteredProfiles[0] || null);
    }
  };

  const switchProfile = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setUserProfile(profile);
    }
  };

  // Existing functions...
  const toggleBodyPart = (id: string) => {
    setBodyParts(bodyParts.map(part => 
      part.id === id ? { ...part, selected: !part.selected } : part
    ));
  };

  const toggleSubPart = (bodyPartId: string, subPartId: string) => {
    console.log(`Toggle ${subPartId} in ${bodyPartId}`);
  };

  const toggleEquipment = (id: string) => {
    if (selectedEquipment.includes(id)) {
      setSelectedEquipment(selectedEquipment.filter(eqId => eqId !== id));
    } else {
      setSelectedEquipment([...selectedEquipment, id]);
    }
  };

  const addCustomEquipment = (name: string) => {
    const newEquipment: Equipment = {
      id: `custom-${Date.now()}`,
      name,
      icon: 'circle',
      category: 'Custom'
    };
    setEquipment([...equipment, newEquipment]);
    setSelectedEquipment([...selectedEquipment, newEquipment.id]);
  };

  const addEquipmentPreset = (name: string, equipmentIds: string[]) => {
    const newPreset: EquipmentPreset = {
      id: `preset-${Date.now()}`,
      name,
      equipmentIds
    };
    setEquipmentPresets([...equipmentPresets, newPreset]);
  };

  const applyPreset = (presetId: string) => {
    const preset = equipmentPresets.find(p => p.id === presetId);
    if (preset) {
      setSelectedEquipment(preset.equipmentIds);
    }
  };

  const setWorkoutGoal = (goal: Partial<WorkoutGoal>) => {
    setWorkoutGoalState(current => ({
      ...current,
      ...goal,
      text: goal.text || current?.text || '',
      targetBodyParts: goal.targetBodyParts || current?.targetBodyParts || [],
      fitnessLevel: goal.fitnessLevel || current?.fitnessLevel || fitnessLevel,
      selectedEquipment: goal.selectedEquipment || current?.selectedEquipment || selectedEquipment,
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const contextValue: AppContextType = {
    userProfile,
    setUserProfile,
    profiles,
    addProfile,
    updateProfile,
    deleteProfile,
    switchProfile,
    bodyParts,
    toggleBodyPart,
    toggleSubPart,
    equipment,
    selectedEquipment,
    toggleEquipment,
    equipmentPresets,
    addCustomEquipment,
    addEquipmentPreset,
    applyPreset,
    workoutGoal,
    setWorkoutGoal,
    fitnessLevel,
    setFitnessLevel,
    currentWorkout,
    setCurrentWorkout,
    workoutHistory,
    addToWorkoutHistory,
    activeSession,
    startNewSession,
    continueSession,
    endSession,
    isDarkMode,
    toggleDarkMode,
    isGenerating,
    setIsGenerating
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};