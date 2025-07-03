import React, { useState } from 'react';
import { Download, Edit3, Share2, FileText, Clock, Target, User } from 'lucide-react';
import { WorkoutPlan, ClientProfile, UserPlan } from '../types';
import { generatePDF } from '../utils/pdfGenerator';

interface WorkoutScriptProps {
  workoutPlan: WorkoutPlan;
  clientProfile: ClientProfile;
  userPlan: UserPlan;
  onUpgradeClick: () => void;
}

export function WorkoutScript({ workoutPlan, clientProfile, userPlan, onUpgradeClick }: WorkoutScriptProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState(workoutPlan);

  const handleDownloadPDF = async () => {
    if (userPlan === 'free') {
      onUpgradeClick();
      return;
    }
    
    try {
      await generatePDF(editedPlan, clientProfile);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${editedPlan.planName} - Workout Plan`,
        text: `Personalized workout plan for ${clientProfile.name}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const updateExerciseNotes = (dayIndex: number, exerciseIndex: number, notes: string) => {
    const updatedPlan = { ...editedPlan };
    updatedPlan.workoutDays[dayIndex].exercises[exerciseIndex].notes = notes;
    setEditedPlan(updatedPlan);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-white" />
              <div>
                <h2 className="text-2xl font-bold text-white">Workout Script</h2>
                <p className="text-purple-100">Personalized training plan ready for use</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Plan Overview */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{clientProfile.name}</h3>
              <p className="text-sm text-gray-600">{clientProfile.age} years, {clientProfile.gender}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Primary Goal</h3>
              <p className="text-sm text-gray-600">{clientProfile.goals[0]}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Duration</h3>
              <p className="text-sm text-gray-600">{clientProfile.workoutDuration} minutes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Frequency</h3>
              <p className="text-sm text-gray-600">{clientProfile.workoutFrequency}x per week</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{editedPlan.planName}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Goals:</span>
                <span className="ml-2 text-gray-600">{editedPlan.goals.join(', ')}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Equipment:</span>
                <span className="ml-2 text-gray-600">{clientProfile.availableEquipment.slice(0, 3).join(', ')}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Level:</span>
                <span className="ml-2 text-gray-600 capitalize">{clientProfile.fitnessLevel}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Created:</span>
                <span className="ml-2 text-gray-600">{new Date(editedPlan.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workout Days */}
      <div className="space-y-6">
        {editedPlan.workoutDays.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{day.day}</h3>
                  <p className="text-blue-100">{day.focus}</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{day.totalDuration} min</div>
                  <div className="text-blue-100 text-sm">{day.exercises.length} exercises</div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {day.exercises.map((workoutExercise, exerciseIndex) => (
                  <div key={exerciseIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {exerciseIndex + 1}. {workoutExercise.exercise.name}
                        </h4>
                        <p className="text-gray-600 mb-3">{workoutExercise.exercise.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div className="bg-blue-50 rounded-lg p-3 text-center">
                            <div className="font-semibold text-blue-900">{workoutExercise.sets}</div>
                            <div className="text-xs text-blue-600">Sets</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3 text-center">
                            <div className="font-semibold text-green-900">{workoutExercise.reps}</div>
                            <div className="text-xs text-green-600">Reps</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3 text-center">
                            <div className="font-semibold text-purple-900">{workoutExercise.rest}</div>
                            <div className="text-xs text-purple-600">Rest</div>
                          </div>
                          {workoutExercise.weight && (
                            <div className="bg-orange-50 rounded-lg p-3 text-center">
                              <div className="font-semibold text-orange-900 text-xs">{workoutExercise.weight}</div>
                              <div className="text-xs text-orange-600">Weight</div>
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <h5 className="font-medium text-gray-900 mb-2">Instructions:</h5>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                            {workoutExercise.exercise.instructions.map((instruction, idx) => (
                              <li key={idx}>{instruction}</li>
                            ))}
                          </ol>
                        </div>

                        {workoutExercise.exercise.tips.length > 0 && (
                          <div className="mb-3">
                            <h5 className="font-medium text-gray-900 mb-2">Tips:</h5>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                              {workoutExercise.exercise.tips.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-3">
                          {workoutExercise.exercise.musclesWorked.map((muscle, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {muscle}
                            </span>
                          ))}
                        </div>

                        {isEditing && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Exercise Notes:
                            </label>
                            <textarea
                              value={workoutExercise.notes || ''}
                              onChange={(e) => updateExerciseNotes(dayIndex, exerciseIndex, e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Add custom notes for this exercise..."
                            />
                          </div>
                        )}

                        {workoutExercise.notes && !isEditing && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <h5 className="font-medium text-yellow-900 mb-1">Notes:</h5>
                            <p className="text-sm text-yellow-800">{workoutExercise.notes}</p>
                          </div>
                        )}
                      </div>

                      {workoutExercise.exercise.imageUrl && (
                        <div className="ml-4 flex-shrink-0">
                          <img
                            src={workoutExercise.exercise.imageUrl}
                            alt={workoutExercise.exercise.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      {(editedPlan.nutritionTips || editedPlan.progressTracking) && (
        <div className="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
            <h3 className="text-xl font-bold text-white">Additional Guidance</h3>
          </div>
          <div className="p-6">
            {editedPlan.nutritionTips && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Nutrition Tips</h4>
                <ul className="space-y-2">
                  {editedPlan.nutritionTips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {editedPlan.progressTracking && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Progress Tracking</h4>
                <ul className="space-y-2">
                  {editedPlan.progressTracking.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Free Plan Limitation Notice */}
      {userPlan === 'free' && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
            <span className="text-yellow-800 font-medium">Free Plan Limitation</span>
          </div>
          <p className="text-yellow-700 text-sm mt-1">
            PDF download is available for Pro and Premium users. 
            <button onClick={onUpgradeClick} className="ml-1 underline hover:no-underline">
              Upgrade now
            </button> to unlock this feature.
          </p>
        </div>
      )}
    </div>
  );
}