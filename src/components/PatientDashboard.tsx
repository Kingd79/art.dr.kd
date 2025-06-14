import React from 'react';
import { Calendar, Clock, Target, TrendingUp, Play, Award } from 'lucide-react';
import { ExerciseCard } from './ExerciseCard';
import { ProgressChart } from './ProgressChart';
import { mockRoutines, mockProgress } from '../data/mockData';

export function PatientDashboard() {
  const currentRoutine = mockRoutines[0];
  const recentProgress = mockProgress.slice(-7).map(p => ({
    date: p.date,
    painLevel: p.painLevel,
    completed: p.completed
  }));

  const completionRate = Math.round((currentRoutine.completedSessions / currentRoutine.totalSessions) * 100);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Sarah!</h1>
        <p className="text-blue-100">Ready for today's therapy session?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sessions Completed</p>
              <p className="text-2xl font-bold text-gray-900">{currentRoutine.completedSessions}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">7 days</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pain Trend</p>
              <p className="text-2xl font-bold text-green-600">Improving</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Routine */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Routine</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Start Session</span>
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{currentRoutine.name}</h3>
                <p className="text-sm text-gray-600">{currentRoutine.exercises.length} exercises • {currentRoutine.duration} minutes</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-600">{completionRate}% Complete</div>
                <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {currentRoutine.exercises.slice(0, 2).map(exercise => (
                <div key={exercise.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                    <p className="text-sm text-gray-600">{exercise.sets} sets • {exercise.reps} reps</p>
                  </div>
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Chart */}
        <ProgressChart data={recentProgress} />
      </div>

      {/* Recent Exercises */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Exercise Routine</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentRoutine.exercises.map(exercise => (
            <ExerciseCard 
              key={exercise.id} 
              exercise={exercise} 
              showProgress={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}