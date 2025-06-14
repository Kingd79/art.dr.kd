import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { PatientIntake } from './components/PatientIntake';
import { PatientDashboard } from './components/PatientDashboard';
import { TherapistDashboard } from './components/TherapistDashboard';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { ProgressChart } from './components/ProgressChart';
import { UserRole } from './types';

function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('patient');
  const [currentPage, setCurrentPage] = useState('intake');
  const [hasCompletedIntake, setHasCompletedIntake] = useState(false);

  const handleIntakeComplete = (data: any) => {
    console.log('Intake completed:', data);
    setHasCompletedIntake(true);
    setCurrentPage('dashboard');
  };

  const handlePageChange = (page: string) => {
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
            <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
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
      />
      
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
}

export default App;