import React, { useState } from 'react';
import { X, Save, FileText, Clock, User, Target, AlertCircle } from 'lucide-react';

interface SessionNote {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  duration: number;
  sessionType: 'in-person' | 'virtual';
  exercises: string[];
  painLevel: number;
  progress: string;
  notes: string;
  nextSteps: string;
  concerns: string;
}

interface SessionNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionNote?: SessionNote;
  onSave: (noteData: SessionNote) => void;
  isEditing?: boolean;
}

export function SessionNotesModal({ 
  isOpen, 
  onClose, 
  sessionNote, 
  onSave, 
  isEditing = false 
}: SessionNotesModalProps) {
  const [noteData, setNoteData] = useState<SessionNote>(
    sessionNote || {
      id: '',
      patientId: '',
      patientName: '',
      date: new Date().toISOString().split('T')[0],
      duration: 60,
      sessionType: 'in-person',
      exercises: [],
      painLevel: 5,
      progress: '',
      notes: '',
      nextSteps: '',
      concerns: ''
    }
  );

  const [exerciseInput, setExerciseInput] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    const updatedNote = {
      ...noteData,
      id: noteData.id || `note_${Date.now()}`
    };
    onSave(updatedNote);
    onClose();
  };

  const addExercise = () => {
    if (exerciseInput.trim()) {
      setNoteData(prev => ({
        ...prev,
        exercises: [...prev.exercises, exerciseInput.trim()]
      }));
      setExerciseInput('');
    }
  };

  const removeExercise = (index: number) => {
    setNoteData(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-700">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">
                {isEditing ? 'Edit Session Notes' : 'New Session Notes'}
              </h2>
              <p className="text-purple-100 text-sm">
                {noteData.patientName || 'Patient Session Documentation'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Session Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Patient Name
              </label>
              <input
                type="text"
                value={noteData.patientName}
                onChange={(e) => setNoteData(prev => ({ ...prev, patientName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter patient name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Date
              </label>
              <input
                type="date"
                value={noteData.date}
                onChange={(e) => setNoteData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-2" />
                Duration (minutes)
              </label>
              <input
                type="number"
                value={noteData.duration}
                onChange={(e) => setNoteData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="15"
                max="180"
              />
            </div>
          </div>

          {/* Session Type and Pain Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sessionType"
                    value="in-person"
                    checked={noteData.sessionType === 'in-person'}
                    onChange={(e) => setNoteData(prev => ({ ...prev, sessionType: e.target.value as 'in-person' | 'virtual' }))}
                    className="mr-2"
                  />
                  In-Person
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sessionType"
                    value="virtual"
                    checked={noteData.sessionType === 'virtual'}
                    onChange={(e) => setNoteData(prev => ({ ...prev, sessionType: e.target.value as 'in-person' | 'virtual' }))}
                    className="mr-2"
                  />
                  Virtual
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pain Level (1-10)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={noteData.painLevel}
                  onChange={(e) => setNoteData(prev => ({ ...prev, painLevel: parseInt(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-gray-900 w-8">{noteData.painLevel}</span>
              </div>
            </div>
          </div>

          {/* Exercises Performed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Target className="h-4 w-4 inline mr-2" />
              Exercises Performed
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={exerciseInput}
                onChange={(e) => setExerciseInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addExercise()}
                placeholder="Add exercise..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addExercise}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {noteData.exercises.map((exercise, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  {exercise}
                  <button
                    onClick={() => removeExercise(index)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Progress Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Progress Assessment
            </label>
            <textarea
              value={noteData.progress}
              onChange={(e) => setNoteData(prev => ({ ...prev, progress: e.target.value }))}
              rows={3}
              placeholder="Describe patient's progress, improvements, or challenges..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Session Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Notes
            </label>
            <textarea
              value={noteData.notes}
              onChange={(e) => setNoteData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              placeholder="Detailed notes about the session, patient responses, observations..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Next Steps */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next Steps & Recommendations
            </label>
            <textarea
              value={noteData.nextSteps}
              onChange={(e) => setNoteData(prev => ({ ...prev, nextSteps: e.target.value }))}
              rows={3}
              placeholder="Plan for next session, homework assignments, modifications..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Concerns */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <AlertCircle className="h-4 w-4 inline mr-2" />
              Concerns or Red Flags
            </label>
            <textarea
              value={noteData.concerns}
              onChange={(e) => setNoteData(prev => ({ ...prev, concerns: e.target.value }))}
              rows={2}
              placeholder="Any concerns, warning signs, or issues to monitor..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Notes</span>
          </button>
        </div>
      </div>
    </div>
  );
}