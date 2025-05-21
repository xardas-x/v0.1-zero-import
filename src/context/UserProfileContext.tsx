import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface UserProfileContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  profiles: UserProfile[];
  addProfile: (profile: UserProfile) => void;
  updateProfile: (profile: UserProfile) => void;
  deleteProfile: (profileId: string) => void;
  switchProfile: (profileId: string) => void;
}

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
  fitnessExperience: 24,
  injuries: ['None'],
  medicalConditions: ['None'],
  cardioEndurance: 5,
  strengthLevel: 5,
  flexibility: 5,
  mobilityLimitations: ['None'],
  workoutDuration: '45 minutes',
  workoutFrequency: '3-4',
  workoutTime: 'Evening',
  exerciseStyles: ['Strength training'],
  sleepHours: 7,
  stressLevel: 3,
  dietType: 'Omnivore',
  proteinIntake: "Don't track",
  mealTiming: ['No preference']
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<UserProfile[]>([defaultProfile]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(defaultProfile);

  useEffect(() => {
    try {
      const storedProfiles = localStorage.getItem('profiles');
      if (storedProfiles) {
        const parsedProfiles = JSON.parse(storedProfiles);
        setProfiles(parsedProfiles);
        
        const activeProfileId = localStorage.getItem('activeProfileId');
        const activeProfile = parsedProfiles.find((p: UserProfile) => p.id === activeProfileId) || parsedProfiles[0];
        setUserProfile(activeProfile);
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('profiles', JSON.stringify(profiles));
      if (userProfile) {
        localStorage.setItem('activeProfileId', userProfile.id);
      }
    } catch (error) {
      console.error('Error saving profiles:', error);
    }
  }, [profiles, userProfile]);

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

  return (
    <UserProfileContext.Provider value={{
      userProfile,
      setUserProfile,
      profiles,
      addProfile,
      updateProfile,
      deleteProfile,
      switchProfile
    }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};