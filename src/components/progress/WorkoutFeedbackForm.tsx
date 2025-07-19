import React, { useState } from 'react';
import { Star, MessageCircle, Activity, Clock, Zap, ThumbsUp } from 'lucide-react';
import { WorkoutFeedback } from '../../types/progress';

interface WorkoutFeedbackFormProps {
  clientId: string;
  workoutId: string;
  exerciseId?: string;
  workoutPhase: 'during' | 'post_workout';
  onSubmit: (feedback: Omit<WorkoutFeedback, 'id' | 'submittedAt'>) => void;
  onClose: () => void;
}

export function WorkoutFeedbackForm({ 
  clientId, 
  workoutId, 
  exerciseId, 
  workoutPhase, 
  onSubmit, 
  onClose 
}: WorkoutFeedbackFormProps) {
  const [feedback, setFeedback] = useState({
    intensityRating: 5,
    energyLevel: 'moderate' as const,
    musclesoreness: 'mild' as const,
    recoveryTime: 24,
    exerciseDifficulty: 'just_right' as const,
    overallSatisfaction: 7,
    qualitativeFeedback: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      clientId,
      workoutId,
      exerciseId,
      workoutPhase,
      ...feedback
    });
    onClose();
  };

  const getIntensityColor = (rating: number) => {
    if (rating <= 3) return 'text-green-600';
    if (rating <= 6) return 'text-blue-600';
    if (rating <= 8) return 'text-orange-600';
    return 'text-red-600';
  };

  const getIntensityLabel = (rating: number) => {
    if (rating <= 3) return 'Too Easy';
    if (rating <= 6) return 'Optimal Challenge';
    if (rating <= 8) return 'Challenging';
    return 'Too Aggressive';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h2 className="text-xl font-bold mb-2">
            {workoutPhase === 'during' ? 'Exercise Feedback' : 'Workout Complete - Share Your Experience'}
          </h2>
          <p className="text-blue-100">
            Your feedback helps us optimize your training program
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Intensity Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Activity className="h-4 w-4 inline mr-2" />
              Workout Intensity Rating (1 = Too Easy, 10 = Too Aggressive)
            </label>
            <div className="space-y-3">
              <input
                type="range"
                min="1"
                max="10"
                value={feedback.intensityRating}
                onChange={(e) => setFeedback(prev => ({ ...prev, intensityRating: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Too Easy</span>
                <span>Optimal</span>
                <span>Too Hard</span>
              </div>
              <div className="text-center">
                <span className={`text-2xl font-bold ${getIntensityColor(feedback.intensityRating)}`}>
                  {feedback.intensityRating}
                </span>
                <span className={`block text-sm ${getIntensityColor(feedback.intensityRating)}`}>
                  {getIntensityLabel(feedback.intensityRating)}
                </span>
              </div>
            </div>
          </div>

          {/* Energy Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Zap className="h-4 w-4 inline mr-2" />
              Energy Level During Workout
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['low', 'moderate', 'high'] as const).map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFeedback(prev => ({ ...prev, energyLevel: level }))}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    feedback.energyLevel === level
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize">{level}</div>
                  <div className="text-xs text-gray-600">
                    {level === 'low' && 'Felt tired/sluggish'}
                    {level === 'moderate' && 'Normal energy'}
                    {level === 'high' && 'Energetic/strong'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Exercise Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Exercise Difficulty
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {([
                { value: 'too_easy', label: 'Too Easy', color: 'green' },
                { value: 'just_right', label: 'Just Right', color: 'blue' },
                { value: 'challenging', label: 'Challenging', color: 'orange' },
                { value: 'too_hard', label: 'Too Hard', color: 'red' }
              ] as const).map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFeedback(prev => ({ ...prev, exerciseDifficulty: option.value }))}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    feedback.exerciseDifficulty === option.value
                      ? `border-${option.color}-500 bg-${option.color}-50 text-${option.color}-700`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Muscle Soreness */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Current Muscle Soreness
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['none', 'mild', 'moderate', 'severe'] as const).map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFeedback(prev => ({ ...prev, musclesoreness: level }))}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    feedback.musclesoreness === level
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize">{level}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recovery Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Clock className="h-4 w-4 inline mr-2" />
              Expected Recovery Time (hours)
            </label>
            <select
              value={feedback.recoveryTime}
              onChange={(e) => setFeedback(prev => ({ ...prev, recoveryTime: parseInt(e.target.value) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={6}>6 hours</option>
              <option value={12}>12 hours</option>
              <option value={24}>24 hours (1 day)</option>
              <option value={48}>48 hours (2 days)</option>
              <option value={72}>72 hours (3 days)</option>
            </select>
          </div>

          {/* Overall Satisfaction */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <ThumbsUp className="h-4 w-4 inline mr-2" />
              Overall Satisfaction (1-10)
            </label>
            <div className="flex items-center space-x-2">
              {[...Array(10)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFeedback(prev => ({ ...prev, overallSatisfaction: i + 1 }))}
                  className={`w-8 h-8 rounded-full border-2 transition-colors ${
                    feedback.overallSatisfaction >= i + 1
                      ? 'border-yellow-500 bg-yellow-500 text-white'
                      : 'border-gray-300 hover:border-yellow-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Qualitative Feedback */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <MessageCircle className="h-4 w-4 inline mr-2" />
              Additional Comments
            </label>
            <textarea
              value={feedback.qualitativeFeedback}
              onChange={(e) => setFeedback(prev => ({ ...prev, qualitativeFeedback: e.target.value }))}
              rows={4}
              placeholder="Share any additional thoughts about your workout, how you're feeling, or suggestions for improvement..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}