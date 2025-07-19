import React from 'react';
import { TrendingUp, Calendar, Weight } from 'lucide-react';

interface ExerciseProgressChartProps {
  exerciseData: {
    exerciseName: string;
    maxWeight: { weight: number; date: string };
    minWeight: { weight: number; date: string };
    currentWeight: number;
    progressTrend: 'increasing' | 'decreasing' | 'plateau';
    sessions: Array<{
      id: string;
      date: string;
      weight: number;
      sets: number;
      reps: number;
      intensityRating: number;
      formRating: number;
    }>;
  };
  timeRange: 'week' | 'month' | 'quarter';
}

export function ExerciseProgressChart({ exerciseData, timeRange }: ExerciseProgressChartProps) {
  const sessions = exerciseData.sessions.slice(-20); // Show last 20 sessions
  const maxWeight = Math.max(...sessions.map(s => s.weight));
  const minWeight = Math.min(...sessions.map(s => s.weight));
  const weightRange = maxWeight - minWeight;

  const getProgressColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-green-600';
      case 'decreasing': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 4) return 'bg-green-500';
    if (intensity <= 6) return 'bg-blue-500';
    if (intensity <= 8) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Exercise Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-blue-600">Current Weight</div>
              <div className="text-2xl font-bold text-blue-900">{exerciseData.currentWeight} kg</div>
            </div>
            <Weight className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div>
            <div className="text-sm text-green-600">Personal Best</div>
            <div className="text-2xl font-bold text-green-900">{exerciseData.maxWeight.weight} kg</div>
            <div className="text-xs text-green-600">
              {new Date(exerciseData.maxWeight.date).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div>
            <div className="text-sm text-purple-600">Total Sessions</div>
            <div className="text-2xl font-bold text-purple-900">{sessions.length}</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div>
            <div className="text-sm text-gray-600">Progress Trend</div>
            <div className={`text-lg font-bold capitalize ${getProgressColor(exerciseData.progressTrend)}`}>
              {exerciseData.progressTrend}
            </div>
          </div>
        </div>
      </div>

      {/* Weight Progress Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Weight Progression
        </h3>
        
        <div className="relative">
          <div className="flex items-end justify-between h-48 bg-gray-50 rounded-lg p-4">
            {sessions.map((session, index) => {
              const height = weightRange > 0 ? ((session.weight - minWeight) / weightRange) * 80 + 20 : 50;
              return (
                <div key={session.id} className="flex flex-col items-center flex-1 max-w-12">
                  <div className="relative group">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      <div>Weight: {session.weight} kg</div>
                      <div>Sets: {session.sets} × {session.reps}</div>
                      <div>Intensity: {session.intensityRating}/10</div>
                      <div>Form: {session.formRating}/10</div>
                      <div>{new Date(session.date).toLocaleDateString()}</div>
                    </div>
                    
                    {/* Weight Bar */}
                    <div
                      className="w-6 bg-blue-600 rounded-t-md transition-all duration-300 hover:bg-blue-700"
                      style={{ height: `${height}%` }}
                    />
                    
                    {/* Intensity Indicator */}
                    <div
                      className={`w-6 h-1 ${getIntensityColor(session.intensityRating)} mt-1`}
                    />
                  </div>
                  
                  {/* Date Label (show every 3rd) */}
                  {index % 3 === 0 && (
                    <div className="mt-2 text-xs text-gray-500 text-center transform -rotate-45 origin-center">
                      {new Date(session.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-12">
            <span>{maxWeight} kg</span>
            <span>{((maxWeight + minWeight) / 2).toFixed(1)} kg</span>
            <span>{minWeight} kg</span>
          </div>
        </div>
      </div>

      {/* Recent Sessions Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Recent Sessions
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Weight</th>
                <th className="text-left py-2">Sets × Reps</th>
                <th className="text-left py-2">Intensity</th>
                <th className="text-left py-2">Form</th>
              </tr>
            </thead>
            <tbody>
              {sessions.slice(-10).reverse().map((session) => (
                <tr key={session.id} className="border-b border-gray-100">
                  <td className="py-2">{new Date(session.date).toLocaleDateString()}</td>
                  <td className="py-2 font-medium">{session.weight} kg</td>
                  <td className="py-2">{session.sets} × {session.reps}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      session.intensityRating <= 4 ? 'bg-green-100 text-green-800' :
                      session.intensityRating <= 6 ? 'bg-blue-100 text-blue-800' :
                      session.intensityRating <= 8 ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {session.intensityRating}/10
                    </span>
                  </td>
                  <td className="py-2">
                    <span className="text-gray-600">{session.formRating}/10</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}