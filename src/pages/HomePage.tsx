import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

// Components
import Header from '../components/navigation/Header';
import ProfileForm from '../components/profile/ProfileForm';
import BodyPartSelector from '../components/training/BodyPartSelector';
import EquipmentSelector from '../components/training/EquipmentSelector';
import FitnessLevelSelector from '../components/training/FitnessLevelSelector';
import GoalInput from '../components/goals/GoalInput';
import WorkoutDisplay from '../components/workouts/WorkoutDisplay';
import WorkoutHistory from '../components/workouts/WorkoutHistory';

const HomePage: React.FC = () => {
  const { isDarkMode } = useAppContext();
  
  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Section (Top 25%) */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Your Personal AI Gym Trainer
            </h1>
            <ProfileForm />
          </div>
          
          {/* Training Parameters Section (Middle 25%) */}
          <div className="space-y-6">
            <BodyPartSelector />
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EquipmentSelector />
              <FitnessLevelSelector />
            </div>
          </div>
          
          {/* Goal Input Section (Bottom 50%) */}
          <div className="lg:col-span-2 space-y-6">
            <GoalInput />
            <WorkoutDisplay />
            <WorkoutHistory />
          </div>
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2025 AI Gym Trainer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;