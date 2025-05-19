import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Slider from '../ui/Slider';
import { UserCircle, Save, User, Users, RefreshCw, Trash2 } from 'lucide-react';

const ProfileForm: React.FC = () => {
  const { 
    userProfile, 
    profiles,
    addProfile,
    updateProfile,
    deleteProfile,
    switchProfile
  } = useAppContext();
  
  const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState(userProfile);
  
  useEffect(() => {
    if (userProfile) {
      // Ensure arrays are initialized even if empty
      setProfile({
        ...userProfile,
        injuries: userProfile.injuries || ['None'],
        medicalConditions: userProfile.medicalConditions || ['None'],
        mobilityLimitations: userProfile.mobilityLimitations || ['None'],
        exerciseStyles: userProfile.exerciseStyles || ['Strength training'],
        mealTiming: userProfile.mealTiming || ['No preference']
      });
    }
  }, [userProfile]);
  
  const handleChange = (field: keyof typeof profile, value: any) => {
    setProfile(prev => {
      if (!prev) return prev;
      
      // Ensure arrays are always initialized when updating
      const updatedProfile = { ...prev, [field]: value };
      
      // Initialize arrays if they become undefined
      if (field === 'injuries' && !updatedProfile.injuries) {
        updatedProfile.injuries = ['None'];
      }
      if (field === 'medicalConditions' && !updatedProfile.medicalConditions) {
        updatedProfile.medicalConditions = ['None'];
      }
      if (field === 'mobilityLimitations' && !updatedProfile.mobilityLimitations) {
        updatedProfile.mobilityLimitations = ['None'];
      }
      if (field === 'exerciseStyles' && !updatedProfile.exerciseStyles) {
        updatedProfile.exerciseStyles = ['Strength training'];
      }
      if (field === 'mealTiming' && !updatedProfile.mealTiming) {
        updatedProfile.mealTiming = ['No preference'];
      }
      
      return updatedProfile;
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (profile) {
        updateProfile(profile);
      }
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddProfile = () => {
    const newProfile = {
      id: `profile-${Date.now()}`,
      name: `New Profile ${profiles.length + 1}`,
      age: 30,
      gender: 'Male' as const,
      height: 175,
      heightUnit: 'cm' as const,
      weight: 75,
      weightUnit: 'kg' as const,
      bodyFat: 15,
      fitnessExperience: 24,
      injuries: ['None'],
      medicalConditions: ['None'],
      cardioEndurance: 5,
      strengthLevel: 5,
      flexibility: 5,
      mobilityLimitations: ['None'],
      workoutDuration: '45 minutes',
      workoutFrequency: '3-4',
      workoutTime: 'Evening',
      exerciseStyles: ['Strength training'],
      sleepHours: 7,
      stressLevel: 3,
      dietType: 'Omnivore',
      proteinIntake: "Don't track",
      mealTiming: ['No preference']
    };
    addProfile(newProfile);
    setShowProfileSwitcher(false);
  };

  if (!profile) return null;

  // Safely access array values with fallbacks
  const currentInjury = profile.injuries?.[0] || 'None';
  const currentMedicalCondition = profile.medicalConditions?.[0] || 'None';
  const currentMobilityLimitation = profile.mobilityLimitations?.[0] || 'None';
  const currentExerciseStyle = profile.exerciseStyles?.[0] || 'Strength training';
  const currentMealTiming = profile.mealTiming?.[0] || 'No preference';

  return (
    <Card 
      title="Your Profile"
      icon={<UserCircle size={24} />}
      className="transition-all duration-300 hover:shadow-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Existing Profile Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name"
            value={profile.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
          
          <Input
            label="Age"
            type="number"
            min={18}
            max={100}
            value={profile.age}
            onChange={(e) => handleChange('age', parseInt(e.target.value))}
            required
          />
          
          <Select
            label="Gender"
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' }
            ]}
            value={profile.gender}
            onChange={(value) => handleChange('gender', value)}
          />
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Height ({profile.heightUnit})
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min={profile.heightUnit === 'cm' ? 120 : 48}
                max={profile.heightUnit === 'cm' ? 220 : 84}
                value={profile.height}
                onChange={(e) => handleChange('height', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300 w-20">
                {profile.height} {profile.heightUnit}
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Weight ({profile.weightUnit})
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min={profile.weightUnit === 'kg' ? 40 : 90}
                max={profile.weightUnit === 'kg' ? 150 : 330}
                value={profile.weight}
                onChange={(e) => handleChange('weight', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300 w-16">
                {profile.weight} {profile.weightUnit}
              </span>
            </div>
          </div>
        </div>

        {/* Medical Considerations Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Medical Considerations</h3>
          <div className="space-y-4">
            <Select
              label="Pre-existing injuries or limitations"
              options={[
                'None',
                'Knee',
                'Back',
                'Shoulder',
                'Hip',
                'Ankle',
                'Wrist',
                'Other'
              ].map(value => ({ value, label: value }))}
              value={currentInjury}
              onChange={(value) => handleChange('injuries', [value])}
            />

            <Select
              label="Medical conditions that may affect exercise"
              options={[
                'None',
                'Heart condition',
                'Asthma',
                'Diabetes',
                'Hypertension',
                'Arthritis',
                'Other'
              ].map(value => ({ value, label: value }))}
              value={currentMedicalCondition}
              onChange={(value) => handleChange('medicalConditions', [value])}
            />

            <textarea
              placeholder="Please specify any other medical information that may impact your exercise routine"
              maxLength={500}
              value={profile.otherMedicalInfo || ''}
              onChange={(e) => handleChange('otherMedicalInfo', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Fitness Assessment Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Fitness Assessment</h3>
          <div className="space-y-4">
            <Slider
              label="Cardiovascular Endurance"
              min={1}
              max={10}
              value={profile.cardioEndurance}
              onChange={(value) => handleChange('cardioEndurance', value)}
              markers={[
                { value: 1, label: 'Low' },
                { value: 5, label: 'Medium' },
                { value: 10, label: 'High' }
              ]}
            />

            <Slider
              label="Strength Level"
              min={1}
              max={10}
              value={profile.strengthLevel}
              onChange={(value) => handleChange('strengthLevel', value)}
              markers={[
                { value: 1, label: 'Beginner' },
                { value: 5, label: 'Intermediate' },
                { value: 10, label: 'Advanced' }
              ]}
            />

            <Slider
              label="Flexibility"
              min={1}
              max={10}
              value={profile.flexibility}
              onChange={(value) => handleChange('flexibility', value)}
              markers={[
                { value: 1, label: 'Limited' },
                { value: 5, label: 'Average' },
                { value: 10, label: 'Flexible' }
              ]}
            />

            <Select
              label="Mobility Limitations"
              options={[
                'None',
                'Difficulty squatting',
                'Limited overhead reach',
                'Limited hip mobility',
                'Poor ankle flexibility',
                'Other'
              ].map(value => ({ value, label: value }))}
              value={currentMobilityLimitation}
              onChange={(value) => handleChange('mobilityLimitations', [value])}
            />
          </div>
        </div>

        {/* Workout Preferences Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Workout Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Preferred workout duration"
              options={[
                '15 minutes',
                '30 minutes',
                '45 minutes',
                '60+ minutes'
              ].map(value => ({ value, label: value }))}
              value={profile.workoutDuration}
              onChange={(value) => handleChange('workoutDuration', value)}
            />

            <Select
              label="Workout frequency (days per week)"
              options={[
                '1-2',
                '3-4',
                '5-6',
                '7'
              ].map(value => ({ value, label: value }))}
              value={profile.workoutFrequency}
              onChange={(value) => handleChange('workoutFrequency', value)}
            />

            <Select
              label="Preferred workout time"
              options={[
                'Morning',
                'Afternoon',
                'Evening'
              ].map(value => ({ value, label: value }))}
              value={profile.workoutTime}
              onChange={(value) => handleChange('workoutTime', value)}
            />

            <Select
              label="Exercise style preferences"
              options={[
                'HIIT',
                'Steady-state cardio',
                'Strength training',
                'Bodyweight exercises',
                'Yoga/Flexibility',
                'Sports specific'
              ].map(value => ({ value, label: value }))}
              value={currentExerciseStyle}
              onChange={(value) => handleChange('exerciseStyles', [value])}
            />
          </div>
        </div>

        {/* Recovery Profile Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Recovery Profile</h3>
          <div className="space-y-4">
            <Slider
              label="Average hours of sleep per night"
              min={4}
              max={12}
              step={0.5}
              value={profile.sleepHours}
              onChange={(value) => handleChange('sleepHours', value)}
            />

            <Slider
              label="Daily stress level"
              min={1}
              max={5}
              value={profile.stressLevel}
              onChange={(value) => handleChange('stressLevel', value)}
              markers={[
                { value: 1, label: 'Low' },
                { value: 3, label: 'Medium' },
                { value: 5, label: 'High' }
              ]}
            />
          </div>
        </div>

        {/* Nutrition Basics Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Nutrition Basics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Diet type"
              options={[
                'Omnivore',
                'Vegetarian',
                'Vegan',
                'Pescatarian',
                'Keto',
                'Paleo',
                'Other'
              ].map(value => ({ value, label: value }))}
              value={profile.dietType}
              onChange={(value) => handleChange('dietType', value)}
            />

            <Select
              label="Daily protein intake"
              options={[
                "Don't track",
                'Low (< 0.5g per lb bodyweight)',
                'Moderate (0.5-0.8g per lb)',
                'High (> 0.8g per lb)'
              ].map(value => ({ value, label: value }))}
              value={profile.proteinIntake}
              onChange={(value) => handleChange('proteinIntake', value)}
            />

            <Select
              label="When do you prefer to eat around workouts?"
              options={[
                'No preference',
                'Fasted workouts',
                'Eat 1-2 hours before',
                'Eat immediately after'
              ].map(value => ({ value, label: value }))}
              value={currentMealTiming}
              onChange={(value) => handleChange('mealTiming', [value])}
            />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            disabled={isSaving}
            leftIcon={isSaving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
          >
            {isSaving ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileForm;