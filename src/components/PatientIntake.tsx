import React, { useState } from 'react';
import { User, Stethoscope, Target, Dumbbell, ArrowRight } from 'lucide-react';

interface PatientIntakeProps {
  onComplete: (data: any) => void;
}

export function PatientIntake({ onComplete }: PatientIntakeProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    injury: '',
    goals: [] as string[],
    preferredExerciseType: '',
    painLevel: 5,
    activityLevel: ''
  });

  const injuryOptions = [
    'Knee injury', 'Lower back pain', 'Shoulder impingement', 'Ankle sprain',
    'Hip pain', 'Neck strain', 'Wrist injury', 'Plantar fasciitis'
  ];

  const goalOptions = [
    'Pain reduction', 'Improved mobility', 'Strength building', 'Flexibility',
    'Balance improvement', 'Return to sport', 'Injury prevention'
  ];

  const exerciseTypes = [
    'Low-impact exercises', 'Yoga and stretching', 'Resistance training',
    'Aquatic therapy', 'Pilates', 'Functional movement'
  ];

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Art.Doctor.PT</h2>
        <p className="text-gray-600">Let's create a personalized therapy program just for you</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Medical Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Injury/Condition</label>
              <select
                required
                value={formData.injury}
                onChange={(e) => setFormData(prev => ({ ...prev, injury: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your primary concern</option>
                {injuryOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Pain Level (1-10)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.painLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, painLevel: parseInt(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-gray-900 w-8">{formData.painLevel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Your Goals</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {goalOptions.map(goal => (
              <button
                key={goal}
                type="button"
                onClick={() => handleGoalToggle(goal)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                  formData.goals.includes(goal)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Dumbbell className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Exercise Preferences</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Exercise Type</label>
              <select
                required
                value={formData.preferredExerciseType}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredExerciseType: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your preference</option>
                {exerciseTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Activity Level</label>
              <div className="grid grid-cols-3 gap-3">
                {['Sedentary', 'Moderate', 'Active'].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, activityLevel: level }))}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                      formData.activityLevel === level
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <span>Generate My Therapy Program</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}