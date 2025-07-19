import React, { useState } from 'react';
import { Moon, Utensils, Zap, Heart, Droplets, AlertTriangle, MessageCircle } from 'lucide-react';
import { PreSessionCheckIn as PreSessionCheckInType } from '../../types/progress';

interface PreSessionCheckInProps {
  clientId: string;
  onSubmit: (checkIn: Omit<PreSessionCheckInType, 'id' | 'submittedAt'>) => void;
  onClose: () => void;
}

export function PreSessionCheckIn({ clientId, onSubmit, onClose }: PreSessionCheckInProps) {
  const [checkIn, setCheckIn] = useState({
    energyLevel: 5,
    sleepQuality: 5,
    sleepHours: 7,
    nutritionRating: 5,
    stressLevel: 5,
    hydrationLevel: 5,
    injuryStatus: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      clientId,
      sessionDate: new Date().toISOString().split('T')[0],
      ...checkIn
    });
    onClose();
  };

  const RatingSlider = ({ 
    label, 
    value, 
    onChange, 
    icon: Icon, 
    lowLabel, 
    highLabel,
    color = 'blue' 
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    icon: React.ComponentType<{ className?: string }>;
    lowLabel: string;
    highLabel: string;
    color?: string;
  }) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        <Icon className="h-4 w-4 inline mr-2" />
        {label}
      </label>
      <div className="space-y-2">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-${color}`}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>{lowLabel}</span>
          <span className={`font-bold text-${color}-600`}>{value}/10</span>
          <span>{highLabel}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Pre-Session Check-In</h2>
          <p className="text-green-100">
            Help us customize today's workout based on how you're feeling
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Energy Level */}
          <RatingSlider
            label="Energy Level"
            value={checkIn.energyLevel}
            onChange={(value) => setCheckIn(prev => ({ ...prev, energyLevel: value }))}
            icon={Zap}
            lowLabel="Very Low"
            highLabel="Very High"
            color="yellow"
          />

          {/* Sleep Quality */}
          <RatingSlider
            label="Sleep Quality"
            value={checkIn.sleepQuality}
            onChange={(value) => setCheckIn(prev => ({ ...prev, sleepQuality: value }))}
            icon={Moon}
            lowLabel="Poor"
            highLabel="Excellent"
            color="purple"
          />

          {/* Sleep Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Moon className="h-4 w-4 inline mr-2" />
              Hours of Sleep Last Night
            </label>
            <select
              value={checkIn.sleepHours}
              onChange={(e) => setCheckIn(prev => ({ ...prev, sleepHours: parseFloat(e.target.value) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={4}>4 hours</option>
              <option value={5}>5 hours</option>
              <option value={6}>6 hours</option>
              <option value={7}>7 hours</option>
              <option value={8}>8 hours</option>
              <option value={9}>9 hours</option>
              <option value={10}>10+ hours</option>
            </select>
          </div>

          {/* Nutrition */}
          <RatingSlider
            label="Nutrition Today"
            value={checkIn.nutritionRating}
            onChange={(value) => setCheckIn(prev => ({ ...prev, nutritionRating: value }))}
            icon={Utensils}
            lowLabel="Poor"
            highLabel="Excellent"
            color="green"
          />

          {/* Stress Level */}
          <RatingSlider
            label="Stress Level"
            value={checkIn.stressLevel}
            onChange={(value) => setCheckIn(prev => ({ ...prev, stressLevel: value }))}
            icon={Heart}
            lowLabel="Very Relaxed"
            highLabel="Very Stressed"
            color="red"
          />

          {/* Hydration */}
          <RatingSlider
            label="Hydration Level"
            value={checkIn.hydrationLevel}
            onChange={(value) => setCheckIn(prev => ({ ...prev, hydrationLevel: value }))}
            icon={Droplets}
            lowLabel="Dehydrated"
            highLabel="Well Hydrated"
            color="blue"
          />

          {/* Injury Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <AlertTriangle className="h-4 w-4 inline mr-2" />
              Any Injuries or Pain?
            </label>
            <input
              type="text"
              value={checkIn.injuryStatus}
              onChange={(e) => setCheckIn(prev => ({ ...prev, injuryStatus: e.target.value }))}
              placeholder="Describe any injuries, pain, or areas of concern..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <MessageCircle className="h-4 w-4 inline mr-2" />
              Additional Notes
            </label>
            <textarea
              value={checkIn.notes}
              onChange={(e) => setCheckIn(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              placeholder="Anything else your coach should know about how you're feeling today?"
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
              Skip Check-In
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors"
            >
              Start Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}