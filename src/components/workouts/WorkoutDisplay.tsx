import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Dumbbell, Clock, Flame, Save, Share, RotateCcw, ArrowRight } from 'lucide-react';

const WorkoutDisplay: React.FC = () => {
  const { currentWorkout, addToWorkoutHistory, isGenerating } = useAppContext();
  
  if (isGenerating) {
    return (
      <Card title="Generating Your Workout" className="animate-pulse">
        <div className="flex flex-col items-center justify-center py-8">
          <Dumbbell size={48} className="text-gray-400 animate-bounce mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Creating your personalized workout plan...
          </p>
        </div>
      </Card>
    );
  }
  
  if (!currentWorkout) {
    return (
      <Card title="Your Workout Plan">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Dumbbell size={48} className="text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            No workout generated yet. Fill in your details and goals above to create a personalized workout plan.
          </p>
        </div>
      </Card>
    );
  }
  
  const saveWorkout = () => {
    addToWorkoutHistory(currentWorkout);
  };
  
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} sec`;
    return `${Math.floor(seconds / 60)} min`;
  };
  
  return (
    <Card 
      title={currentWorkout.title}
      subtitle={`Generated workout plan for your goals`}
      className="mt-4 transition-all duration-300 hover:shadow-lg"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="primary" className="flex items-center gap-1">
            <Clock size={14} /> {currentWorkout.estimatedTime} mins
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Flame size={14} /> {currentWorkout.caloriesBurned} calories
          </Badge>
          <Badge variant={
            currentWorkout.difficulty === 'Beginner' ? 'success' :
            currentWorkout.difficulty === 'Intermediate' ? 'warning' :
            'danger'
          }>
            {currentWorkout.difficulty}
          </Badge>
          {currentWorkout.tags.map((tag, idx) => (
            <Badge key={idx} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
        
        {currentWorkout.exercises.map((exercise, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg p-4 dark:border-gray-700 hover:shadow-sm transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {exercise.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 sm:mt-0">
                <Badge 
                  variant={
                    exercise.difficulty === 'Easy' ? 'success' :
                    exercise.difficulty === 'Medium' ? 'warning' :
                    'danger'
                  }
                  size="sm"
                >
                  {exercise.difficulty}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="text-center p-2 bg-gray-50 rounded dark:bg-gray-800">
                <span className="block text-sm text-gray-500 dark:text-gray-400">Sets</span>
                <span className="font-medium">{exercise.sets}</span>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded dark:bg-gray-800">
                <span className="block text-sm text-gray-500 dark:text-gray-400">Reps</span>
                <span className="font-medium">{exercise.reps}</span>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded dark:bg-gray-800">
                <span className="block text-sm text-gray-500 dark:text-gray-400">Rest</span>
                <span className="font-medium">{formatTime(exercise.restTime)}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {exercise.instructions}
            </p>
            
            {exercise.equipment.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {exercise.equipment.map((eq, idx) => (
                  <Badge key={idx} variant="default" size="sm">
                    {eq.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {currentWorkout.notes && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm dark:bg-blue-900 dark:border-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">Coach Notes:</p>
            <p>{currentWorkout.notes}</p>
          </div>
        )}
        
        <div className="flex flex-wrap justify-between gap-2 mt-6">
          <Button
            variant="outline"
            leftIcon={<RotateCcw size={16} />}
          >
            Regenerate
          </Button>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              leftIcon={<Share size={16} />}
            >
              Share
            </Button>
            <Button
              onClick={saveWorkout}
              leftIcon={<Save size={16} />}
            >
              Save Workout
            </Button>
            <Button
              variant="secondary"
              rightIcon={<ArrowRight size={16} />}
            >
              Continue Training
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WorkoutDisplay;