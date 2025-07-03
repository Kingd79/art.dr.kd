import { ClientProfile, WorkoutPlan, WorkoutDay, Exercise, WorkoutExercise } from '../types';
import { exerciseDatabase } from '../data/exerciseDatabase';

export function generateWorkoutPlan(
  profile: ClientProfile,
  planType: 'basic' | 'advanced' | 'premium',
  customizations: any
): WorkoutPlan {
  const workoutDays = generateWorkoutDays(profile, planType);
  
  const plan: WorkoutPlan = {
    id: `plan_${Date.now()}`,
    clientName: profile.name,
    planName: generatePlanName(profile),
    duration: `${profile.workoutFrequency} weeks`,
    frequency: `${profile.workoutFrequency} days per week`,
    goals: profile.goals,
    workoutDays,
    createdAt: new Date().toISOString()
  };

  if (customizations.nutritionTips && planType === 'premium') {
    plan.nutritionTips = generateNutritionTips(profile);
  }

  if (customizations.progressiveOverload && planType !== 'basic') {
    plan.progressTracking = generateProgressTracking(profile);
  }

  return plan;
}

function generatePlanName(profile: ClientProfile): string {
  const primaryGoal = profile.goals[0] || 'Fitness';
  const level = profile.fitnessLevel;
  return `${primaryGoal} - ${level.charAt(0).toUpperCase() + level.slice(1)} Program`;
}

function generateWorkoutDays(profile: ClientProfile, planType: string): WorkoutDay[] {
  const days = [];
  const frequency = profile.workoutFrequency;
  
  if (frequency <= 3) {
    // Full body workouts
    for (let i = 1; i <= frequency; i++) {
      days.push(generateFullBodyDay(profile, i, planType));
    }
  } else if (frequency <= 4) {
    // Upper/Lower split
    days.push(generateUpperBodyDay(profile, 1, planType));
    days.push(generateLowerBodyDay(profile, 2, planType));
    days.push(generateUpperBodyDay(profile, 3, planType));
    if (frequency === 4) {
      days.push(generateLowerBodyDay(profile, 4, planType));
    }
  } else {
    // Push/Pull/Legs split
    days.push(generatePushDay(profile, 1, planType));
    days.push(generatePullDay(profile, 2, planType));
    days.push(generateLegsDay(profile, 3, planType));
    days.push(generatePushDay(profile, 4, planType));
    days.push(generatePullDay(profile, 5, planType));
    if (frequency === 6) {
      days.push(generateLegsDay(profile, 6, planType));
    }
  }

  return days;
}

function generateFullBodyDay(profile: ClientProfile, dayNumber: number, planType: string): WorkoutDay {
  const exercises = selectExercises(profile, ['chest', 'back', 'legs', 'shoulders', 'arms'], planType);
  
  return {
    day: `Day ${dayNumber}`,
    focus: 'Full Body',
    exercises: exercises.map(exercise => createWorkoutExercise(exercise, profile, planType)),
    totalDuration: profile.workoutDuration
  };
}

function generateUpperBodyDay(profile: ClientProfile, dayNumber: number, planType: string): WorkoutDay {
  const exercises = selectExercises(profile, ['chest', 'back', 'shoulders', 'arms'], planType);
  
  return {
    day: `Day ${dayNumber}`,
    focus: 'Upper Body',
    exercises: exercises.map(exercise => createWorkoutExercise(exercise, profile, planType)),
    totalDuration: profile.workoutDuration
  };
}

function generateLowerBodyDay(profile: ClientProfile, dayNumber: number, planType: string): WorkoutDay {
  const exercises = selectExercises(profile, ['legs', 'glutes', 'calves'], planType);
  
  return {
    day: `Day ${dayNumber}`,
    focus: 'Lower Body',
    exercises: exercises.map(exercise => createWorkoutExercise(exercise, profile, planType)),
    totalDuration: profile.workoutDuration
  };
}

function generatePushDay(profile: ClientProfile, dayNumber: number, planType: string): WorkoutDay {
  const exercises = selectExercises(profile, ['chest', 'shoulders', 'triceps'], planType);
  
  return {
    day: `Day ${dayNumber}`,
    focus: 'Push (Chest, Shoulders, Triceps)',
    exercises: exercises.map(exercise => createWorkoutExercise(exercise, profile, planType)),
    totalDuration: profile.workoutDuration
  };
}

