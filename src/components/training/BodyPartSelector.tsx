import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Activity } from 'lucide-react';

const BodyPartSelector: React.FC = () => {
  const { bodyParts, toggleBodyPart } = useAppContext();

  return (
    <Card
      title="Target Muscle Groups"
      icon={<Activity size={24} />}
      className="transition-all duration-300 hover:shadow-lg"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {bodyParts.map((part) => (
            <button
              key={part.id}
              onClick={() => toggleBodyPart(part.id)}
              className={`
                flex items-center justify-center p-3 rounded-lg border transition-all
                ${part.selected
                  ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-300'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                }
              `}
            >
              <span className="text-sm font-medium">{part.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Specific Muscle Focus
          </h4>
          <div className="flex flex-wrap gap-2">
            {bodyParts
              .filter((part) => part.selected)
              .map((part) =>
                part.subParts.map((subPart) => (
                  <Badge
                    key={subPart.id}
                    variant="primary"
                    rounded={true}
                    className="cursor-pointer transition-all hover:scale-105"
                  >
                    {subPart.name}
                  </Badge>
                ))
              )}
            {!bodyParts.some((part) => part.selected) && (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Select body parts to see specific muscles
              </p>
            )}
          </div>
        </div>
        
        <div className="my-4 flex items-center justify-center">
          <div className="border border-gray-300 rounded-lg p-4 dark:border-gray-700">
            <svg
              width="150"
              height="220"
              viewBox="0 0 150 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              {/* Simplified anatomical illustration */}
              <path
                d="M75 30 C55 30, 45 40, 45 60 C45 90, 65 100, 75 120 C85 100, 105 90, 105 60 C105 40, 95 30, 75 30"
                fill={bodyParts.find(p => p.id === 'chest')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="1"
                className="transition-colors duration-300"
              />
              <path
                d="M45 60 C35 65, 30 75, 25 110 C23 125, 35 140, 30 160 C29 170, 35 180, 35 190 L45 190 C45 175, 40 170, 45 155 C50 140, 50 120, 55 110 C62 90, 65 80, 65 65"
                fill={bodyParts.find(p => p.id === 'arms')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="1"
                className="transition-colors duration-300"
              />
              <path
                d="M105 60 C115 65, 120 75, 125 110 C127 125, 115 140, 120 160 C121 170, 115 180, 115 190 L105 190 C105 175, 110 170, 105 155 C100 140, 100 120, 95 110 C88 90, 85 80, 85 65"
                fill={bodyParts.find(p => p.id === 'arms')?.selected ? '#93C5FD' : '#E5E7EB'} 
                stroke="#374151"
                strokeWidth="1"
                className="transition-colors duration-300"
              />
              <path
                d="M75 120 C65 120, 55 125, 50 140 C45 155, 45 170, 45 190 L55 190 C55 170, 55 155, 60 145 C65 135, 70 130, 75 130"
                fill={bodyParts.find(p => p.id === 'legs')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="1"
                className="transition-colors duration-300"
              />
              <path
                d="M75 120 C85 120, 95 125, 100 140 C105 155, 105 170, 105 190 L95 190 C95 170, 95 155, 90 145 C85 135, 80 130, 75 130"
                fill={bodyParts.find(p => p.id === 'legs')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="1"
                className="transition-colors duration-300"
              />
              <circle
                cx="75"
                cy="20"
                r="15"
                fill="#E5E7EB"
                stroke="#374151"
                strokeWidth="1"
              />
              <path
                d="M55 40 L55 60 C55 75, 65 80, 75 90 C85 80, 95 75, 95 60 L95 40"
                fill={bodyParts.find(p => p.id === 'shoulders')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="1"
                className="transition-colors duration-300"
              />
              <path
                d="M55 90 L55 120 L95 120 L95 90" 
                fill={bodyParts.find(p => p.id === 'core')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="1"
                className="transition-colors duration-300"
              />
              <path
                d="M45 60 L45 90 C45 100, 55 110, 55 120" 
                fill={bodyParts.find(p => p.id === 'back')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="1"
                className="transition-colors duration-300"
              />
              <path
                d="M105 60 L105 90 C105 100, 95 110, 95 120" 
                fill={bodyParts.find(p => p.id === 'back')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="1"
                className="transition-colors duration-300"
              />
            </svg>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BodyPartSelector;