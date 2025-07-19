import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Calendar, Target, Activity, Award } from 'lucide-react';
import { ClientProgressMetrics, ProgressAlert } from '../../types/progress';
import { ProgressChart } from './ProgressChart';
import { ExerciseProgressChart } from './ExerciseProgressChart';

interface ProgressDashboardProps {
  clientMetrics: ClientProgressMetrics;
  alerts: ProgressAlert[];
  onResolveAlert: (alertId: string) => void;
}

export function ProgressDashboard({ clientMetrics, alerts, onResolveAlert }: ProgressDashboardProps) {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-green-600 bg-green-50';
      case 'decreasing': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-500 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      default: return 'bg-blue-100 border-blue-500 text-blue-800';
    }
  };

  const unresolvedAlerts = alerts.filter(alert => !alert.resolved);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{clientMetrics.clientName} - Progress Dashboard</h1>
            <p className="text-gray-600">Comprehensive fitness tracking and analysis</p>
          </div>
          <div className="flex space-x-2">
            {(['week', 'month', 'quarter'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-blue-900">{clientMetrics.attendanceRate}%</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Goal Achievement</p>
                <p className="text-2xl font-bold text-green-900">{clientMetrics.goalAchievementPercentage}%</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Workouts</p>
                <p className="text-2xl font-bold text-purple-900">{clientMetrics.totalWorkouts}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Active Alerts</p>
                <p className="text-2xl font-bold text-orange-900">{unresolvedAlerts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {unresolvedAlerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
            Active Alerts
          </h2>
          <div className="space-y-3">
            {unresolvedAlerts.map(alert => (
              <div
                key={alert.id}
                className={`border-l-4 rounded-lg p-4 ${getAlertSeverityColor(alert.severity)}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium">{alert.message}</h3>
                    <p className="text-sm mt-1 opacity-90">{alert.recommendation}</p>
                    <p className="text-xs mt-2 opacity-75">
                      {new Date(alert.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => onResolveAlert(alert.id)}
                    className="ml-4 px-3 py-1 bg-white bg-opacity-50 rounded text-sm hover:bg-opacity-75 transition-colors"
                  >
                    Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Intensity Trends Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Workout Intensity Trends</h2>
        <ProgressChart 
          data={clientMetrics.intensityTrends} 
          timeRange={timeRange}
        />
      </div>

      {/* Exercise Progress */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Exercise Progress</h2>
          <select
            value={selectedExercise || ''}
            onChange={(e) => setSelectedExercise(e.target.value || null)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Exercises</option>
            {Object.entries(clientMetrics.exerciseProgress).map(([exerciseId, data]) => (
              <option key={exerciseId} value={exerciseId}>
                {data.exerciseName}
              </option>
            ))}
          </select>
        </div>

        {selectedExercise ? (
          <ExerciseProgressChart 
            exerciseData={clientMetrics.exerciseProgress[selectedExercise]}
            timeRange={timeRange}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(clientMetrics.exerciseProgress).map(([exerciseId, data]) => (
              <div
                key={exerciseId}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedExercise(exerciseId)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">{data.exerciseName}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs ${getTrendColor(data.progressTrend)}`}>
                    {getTrendIcon(data.progressTrend)}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current:</span>
                    <span className="font-medium">{data.currentWeight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max:</span>
                    <span className="font-medium text-green-600">
                      {data.maxWeight.weight} kg
                      <span className="text-xs text-gray-500 ml-1">
                        ({new Date(data.maxWeight.date).toLocaleDateString()})
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sessions:</span>
                    <span className="font-medium">{data.sessions.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}