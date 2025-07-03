import React from 'react';
import { Dumbbell, User, Crown, Zap } from 'lucide-react';
import { UserPlan } from '../types';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: 'profile' | 'generator' | 'script' | 'library') => void;
  isAuthenticated: boolean;
  userPlan: UserPlan;
  onAuthClick: () => void;
  onUpgradeClick: () => void;
}

export function Header({ 
  currentView, 
  onViewChange, 
  isAuthenticated, 
  userPlan, 
  onAuthClick, 
  onUpgradeClick 
}: HeaderProps) {
  const getPlanIcon = () => {
    switch (userPlan) {
      case 'pro': return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'premium': return <Crown className="h-4 w-4 text-purple-500" />;
      default: return null;
    }
  };

  const getPlanColor = () => {
    switch (userPlan) {
      case 'pro': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dejimba</h1>
              <p className="text-sm text-gray-600">Workout Script Generator</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onViewChange('profile')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'profile'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Client Profile
            </button>
            <button
              onClick={() => onViewChange('generator')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'generator'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Generator
            </button>
            <button
              onClick={() => onViewChange('library')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'library'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Exercise Library
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getPlanColor()}`}>
                {getPlanIcon()}
                <span className="text-sm font-medium capitalize">{userPlan}</span>
              </div>
            )}
            
            {userPlan === 'free' && (
              <button
                onClick={onUpgradeClick}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Upgrade
              </button>
            )}

            <button
              onClick={onAuthClick}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>{isAuthenticated ? 'Account' : 'Sign In'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}