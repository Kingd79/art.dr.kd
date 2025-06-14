export interface Patient {
  id: string;
  name: string;
  email: string;
  injury: string;
  goals: string[];
  preferredExerciseType: string;
  createdAt: string;
  lastActiveAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  sets?: number;
  reps?: number;
  instructions: string[];
  targetMuscles: string[];
  equipment: string[];
  videoUrl?: string;
  animationUrl?: string;
}

export interface Routine {
  id: string;
  patientId: string;
  name: string;
  exercises: Exercise[];
  duration: number;
  difficulty: string;
  createdAt: string;
  completedSessions: number;
  totalSessions: number;
}

export interface ProgressEntry {
  id: string;
  patientId: string;
  routineId: string;
  date: string;
  completed: boolean;
  painLevel: number;
  notes: string;
  exercisesCompleted: number;
  totalExercises: number;
}

export type UserRole = 'patient' | 'therapist';