import React, { useState } from 'react';
import { X, Star, Send, ThumbsUp, ThumbsDown } from 'lucide-react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  therapistName: string;
  sessionDate: string;
  onSubmitRating: (ratingData: any) => void;
}

export function RatingModal({ isOpen, onClose, therapistName, sessionDate, onSubmitRating }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [categories, setCategories] = useState({
    communication: 0,
    expertise: 0,
    punctuality: 0,
    effectiveness: 0
  });
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ratingData = {
      therapistName,
      sessionDate,
      overallRating: rating,
      categories,
      feedback,
      wouldRecommend,
      isAnonymous,
      submittedAt: new Date().toISOString()
    };
    onSubmitRating(ratingData);
    onClose();
  };

  const renderStars = (currentRating: number, onRate: (rating: number) => void, onHover?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover?.(star)}
            onMouseLeave={() => onHover?.(0)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 ${
                star <= (onHover ? hoveredRating : currentRating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              } hover:text-yellow-400 transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  const renderCategoryStars = (category: keyof typeof categories) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setCategories(prev => ({ ...prev, [category]: star }))}
            className="focus:outline-none"
          >
            <Star
              className={`h-4 w-4 ${
                star <= categories[category]
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              } hover:text-yellow-400 transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-yellow-500 to-orange-500">
          <div>
            <h2 className="text-xl font-bold text-white">Rate Your Session</h2>
            <p className="text-yellow-100 text-sm">with {therapistName} on {new Date(sessionDate).toLocaleDateString()}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Overall Rating */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How was your overall experience?</h3>
            <div className="flex justify-center mb-2">
              {renderStars(rating, setRating, setHoveredRating)}
            </div>
            <p className="text-sm text-gray-600">
              {rating === 0 && 'Select a rating'}
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </p>
          </div>

          {/* Category Ratings */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Rate specific aspects:</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Communication</span>
                {renderCategoryStars('communication')}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Expertise</span>
                {renderCategoryStars('expertise')}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Punctuality</span>
                {renderCategoryStars('punctuality')}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Treatment Effectiveness</span>
                {renderCategoryStars('effectiveness')}
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Would you recommend this therapist?</h4>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setWouldRecommend(true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                  wouldRecommend === true
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>Yes</span>
              </button>
              <button
                type="button"
                onClick={() => setWouldRecommend(false)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                  wouldRecommend === false
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <ThumbsDown className="h-4 w-4" />
                <span>No</span>
              </button>
            </div>
          </div>

          {/* Written Feedback */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Feedback (Optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              placeholder="Share your thoughts about the session, what went well, or areas for improvement..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Privacy Options */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700">
                Submit this review anonymously
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Anonymous reviews help other patients while protecting your privacy
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className="flex-1 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Submit Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}