import React from 'react';
import { Activity, Users, BookOpen, BarChart3, Settings, User, MessageCircle, FileText, LogIn, Library } from 'lucide-react';
import { UserRole } from '../types';

interface NavigationProps {
  currentRole: UserRole;
  currentPage: string;
  onPageChange: (page: string) => void;
  onRoleChange: (role: UserRole) => void;
  onProfileClick: () => void;
  onAuthClick?: () => void;
  onMessagesClick?: () => void;
  onSessionNotesClick?: () => void;
  isAuthenticated?: boolean;
}

export function Navigation({ 
  currentRole, 
  currentPage, 
  onPageChange, 
  onRoleChange, 
  onProfileClick,
  onAuthClick,
  onMessagesClick,
  onSessionNotesClick,
  isAuthenticated = true
}: NavigationProps) {
  const patientPages = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'routine', label: 'My Routine', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'library', label: 'Exercise Library', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: Library },
    { id: 'messages', label: 'Messages', icon: MessageCircle, onClick: onMessagesClick },
  ];

  const therapistPages = [
    { id: 'therapist-dashboard', label: 'Dashboard', icon: Activity },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'library', label: 'Exercise Library', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: Library },
    { id: 'messages', label: 'Messages', icon: MessageCircle, onClick: onMessagesClick },
    { id: 'session-notes', label: 'Session Notes', icon: FileText, onClick: onSessionNotesClick },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const pages = currentRole === 'patient' ? patientPages : therapistPages;

  // Mock profile data - in a real app, this would come from your user management system
  const mockProfileData = {
    patient: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      profilePicture: '',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Anytown, ST 12345',
      dateOfBirth: '1990-05-15',
      emergencyContact: 'John Johnson - (555) 987-6543',
      medicalHistory: 'Previous ACL surgery in 2019, no other major injuries',
      currentMedications: 'Ibuprofen 400mg as needed for pain'
    },
    therapist: {
      name: 'Dr. Michael Smith',
      email: 'dr.smith@artdoctorpt.com',
      profilePicture: '',
      phone: '+1 (555) 234-5678',
      address: '456 Medical Center Dr, Healthcare City, ST 54321',
      dateOfBirth: '1985-08-22',
      specialty: 'Orthopedic Physical Therapy',
      license: 'PT12345',
      experience: '8',
      education: 'DPT from University of Health Sciences, Board Certified Orthopedic Clinical Specialist',
      bio: 'Passionate about helping patients recover from orthopedic injuries and return to their active lifestyles. Specializing in sports medicine and post-surgical rehabilitation.'
    }
  };

  const currentUserData = mockProfileData[currentRole];

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

        {isAuthenticated && (
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
        )}

        <ul className="space-y-2">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <li key={page.id}>
                <button
                  onClick={() => page.onClick ? page.onClick() : onPageChange(page.id)}
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
        {isAuthenticated ? (
          <button
            onClick={onProfileClick}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              {currentUserData.profilePicture ? (
                <img 
                  src={currentUserData.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-medium text-sm">
                  {currentUserData.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {currentUserData.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">{currentRole}</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </button>
        ) : (
          <button
            onClick={onAuthClick}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <LogIn className="h-4 w-4" />
            <span className="font-medium">Sign In</span>
          </button>
        )}
      </div>
    </nav>
  );
}