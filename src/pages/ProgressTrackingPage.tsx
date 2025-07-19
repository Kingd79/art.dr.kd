import React, { useState } from 'react';
import { Activity, MessageCircle, BarChart3, Brain, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { WorkoutFeedbackForm } from '../components/progress/WorkoutFeedbackForm';
import { PreSessionCheckIn } from '../components/progress/PreSessionCheckIn';
import { ProgressDashboard } from '../components/progress/ProgressDashboard';
import { RoutineSuggestionEngine } from '../components/progress/RoutineSuggestionEngine';
import { 
  WorkoutFeedback, 
  PreSessionCheckIn as PreSessionCheckInType, 
  ClientProgressMetrics, 
  ProgressAlert, 
  RoutineSuggestion 
} from '../types/progress';

export function ProgressTrackingPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);

  // Mock data - in real app, this would come from your backend
  const mockClientMetrics: ClientProgressMetrics = {
    clientId: 'client1',
    clientName: 'Sarah Johnson',
    exerciseProgress: {
      'bench-press': {
        exerciseName: 'Bench Press',
        maxWeight: { weight: 65, date: '2024-01-15' },
        minWeight: { weight: 40, date: '2024-01-01' },
        currentWeight: 60,
        progressTrend: 'increasing',
        sessions: [
          {
            id: '1',
            clientId: 'client1',
            exerciseId: 'bench-press',
            exerciseName: 'Bench Press',
            date: '2024-01-20',
            weight: 60,
            sets: 3,
            reps: 10,
            restTime: 120,
            intensityRating: 7,
            formRating: 8,
            notes: 'Good form, felt strong'
          }
        ]
      },
      'squats': {
        exerciseName: 'Squats',
        maxWeight: { weight: 80, date: '2024-01-18' },
        minWeight: { weight: 50, date: '2024-01-01' },
        currentWeight: 75,
        progressTrend: 'increasing',
        sessions: [
          {
            id: '2',
            clientId: 'client1',
            exerciseId: 'squats',
            exerciseName: 'Squats',
            date: '2024-01-20',
            weight: 75,
            sets: 4,
            reps: 8,
            restTime: 180,
            intensityRating: 6,
            formRating: 9,
            notes: 'Excellent depth'
          }
        ]
      }
    },
    intensityTrends: [
      { date: '2024-01-15', averageIntensity: 6.2, workoutCount: 3 },
      { date: '2024-01-16', averageIntensity: 7.1, workoutCount: 2 },
      { date: '2024-01-17', averageIntensity: 5.8, workoutCount: 4 },
      { date: '2024-01-18', averageIntensity: 6.9, workoutCount: 3 },
      { date: '2024-01-19', averageIntensity: 7.5, workoutCount: 2 },
      { date: '2024-01-20', averageIntensity: 6.4, workoutCount: 3 }
    ],
    attendanceRate: 85,
    goalAchievementPercentage: 72,
    lastWorkout: '2024-01-20',
    totalWorkouts: 45
  };

  const mockAlerts: ProgressAlert[] = [
    {
      id: 'alert1',
      clientId: 'client1',
      type: 'intensity_too_high',
      severity: 'medium',
      message: 'Client consistently rating workouts 8+ for the past week',
      recommendation: 'Consider reducing weight or volume by 10-15% for next session',
      createdAt: '2024-01-20',
      resolved: false
    }
  ];

  const mockSuggestions: RoutineSuggestion[] = [
    {
      id: 'suggestion1',
      clientId: 'client1',
      suggestedExercises: ['Incline Dumbbell Press', 'Bulgarian Split Squats', 'Lat Pulldowns'],
      intensityAdjustment: 'maintain',
      focusAreas: ['Upper Body Strength', 'Unilateral Training'],
      reasoning: 'Based on recent progress in bench press and squats, client is ready for more challenging variations. Unilateral exercises will help address any imbalances.',
      confidence: 0.85,
      generatedAt: '2024-01-20'
    }
  ];

  const handleFeedbackSubmit = (feedback: Omit<WorkoutFeedback, 'id' | 'submittedAt'>) => {
    console.log('Feedback submitted:', feedback);
    // In real app, send to backend
  };

  const handleCheckInSubmit = (checkIn: Omit<PreSessionCheckInType, 'id' | 'submittedAt'>) => {
    console.log('Check-in submitted:', checkIn);
    // In real app, send to backend
  };

  const handleResolveAlert = (alertId: string) => {
    console.log('Resolving alert:', alertId);
    // In real app, update backend
  };

  const handleApplySuggestion = (suggestionId: string) => {
    console.log('Applying suggestion:', suggestionId);
    // In real app, create new workout plan
  };

  const handleDismissSuggestion = (suggestionId: string) => {
    console.log('Dismissing suggestion:', suggestionId);
    // In real app, mark as dismissed
  };

  const tabs = user?.role === 'coach' ? [
    { id: 'dashboard', label: 'Progress Dashboard', icon: BarChart3 },
    { id: 'suggestions', label: 'AI Suggestions', icon: Brain },
  ] : [
    { id: 'feedback', label: 'Workout Feedback', icon: MessageCircle },
    { id: 'checkin', label: 'Session Check-in', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Progress Tracking System</h1>
          <p className="text-gray-600">
            {user?.role === 'coach' 
              ? 'Monitor client progress and get AI-powered insights'
              : 'Track your fitness journey and provide feedback'
            }
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-1 mb-8 inline-flex">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Client Quick Actions */}
        {user?.role === 'client' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => setShowCheckIn(true)}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all"
            >
              <Activity className="h-8 w-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Pre-Session Check-In</h3>
              <p className="text-green-100">Let your coach know how you're feeling today</p>
            </button>

            <button
              onClick={() => setShowFeedbackForm(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <MessageCircle className="h-8 w-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Workout Feedback</h3>
              <p className="text-purple-100">Rate your workout and share your experience</p>
            </button>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'dashboard' && user?.role === 'coach' && (
          <ProgressDashboard
            clientMetrics={mockClientMetrics}
            alerts={mockAlerts}
            onResolveAlert={handleResolveAlert}
          />
        )}

        {activeTab === 'suggestions' && user?.role === 'coach' && (
          <RoutineSuggestionEngine
            clientMetrics={mockClientMetrics}
            suggestions={mockSuggestions}
            onApplySuggestion={handleApplySuggestion}
            onDismissSuggestion={handleDismissSuggestion}
          />
        )}

        {activeTab === 'feedback' && user?.role === 'client' && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Share Your Workout Experience</h2>
            <p className="text-gray-600 mb-6">
              Your feedback helps us optimize your training program for better results
            </p>
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              <span>Submit Workout Feedback</span>
            </button>
          </div>
        )}

        {activeTab === 'checkin' && user?.role === 'client' && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Pre-Session Check-In</h2>
            <p className="text-gray-600 mb-6">
              Help us customize today's workout based on how you're feeling
            </p>
            <button
              onClick={() => setShowCheckIn(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              <span>Start Check-In</span>
            </button>
          </div>
        )}

        {/* Modals */}
        {showFeedbackForm && (
          <WorkoutFeedbackForm
            clientId="client1"
            workoutId="workout1"
            workoutPhase="post_workout"
            onSubmit={handleFeedbackSubmit}
            onClose={() => setShowFeedbackForm(false)}
          />
        )}

        {showCheckIn && (
          <PreSessionCheckIn
            clientId="client1"
            onSubmit={handleCheckInSubmit}
            onClose={() => setShowCheckIn(false)}
          />
        )}
      </div>
    </div>
  );
}