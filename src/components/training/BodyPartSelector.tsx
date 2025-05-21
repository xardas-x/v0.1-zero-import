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
              width="200"
              height="300"
              viewBox="0 0 200 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              {/* Head */}
              <circle
                cx="100"
                cy="40"
                r="20"
                fill="#E5E7EB"
                stroke="#374151"
                strokeWidth="2"
              />
              
              {/* Shoulders */}
              <path
                d={`M60 70 Q100 60 140 70`}
                fill={bodyParts.find(p => p.id === 'shoulders')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="2"
                className="transition-colors duration-300"
              />
              
              {/* Chest */}
              <path
                d={`M70 70 Q100 90 130 70 Q130 100 100 110 Q70 100 70 70`}
                fill={bodyParts.find(p => p.id === 'chest')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="2"
                className="transition-colors duration-300"
              />
              
              {/* Arms */}
              <path
                d={`M60 70 Q40 90 35 130 L45 130 Q50 90 65 75`}
                fill={bodyParts.find(p => p.id === 'arms')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="2"
                className="transition-colors duration-300"
              />
              <path
                d={`M140 70 Q160 90 165 130 L155 130 Q150 90 135 75`}
                fill={bodyParts.find(p => p.id === 'arms')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="2"
                className="transition-colors duration-300"
              />
              
              {/* Core */}
              <path
                d={`M70 110 Q100 120 130 110 Q130 150 100 160 Q70 150 70 110`}
                fill={bodyParts.find(p => p.id === 'core')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="2"
                className="transition-colors duration-300"
              />
              
              {/* Back */}
              <path
                d={`M70 90 Q100 100 130 90 L130 140 Q100 150 70 140 Z`}
                fill={bodyParts.find(p => p.id === 'back')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="2"
                className="transition-colors duration-300"
                opacity="0.5"
              />
              
              {/* Legs */}
              <path
                d={`M85 160 Q80 200 75 250 L90 250 Q95 200 95 160`}
                fill={bodyParts.find(p => p.id === 'legs')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="2"
                className="transition-colors duration-300"
              />
              <path
                d={`M115 160 Q120 200 125 250 L110 250 Q105 200 105 160`}
                fill={bodyParts.find(p => p.id === 'legs')?.selected ? '#93C5FD' : '#E5E7EB'}
                stroke="#374151"
                strokeWidth="2"
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