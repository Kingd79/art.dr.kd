import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { PatientIntake } from './components/PatientIntake';
import { PatientDashboard } from './components/PatientDashboard';
import { TherapistDashboard } from './components/TherapistDashboard';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { ProgressChart } from './components/ProgressChart';
import { ProfileModal } from './components/ProfileModal';
import { AuthModal } from './components/AuthModal';
import { BookingModal } from './components/BookingModal';
import { MessagingSystem } from './components/MessagingSystem';
import { PaymentModal } from './components/PaymentModal';
import { SessionNotesModal } from './components/SessionNotesModal';
import { ResourceLibrary } from './components/ResourceLibrary';
import { RatingModal } from './components/RatingModal';
import { UserRole } from './types';

function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('patient');
  const [currentPage, setCurrentPage] = useState('intake');
  const [hasCompletedIntake, setHasCompletedIntake] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Modal states
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSessionNotesModalOpen, setIsSessionNotesModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  // Mock profile data - in a real app, this would come from your user management system
  const [profileData, setProfileData] = useState({
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
  });

  const handleIntakeComplete = (data: any) => {
    console.log('Intake completed:', data);
    // Update profile data with intake information
    setProfileData(prev => ({
      ...prev,
      patient: {
        ...prev.patient,
        name: data.name,
        email: data.email,
        medicalHistory: `Primary concern: ${data.injury}. Goals: ${data.goals.join(', ')}. Activity level: ${data.activityLevel}. Pain level: ${data.painLevel}/10`
      }
    }));
    setHasCompletedIntake(true);
    setCurrentPage('dashboard');
  };

  const handlePageChange = (page: string) => {
    // Handle special pages that open modals
    if (page === 'messages') {
      setIsMessagingOpen(true);
      return;
    }
    if (page === 'resources') {
      setCurrentPage('resources');
      return;
    }
    setCurrentPage(page);
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'therapist') {
      setCurrentPage('therapist-dashboard');
    } else {
      setCurrentPage(hasCompletedIntake ? 'dashboard' : 'intake');
    }
  };

  const handleProfileSave = (data: any) => {
    setProfileData(prev => ({
      ...prev,
      [currentRole]: data
    }));
    console.log('Profile updated:', data);
  };

  const handleLogin = (email: string, password: string, role: UserRole) => {
    console.log('Login attempt:', { email, role });
    setIsAuthenticated(true);
    setCurrentRole(role);
    if (role === 'therapist') {
      setCurrentPage('therapist-dashboard');
    } else {
      setCurrentPage(hasCompletedIntake ? 'dashboard' : 'intake');
    }
  };

  const handleRegister = (userData: any) => {
    console.log('Registration:', userData);
    setIsAuthenticated(true);
    setCurrentRole(userData.role);
    if (userData.role === 'therapist') {
      setCurrentPage('therapist-dashboard');
    } else {
      setCurrentPage('intake');
    }
  };

  const handleBookSession = (bookingData: any) => {
    console.log('Session booked:', bookingData);
    // In a real app, this would create the booking and potentially open payment modal
    if (bookingData.paymentMethod === 'card') {
      setIsPaymentModalOpen(true);
    }
  };

  const handlePaymentComplete = (paymentData: any) => {
    console.log('Payment completed:', paymentData);
    // Handle successful payment
  };

  const handleSessionNotesSave = (noteData: any) => {
    console.log('Session notes saved:', noteData);
    // Handle saving session notes
  };

  const handleRatingSubmit = (ratingData: any) => {
    console.log('Rating submitted:', ratingData);
    // Handle rating submission
  };

  const renderMainContent = () => {
    if (currentRole === 'patient' && !hasCompletedIntake && currentPage === 'intake') {
      return <PatientIntake onComplete={handleIntakeComplete} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <PatientDashboard />;
      case 'therapist-dashboard':
        return <TherapistDashboard />;
      case 'library':
        return <ExerciseLibrary />;
      case 'resources':
        return <ResourceLibrary />;
      case 'progress':
        const mockProgressData = [
          { date: '2024-01-14', painLevel: 6, completed: true },
          { date: '2024-01-15', painLevel: 5, completed: true },
          { date: '2024-01-16', painLevel: 4, completed: false },
          { date: '2024-01-17', painLevel: 4, completed: true },
          { date: '2024-01-18', painLevel: 3, completed: true },
          { date: '2024-01-19', painLevel: 3, completed: true },
          { date: '2024-01-20', painLevel: 2, completed: true },
        ];
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsRatingModalOpen(true)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Rate Session
                </button>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Session
                </button>
              </div>
            </div>
            <ProgressChart data={mockProgressData} />
          </div>
        );
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentRole={currentRole}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onRoleChange={handleRoleChange}
        onProfileClick={() => setIsProfileModalOpen(true)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onMessagesClick={() => setIsMessagingOpen(true)}
        onSessionNotesClick={() => setIsSessionNotesModalOpen(true)}
        isAuthenticated={isAuthenticated}
      />
      
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {renderMainContent()}
        </div>
      </main>

      {/* Modals */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userRole={currentRole}
        profileData={profileData[currentRole]}
        onSave={handleProfileSave}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookSession={handleBookSession}
      />

      <MessagingSystem
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
        currentUserId="user1"
        currentUserRole={currentRole}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={120}
        description="Physical Therapy Session"
        onPaymentComplete={handlePaymentComplete}
      />

      <SessionNotesModal
        isOpen={isSessionNotesModalOpen}
        onClose={() => setIsSessionNotesModalOpen(false)}
        onSave={handleSessionNotesSave}
      />

      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        therapistName="Dr. Michael Smith"
        sessionDate="2024-01-20"
        onSubmitRating={handleRatingSubmit}
      />
    </div>
  );
}

export default App;