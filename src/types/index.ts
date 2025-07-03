export interface ClientProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  availableEquipment: string[];
  workoutDuration: number;
  workoutFrequency: number;
  injuries: string[];
  preferences: string[];
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  bodyPart: string[];
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  instructions: string[];
  tips: string[];
  imageUrl?: string;
  videoUrl?: string;
  musclesWorked: string[];
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: number;
  reps: string;
  weight?: string;
  rest: string;
  notes?: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: WorkoutExercise[];
  totalDuration: number;
}

export interface WorkoutPlan {
  id: string;
  clientName: string;
  planName: string;
  duration: string;
  frequency: string;
  goals: string[];
  workoutDays: WorkoutDay[];
  nutritionTips?: string[];
  progressTracking?: string[];
  createdAt: string;
}

export type UserPlan = 'free' | 'pro' | 'premium';