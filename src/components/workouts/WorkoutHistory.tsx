import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { History, Clock, Calendar } from 'lucide-react';

const WorkoutHistory: React.FC = () => {
  const { workoutHistory, setCurrentWorkout } = useAppContext();
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const loadWorkout = (workoutId: string) => {
    const workout = workoutHistory.find(w => w.id === workoutId);
    if (workout) {
      setCurrentWorkout(workout);
    }
  };
  
  if (workoutHistory.length === 0) {
    return null;
  }
  
  return (
    <Card
      title="Recent Workouts"
      icon={<History size={24} />}
      className="mt-6 transition-all duration-300 hover:shadow-lg"
    >
      <div className="space-y-2">
        {workoutHistory.slice(0, 3).map(workout => (
          <div 
            key={workout.id}
            className="cursor-pointer flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
            onClick={() => loadWorkout(workout.id)}
          >
            <div className="flex-shrink-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-2 mr-3">
              <Calendar size={20} className="text-gray-500 dark:text-gray-400" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-1">
                {formatDate(workout.createdAt).split(' ')[0]}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(workout.createdAt).split(' ')[1]}
              </span>
            </div>
            
            <div className="flex-grow min-w-0">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {workout.title}
              </h4>
              
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="primary" size="sm" className="flex items-center gap-0.5">
                  <Clock size={12} />
                  <span>{workout.estimatedTime} min</span>
                </Badge>
                
                <Badge 
                  variant={
                    workout.difficulty === 'Beginner' ? 'success' :
                    workout.difficulty === 'Intermediate' ? 'warning' :
                    'danger'
                  } 
                  size="sm"
                >
                  {workout.difficulty}
                </Badge>
                
                {workout.tags.slice(0, 1).map((tag, idx) => (
                  <Badge key={idx} variant="default" size="sm">
                    {tag}
                  </Badge>
                ))}
                
                {workout.tags.length > 1 && (
                  <Badge variant="default" size="sm">
                    +{workout.tags.length - 1}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {workoutHistory.length > 3 && (
          <button className="w-full text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mt-2">
            View all workouts
          </button>
        )}
      </div>
    </Card>
  );
};

export default WorkoutHistory;