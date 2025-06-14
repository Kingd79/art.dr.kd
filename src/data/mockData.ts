import { Patient, Routine, ProgressEntry } from '../types';
import { exerciseDatabase } from './exercises';

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    injury: 'Knee injury',
    goals: ['Pain reduction', 'Improved mobility'],
    preferredExerciseType: 'Low-impact exercises',
    createdAt: '2024-01-15',
    lastActiveAt: '2024-01-20'
  },
  {
    id: 'p2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    injury: 'Lower back pain',
    goals: ['Strength building', 'Flexibility'],
    preferredExerciseType: 'Yoga and stretching',
    createdAt: '2024-01-10',
    lastActiveAt: '2024-01-19'
  },
  {
    id: 'p3',
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@email.com',
    injury: 'Shoulder impingement',
    goals: ['Range of motion', 'Strength building'],
    preferredExerciseType: 'Resistance training',
    createdAt: '2024-01-12',
    lastActiveAt: '2024-01-18'
  }
];

export const mockRoutines: Routine[] = [
  {
    id: 'r1',
    patientId: 'p1',
    name: 'Knee Recovery Program',
    exercises: [exerciseDatabase[0], exerciseDatabase[5]],
    duration: 25,
    difficulty: 'Beginner',
    createdAt: '2024-01-15',
    completedSessions: 8,
    totalSessions: 20
  },
  {
    id: 'r2',
    patientId: 'p2',
    name: 'Lower Back Relief',
    exercises: [exerciseDatabase[1], exerciseDatabase[3]],
    duration: 20,
    difficulty: 'Beginner',
    createdAt: '2024-01-10',
    completedSessions: 12,
    totalSessions: 24
  }
];

export const mockProgress: ProgressEntry[] = [
  {
    id: 'pr1',
    patientId: 'p1',
    routineId: 'r1',
    date: '2024-01-20',
    completed: true,
    painLevel: 3,
    notes: 'Feeling stronger, less stiffness',
    exercisesCompleted: 2,
    totalExercises: 2
  },
  {
    id: 'pr2',
    patientId: 'p2',
    routineId: 'r2',
    date: '2024-01-19',
    completed: true,
    painLevel: 2,
    notes: 'Much better flexibility today',
    exercisesCompleted: 2,
    totalExercises: 2
  }
];