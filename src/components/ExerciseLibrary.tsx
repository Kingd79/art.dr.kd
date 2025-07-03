import React, { useState } from 'react';
import { Search, Filter, Play, BookOpen, Dumbbell, Target } from 'lucide-react';
import { exerciseDatabase } from '../data/exerciseDatabase';
import { UserPlan } from '../types';

interface ExerciseLibraryProps {
  userPlan: UserPlan;
}

export function ExerciseLibrary({ userPlan }: ExerciseLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBodyPart, setSelectedBodyPart] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = ['All', ...Array.from(new Set(exerciseDatabase.map(e => e.category)))];
  const bodyParts = ['All', 'chest', 'back', 'legs', 'shoulders', 'arms', 'core'];
  const difficulties = ['All', 'beginner', 'intermediate', 'advanced'];

  const filteredExercises = exerciseDatabase.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesBodyPart = selectedBodyPart === 'All' || 
                           exercise.bodyPart.some(part => part.toLowerCase().includes(selectedBodyPart.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === 'All' || exercise.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesBodyPart && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Compound': return 'bg-blue-100 text-blue-800';
      case 'Isolation': return 'bg-purple-100 text-purple-800';
      case 'Isometric': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">Exercise Library</h2>
              <p className="text-indigo-100">Comprehensive database of exercises with instructions and tips</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Search and Filters */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search exercises..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  value={selectedBodyPart}
                  onChange={(e) => setSelectedBodyPart(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                >
                  {bodyParts.map(part => (
                    <option key={part} value={part}>{part === 'All' ? 'All Body Parts' : part.charAt(0).toUpperCase() + part.slice(1)}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty === 'All' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {filteredExercises.length} Exercise{filteredExercises.length !== 1 ? 's' : ''} Found
            </h3>
            <div className="text-sm text-gray-600">
              Showing {filteredExercises.length} of {exerciseDatabase.length} total exercises
            </div>
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map(exercise => (
              <div key={exercise.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                {exercise.imageUrl && (
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img 
                      src={exercise.imageUrl} 
                      alt={exercise.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">{exercise.name}</h4>
                    {exercise.videoUrl && userPlan !== 'free' && (
                      <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                        <Play className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{exercise.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(exercise.category)}`}>
                      {exercise.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      Target Muscles
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {exercise.musclesWorked.map(muscle => (
                        <span key={muscle} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Dumbbell className="h-4 w-4 mr-1" />
                      Equipment
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {exercise.equipment.map(eq => (
                        <span key={eq} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Instructions</h5>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                      {exercise.instructions.slice(0, 2).map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                      {exercise.instructions.length > 2 && (
                        <li className="text-gray-400">+ {exercise.instructions.length - 2} more steps...</li>
                      )}
                    </ol>
                  </div>
                  
                  {exercise.tips.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-2">Pro Tips</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {exercise.tips.slice(0, 1).map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                        {exercise.tips.length > 1 && (
                          <li className="text-gray-400">+ {exercise.tips.length - 1} more tips...</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No exercises found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}