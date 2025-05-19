import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Dumbbell, Moon, Sun, User } from 'lucide-react';

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode, userProfile } = useAppContext();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Dumbbell size={24} className="text-red-600 dark:text-red-500" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              AI Gym Trainer
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="flex items-center">
              {userProfile ? (
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-600 dark:text-gray-300">
                    {userProfile.age}, {userProfile.gender}
                  </span>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-2">
                    <User size={20} className="text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
              ) : (
                <button className="flex items-center px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors">
                  <User size={16} className="mr-1" />
                  <span className="text-sm font-medium">Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;