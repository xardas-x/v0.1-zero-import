import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import { TrendingUp } from 'lucide-react';

const FitnessLevelSelector: React.FC = () => {
  const { fitnessLevel, setFitnessLevel } = useAppContext();
  
  const levels = [
    { id: 'Beginner', label: 'Beginner', description: 'New to fitness or returning after a long break' },
    { id: 'Intermediate', label: 'Intermediate', description: 'Consistent training for 6+ months' },
    { id: 'Advanced', label: 'Advanced', description: 'Serious training for 2+ years' },
    { id: 'Elite', label: 'Elite', description: 'High performance athlete level' }
  ];
  
  const handleChange = (level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite') => {
    setFitnessLevel(level);
  };
  
  return (
    <Card
      title="Fitness Level"
      icon={<TrendingUp size={24} />}
      className="transition-all duration-300 hover:shadow-lg"
    >
      <div className="space-y-4">
        <div className="relative pt-6">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
            <div 
              className="h-2 bg-blue-500 rounded-full dark:bg-blue-600"
              style={{ 
                width: fitnessLevel === 'Beginner' ? '25%' : 
                       fitnessLevel === 'Intermediate' ? '50%' : 
                       fitnessLevel === 'Advanced' ? '75%' : '100%' 
              }}
            ></div>
          </div>
          
          <div className="flex justify-between mt-2">
            {levels.map((level, index) => (
              <div 
                key={level.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleChange(level.id as any)}
              >
                <div 
                  className={`
                    w-4 h-4 rounded-full -mt-5 transition-all
                    ${fitnessLevel === level.id 
                      ? 'bg-blue-600 ring-4 ring-blue-200 dark:ring-blue-900' 
                      : 'bg-gray-400 dark:bg-gray-600'
                    }
                  `}
                ></div>
                <span 
                  className={`
                    text-xs font-medium mt-1 transition-colors
                    ${fitnessLevel === level.id 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-500 dark:text-gray-400'
                    }
                  `}
                >
                  {level.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {levels.find(level => level.id === fitnessLevel)?.description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default FitnessLevelSelector;