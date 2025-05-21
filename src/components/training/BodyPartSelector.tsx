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
          <img 
            src="https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Human anatomy reference"
            className="h-64 object-contain rounded-lg opacity-80"
          />
        </div>
      </div>
    </Card>
  );
};

export default BodyPartSelector;