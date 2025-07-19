export interface WorkoutFeedback {
  id: string;
  clientId: string;
  workoutId: string;
  exerciseId?: string;
  intensityRating: number; // 1-10 scale
  energyLevel: 'low' | 'moderate' | 'high';
  musclesoreness: 'none' | 'mild' | 'moderate' | 'severe';
  recoveryTime: number; // hours
  exerciseDifficulty: 'too_easy' | 'just_right' | 'challenging' | 'too_hard';
  overallSatisfaction: number; // 1-10 scale
  qualitativeFeedback: string;
  submittedAt: string;
  workoutPhase: 'during' | 'post_workout';
}

export interface PreSessionCheckIn {
  id: string;
  clientId: string;
  sessionDate: string;
  energyLevel: number; // 1-10
  sleepQuality: number; // 1-10
  sleepHours: number;
  nutritionRating: number; // 1-10
  stressLevel: number; // 1-10
  hydrationLevel: number; // 1-10
  injuryStatus: string;
  notes: string;
  submittedAt: string;
}

export interface ExerciseProgress {
  id: string;
  clientId: string;
  exerciseId: string;
  exerciseName: string;
  date: string;
  weight: number;
  sets: number;
  reps: number;
  restTime: number;
  intensityRating: number;
  formRating: number; // 1-10
  notes: string;
}

export interface ClientProgressMetrics {
  clientId: string;
  clientName: string;
  exerciseProgress: {
    [exerciseId: string]: {
      exerciseName: string;
      maxWeight: { weight: number; date: string };
      minWeight: { weight: number; date: string };
      currentWeight: number;
      progressTrend: 'increasing' | 'decreasing' | 'plateau';
      sessions: ExerciseProgress[];
    };
  };
  intensityTrends: {
    date: string;
    averageIntensity: number;
    workoutCount: number;
  }[];
  attendanceRate: number;
  goalAchievementPercentage: number;
  lastWorkout: string;
  totalWorkouts: number;
}

export interface ProgressAlert {
  id: string;
  clientId: string;
  type: 'intensity_too_high' | 'intensity_too_low' | 'plateau' | 'regression' | 'missed_sessions';
  severity: 'low' | 'medium' | 'high';
  message: string;
  recommendation: string;
  createdAt: string;
  resolved: boolean;
}

export interface RoutineSuggestion {
  id: string;
  clientId: string;
  suggestedExercises: string[];
  intensityAdjustment: 'increase' | 'decrease' | 'maintain';
  focusAreas: string[];
  reasoning: string;
  confidence: number; // 0-1
  generatedAt: string;
}