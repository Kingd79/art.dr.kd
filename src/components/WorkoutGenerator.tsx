import React, { useState } from 'react';
import { Zap, Target, Clock, Dumbbell, ArrowRight, Sparkles } from 'lucide-react';
import { ClientProfile, WorkoutPlan, UserPlan } from '../types';
import { generateWorkoutPlan } from '../utils/workoutGenerator';

interface WorkoutGeneratorProps {
  clientProfile: ClientProfile;
  onWorkoutGenerated: (plan: WorkoutPlan) => void;
  userPlan: UserPlan;
  onUpgradeClick: () => void;
}

export function WorkoutGenerator({ clientProfile, onWorkoutGenerated, userPlan, onUpgradeClick }: WorkoutGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [planType, setPlanType] = useState<'basic' | 'advanced' | 'premium'>('basic');
  const [customizations, setCustomizations] = useState({
    includeWarmup: true,
    includeCooldown: true,
    progressiveOverload: userPlan !== 'free',
    nutritionTips: userPlan === 'premium',
    videoLinks: userPlan !== 'free'
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const workoutPlan = generateWorkoutPlan(clientProfile, planType, customizations);
    onWorkoutGenerated(workoutPlan);
    
    setIsGenerating(false);
  };

  const planFeatures = {
    basic: [
      'Basic exercise selection',
      'Standard sets and reps',
      'Equipment-based filtering',
      'PDF export'
    ],
    advanced: [
      'AI-optimized exercise selection',
      'Progressive overload planning',
      'Injury considerations',
      'Video exercise links',
      'Customizable templates'
    ],
    premium: [
      'Advanced AI algorithms',
      'Nutrition recommendations',
      'Progress tracking integration',
      'Custom exercise variations',
      'Priority support'
    ]
  };

  const getAvailablePlanType = () => {
    if (userPlan === 'premium') return 'premium';
    if (userPlan === 'pro') return 'advanced';
    return 'basic';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 px-8 py-6">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">Workout Generator</h2>
              <p className="text-green-100">AI-powered personalized workouts made easier</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Client Summary */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Target className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">{clientProfile.name}</div>
                  <div className="text-sm text-gray-600">{clientProfile.age} years old, {clientProfile.gender}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Dumbbell className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900 capitalize">{clientProfile.fitnessLevel}</div>
                  <div className="text-sm text-gray-600">{clientProfile.goals.slice(0, 2).join(', ')}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium text-gray-900">{clientProfile.workoutDuration} min</div>
                  <div className="text-sm text-gray-600">{clientProfile.workoutFrequency}x per week</div>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Type Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Plan Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(planFeatures).map(([type, features]) => {
                const isAvailable = type === 'basic' || 
                  (type === 'advanced' && userPlan !== 'free') || 
                  (type === 'premium' && userPlan === 'premium');
                
                return (
                  <div
                    key={type}
                    className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                      planType === type && isAvailable
                        ? 'border-blue-500 bg-blue-50'
                        : isAvailable
                        ? 'border-gray-200 hover:border-gray-300'
                        : 'border-gray-200 opacity-50'
                    }`}
                    onClick={() => isAvailable && setPlanType(type as any)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 capitalize">{type}</h4>
                      {type === 'advanced' && <Zap className="h-5 w-5 text-yellow-500" />}
                      {type === 'premium' && <Sparkles className="h-5 w-5 text-purple-500" />}
                    </div>
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {!isAvailable && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpgradeClick();
                        }}
                        className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Upgrade to unlock
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customization Options */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customization Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  checked={customizations.includeWarmup}
                  onChange={(e) => setCustomizations(prev => ({ ...prev, includeWarmup: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Include warm-up routine</span>
              </label>
              
              <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  checked={customizations.includeCooldown}
                  onChange={(e) => setCustomizations(prev => ({ ...prev, includeCooldown: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Include cool-down routine</span>
              </label>
              
              <label className={`flex items-center space-x-3 p-4 border border-gray-200 rounded-lg ${userPlan === 'free' ? 'opacity-50' : ''}`}>
                <input
                  type="checkbox"
                  checked={customizations.progressiveOverload}
                  onChange={(e) => setCustomizations(prev => ({ ...prev, progressiveOverload: e.target.checked }))}
                  disabled={userPlan === 'free'}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Progressive overload planning</span>
                {userPlan === 'free' && <span className="text-xs text-gray-500">(Pro)</span>}
              </label>
              
              <label className={`flex items-center space-x-3 p-4 border border-gray-200 rounded-lg ${userPlan !== 'premium' ? 'opacity-50' : ''}`}>
                <input
                  type="checkbox"
                  checked={customizations.nutritionTips}
                  onChange={(e) => setCustomizations(prev => ({ ...prev, nutritionTips: e.target.checked }))}
                  disabled={userPlan !== 'premium'}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Include nutrition tips</span>
                {userPlan !== 'premium' && <span className="text-xs text-gray-500">(Premium)</span>}
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-teal-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating AI Workout...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Generate Workout Plan</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>

          {isGenerating && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="animate-pulse w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-blue-800 font-medium">AI is analyzing your client's profile...</span>
              </div>
              <div className="mt-2 text-sm text-blue-600">
                Creating personalized exercises to make workouts easier and more effective.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}