import React, { useState } from 'react';
import { Clock, Users, Play, BookOpen, CheckCircle, X, Volume2, VolumeX } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  showProgress?: boolean;
  onComplete?: () => void;
}

export function ExerciseCard({ exercise, showProgress = false, onComplete }: ExerciseCardProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete?.();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock video URLs - in production, these would come from your video service
  const getVideoUrl = (exerciseId: string) => {
    const videoMap: { [key: string]: string } = {
      'knee-1': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'back-1': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'shoulder-1': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'core-1': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'ankle-1': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'hip-1': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    };
    return videoMap[exerciseId] || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  };

  const get3DUrl = (exerciseId: string) => {
    // Mock 3D animation URLs - in production, these would be actual 3D models or animations
    return `https://player.vimeo.com/video/76979871?badge=0&autopause=0&player_id=0&app_id=58479`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Video/3D Display Modal */}
      {(showVideo || show3D) && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{exercise.name}</h3>
                <p className="text-sm text-gray-600">
                  {showVideo ? 'Video Tutorial' : '3D Animation'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => {
                    setShowVideo(false);
                    setShow3D(false);
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="aspect-video bg-gray-900">
              <iframe
                src={`${showVideo ? getVideoUrl(exercise.id) : get3DUrl(exercise.id)}${isMuted ? '&mute=1' : ''}`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${exercise.name} ${showVideo ? 'Video' : '3D Animation'}`}
              />
            </div>
            
            <div className="p-4 bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">Key Points:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {exercise.instructions.slice(0, 3).map((instruction, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-sm text-gray-500 mb-1">Duration</div>
                  <div className="text-lg font-semibold text-blue-600">{exercise.duration} min</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{exercise.name}</h3>
            <p className="text-gray-600 text-sm">{exercise.description}</p>
          </div>
          {showProgress && (
            <button
              onClick={handleComplete}
              className={`ml-4 p-2 rounded-full transition-colors ${
                isCompleted
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
              }`}
            >
              <CheckCircle className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
            {exercise.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {exercise.category}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{exercise.duration} min</span>
          </div>
          {exercise.sets && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{exercise.sets} sets</span>
            </div>
          )}
          {exercise.reps && (
            <div className="flex items-center space-x-1">
              <span className="font-medium">{exercise.reps}</span>
              <span>reps</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Target Muscles:</h4>
          <div className="flex flex-wrap gap-1">
            {exercise.targetMuscles.map(muscle => (
              <span key={muscle} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {muscle}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
          <ol className="text-sm text-gray-600 space-y-1">
            {exercise.instructions.map((instruction, index) => (
              <li key={index} className="flex">
                <span className="font-medium text-blue-600 mr-2">{index + 1}.</span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex space-x-3">
          <button 
            onClick={() => setShowVideo(true)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>Watch Video</span>
          </button>
          <button 
            onClick={() => setShow3D(true)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center space-x-2"
          >
            <BookOpen className="h-4 w-4" />
            <span>3D Animation</span>
          </button>
        </div>
      </div>
    </div>
  );
}