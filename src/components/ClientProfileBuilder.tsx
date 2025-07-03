import React, { useState } from 'react';
import { User, Target, Clock, Dumbbell, AlertCircle, ArrowRight, Lock } from 'lucide-react';
import { ClientProfile, UserPlan } from '../types';

interface ClientProfileBuilderProps {
  onComplete: (profile: ClientProfile) => void;
  userPlan: UserPlan;
  onUpgradeClick: () => void;
}

export function ClientProfileBuilder({ onComplete, userPlan, onUpgradeClick }: ClientProfileBuilderProps) {
  const [profile, setProfile] = useState<ClientProfile>({
    name: '',
    age: 25,
    gender: 'male',
    fitnessLevel: 'beginner',
    goals: [],
    availableEquipment: [],
    workoutDuration: 60,
    workoutFrequency: 3,
    injuries: [],
    preferences: []
  });

  const fitnessGoals = [
    'Weight Loss', 'Muscle Gain', 'Strength Building', 'Endurance',
    'Flexibility', 'Athletic Performance', 'General Fitness', 'Rehabilitation'
  ];

  const equipmentOptions = [
    'Dumbbells', 'Barbell', 'Resistance Bands', 'Pull-up Bar',
    'Kettlebells', 'Cable Machine', 'Smith Machine', 'Leg Press',
    'Treadmill', 'Stationary Bike', 'Rowing Machine', 'Bodyweight Only'
  ];

  const commonInjuries = [
    'Lower Back Pain', 'Knee Issues', 'Shoulder Impingement',
    'Wrist Problems', 'Ankle Issues', 'Hip Problems', 'Neck Strain'
  ];

  const workoutPreferences = [
    'High Intensity', 'Low Impact', 'Compound Movements',
    'Isolation Exercises', 'Functional Training', 'Circuit Training',
    'Supersets', 'Drop Sets', 'Time Under Tension'
  ];

  const handleArrayToggle = (array: string[], value: string, setter: (arr: string[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter(item => item !== value));
    } else {
      setter([...array, value]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userPlan === 'free' && profile.goals.length > 2) {
      onUpgradeClick();
      return;
    }
    onComplete(profile);
  };

  const isAdvancedFeature = (feature: string) => {
    return userPlan === 'free' && (
      feature === 'injuries' || 
      feature === 'preferences' ||
      (feature === 'goals' && profile.goals.length >= 2)
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex items-center space-x-3">
            <User className="h-8 w-8 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">Client Profile Builder</h2>
              <p className="text-blue-100">Create a detailed profile to generate personalized workouts</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name
              </label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                required
                min="16"
                max="80"
                value={profile.age}
                onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value as any }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Fitness Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Fitness Level
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['beginner', 'intermediate', 'advanced'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setProfile(prev => ({ ...prev, fitnessLevel: level as any }))}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    profile.fitnessLevel === level
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize">{level}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {level === 'beginner' && '0-6 months experience'}
                    {level === 'intermediate' && '6 months - 2 years'}
                    {level === 'advanced' && '2+ years experience'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Fitness Goals */}
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                <Target className="h-4 w-4 inline mr-2" />
                Fitness Goals
              </label>
              {userPlan === 'free' && (
                <span className="text-xs text-gray-500">Free: Up to 2 goals</span>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {fitnessGoals.map(goal => {
                const isSelected = profile.goals.includes(goal);
                const isDisabled = userPlan === 'free' && !isSelected && profile.goals.length >= 2;
                
                return (
                  <button
                    key={goal}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleArrayToggle(profile.goals, goal, (goals) => 
                      setProfile(prev => ({ ...prev, goals }))
                    )}
                    className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors relative ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : isDisabled
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {goal}
                    {isDisabled && (
                      <Lock className="h-3 w-3 absolute top-1 right-1 text-gray-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Available Equipment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Dumbbell className="h-4 w-4 inline mr-2" />
              Available Equipment
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {equipmentOptions.map(equipment => (
                <button
                  key={equipment}
                  type="button"
                  onClick={() => handleArrayToggle(profile.availableEquipment, equipment, (eq) => 
                    setProfile(prev => ({ ...prev, availableEquipment: eq }))
                  )}
                  className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                    profile.availableEquipment.includes(equipment)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {equipment}
                </button>
              ))}
            </div>
          </div>

          {/* Workout Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-2" />
                Workout Duration (minutes)
              </label>
              <select
                value={profile.workoutDuration}
                onChange={(e) => setProfile(prev => ({ ...prev, workoutDuration: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={75}>75 minutes</option>
                <option value={90}>90 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workout Frequency (per week)
              </label>
              <select
                value={profile.workoutFrequency}
                onChange={(e) => setProfile(prev => ({ ...prev, workoutFrequency: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={2}>2 days per week</option>
                <option value={3}>3 days per week</option>
                <option value={4}>4 days per week</option>
                <option value={5}>5 days per week</option>
                <option value={6}>6 days per week</option>
              </select>
            </div>
          </div>

          {/* Injuries - Pro Feature */}
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                <AlertCircle className="h-4 w-4 inline mr-2" />
                Injuries or Limitations
              </label>
              {userPlan === 'free' && (
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">Pro Feature</span>
                </div>
              )}
            </div>
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${isAdvancedFeature('injuries') ? 'opacity-50' : ''}`}>
              {commonInjuries.map(injury => (
                <button
                  key={injury}
                  type="button"
                  disabled={isAdvancedFeature('injuries')}
                  onClick={() => !isAdvancedFeature('injuries') && handleArrayToggle(profile.injuries, injury, (injuries) => 
                    setProfile(prev => ({ ...prev, injuries }))
                  )}
                  className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                    profile.injuries.includes(injury)
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${isAdvancedFeature('injuries') ? 'cursor-not-allowed' : ''}`}
                >
                  {injury}
                </button>
              ))}
            </div>
            {isAdvancedFeature('injuries') && (
              <button
                type="button"
                onClick={onUpgradeClick}
                className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Upgrade to Pro to track injuries and limitations
              </button>
            )}
          </div>

          {/* Workout Preferences - Premium Feature */}
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Workout Preferences
              </label>
              {userPlan !== 'premium' && (
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">Premium Feature</span>
                </div>
              )}
            </div>
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${isAdvancedFeature('preferences') ? 'opacity-50' : ''}`}>
              {workoutPreferences.map(preference => (
                <button
                  key={preference}
                  type="button"
                  disabled={isAdvancedFeature('preferences')}
                  onClick={() => !isAdvancedFeature('preferences') && handleArrayToggle(profile.preferences, preference, (prefs) => 
                    setProfile(prev => ({ ...prev, preferences: prefs }))
                  )}
                  className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                    profile.preferences.includes(preference)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${isAdvancedFeature('preferences') ? 'cursor-not-allowed' : ''}`}
                >
                  {preference}
                </button>
              ))}
            </div>
            {isAdvancedFeature('preferences') && (
              <button
                type="button"
                onClick={onUpgradeClick}
                className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Upgrade to Premium for advanced workout preferences
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2"
          >
            <span>Generate Workout Plan</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}