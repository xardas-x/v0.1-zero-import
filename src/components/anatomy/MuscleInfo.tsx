import React from 'react';
import { X } from 'lucide-react';
import { MuscleData } from './types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface MuscleInfoProps {
  muscle: MuscleData;
  onClose: () => void;
}

export const MuscleInfo: React.FC<MuscleInfoProps> = ({ muscle, onClose }) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-20">
      <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {muscle.name}
            </h3>
            <div className="flex gap-2 mt-1">
              {muscle.tags.map(tag => (
                <Badge key={tag} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Functions</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              {muscle.functions.map((func, index) => (
                <li key={index}>{func}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Exercises</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              {muscle.exercises.map((exercise, index) => (
                <li key={index}>{exercise}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Injury Prevention
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{muscle.injuryPrevention}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recovery Tips</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{muscle.recoveryTips}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};