import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { Target, Zap, Loader2 } from 'lucide-react';
import { exampleGoals } from '../../data/exampleGoals';
import { generateWorkout } from '../../services/workoutGenerator';

const GoalInput: React.FC = () => {
  const { 
    bodyParts, 
    selectedEquipment, 
    fitnessLevel,
    workoutGoal,
    setWorkoutGoal,
    setCurrentWorkout,
    isGenerating,
    setIsGenerating
  } = useAppContext();
  
  const [goalText, setGoalText] = useState('');
  
  const handleExampleClick = (example: string) => {
    setGoalText(example);
  };
  
  const handleGenerate = async () => {
    if (!goalText.trim()) return;
    
    // Update the workout goal
    const selectedBodyParts = bodyParts
      .filter(part => part.selected)
      .map(part => part.id);
    
    const newGoal = {
      text: goalText.trim(),
      targetBodyParts: selectedBodyParts,
      fitnessLevel,
      selectedEquipment
    };
    
    setWorkoutGoal(newGoal);
    
    // Generate workout
    setIsGenerating(true);
    try {
      const workout = await generateWorkout(newGoal);
      setCurrentWorkout(workout);
    } catch (error) {
      console.error('Error generating workout:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Card
      title="Workout Goal"
      icon={<Target size={24} />}
      className="transition-all duration-300 hover:shadow-lg"
    >
      <div className="space-y-4">
        <Textarea
          label="What's your fitness goal today?"
          placeholder="E.g., I want to build overall strength for rock climbing..."
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
          className="min-h-[120px]"
        />
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Example goals:
          </p>
          <div className="flex flex-wrap gap-2">
            {exampleGoals.slice(0, 3).map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                {example.length > 30 ? example.substring(0, 30) + '...' : example}
              </button>
            ))}
            <button
              className="text-xs px-3 py-1 bg-gray-100 text-blue-600 rounded-full hover:bg-gray-200 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 transition-colors"
            >
              More examples...
            </button>
          </div>
        </div>
        
        <div className="pt-4">
          <Button
            onClick={handleGenerate}
            disabled={!goalText.trim() || isGenerating}
            variant="secondary"
            leftIcon={isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />}
            className="w-full py-2 transition-transform hover:scale-[1.02]"
            isLoading={isGenerating}
          >
            {isGenerating ? 'Generating Workout...' : 'Generate Personalized Workout'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GoalInput;