function generatePullDay(profile: ClientProfile, dayNumber: number, planType: string): WorkoutDay {
  const exercises = selectExercises(profile, ['back', 'biceps'], planType);
  
  return {
    day: `Day ${dayNumber}`,
    focus: 'Pull (Back, Biceps)',
    exercises: exercises.map(exercise => createWorkoutExercise(exercise, profile, planType)),
    totalDuration: profile.workoutDuration
  };
}

function generateLegsDay(profile: ClientProfile, dayNumber: number, planType: string): WorkoutDay {
  const exercises = selectExercises(profile, ['legs', 'glutes', 'calves'], planType);
  
  return {
    day: `Day ${dayNumber}`,
    focus: 'Legs & Glutes',
    exercises: exercises.map(exercise => createWorkoutExercise(exercise, profile, planType)),
    totalDuration: profile.workoutDuration
  };
}

function selectExercises(profile: ClientProfile, targetBodyParts: string[], planType: string): Exercise[] {
  const availableExercises = exerciseDatabase.filter(exercise => {
    // Filter by available equipment
    const hasEquipment = exercise.equipment.some(eq => 
      profile.availableEquipment.includes(eq) || eq === 'Bodyweight'
    );
    
    // Filter by fitness level
    const levelMatch = exercise.difficulty === profile.fitnessLevel || 
      (profile.fitnessLevel === 'advanced' && exercise.difficulty === 'intermediate') ||
      (profile.fitnessLevel === 'intermediate' && exercise.difficulty === 'beginner');
    
    // Filter by body parts
    const bodyPartMatch = exercise.bodyPart.some(part => 
      targetBodyParts.some(target => part.toLowerCase().includes(target.toLowerCase()))
    );
    
    return hasEquipment && levelMatch && bodyPartMatch;
  });

  // Select exercises based on plan type
  const exerciseCount = planType === 'basic' ? 4 : planType === 'advanced' ? 6 : 8;
  return availableExercises.slice(0, exerciseCount);
}

function createWorkoutExercise(exercise: Exercise, profile: ClientProfile, planType: string): WorkoutExercise {
  const sets = getSetsForExercise(exercise, profile, planType);
  const reps = getRepsForExercise(exercise, profile, planType);
  const rest = getRestForExercise(exercise, profile);
  
  return {
    exercise,
    sets,
    reps,
    rest,
    weight: planType !== 'basic' ? 'Start with comfortable weight' : undefined,
    notes: planType === 'premium' ? generateExerciseNotes(exercise, profile) : undefined
  };
}

function getSetsForExercise(exercise: Exercise, profile: ClientProfile, planType: string): number {
  if (profile.fitnessLevel === 'beginner') return 2;
  if (profile.fitnessLevel === 'intermediate') return 3;
  return planType === 'premium' ? 4 : 3;
}

function getRepsForExercise(exercise: Exercise, profile: ClientProfile, planType: string): string {
  const goals = profile.goals;
  
  if (goals.includes('Strength Building')) {
    return profile.fitnessLevel === 'beginner' ? '8-10' : '6-8';
  } else if (goals.includes('Endurance')) {
    return '15-20';
  } else if (goals.includes('Muscle Gain')) {
    return '8-12';
  }
  
  return '10-12';
}

function getRestForExercise(exercise: Exercise, profile: ClientProfile): string {
  if (exercise.category === 'Compound') return '2-3 minutes';
  if (exercise.category === 'Isolation') return '1-2 minutes';
  return '90 seconds';
}

function generateExerciseNotes(exercise: Exercise, profile: ClientProfile): string {
  const notes = [];
  
  if (profile.injuries.length > 0) {
    notes.push('Monitor for any discomfort');
  }
  
  if (exercise.difficulty === 'advanced' && profile.fitnessLevel !== 'advanced') {
    notes.push('Focus on proper form over weight');
  }
  
  return notes.join('. ');
}

function generateNutritionTips(profile: ClientProfile): string[] {
  const tips = [];
  
  if (profile.goals.includes('Weight Loss')) {
    tips.push('Maintain a caloric deficit of 300-500 calories per day');
    tips.push('Focus on lean proteins and vegetables');
  }
  
  if (profile.goals.includes('Muscle Gain')) {
    tips.push('Consume 1.6-2.2g protein per kg body weight');
    tips.push('Eat in a slight caloric surplus');
  }
  
  tips.push('Stay hydrated with 8-10 glasses of water daily');
  tips.push('Time your largest meal around your workout');
  
  return tips;
}

function generateProgressTracking(profile: ClientProfile): string[] {
  return [
    'Track weight and reps for each exercise',
    'Take progress photos weekly',
    'Monitor energy levels and recovery',
    'Increase weight by 2.5-5% when you can complete all sets with perfect form'
  ];
}