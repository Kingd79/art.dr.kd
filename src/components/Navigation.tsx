import React from 'react';
import { Activity, Users, BookOpen, BarChart3, Settings, User } from 'lucide-react';
import { UserRole } from '../types';

interface NavigationProps {
  currentRole: UserRole;
  currentPage: string;
  onPageChange: (page: string) => void;
  onRoleChange: (role: UserRole) => void;
}

export function Navigation({ currentRole, currentPage, onPageChange, onRoleChange }: NavigationProps) {
  const patientPages = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'routine', label: 'My Routine', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'library', label: 'Exercise Library', icon: BookOpen },
  ];

  const therapistPages = [
    { id: 'therapist-dashboard', label: 'Dashboard', icon: Activity },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'library', label: 'Exercise Library', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const pages = currentRole === 'patient' ? patientPages : therapistPages;

  return (
    <nav className="bg-white shadow-sm border-r border-gray-200 h-screen w-64 fixed left-0 top-0 z-10">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Art.Doctor.PT</h1>
            <p className="text-sm text-gray-500">AI Physical Therapy</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onRoleChange('patient')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                currentRole === 'patient'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="h-4 w-4 inline mr-2" />
              Patient
            </button>
            <button
              onClick={() => onRoleChange('therapist')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                currentRole === 'therapist'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Activity className="h-4 w-4 inline mr-2" />
              Therapist
            </button>
          </div>
        </div>

        <ul className="space-y-2">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <li key={page.id}>
                <button
                  onClick={() => onPageChange(page.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    currentPage === page.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{page.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {currentRole === 'patient' ? 'Sarah Johnson' : 'Dr. Smith'}
            </p>
            <p className="text-xs text-gray-500 capitalize">{currentRole}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}