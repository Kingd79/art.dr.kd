import React from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { RoutineSuggestion, ClientProgressMetrics } from '../../types/progress';

interface RoutineSuggestionEngineProps {
  clientMetrics: ClientProgressMetrics;
  suggestions: RoutineSuggestion[];
  onApplySuggestion: (suggestionId: string) => void;
  onDismissSuggestion: (suggestionId: string) => void;
}

export function RoutineSuggestionEngine({ 
  clientMetrics, 
  suggestions, 
  onApplySuggestion, 
  onDismissSuggestion 
}: RoutineSuggestionEngineProps) {
  const getIntensityAdjustmentColor = (adjustment: string) => {
    switch (adjustment) {
      case 'increase': return 'text-red-600 bg-red-50';
      case 'decrease': return 'text-blue-600 bg-blue-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getIntensityAdjustmentIcon = (adjustment: string) => {
    switch (adjustment) {
      case 'increase': return <TrendingUp className="h-4 w-4" />;
      case 'decrease': return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Brain className="h-6 w-6 mr-2 text-purple-600" />
          AI Routine Suggestions
        </h2>
        <div className="text-sm text-gray-500">
          Based on {clientMetrics.clientName}'s progress data
        </div>
      </div>

      {suggestions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No new suggestions at this time.</p>
          <p className="text-sm">The AI is analyzing recent progress data.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getIntensityAdjustmentColor(suggestion.intensityAdjustment)}`}>
                    {getIntensityAdjustmentIcon(suggestion.intensityAdjustment)}
                    <span className="ml-1 capitalize">{suggestion.intensityAdjustment} Intensity</span>
                  </div>
                  <div className={`text-sm font-medium ${getConfidenceColor(suggestion.confidence)}`}>
                    {Math.round(suggestion.confidence * 100)}% confidence
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(suggestion.generatedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Recommended Focus Areas:</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestion.focusAreas.map((area, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Suggested Exercises:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {suggestion.suggestedExercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 bg-gray-50 rounded text-sm text-gray-700"
                    >
                      {exercise}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">AI Reasoning:</h3>
                <p className="text-sm text-gray-600 bg-gray-50 rounded p-3">
                  {suggestion.reasoning}
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => onApplySuggestion(suggestion.id)}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  Apply Suggestion
                </button>
                <button
                  onClick={() => onDismissSuggestion(suggestion.id)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Recent Analysis Summary:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-blue-50 rounded p-3">
            <div className="font-medium text-blue-900">Average Intensity</div>
            <div className="text-blue-700">
              {clientMetrics.intensityTrends.length > 0 
                ? clientMetrics.intensityTrends[clientMetrics.intensityTrends.length - 1].averageIntensity.toFixed(1)
                : 'N/A'
              }/10
            </div>
          </div>
          <div className="bg-green-50 rounded p-3">
            <div className="font-medium text-green-900">Attendance Rate</div>
            <div className="text-green-700">{clientMetrics.attendanceRate}%</div>
          </div>
          <div className="bg-purple-50 rounded p-3">
            <div className="font-medium text-purple-900">Goal Progress</div>
            <div className="text-purple-700">{clientMetrics.goalAchievementPercentage}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}