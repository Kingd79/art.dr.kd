import React, { useState } from 'react';
import { Header } from './components/Header';
import { ClientProfileBuilder } from './components/ClientProfileBuilder';
import { WorkoutGenerator } from './components/WorkoutGenerator';
import { WorkoutScript } from './components/WorkoutScript';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { PricingModal } from './components/PricingModal';
import { AuthModal } from './components/AuthModal';
import { ClientProfile, WorkoutPlan } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'profile' | 'generator' | 'script' | 'library'>('profile');
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'premium'>('free');

  const handleProfileComplete = (profile: ClientProfile) => {
    setClientProfile(profile);
    setCurrentView('generator');
  };

  const handleWorkoutGenerated = (plan: WorkoutPlan) => {
    setWorkoutPlan(plan);
    setCurrentView('script');
  };

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    // In a real app, you'd validate credentials and set user data
  };

  const handleRegister = (userData: any) => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    // In a real app, you'd create the user account
  };

  const handleUpgrade = (plan: 'pro' | 'premium') => {
    setUserPlan(plan);
    setIsPricingModalOpen(false);
    // In a real app, you'd handle payment processing
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'profile':
        return (
          <ClientProfileBuilder 
            onComplete={handleProfileComplete}
            userPlan={userPlan}
            onUpgradeClick={() => setIsPricingModalOpen(true)}
          />
        );
      case 'generator':
        // Ensure clientProfile exists before rendering WorkoutGenerator
        if (!clientProfile) {
          return (
            <ClientProfileBuilder 
              onComplete={handleProfileComplete}
              userPlan={userPlan}
              onUpgradeClick={() => setIsPricingModalOpen(true)}
            />
          );
        }
        return (
          <WorkoutGenerator
            clientProfile={clientProfile}
            onWorkoutGenerated={handleWorkoutGenerated}
            userPlan={userPlan}
            onUpgradeClick={() => setIsPricingModalOpen(true)}
          />
        );
      case 'script':
        // Ensure both workoutPlan and clientProfile exist before rendering WorkoutScript
        if (!workoutPlan || !clientProfile) {
          return (
            <ClientProfileBuilder 
              onComplete={handleProfileComplete}
              userPlan={userPlan}
              onUpgradeClick={() => setIsPricingModalOpen(true)}
            />
          );
        }
        return (
          <WorkoutScript
            workoutPlan={workoutPlan}
            clientProfile={clientProfile}
            userPlan={userPlan}
            onUpgradeClick={() => setIsPricingModalOpen(true)}
          />
        );
      case 'library':
        return <ExerciseLibrary userPlan={userPlan} />;
      default:
        return (
          <ClientProfileBuilder 
            onComplete={handleProfileComplete}
            userPlan={userPlan}
            onUpgradeClick={() => setIsPricingModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        isAuthenticated={isAuthenticated}
        userPlan={userPlan}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onUpgradeClick={() => setIsPricingModalOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderCurrentView()}
      </main>

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onUpgrade={handleUpgrade}
        currentPlan={userPlan}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
}

export default App;